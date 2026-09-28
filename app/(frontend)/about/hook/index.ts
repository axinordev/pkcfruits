"use client";

import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

export function useStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [cutout, setCutout] = useState({
    sectionWidth: 0,
    sectionHeight: 0,
    x: 0,
    y: 0,
  });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.92", "center 0.42"],
  });

  const backdropScale = useTransform(scrollYProgress, (progress) =>
    reduceMotion ? 1 : 1.12 - 0.12 * progress,
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;

    const measure = () => {
      const sectionRect = section.getBoundingClientRect();
      const frameRect = frame.getBoundingClientRect();
      const frameStyle = getComputedStyle(frame);
      const next = {
        sectionWidth: sectionRect.width,
        sectionHeight: sectionRect.height,
        x:
          frameRect.left -
          sectionRect.left +
          Number.parseFloat(frameStyle.borderLeftWidth),
        y:
          frameRect.top -
          sectionRect.top +
          Number.parseFloat(frameStyle.borderTopWidth),
      };
      setCutout((current) =>
        current.sectionWidth === next.sectionWidth &&
        current.sectionHeight === next.sectionHeight &&
        current.x === next.x &&
        current.y === next.y
          ? current
          : next,
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return { sectionRef, frameRef, cutout, backdropScale };
}
