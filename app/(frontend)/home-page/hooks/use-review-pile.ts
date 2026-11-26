"use client";

import { useEffect, useRef } from "react";
import { screenHeight } from "./screen-height";

// Where each card sits on the finished pile, from the top, as in the design: a
// sideways nudge (for a 512px-wide card) and a tilt. Cards keep their tilt the
// whole time, in the list and on the pile. The home page shows up to four
// reviews, one per place.
const PLACES = [
  { x: 0, rotate: 3 },
  { x: -32, rotate: -2.5 },
  { x: 32, rotate: 5 },
  { x: -24, rotate: 1.5 },
];
const DESIGN_CARD_WIDTH = 512;
// On the pile, each card sits this share of a card's height below the one
// before it; in the list, the gap between cards is this share.
const PILE_STEP = 0.63;
const LIST_GAP = 0.14;
// Card height used before the cards can be measured.
const DEFAULT_CARD_HEIGHT = 170;

// Page scroll per review while the section is pinned, in viewport heights.
export const REVIEW_SCROLL_PER_CARD_VH = 30;

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);
const smooth = (value: number) => value * value * (3 - 2 * value);

/**
 * Transform for card `index`, with `gathered` going from 0 (a list with gaps,
 * starting at the top of the pile) to 1 (the overlapping pile). Every gap
 * closes at once, so lower cards rise faster.
 */
export function pileCardTransform(
  index: number,
  gathered: number,
  cardHeight = DEFAULT_CARD_HEIGHT,
  cardWidth = DESIGN_CARD_WIDTH,
) {
  const place = PLACES[index % PLACES.length];
  const t = smooth(clamp01(gathered));
  const listY = index * (1 + LIST_GAP) * cardHeight;
  const pileY = index * PILE_STEP * cardHeight;
  const x = place.x * (cardWidth / DESIGN_CARD_WIDTH);
  const y = listY + (pileY - listY) * t;
  return `translate(${x}px, ${y}px) rotate(${place.rotate}deg)`;
}

/**
 * Centres the finished pile in the stage (the list starts at its top and runs
 * down from there), and shrinks it when the stage is too short.
 */
export function pileTransform(
  count: number,
  cardHeight = DEFAULT_CARD_HEIGHT,
  stageHeight = 0,
) {
  const height = (count - 1) * PILE_STEP * cardHeight + cardHeight;
  const fit = stageHeight ? Math.min(1, stageHeight / (height * 1.1)) : 1;
  return `translateX(-50%) scale(${fit}) translateY(${-height / 2}px)`;
}

export function useReviewPile(count: number) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pileRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const pile = pileRef.current;
    if (!section || !stage || !pile || !count) return;

    const cards = Array.from(pile.children) as HTMLElement[];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cardHeight = DEFAULT_CARD_HEIGHT;
    let cardWidth = DESIGN_CARD_WIDTH;
    // How far the pile was last gathered. Scroll anywhere outside the pin
    // leaves it unchanged, so the cards aren't restyled on every scroll.
    let placedAt = -1;

    const place = () => {
      // 0 → 1 while the section is pinned. Unpinned (one review, or reduced
      // motion), the finished pile shows.
      const distance = section.offsetHeight - screenHeight();
      const traveled = Math.min(
        Math.max(-section.getBoundingClientRect().top, 0),
        Math.max(distance, 0),
      );
      const gathered =
        distance > 0 && !reduceMotion.matches ? traveled / distance : 1;
      if (gathered === placedAt) return;
      placedAt = gathered;

      cards.forEach((card, index) => {
        card.style.transform = pileCardTransform(
          index,
          gathered,
          cardHeight,
          cardWidth,
        );
      });
    };

    const layout = () => {
      const heights = cards.map((card) => card.offsetHeight);
      cardHeight =
        heights.reduce((sum, height) => sum + height, 0) / heights.length ||
        DEFAULT_CARD_HEIGHT;
      cardWidth = pile.offsetWidth || DESIGN_CARD_WIDTH;
      pile.style.transform = pileTransform(
        count,
        cardHeight,
        stage.clientHeight,
      );
      placedAt = -1;
      place();
    };

    layout();
    void document.fonts?.ready.then(layout);
    const resize = new ResizeObserver(layout);
    resize.observe(stage);
    window.addEventListener("scroll", place, { passive: true });
    reduceMotion.addEventListener("change", layout);
    return () => {
      resize.disconnect();
      window.removeEventListener("scroll", place);
      reduceMotion.removeEventListener("change", layout);
    };
  }, [count]);

  return { sectionRef, stageRef, pileRef };
}
