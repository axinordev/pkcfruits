"use client";

import type { MotionValue } from "framer-motion";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { preload } from "react-dom";

// Positions in the source clip, public/pomegranates.mp4, in its own frames.
/** Last frame before the pomegranate starts to crack (it shows in 84). */
export const CLIP_CALM_END = 81;
/**
 * Last frame the hero plays: the last seed has just left the picture. The
 * clip's remaining frames (to 189) are an almost still orchard, which would
 * only be scroll where nothing happens.
 */
export const CLIP_END = 174;

/**
 * Pre-rendered frame sets, built by scripts/hero-frames.sh. Each has `calm`
 * frames per clip frame up to CLIP_CALM_END and `rest` per clip frame after,
 * so neighbouring frames barely differ and a blend of two never shows a
 * double image.
 */
const FRAME_SETS = {
  lg: { calm: 2, rest: 2 },
  // A portrait crop, so phones don't stretch a slice of a landscape frame.
  // Its opening is the clip's own frames: the slow push-in still steps less
  // than the burst does, and phones download 80 fewer frames.
  sm: { calm: 1, rest: 2 },
} as const;
type FrameSet = keyof typeof FRAME_SETS;

const PORTRAIT_PHONE = "(max-width: 767px) and (orientation: portrait)";
const PARALLEL_DOWNLOADS = 6;
// Frames are decoded off the main thread ahead of the playhead, and only
// decoded frames are drawn, so a fast scroll never stalls the page on a
// decode. This many stay decoded around the playhead (~75MB on desktop).
const DECODED_FRAMES = 16;
const PARALLEL_DECODES = 4;
// Decodes per second to plan for: under half of what a 4-thread laptop
// manages on desktop frames (~100/s), leaving room for the rest of the page.
// A faster playhead decodes every 2nd, 3rd… frame instead of falling behind.
const DECODE_RATE = 45;
// Roughly how long a decode takes, so decodes aim where the playhead will be.
const DECODE_LEAD_MS = 40;
// Time constant of the playhead's glide toward the scroll position. It evens
// out uneven input (wheel notches, keyboard jumps) without a noticeable lag.
const GLIDE_MS = 90;

function frameIndex(set: FrameSet, clipFrame: number) {
  const { calm, rest } = FRAME_SETS[set];
  return clipFrame <= CLIP_CALM_END
    ? clipFrame * calm
    : CLIP_CALM_END * calm + (clipFrame - CLIP_CALM_END) * rest;
}

const frameSrc = (set: FrameSet, index: number) =>
  `/hero-frames/${set}/${String(index + 1).padStart(3, "0")}.webp`;

/**
 * Fetches the clip's first frame, the hero's background until the player
 * paints, at high priority and only in the set this screen uses. Otherwise
 * the browser finds it only once the stylesheet naming it has loaded.
 */
export function preloadFirstFrame() {
  const options = { as: "image", fetchPriority: "high" } as const;
  preload(frameSrc("lg", 0), {
    ...options,
    media: `not all and ${PORTRAIT_PHONE}`,
  });
  preload(frameSrc("sm", 0), { ...options, media: PORTRAIT_PHONE });
}

function subscribeToFrameSet(onChange: () => void) {
  const query = window.matchMedia(PORTRAIT_PHONE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useFrameSet(): FrameSet {
  return useSyncExternalStore(
    subscribeToFrameSet,
    () => (window.matchMedia(PORTRAIT_PHONE).matches ? "sm" : "lg"),
    () => "lg",
  );
}

/**
 * Plays the hero clip on a canvas, scrubbed by `clipFrame` (a position in the
 * source clip, in its frames). The playhead glides to the scroll position and
 * is drawn as a cross-fade of the two pre-rendered frames either side of it,
 * so the picture moves continuously at any scroll speed rather than stepping
 * from frame to frame, and holds exactly still when the scroll stops.
 */
export function useScrollFrames(
  clipFrame: MotionValue<number>,
  enabled = true,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const set = useFrameSet();

  useEffect(() => {
    const canvas = canvasRef.current;
    // Opaque: every draw covers the whole canvas, so nothing shows through.
    const context = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !context || !enabled || !("createImageBitmap" in window)) {
      return;
    }

    const count = frameIndex(set, CLIP_END) + 1;
    const files: (Blob | undefined)[] = [];
    const requested = new Uint8Array(count);
    const decoded = new Map<number, ImageBitmap>();
    const decoding = new Set<number>();
    const downloads = new AbortController();
    let cancelled = false;
    let raf = 0;
    let lastTick = 0;
    let position = -1;
    let direction = 1;
    let velocity = 0;
    let drawn = "";

    const target = () =>
      frameIndex(set, Math.min(Math.max(clipFrame.get(), 0), CLIP_END));
    const playhead = () => (position < 0 ? target() : position);

    const paint = (frame: ImageBitmap, alpha: number) => {
      if (canvas.width !== frame.width) {
        canvas.width = frame.width;
        canvas.height = frame.height;
      }
      context.globalAlpha = alpha;
      context.drawImage(frame, 0, 0);
    };

    const draw = () => {
      // In 255ths of a frame: the finest step an 8-bit blend can show.
      const steps = Math.round(position * 255);
      const base = Math.floor(steps / 255);
      const mix = steps % 255;
      const from = decoded.get(base);
      const to = mix ? decoded.get(base + 1) : from;
      let key: string;
      if (from && to) {
        key = `${base}:${mix}`;
        if (key === drawn) return;
        paint(from, 1);
        if (mix) paint(to, mix / 255);
      } else {
        // The playhead outran decoding (a fast scroll): show the closest
        // decoded frame rather than wait on one.
        let nearest = -1;
        for (const index of decoded.keys()) {
          if (
            nearest < 0 ||
            Math.abs(index - position) < Math.abs(nearest - position)
          ) {
            nearest = index;
          }
        }
        key = `${nearest}`;
        if (nearest < 0 || key === drawn) return;
        paint(decoded.get(nearest)!, 1);
      }
      drawn = key;
      canvas.style.opacity = "1";
    };

    // Decodes the frames the playhead is heading into, and lets go of the
    // ones furthest from it. Decodes aim where the playhead will be once they
    // finish; when it moves faster than DECODE_RATE allows, they take every
    // 2nd, 3rd… frame (a blend isn't visible at that speed anyway).
    const decodeAhead = () => {
      const speed = Math.abs(velocity) * 1000;
      const stride = Math.max(1, Math.ceil(speed / DECODE_RATE));
      const base = Math.floor(playhead() + velocity * DECODE_LEAD_MS);
      // At blending speed, the pair either side of the playhead comes first.
      const wanted = stride === 1 ? [base, base + 1] : [];
      const lane = Math.floor(base / stride);
      for (let step = 1; wanted.length < DECODED_FRAMES - 2; step++) {
        wanted.push((lane + direction * step) * stride);
      }
      for (const index of wanted) {
        if (decoding.size >= PARALLEL_DECODES) break;
        const file = files[index];
        if (!file || decoded.has(index) || decoding.has(index)) continue;
        decoding.add(index);
        createImageBitmap(file)
          .then((frame) => {
            decoding.delete(index);
            if (cancelled) return frame.close();
            decoded.set(index, frame);
            // Frames already passed go before frames ahead, furthest first.
            const at = playhead();
            const stale = (other: number) => {
              const ahead = (other - at) * direction;
              return ahead < -1 ? -ahead * 4 : Math.abs(ahead);
            };
            while (decoded.size > DECODED_FRAMES) {
              let evict = index;
              for (const other of decoded.keys()) {
                if (stale(other) > stale(evict)) evict = other;
              }
              decoded.get(evict)!.close();
              decoded.delete(evict);
            }
            schedule();
          })
          .catch(() => decoding.delete(index));
      }
    };

    const tick = (now: number) => {
      raf = 0;
      const goal = target();
      if (position < 0) position = goal;
      if (goal !== position) direction = Math.sign(goal - position);
      const elapsed = lastTick ? Math.min(now - lastTick, 100) : 16;
      const previous = position;
      position += (goal - position) * (1 - Math.exp(-elapsed / GLIDE_MS));
      if (Math.abs(goal - position) < 0.001) position = goal;
      // Frames per ms, smoothed over a few animation frames.
      velocity += ((position - previous) / elapsed - velocity) * 0.3;
      draw();
      decodeAhead();
      if (position === goal) {
        lastTick = 0;
        velocity = 0;
        return;
      }
      lastTick = now;
      raf = requestAnimationFrame(tick);
    };

    function schedule() {
      if (!raf) raf = requestAnimationFrame(tick);
    }

    // The frames at the playhead first, then passes of rising density (every
    // 8th frame, every 2nd, all), each from the playhead onward before the
    // frames behind it. The whole clip soon has frames to show, it plays at
    // full speed after half the download, and what's ahead fills in first.
    const nextToDownload = () => {
      const at = Math.round(playhead());
      for (const index of [at, at + 1]) {
        if (index < count && !requested[index]) return index;
      }
      for (const step of [8, 2, 1]) {
        const ahead = Math.ceil(at / step) * step;
        for (let index = ahead; index < count; index += step) {
          if (!requested[index]) return index;
        }
        for (let index = 0; index < ahead; index += step) {
          if (!requested[index]) return index;
        }
      }
      return -1;
    };

    const downloadNext = () => {
      const index = nextToDownload();
      if (cancelled || index < 0) return;
      requested[index] = 1;
      fetch(frameSrc(set, index), { signal: downloads.signal })
        .then((response) => {
          if (!response.ok) throw new Error(response.statusText);
          return response.blob();
        })
        .then((file) => {
          if (cancelled) return;
          files[index] = file;
          decodeAhead();
        })
        .catch(() => {})
        .finally(downloadNext);
    };

    for (let i = 0; i < PARALLEL_DOWNLOADS; i++) downloadNext();
    const stopListening = clipFrame.on("change", schedule);
    schedule();

    return () => {
      cancelled = true;
      downloads.abort();
      stopListening();
      if (raf) cancelAnimationFrame(raf);
      for (const frame of decoded.values()) frame.close();
    };
  }, [clipFrame, enabled, set]);

  return canvasRef;
}
