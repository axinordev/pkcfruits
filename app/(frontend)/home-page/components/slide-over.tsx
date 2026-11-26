"use client";

import { cn } from "cn";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

const SLIDE_OVER =
  "relative -mt-[100vh] shadow-[0_-16px_40px_rgba(33,34,33,0.1)]";

/**
 * Holds a section still for one screen of scroll once its bottom reaches the
 * bottom of the screen (its top reaches the top, if it is shorter than the
 * screen), so the section after it, in a SlideOver, slides up over it.
 */
export function HoldUnder({ children }: { children: ReactNode }) {
  const holdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hold = holdRef.current;
    if (!hold) return;

    const place = () => {
      const top = Math.min(0, window.innerHeight - hold.offsetHeight);
      hold.style.top = `${top}px`;
    };

    place();
    const resize = new ResizeObserver(place);
    resize.observe(hold);
    window.addEventListener("resize", place);
    return () => {
      resize.disconnect();
      window.removeEventListener("resize", place);
    };
  }, []);

  return (
    <div>
      <div ref={holdRef} className="sticky top-0">
        {children}
      </div>
      {/* The screen of scroll the section is held for; the SlideOver after
          it is pulled up over this. */}
      <div aria-hidden className="h-screen" />
    </div>
  );
}

/**
 * Pulls a section up by one screen, so it slides up over the held section
 * before it (a HoldUnder, or the hero, which holds itself), and paints it on
 * top. The soft shadow marks its top edge as it comes over.
 */
export function SlideOver({ children }: { children: ReactNode }) {
  return <div className={SLIDE_OVER}>{children}</div>;
}

/**
 * A SlideOver whose top edge comes up as a tall arch, highest in the middle,
 * and flattens as the section slides up: it is straight by the time the edge
 * reaches the top of the screen. `--arch` runs from 1 (full arch, the edge at
 * the bottom of the screen) to 0 (flat) and sets the arch's height.
 */
export function ArchedSlideOver({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const arch = useTransform(scrollYProgress, (progress) =>
    reduceMotion ? 0 : 1 - progress,
  );

  return (
    <motion.div
      ref={ref}
      style={{ "--arch": arch } as MotionStyle}
      // Clipped rather than hidden, so the sticky sections inside still pin.
      className={cn(
        SLIDE_OVER,
        "overflow-clip rounded-t-[50%_calc(var(--arch)*35vw)]",
      )}
    >
      {children}
    </motion.div>
  );
}
