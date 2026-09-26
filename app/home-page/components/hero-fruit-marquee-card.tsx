"use client";

import { heroFruitCards } from "@/app/home-page/constants";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const riposte = "font-['Riposte','Helvetica_Neue',Helvetica,Arial,sans-serif] font-light";

export default function HeroFruitMarqueeCard() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const fruit = heroFruitCards[index];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroFruitCards.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="absolute right-12 bottom-9 h-73 w-92.5 overflow-hidden rounded-[20px] max-lg:!right-3 max-lg:!bottom-4 max-lg:origin-bottom-right max-lg:scale-[0.52]">
      <AnimatePresence mode="wait">
        <motion.article
          key={fruit.name}
          initial={reduceMotion ? false : { opacity: 0, x: -48 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 48 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={`box-border h-full w-full rounded-[20px] border border-[rgba(250,246,240,0.2)] px-[30px] pt-[25px] backdrop-blur-[4.5px] ${fruit.cardClass}`}
        >
          <div className="flex items-start justify-between">
            <p className={`${riposte} text-[20px] leading-5 text-[rgba(33,34,33,0.8)] opacity-70`}>
              {fruit.label}
            </p>
            <p className={`${riposte} text-[16px] leading-5 text-[#212221]`}>{fruit.name}</p>
          </div>
          <div className="mt-5 h-px bg-[#212221] opacity-20" aria-hidden />
          <div
            className={`relative mt-[19px] h-[182px] overflow-hidden rounded-[20px] border backdrop-blur-[4.5px] ${fruit.panelClass}`}
          >
            <div
              aria-hidden
              className="absolute top-[70.57px] left-[42.76px] h-[101.73px] w-[157.03px] rounded-full bg-[rgba(33,34,33,0.25)] blur-[12.75px]"
            />
            <Image
              src={fruit.image}
              alt={fruit.imageAlt}
              width={fruit.imageWidth}
              height={fruit.imageHeight}
              className="absolute top-[18.15px] left-[calc(50%-110.37px+2.63px)] h-[147.16px] w-[220.73px] object-contain"
            />
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
