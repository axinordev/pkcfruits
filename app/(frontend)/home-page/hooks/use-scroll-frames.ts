"use client";

import type { MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

export const HERO_FRAME_COUNT = 121;
const MOBILE_QUERY = "(max-width: 767px)";
const PARALLEL_DOWNLOADS = 6;

export function heroFrameSrc(index: number, set: "lg" | "sm") {
  return `/hero-frames/${set}/${String(index + 1).padStart(3, "0")}.webp`;
}

/**
 * Load order that covers the whole clip early: every 16th frame first, then
 * the gaps at 8, 4, 2, 1. A fast scroll always has a nearby frame to show.
 */
function loadOrder(count: number) {
  const order: number[] = [];
  const seen = new Set<number>();
  for (let step = 16; step >= 1; step /= 2) {
    for (let i = 0; i < count; i += step) {
      if (seen.has(i)) continue;
      seen.add(i);
      order.push(i);
    }
  }
  return order;
}

// Decoded frames kept ready around the playhead. Decoding a frame costs far
// more than drawing one, so it happens ahead of the scroll, off the draw path.
const DECODE_BEHIND = 8;
const DECODE_AHEAD = 12;
const KEEP_AROUND = 20;
// Share of the remaining distance the playhead covers each animation frame.
const EASE = 0.3;
// Animation frames without scroll movement before the clip rests on a whole frame.
const SETTLE_AFTER = 8;

/**
 * Draws the hero clip on a canvas, one pre-rendered frame per scroll position
 * (0 → first frame, 1 → last). The playhead glides between frames: while it
 * is moving, neighbouring frames are cross-faded so motion doesn't step, and
 * when the scroll stops it rests on a single, unblended frame.
 */
export function useScrollFrames(progress: MotionValue<number>, enabled = true) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || !enabled) return;

    const set = window.matchMedia(MOBILE_QUERY).matches ? "sm" : "lg";
    const last = HERO_FRAME_COUNT - 1;
    const frames: (HTMLImageElement | undefined)[] = [];
    const decoded = new Map<number, ImageBitmap>();
    const decoding = new Set<number>();
    const queue = loadOrder(HERO_FRAME_COUNT);
    let cancelled = false;
    let raf = 0;
    let position = -1;
    let lastTarget = -1;
    let stillFor = 0;
    let drawnKey = "";

    const target = () => Math.min(Math.max(progress.get(), 0), 1) * last;

    const nearestLoaded = (index: number) => {
      for (let offset = 0; offset < HERO_FRAME_COUNT; offset++) {
        if (frames[index - offset]) return index - offset;
        if (frames[index + offset]) return index + offset;
      }
      return -1;
    };

    const keepDecoded = (center: number) => {
      for (const [index, bitmap] of decoded) {
        if (Math.abs(index - center) <= KEEP_AROUND) continue;
        bitmap.close();
        decoded.delete(index);
      }
      const from = Math.max(center - DECODE_BEHIND, 0);
      const to = Math.min(center + DECODE_AHEAD, last);
      for (let index = from; index <= to; index++) {
        const image = frames[index];
        if (!image || decoded.has(index) || decoding.has(index)) continue;
        decoding.add(index);
        createImageBitmap(image)
          .then((bitmap) => {
            if (cancelled || Math.abs(index - position) > KEEP_AROUND) {
              bitmap.close();
              return;
            }
            decoded.set(index, bitmap);
          })
          .catch(() => {})
          .finally(() => decoding.delete(index));
      }
    };

    const paint = (index: number, alpha: number) => {
      const source = decoded.get(index) ?? frames[index];
      if (!source) return false;
      context.globalAlpha = alpha;
      context.drawImage(source, 0, 0, canvas.width, canvas.height);
      return true;
    };

    const tick = () => {
      raf = 0;
      const raw = target();
      stillFor = raw === lastTarget ? stillFor + 1 : 0;
      lastTarget = raw;

      // Once the scroll rests, finish on a whole frame so nothing stays blended.
      const settled = stillFor >= SETTLE_AFTER;
      const goal = settled ? Math.round(raw) : raw;
      if (position < 0) position = goal;
      position += (goal - position) * EASE;
      if (Math.abs(goal - position) < 0.01) position = goal;

      const base = Math.min(Math.floor(position), last);
      const mix = Math.round((position - base) * 50) / 50;
      keepDecoded(base);

      const key = `${base}:${mix}`;
      if (key !== drawnKey) {
        const fallback = frames[base] ? base : nearestLoaded(base);
        if (fallback >= 0) {
          const image = frames[fallback]!;
          if (canvas.width !== image.naturalWidth) {
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
          }
          paint(fallback, 1);
          if (fallback === base && mix > 0) paint(base + 1, mix);
          drawnKey = fallback === base ? key : "";
        }
      }

      if (position !== goal || !settled) raf = requestAnimationFrame(tick);
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const loadNext = () => {
      const index = queue.shift();
      if (cancelled || index === undefined) return;
      const image = new Image();
      image.decoding = "async";
      image.src = heroFrameSrc(index, set);
      image
        .decode()
        .then(() => {
          if (cancelled) return;
          frames[index] = image;
          drawnKey = "";
          stillFor = 0;
          schedule();
        })
        .catch(() => {})
        .finally(loadNext);
    };

    for (let i = 0; i < PARALLEL_DOWNLOADS; i++) loadNext();
    const stopListening = progress.on("change", schedule);

    return () => {
      cancelled = true;
      stopListening();
      if (raf) cancelAnimationFrame(raf);
      for (const bitmap of decoded.values()) bitmap.close();
      decoded.clear();
    };
  }, [progress, enabled]);

  return canvasRef;
}
