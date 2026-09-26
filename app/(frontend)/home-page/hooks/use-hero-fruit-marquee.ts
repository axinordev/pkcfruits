"use client";

import { useEffect, useState } from "react";

const ROTATE_MS = 3200;

const styles = [
  { cardClass: "bg-[#FDF4CE]", panelClass: "border-[rgba(244,180,0,0.05)] bg-[rgba(244,180,0,0.15)]" },
  { cardClass: "bg-[#FFF3EF]", panelClass: "border-[rgba(230,104,58,0.1)] bg-[rgba(230,104,58,0.15)]" },
  { cardClass: "bg-[#FFFCE3]", panelClass: "border-[rgba(0,136,82,0.1)] bg-[rgba(0,136,16,0.1)]" },
];

export type MarqueeFruit = {
  name: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

export function useHeroFruitMarquee(fruits: MarqueeFruit[]) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (fruits.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % fruits.length);
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [fruits.length]);

  const fruit = fruits[index] ?? fruits[0];
  if (!fruit) return null;
  return { ...fruit, label: "New Arrivals", ...styles[index % styles.length] };
}
