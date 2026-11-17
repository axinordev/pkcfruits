"use client";

import { useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const HERO_EXIT = [0.03, 0.3];
const ABOUT_ENTER = [0.32, 0.56];
const ABOUT_EXIT = [0.72, 0.97];
const EXIT_ZOOM = 2.1;
const EXIT_BLUR = 14;
// The second text starts this small and grows as you scroll.
const ABOUT_START_SCALE = 0.25;
// How far into a leave the text zooms, still sharp, before blur and fade begin.
const SHARP_ZOOM = 0.5;

const at = ([from, to]: number[], t: number) => from + (to - from) * t;
const HERO_FADE = [at(HERO_EXIT, SHARP_ZOOM), HERO_EXIT[1]];
const ABOUT_FADE = [
  ABOUT_ENTER[0],
  at(ABOUT_ENTER, 0.35),
  at(ABOUT_EXIT, SHARP_ZOOM),
  ABOUT_EXIT[1],
];
const ABOUT_ZOOM = [...ABOUT_ENTER, ...ABOUT_EXIT];

/** Where the about text sits fully in focus, as a fraction of the scroll. */
export const ABOUT_FOCUS = (ABOUT_ENTER[1] + ABOUT_EXIT[0]) / 2;

const toBlur = (value: number) => `blur(${value.toFixed(2)}px)`;

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

  // Scroll timeline across the pinned section (0 → 1). Each text leaves the
  // same way: it zooms toward the viewer while still sharp, then blurs and
  // fades to nothing. The second text arrives small and grows into place.
  const zoom = reduceMotion ? 1 : EXIT_ZOOM;
  const blur = reduceMotion ? 0 : EXIT_BLUR;

  const heroScale = useTransform(scrollYProgress, HERO_EXIT, [1, zoom]);
  const heroOpacity = useTransform(scrollYProgress, HERO_FADE, [1, 0]);
  const heroFilter = useTransform(
    useTransform(scrollYProgress, HERO_FADE, [0, blur]),
    toBlur,
  );

  const aboutScale = useTransform(scrollYProgress, ABOUT_ZOOM, [
    reduceMotion ? 1 : ABOUT_START_SCALE,
    reduceMotion ? 1 : 0.94,
    1,
    zoom,
  ]);
  const aboutOpacity = useTransform(scrollYProgress, ABOUT_FADE, [0, 1, 1, 0]);
  const aboutFilter = useTransform(
    useTransform(scrollYProgress, ABOUT_FADE, [blur * 0.4, 0, 0, blur]),
    toBlur,
  );

  const heroPointerEvents = useTransform(scrollYProgress, (value) =>
    value < at(HERO_FADE, 0.5) ? "auto" : "none",
  );
  const aboutPointerEvents = useTransform(scrollYProgress, (value) =>
    value > ABOUT_FADE[1] && value < at(ABOUT_FADE.slice(2), 0.5)
      ? "auto"
      : "none",
  );

  return {
    sectionRef,
    scrollYProgress,
    heroOpacity,
    heroScale,
    heroFilter,
    aboutOpacity,
    aboutScale,
    aboutFilter,
    heroPointerEvents,
    aboutPointerEvents,
  };
}
