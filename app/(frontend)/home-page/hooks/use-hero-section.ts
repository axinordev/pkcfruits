"use client";

import { useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

const CARD_REVEAL_END = 0.32;
const SCROLL_CUE_START = 0.22;
const SCROLL_CUE_END = CARD_REVEAL_END;

/** Scroll progress where the about panel has finished the zoom that follows the card reveal. */
export const HERO_ABOUT_SCROLL = CARD_REVEAL_END + (1 - CARD_REVEAL_END) * 0.82;

export function useHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const scrollYProgress = useMotionValue(0);
  const zoomProgress = useMotionValue(0);
  const cardY = useMotionValue(0);
  const scrollCueOpacity = useMotionValue(1);
  const aboutScrollRef = useRef(0.82);

  useLayoutEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const distance = section.offsetHeight - window.innerHeight;
      const traveled = Math.min(
        Math.max(-section.getBoundingClientRect().top, 0),
        Math.max(distance, 0),
      );
      const progress = distance > 0 ? traveled / distance : 0;
      scrollYProgress.set(progress);
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      const holdZoom = desktop && !reduceMotion;
      aboutScrollRef.current = holdZoom ? HERO_ABOUT_SCROLL : 0.82;
      const zoom = holdZoom
        ? Math.min(
            1,
            Math.max(0, (progress - CARD_REVEAL_END) / (1 - CARD_REVEAL_END)),
          )
        : progress;
      zoomProgress.set(zoom);

      const cluster = clusterRef.current;
      const card = cardRef.current;
      const parent = cluster?.offsetParent as HTMLElement | null;
      const cardMid =
        cluster && card
          ? cluster.offsetTop + card.offsetTop + card.offsetHeight / 2
          : 0;
      const fullShift =
        parent && card ? Math.max(0, parent.clientHeight - cardMid) : 0;
      const reveal =
        desktop && !reduceMotion
          ? Math.min(1, Math.max(0, progress / CARD_REVEAL_END))
          : 1;
      cardY.set((1 - reveal) * fullShift);

      const cue =
        desktop && !reduceMotion
          ? Math.min(
              1,
              Math.max(
                0,
                (progress - SCROLL_CUE_START) /
                  (SCROLL_CUE_END - SCROLL_CUE_START),
              ),
            )
          : 1;
      scrollCueOpacity.set(cue);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [cardY, reduceMotion, scrollCueOpacity, scrollYProgress, zoomProgress]);


  const imageScale = useTransform(
    zoomProgress,
    [0, 0.7],
    [1, reduceMotion ? 1 : 1.28],
  );
  const heroOpacity = useTransform(zoomProgress, [0.08, 0.42], [1, 0]);
  const heroScale = useTransform(
    zoomProgress,
    [0.08, 0.42],
    [1, reduceMotion ? 1 : 1.12],
  );
  const aboutOpacity = useTransform(zoomProgress, [0.45, 0.78], [0, 1]);
  const aboutScale = useTransform(
    zoomProgress,
    [0.45, 0.78],
    [reduceMotion ? 1 : 0.72, 1],
  );
  const heroPointerEvents = useTransform(zoomProgress, (value) =>
    value < 0.45 ? "auto" : "none",
  );
  const aboutPointerEvents = useTransform(zoomProgress, (value) =>
    value > 0.45 ? "auto" : "none",
  );
  const scrollCuePointerEvents = useTransform(
    [scrollCueOpacity, zoomProgress],
    ([cue, zoom]) =>
      Number(cue) > 0.45 && Number(zoom) < 0.45 ? "auto" : "none",
  );
  const buttonOpacity = useTransform(
    [scrollCueOpacity, heroOpacity],
    ([cue, hero]) => Number(cue) * Number(hero),
  );

  return {
    sectionRef,
    clusterRef,
    cardRef,
    imageScale,
    heroOpacity,
    heroScale,
    aboutOpacity,
    aboutScale,
    heroPointerEvents,
    aboutPointerEvents,
    cardY,
    buttonOpacity,
    scrollCuePointerEvents,
    aboutScrollRef,
  };
}
