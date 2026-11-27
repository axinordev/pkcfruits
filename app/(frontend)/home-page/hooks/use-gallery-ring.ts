"use client";

import { useEffect, useRef } from "react";
import { screenHeight } from "./screen-height";

// The ring as drawn in the design at 1440px wide. Cards stand on the inside of
// a cylinder seen from in front, so the ones toward the sides come closer and
// look taller, and each side card's outer edge is taller than its inner edge.
// Landscape cards, 7:5.
const CARD_WIDTH = 284;
const CARD_HEIGHT = 203;
const CARD_RADIUS = 14;
// Space between cards, measured along the ring.
const CARD_GAP = 16;
const RING_RADIUS = 592;
const PERSPECTIVE = 1940;
// The ring's height at full size: room for the tall cards at the screen edges.
const RING_HEIGHT = 254;
// Angle between neighbouring cards.
const PITCH = (CARD_WIDTH + CARD_GAP) / RING_RADIUS;
// How many cards from the middle a card starts fading, and is gone, as it
// turns side-on.
const FADE_FROM = 2.5;
const HIDE_FROM = 3;

// Page scroll per photo while the section is pinned, in viewport heights. The
// section unpins once the ring has turned through every photo, which brings
// the photo it started on back to the middle.
const SCROLL_PER_PHOTO_VH = 30;

/** The scroll the section stays pinned for, in viewport heights. */
export function galleryScrollVh(photoCount: number) {
  return photoCount * SCROLL_PER_PHOTO_VH;
}

// The ring needs at least this many cards to stay full while it loops, so a
// short gallery is repeated.
const MIN_CARDS = 8;

/** The ring's cards: the photos in order, repeated until the ring is full. */
export function ringCards<T>(photos: T[]) {
  if (!photos.length) return [];
  const copies = Math.ceil(MIN_CARDS / photos.length);
  return Array.from({ length: copies }, (_, copy) =>
    photos.map((photo, place) => ({
      key: `${copy}-${place}`,
      photo,
      repeat: copy > 0,
    })),
  ).flat();
}

/** Card's place on the ring, in cards from the middle: -count/2 … count/2. */
function ringSlot(index: number, offset: number, count: number) {
  return ((((index - offset) % count) + count * 1.5) % count) - count / 2;
}

export function ringCardStyle(
  index: number,
  offset: number,
  count: number,
  radius = RING_RADIUS,
) {
  const slot = ringSlot(index, offset, count);
  const away = Math.abs(slot);
  if (away >= HIDE_FROM) {
    return { visibility: "hidden" as const, opacity: 0, transform: "none" };
  }
  return {
    visibility: "visible" as const,
    opacity:
      away > FADE_FROM ? (HIDE_FROM - away) / (HIDE_FROM - FADE_FROM) : 1,
    transform: `translateZ(${radius}px) rotateY(${-slot * PITCH}rad) translateZ(${-radius}px)`,
  };
}

// Sizes at full scale, for the first paint before the ring measures itself.
export const RING_SIZE_VARS = {
  "--card-w": `${CARD_WIDTH}px`,
  "--card-h": `${CARD_HEIGHT}px`,
  "--card-r": `${CARD_RADIUS}px`,
  height: `${RING_HEIGHT}px`,
  perspective: `${PERSPECTIVE}px`,
};

export function useGalleryRing(photoCount: number) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const ring = ringRef.current;
    if (!section || !stage || !ring || !photoCount) return;

    const cards = Array.from(ring.children) as HTMLElement[];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let radius = RING_RADIUS;
    // The ring's turn the cards were last placed for. Scroll anywhere outside
    // the pin leaves it unchanged, so the cards aren't restyled on every
    // scroll.
    let placedFor = -1;

    const turn = () => {
      // 0 → 1 while the section is pinned; one photo per 1 / photoCount.
      const distance = section.offsetHeight - screenHeight();
      const traveled = Math.min(
        Math.max(-section.getBoundingClientRect().top, 0),
        Math.max(distance, 0),
      );
      const progress =
        distance > 0 && !reduceMotion.matches ? traveled / distance : 0;
      if (progress === placedFor) return;
      placedFor = progress;
      const offset = progress * photoCount;

      cards.forEach((card, index) => {
        const style = ringCardStyle(index, offset, cards.length, radius);
        card.style.visibility = style.visibility;
        card.style.opacity = String(style.opacity);
        card.style.transform = style.transform;
      });
    };

    // Fit the ring to the space it has: by width it spans the screen as in
    // the design (a narrower ring on phones, so the middle card stays large),
    // and it never grows taller than its stage.
    const layout = () => {
      const width = stage.clientWidth;
      const byWidth = width >= 1024 ? width / 1440 : width / 560;
      const byHeight = stage.clientHeight / RING_HEIGHT;
      const scale = Math.max(0.4, Math.min(byWidth, byHeight));
      radius = RING_RADIUS * scale;
      ring.style.setProperty("--card-w", `${CARD_WIDTH * scale}px`);
      ring.style.setProperty("--card-h", `${CARD_HEIGHT * scale}px`);
      ring.style.setProperty("--card-r", `${CARD_RADIUS * scale}px`);
      ring.style.height = `${RING_HEIGHT * scale}px`;
      ring.style.perspective = `${PERSPECTIVE * scale}px`;
      placedFor = -1;
      turn();
    };

    layout();
    const resize = new ResizeObserver(layout);
    resize.observe(stage);
    window.addEventListener("scroll", turn, { passive: true });
    window.addEventListener("resize", layout);
    reduceMotion.addEventListener("change", layout);
    return () => {
      resize.disconnect();
      window.removeEventListener("scroll", turn);
      window.removeEventListener("resize", layout);
      reduceMotion.removeEventListener("change", layout);
    };
  }, [photoCount]);

  return { sectionRef, stageRef, ringRef };
}
