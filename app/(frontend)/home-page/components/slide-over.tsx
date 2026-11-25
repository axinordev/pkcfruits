"use client";

import { useEffect, useRef, type ReactNode } from "react";

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
  return (
    <div className="relative -mt-[100vh] shadow-[0_-16px_40px_rgba(33,34,33,0.1)]">
      {children}
    </div>
  );
}
