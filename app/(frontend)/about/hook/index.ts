"use client";

import {
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { PointerEvent } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// How the window trails the cursor: it eases after it and settles a moment
// later, without bouncing.
const FOLLOW = { stiffness: 160, damping: 24, mass: 0.6 };

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), Math.max(min, max));

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
  // Where the window sits in the layout, before it is moved.
  const rest = useRef({ left: 0, top: 0 });
  // The cursor's last position on screen, while it is over the section.
  const pointer = useRef<{ x: number; y: number } | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.92", "center 0.42"],
  });

  const backdropScale = useTransform(scrollYProgress, (progress) =>
    reduceMotion ? 1 : 1.12 - 0.12 * progress,
  );

  // How far the window is moved from where it sits. The sharp photo inside
  // moves back by the same amount, so it always shows the part of the
  // picture right behind the window.
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const easedX = useSpring(offsetX, FOLLOW);
  const easedY = useSpring(offsetY, FOLLOW);
  const frameX = reduceMotion ? offsetX : easedX;
  const frameY = reduceMotion ? offsetY : easedY;
  const imageX = useTransform(frameX, (value) => -value);
  const imageY = useTransform(frameY, (value) => -value);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;

    const measure = () => {
      // Offsets ignore transforms, so this is where the window sits even
      // while it is following the cursor.
      let left = 0;
      let top = 0;
      for (
        let node: HTMLElement | null = frame;
        node && node !== section;
        node = node.offsetParent as HTMLElement | null
      ) {
        left += node.offsetLeft;
        top += node.offsetTop;
      }
      rest.current = { left, top };

      const box = section.getBoundingClientRect();
      const next = {
        sectionWidth: box.width,
        sectionHeight: box.height,
        x: left + frame.clientLeft,
        y: top + frame.clientTop,
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

  // Centres the window on the cursor, kept inside the section.
  function follow() {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame || !pointer.current) return;
    const box = section.getBoundingClientRect();
    const left = clamp(
      pointer.current.x - box.left - frame.offsetWidth / 2,
      0,
      box.width - frame.offsetWidth,
    );
    const top = clamp(
      pointer.current.y - box.top - frame.offsetHeight / 2,
      0,
      box.height - frame.offsetHeight,
    );
    offsetX.set(left - rest.current.left);
    offsetY.set(top - rest.current.top);
  }

  // The page scrolling under a still cursor moves the section, so the window
  // is placed again to stay under the cursor.
  useEffect(() => {
    const onScroll = () => follow();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  // Only a mouse moves the window; touch screens keep it where it sits.
  function onPointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    pointer.current = { x: event.clientX, y: event.clientY };
    follow();
  }

  // The window glides back to where it sits.
  function onPointerLeave() {
    pointer.current = null;
    offsetX.set(0);
    offsetY.set(0);
  }

  return {
    sectionRef,
    frameRef,
    cutout,
    backdropScale,
    frameX,
    frameY,
    imageX,
    imageY,
    onPointerMove,
    onPointerLeave,
  };
}
