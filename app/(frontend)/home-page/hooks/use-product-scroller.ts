"use client";

import { useEffect, useRef, useState } from "react";

export function useProductScroller(resetKey: string) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || resetKey.length === 0) return;

    scroller.scrollLeft = 0;

    const update = () => {
      setCanScrollLeft(scroller.scrollLeft > 4);
      setCanScrollRight(
        scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 4,
      );
    };

    update();
    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      scroller.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [resetKey]);

  function scrollByCard(direction: 1 | -1) {
    const scroller = scrollerRef.current;
    const card = scroller?.querySelector("article");
    if (!scroller || !card) return;
    scroller.scrollBy({
      left: direction * (card.getBoundingClientRect().width + 20),
      behavior: "smooth",
    });
  }

  return { scrollerRef, canScrollLeft, canScrollRight, scrollByCard };
}
