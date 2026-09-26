"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function useCountUps(targets: readonly number[]) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(false);
  const [animated, setAnimated] = useState<number[] | null>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setActive(true);
      },
      { threshold: 0.6 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active || reduceMotion !== false) return;

    let frame = 0;
    const duration = 1600;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setAnimated(targets.map((target) => Math.round(eased * target)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduceMotion, targets]);

  const values = reduceMotion ? targets : (animated ?? targets.map(() => 0));

  return { rootRef, values };
}
