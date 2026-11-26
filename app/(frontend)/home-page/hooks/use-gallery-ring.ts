"use client";

import { useEffect, useRef } from "react";

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
// ring turns through every photo, which brings the photo it started on back
// to the middle.
const SCROLL_PER_PHOTO_VH = 30;
// Then that photo zooms in over this much scroll while everything around it
// blurs, stays zoomed for HOLD_VH, and the section unpins.
const ZOOM_VH = 80;
const HOLD_VH = 30;
// The zoomed photo keeps its shape and grows to this share of the screen's
// height (of its width, on a screen too narrow for that).
const ZOOM_HEIGHT = 0.8;
const ZOOM_MAX_WIDTH = 0.9;
// Around the zoomed photo, at full zoom: how blurred, and how faded.
const BACK_BLUR = 14;
const BACK_OPACITY = 0.6;

/** The scroll the section stays pinned for, in viewport heights. */
export function galleryScrollVh(photoCount: number) {
  return photoCount * SCROLL_PER_PHOTO_VH + ZOOM_VH + HOLD_VH;
}

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);
const smooth = (value: number) => value * value * (3 - 2 * value);
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

/**
 * The card that is in the middle when the ring has turned through every
 * photo: the one that zooms in.
 */
export function zoomCardIndex(photoCount: number, cardCount: number) {
  return cardCount ? photoCount % cardCount : -1;
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
    const zoomIndex = zoomCardIndex(photoCount, cards.length);
    // The heading and the description, which blur with the other cards.
    const around = Array.from(
      section.querySelectorAll<HTMLElement>("[data-gallery-around]"),
    );
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const turnVh = photoCount * SCROLL_PER_PHOTO_VH;
    const totalVh = galleryScrollVh(photoCount);
    let radius = RING_RADIUS;
    let cardWidth = CARD_WIDTH;
    let cardHeight = CARD_HEIGHT;
    // The zoomed card's growth, and how far it moves down (or up) to sit in
    // the middle of the screen.
    let zoomScale = 1;
    let zoomShift = 0;

    const turn = () => {
      // How far into the pin, in viewport heights: the ring turns one photo
      // per SCROLL_PER_PHOTO_VH, then the photo back in the middle zooms in.
      const distance = section.offsetHeight - window.innerHeight;
      const traveled = Math.min(
        Math.max(-section.getBoundingClientRect().top, 0),
        Math.max(distance, 0),
      );
      const scrolled =
        distance > 0 && !reduceMotion.matches
          ? (traveled / distance) * totalVh
          : 0;
      const offset = clamp01(scrolled / turnVh) * photoCount;
      const zoom = smooth(clamp01((scrolled - turnVh) / ZOOM_VH));
      const blur = zoom > 0 ? `blur(${(zoom * BACK_BLUR).toFixed(2)}px)` : "";
      const fade = 1 - zoom * (1 - BACK_OPACITY);

      cards.forEach((card, index) => {
        const style = ringCardStyle(index, offset, cards.length, radius);
        card.style.visibility = style.visibility;
        if (index !== zoomIndex) {
          card.style.opacity = String(style.opacity * fade);
          card.style.transform = style.transform;
          card.style.filter = blur;
          return;
        }
        // Grown in size rather than scaled, so the photo stays sharp and the
        // corners keep their radius.
        const grow = 1 + (zoomScale - 1) * zoom;
        card.style.opacity = String(style.opacity);
        card.style.transform = zoom
          ? `${style.transform} translateY(${(zoomShift * zoom).toFixed(2)}px)`
          : style.transform;
        card.style.setProperty("--card-w", `${cardWidth * grow}px`);
        card.style.setProperty("--card-h", `${cardHeight * grow}px`);
        card.style.zIndex = zoom ? "1" : "";
      });
      around.forEach((element) => {
        element.style.filter = blur;
        element.style.opacity = zoom ? String(fade) : "";
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
      cardWidth = CARD_WIDTH * scale;
      cardHeight = CARD_HEIGHT * scale;
      ring.style.setProperty("--card-w", `${cardWidth}px`);
      ring.style.setProperty("--card-h", `${cardHeight}px`);
      ring.style.setProperty("--card-r", `${CARD_RADIUS * scale}px`);
      ring.style.height = `${RING_HEIGHT * scale}px`;
      ring.style.perspective = `${PERSPECTIVE * scale}px`;

      // The ring's middle, from the top of the pinned screen.
      const pinned = section.firstElementChild ?? section;
      const ringBox = ring.getBoundingClientRect();
      const ringMiddle =
        ringBox.top + ringBox.height / 2 - pinned.getBoundingClientRect().top;
      zoomShift = window.innerHeight / 2 - ringMiddle;
      zoomScale = Math.max(
        1,
        Math.min(
          (window.innerHeight * ZOOM_HEIGHT) / cardHeight,
          (width * ZOOM_MAX_WIDTH) / cardWidth,
        ),
      );
      turn();
    };

    layout();
    const resize = new ResizeObserver(layout);
    resize.observe(stage);
    window.addEventListener("scroll", turn, { passive: true });
    window.addEventListener("resize", layout);
    reduceMotion.addEventListener("change", turn);
    return () => {
      resize.disconnect();
      window.removeEventListener("scroll", turn);
      window.removeEventListener("resize", layout);
      reduceMotion.removeEventListener("change", turn);
    };
  }, [photoCount]);

  return { sectionRef, stageRef, ringRef };
}
