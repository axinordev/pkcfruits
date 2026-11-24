"use client";

import { useEffect, useRef } from "react";

// Where each card sits on the pile, as in the design: a sideways nudge (for a
// 512px-wide card) and a tilt. Cards take these places in turn.
const PLACES = [
  { x: 0, rotate: 3 },
  { x: -32, rotate: -2.5 },
  { x: 32, rotate: 5 },
  { x: -24, rotate: 1.5 },
];
const DESIGN_CARD_WIDTH = 512;
// Cards on the pile at once. The oldest fades out as the next one lands.
const SHOWN = 4;
// Each card sits this share of a card's height below the one before it.
const STEP = 0.63;
// A dropping card starts this far above its place (in card heights), bigger
// and more tilted, and settles as it lands.
const DROP_HEIGHT = 0.8;
const DROP_SCALE = 0.14;
const DROP_TILT = 9;
// Card height used before the cards can be measured.
const DEFAULT_CARD_HEIGHT = 170;

// Page scroll per dropped card while the section is pinned, in viewport
// heights. The first card is already on the pile when the section arrives.
export const REVIEW_SCROLL_PER_CARD_VH = 35;

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);
const easeOut = (value: number) => 1 - (1 - value) ** 3;

/**
 * Style for card `index` once `landed` cards are on the pile: 1 … count, and
 * fractional while the next card is dropping.
 */
export function pileCardStyle(
  index: number,
  landed: number,
  cardHeight = DEFAULT_CARD_HEIGHT,
  cardWidth = DESIGN_CARD_WIDTH,
) {
  const drop = clamp01(landed - index);
  const age = landed - 1 - index;
  if (drop <= 0 || age >= SHOWN) {
    return { visibility: "hidden" as const, opacity: 0, transform: "none" };
  }
  const place = PLACES[index % PLACES.length];
  const lift = 1 - easeOut(drop);
  const x = place.x * (cardWidth / DESIGN_CARD_WIDTH);
  const y = (index * STEP - lift * DROP_HEIGHT) * cardHeight;
  const tilt = place.rotate + lift * (index % 2 ? -DROP_TILT : DROP_TILT);
  return {
    visibility: "visible" as const,
    opacity: clamp01(drop / 0.35) * clamp01(SHOWN - age),
    transform: `translate(${x}px, ${y}px) rotate(${tilt}deg) scale(${1 + lift * DROP_SCALE})`,
  };
}

/**
 * Keeps the cards on the pile centred in the stage as it grows, and shrinks
 * the pile when the stage is too short for a full one.
 */
export function pileTransform(
  landed: number,
  cardHeight = DEFAULT_CARD_HEIGHT,
  stageHeight = 0,
) {
  const step = STEP * cardHeight;
  const top = Math.max(0, landed - SHOWN) * step;
  const bottom = (landed - 1) * step + cardHeight;
  const full = (SHOWN - 1) * step + cardHeight;
  const fit = stageHeight ? Math.min(1, stageHeight / (full * 1.1)) : 1;
  return `translateX(-50%) scale(${fit}) translateY(${-(top + bottom) / 2}px)`;
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
    let stageHeight = 0;

    const place = () => {
      // 0 → 1 while the section is pinned. Unpinned (one review, or reduced
      // motion), the whole pile shows.
      const distance = section.offsetHeight - window.innerHeight;
      const traveled = Math.min(
        Math.max(-section.getBoundingClientRect().top, 0),
        Math.max(distance, 0),
      );
      const progress =
        distance > 0 && !reduceMotion.matches ? traveled / distance : 1;
      const landed = 1 + progress * (count - 1);

      pile.style.transform = pileTransform(landed, cardHeight, stageHeight);
      cards.forEach((card, index) => {
        const style = pileCardStyle(index, landed, cardHeight, cardWidth);
        card.style.visibility = style.visibility;
        card.style.opacity = String(style.opacity);
        card.style.transform = style.transform;
      });
    };

    const layout = () => {
      const heights = cards.map((card) => card.offsetHeight);
      cardHeight =
        heights.reduce((sum, height) => sum + height, 0) / heights.length ||
        DEFAULT_CARD_HEIGHT;
      cardWidth = pile.offsetWidth || DESIGN_CARD_WIDTH;
      stageHeight = stage.clientHeight;
      place();
    };

    layout();
    void document.fonts?.ready.then(layout);
    const resize = new ResizeObserver(layout);
    resize.observe(stage);
    window.addEventListener("scroll", place, { passive: true });
    reduceMotion.addEventListener("change", place);
    return () => {
      resize.disconnect();
      window.removeEventListener("scroll", place);
      reduceMotion.removeEventListener("change", place);
    };
  }, [count]);

  return { sectionRef, stageRef, pileRef };
}
