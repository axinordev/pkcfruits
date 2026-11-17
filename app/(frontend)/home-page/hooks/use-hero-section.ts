"use client";

import { useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const HERO_EXIT = [0.03, 0.3];
// The second text is on screen between these two scroll points, and reads at
// its natural size at ABOUT_FOCUS.
const ABOUT_SPAN = [0.32, 0.97];
export const ABOUT_FOCUS = 0.72;
const EXIT_ZOOM = 2.1;
const EXIT_BLUR = 14;
// The second text starts this small and grows as you scroll.
const ABOUT_START_SCALE = 0.25;
// How far into a leave the text zooms, still sharp, before blur and fade begin.
const SHARP_ZOOM = 0.5;

const at = ([from, to]: number[], t: number) => from + (to - from) * t;
const HERO_FADE = [at(HERO_EXIT, SHARP_ZOOM), HERO_EXIT[1]];

/**
 * Size of the second text along the scroll: one unbroken zoom from
 * ABOUT_START_SCALE to EXIT_ZOOM that never stops. It is fastest at both ends
 * and eases (without pausing) around ABOUT_FOCUS, where the text is readable.
 * In log-size terms this is the cubic c·x + k·x³ through both end points.
 */
const aboutZoom = (() => {
  const x0 = ABOUT_SPAN[0] - ABOUT_FOCUS;
  const x1 = ABOUT_SPAN[1] - ABOUT_FOCUS;
  const u0 = Math.log(ABOUT_START_SCALE);
  const u1 = Math.log(EXIT_ZOOM);
  const det = x0 * x1 ** 3 - x1 * x0 ** 3;
  const c = (u0 * x1 ** 3 - u1 * x0 ** 3) / det;
  const k = (x0 * u1 - x1 * u0) / det;
  return (progress: number) => {
    const x =
      Math.min(Math.max(progress, ABOUT_SPAN[0]), ABOUT_SPAN[1]) - ABOUT_FOCUS;
    return Math.exp(c * x + k * x ** 3);
  };
})();

// Fade and blur follow the text's size, so they stay in step with the zoom.
const ABOUT_SIZES = [
  ABOUT_START_SCALE,
  ABOUT_START_SCALE * 1.7,
  at([1, EXIT_ZOOM], SHARP_ZOOM),
  EXIT_ZOOM,
];

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

  const aboutSize = useTransform(scrollYProgress, aboutZoom);
  const aboutScale = useTransform(aboutSize, (size) =>
    reduceMotion ? 1 : size,
  );
  const aboutOpacity = useTransform(aboutSize, ABOUT_SIZES, [0, 1, 1, 0]);
  const aboutFilter = useTransform(
    useTransform(aboutSize, ABOUT_SIZES, [blur * 0.4, 0, 0, blur]),
    toBlur,
  );

  const heroPointerEvents = useTransform(scrollYProgress, (value) =>
    value < at(HERO_FADE, 0.5) ? "auto" : "none",
  );
  const aboutPointerEvents = useTransform(aboutSize, (size) =>
    size > ABOUT_SIZES[1] && size < at(ABOUT_SIZES.slice(2), 0.5)
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
