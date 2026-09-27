"use client";

import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const easeOut = (progress: number) => 1 - (1 - progress) ** 3;

export function track(spread: string, from: number, to: number) {
  return `calc((1 - ${spread}) * ${from}% + ${spread} * ${to}%)`;
}

export function useAwardSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start 0.95", "start 0.22"],
  });
  const spread = useTransform(scrollYProgress, (progress) =>
    reduceMotion ? 1 : easeOut(progress),
  );
  const arrowOpacity = useTransform(
    spread,
    [0.45, 1],
    [reduceMotion ? 1 : 0, 1],
  );

  return {
    stageRef,
    reduceMotion,
    spread,
    arrowOpacity,
    spreadVar: "var(--spread, 1)",
  };
}
