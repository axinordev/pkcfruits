"use client";

import { useCountUps } from "@/app/home-page/hooks/use-count-up";
import Badge from "@/shared/ui/atoms/badge";
import Heading from "@/shared/ui/atoms/heading";
import { Manrope } from "next/font/google";
import Image from "next/image";
import { useMemo } from "react";

const manrope = Manrope({ subsets: ["latin"], weight: "800" });

type IntroSectionProps = {
  intro: {
    badge: string;
    title: string;
    paragraphs: string[];
    image: { src: string; alt: string } | null;
  };
  stats: { id: string; value: number; suffix: string; label: string }[];
};

export default function IntroSection({ intro, stats }: IntroSectionProps) {
  const targets = useMemo(() => stats.map((stat) => stat.value), [stats]);
  const { rootRef, values } = useCountUps(targets);

  return (
    <section className="bg-canvas text-ink">
      <div className="mx-auto w-full max-w-360 px-20 pt-20 pb-15 max-lg:px-5 max-lg:pt-12 max-lg:pb-12">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,473px)_minmax(0,1fr)] lg:gap-x-[25px]">
          <div className="flex h-full flex-col items-start">
            <Badge>{intro.badge}</Badge>
            <Heading as="h1" className="mt-7.5 max-w-[473px] max-lg:mt-4">
              {intro.title}
            </Heading>
            <div className="mt-6 flex max-w-[452px] flex-col gap-2.5">
              {intro.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-riposte text-[18px] leading-7 font-light text-[#253326]/80"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="lg:pt-15">
            <div className="relative aspect-780/743 overflow-hidden rounded-2xl">
              {intro.image ? (
                <Image
                  src={intro.image.src}
                  alt={intro.image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 780px, 100vw"
                  className="object-cover"
                />
              ) : null}
              <div aria-hidden className="absolute inset-0 bg-black/10" />
            </div>
          </div>
        </div>

        <ul
          ref={rootRef}
          className="mx-auto mt-10 grid w-full max-w-[910px] grid-cols-3 items-center rounded-2xl bg-[#253326] px-3 py-8 text-center text-[#FAF6F0] lg:mt-35 lg:h-[162px] lg:px-6 lg:py-0"
        >
          {stats.map((stat, index) => (
            <li key={stat.id} className="min-w-0 px-1">
              <p
                className={`${manrope.className} text-[28px] leading-10 font-extrabold tracking-normal capitalize lg:text-[40px] lg:leading-15`}
              >
                {values[index]}
                {stat.suffix}
              </p>
              <p className="font-riposte text-balance text-[13px] leading-5 font-light text-[#FAF6F0]/80 capitalize lg:text-[16px] lg:leading-6.5">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
