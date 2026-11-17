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

/**
 * Draws the hero clip on a canvas, one pre-rendered frame per scroll position
 * (0 → first frame, 1 → last). Drawing a decoded image is far cheaper than
 * seeking a <video>, so the clip stays in step with the scroll.
 */
export function useScrollFrames(progress: MotionValue<number>, enabled = true) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || !enabled) return;

    const set = window.matchMedia(MOBILE_QUERY).matches ? "sm" : "lg";
    const frames: (HTMLImageElement | undefined)[] = [];
    const queue = loadOrder(HERO_FRAME_COUNT);
    let cancelled = false;
    let raf = 0;
    let drawn = -1;

    const nearestLoaded = (index: number) => {
      for (let offset = 0; offset < HERO_FRAME_COUNT; offset++) {
        if (frames[index - offset]) return index - offset;
        if (frames[index + offset]) return index + offset;
      }
      return -1;
    };

    const draw = () => {
      raf = 0;
      const target = Math.round(
        Math.min(Math.max(progress.get(), 0), 1) * (HERO_FRAME_COUNT - 1),
      );
      const index = nearestLoaded(target);
      if (index < 0 || index === drawn) return;
      const image = frames[index]!;
      if (canvas.width !== image.naturalWidth) {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
      }
      context.drawImage(image, 0, 0);
      drawn = index;
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw);
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
    };
  }, [progress, enabled]);

  return canvasRef;
}
