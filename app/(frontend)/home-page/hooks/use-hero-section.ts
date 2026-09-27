"use client";

import { useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function useHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const distance = section.offsetHeight - window.innerHeight;
      const traveled = Math.min(
        Math.max(-section.getBoundingClientRect().top, 0),
        Math.max(distance, 0),
      );
      scrollYProgress.set(distance > 0 ? traveled / distance : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrollYProgress]);

  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.7],
    [1, reduceMotion ? 1 : 1.28],
  );
  const heroOpacity = useTransform(scrollYProgress, [0.08, 0.42], [1, 0]);
  const heroScale = useTransform(
    scrollYProgress,
    [0.08, 0.42],
    [1, reduceMotion ? 1 : 1.12],
  );
  const aboutOpacity = useTransform(scrollYProgress, [0.45, 0.78], [0, 1]);
  const aboutScale = useTransform(
    scrollYProgress,
    [0.45, 0.78],
    [reduceMotion ? 1 : 0.72, 1],
  );
  const heroPointerEvents = useTransform(scrollYProgress, (value) =>
    value < 0.45 ? "auto" : "none",
  );
  const aboutPointerEvents = useTransform(scrollYProgress, (value) =>
    value > 0.45 ? "auto" : "none",
  );

  return {
    sectionRef,
    imageScale,
    heroOpacity,
    heroScale,
    aboutOpacity,
    aboutScale,
    heroPointerEvents,
    aboutPointerEvents,
  };
}
