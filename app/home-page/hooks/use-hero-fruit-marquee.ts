"use client";

import { heroFruitCards } from "@/app/home-page/constants";
import { useEffect, useState } from "react";

const ROTATE_MS = 3200;

export function useHeroFruitMarquee() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroFruitCards.length);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, []);

  return heroFruitCards[index];
}
