"use client";

import {
  useHeroFruitMarquee,
  type MarqueeFruit,
} from "@/app/home-page/hooks/use-hero-fruit-marquee";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function HeroFruitMarqueeCard({
  fruits,
}: {
  fruits: MarqueeFruit[];
}) {
  const reduceMotion = useReducedMotion();
  const fruit = useHeroFruitMarquee(fruits);
  if (!fruit) return null;

  return (
    <div className="relative h-[152px] w-[193px] shrink-0 lg:absolute lg:right-12 lg:bottom-9 lg:h-73 lg:w-92.5">
      <div className="absolute top-1/2 left-1/2 h-73 w-92.5 origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.52] lg:top-0 lg:left-0 lg:h-full lg:w-full lg:translate-x-0 lg:translate-y-0 lg:scale-100">
        <AnimatePresence mode="wait">
          <motion.article
            key={fruit.name}
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 48 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={`box-border h-full w-full rounded-[20px] border border-[rgba(250,246,240,0.2)] px-[30px] pt-[25px] backdrop-blur-[4.5px] ${fruit.cardClass}`}
          >
            <div className="flex items-start justify-between">
              <p className="font-riposte text-[20px] leading-5 font-light text-[rgba(33,34,33,0.8)] opacity-70">
                {fruit.label}
              </p>
              <p className="font-riposte text-[16px] leading-5 font-light text-ink">
                {fruit.name}
              </p>
            </div>
            <div className="mt-5 h-px bg-ink opacity-20" aria-hidden />
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
                sizes="221px"
                className="absolute top-[18.15px] left-[calc(50%-110.37px+2.63px)] h-[147.16px] w-[220.73px] object-contain"
              />
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
