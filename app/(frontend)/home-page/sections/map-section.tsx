"use client";

import { useCountUps } from "@/app/home-page/hooks/use-count-up";
import Heading from "@/shared/ui/atoms/heading";
import { Manrope } from "next/font/google";
import Image from "next/image";
import { useMemo } from "react";

const manrope = Manrope({ subsets: ["latin"], weight: "800" });

const markers = [
  { id: "usa", left: "21%", top: "35%" },
  { id: "mexico", left: "21.2%", top: "45.5%" },
  { id: "peru", left: "29.2%", top: "62.9%" },
  { id: "brazil", left: "35.5%", top: "66%" },
  { id: "spain", left: "49.1%", top: "35.7%" },
  { id: "europe", left: "52.9%", top: "29.3%" },
  { id: "east-africa", left: "61%", top: "57%" },
  { id: "south-africa", left: "56.8%", top: "73.6%" },
  { id: "china", left: "74.5%", top: "42%" },
  { id: "southeast-asia", left: "78.2%", top: "50.5%" },
  { id: "australia", left: "86%", top: "69%" },
];

type MapSectionProps = {
  title: string;
  description: string;
  stats: { id: string; value: number; suffix: string; label: string }[];
};

export default function MapSection({
  title,
  description,
  stats,
}: MapSectionProps) {
  const targets = useMemo(() => stats.map((stat) => stat.value), [stats]);
  const { rootRef, values } = useCountUps(targets);

  return (
    <section id="world" className="bg-[#253326] text-[#FFFFF0]">
      <div className="mx-auto w-full max-w-360 px-20 pt-27 pb-19 max-lg:px-5 max-lg:pt-14 max-lg:pb-12">
        <ul ref={rootRef} className="grid grid-cols-3 gap-4 text-center">
          {stats.map((stat, index) => (
            <li key={stat.id}>
              <p
                className={`${manrope.className} text-[40px] leading-15 font-extrabold tracking-normal max-lg:text-[28px] max-lg:leading-10`}
              >
                {values[index]}
                {stat.suffix}
              </p>
              <p className="font-riposte text-[16px] leading-6.5 font-light text-[#FFFFF0]/80 capitalize">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-20 border-t border-white/30 max-lg:mt-8" />

        <div className="mt-12.5 flex items-start justify-between gap-8 max-lg:mt-8 max-lg:flex-col max-lg:gap-3">
          <Heading className="text-[#FAF6F0]">{title}</Heading>
          <p className="font-riposte max-w-109.75 pt-2 text-[18px] leading-7 font-light text-[#EEF4F1]/80 max-lg:pt-0">
            {description}
          </p>
        </div>

        <div className="relative mt-16 max-lg:mt-10">
          <Image
            src="/world-map.svg"
            alt=""
            width={2000}
            height={1201}
            unoptimized
            className="h-auto w-full"
          />
          <ul className="absolute inset-0">
            {markers.map((marker, index) => (
              <li key={marker.id}>
                <span
                  aria-hidden
                  style={{ left: marker.left, top: marker.top }}
                  className="absolute size-4.5 -translate-x-1/2 -translate-y-1/2 max-lg:size-3.5"
                >
                  <span
                    className="map-pin-ring absolute inset-0 rounded-full border border-brand-primary"
                    style={{ animationDelay: `${index * 0.18}s` }}
                  />
                  <span
                    className="map-pin-ring absolute inset-0 rounded-full border border-brand-primary"
                    style={{ animationDelay: `${0.9 + index * 0.18}s` }}
                  />
                  <span className="absolute inset-1 rounded-full bg-brand-primary max-lg:inset-0.75" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
