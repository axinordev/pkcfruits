"use client";

import { useCountUps } from "@/app/home-page/hooks/use-count-up";
import Heading from "@/shared/ui/atoms/heading";
import { Manrope } from "next/font/google";
import Image from "next/image";
import { useMemo } from "react";

const manrope = Manrope({ subsets: ["latin"], weight: "800" });

const markers = [
  { id: "usa", name: "USA", left: "17.4%", top: "41.6%" },
  { id: "mexico", name: "Mexico", left: "16.6%", top: "54.2%" },
  { id: "peru", name: "Peru", left: "25%", top: "72.9%" },
  { id: "brazil", name: "Brazil", left: "33.9%", top: "70.3%" },
  { id: "spain", name: "Spain", left: "47%", top: "43.3%" },
  { id: "europe", name: "Europe", left: "54.6%", top: "34.7%" },
  { id: "east-africa", name: "East Africa", left: "56.7%", top: "53%" },
  { id: "south-africa", name: "South Africa", left: "54.4%", top: "82.5%" },
  { id: "china", name: "China", left: "76.1%", top: "44.7%" },
  { id: "southeast-asia", name: "Thailand", left: "79.4%", top: "58.1%" },
  { id: "australia", name: "Australia", left: "88.6%", top: "80.8%" },
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
    <section
      id="world"
      className="overflow-x-clip bg-[#253326] pb-19 text-[#FFFFF0] max-lg:pb-12"
    >
      <div className="mx-auto w-full max-w-360 px-20 pt-27 max-lg:px-5 max-lg:pt-14">
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

      </div>

      <div className="relative mt-16 w-full max-lg:mt-10">
        <Image
          src="/world-map.svg"
          alt=""
          width={1382}
          height={824}
          unoptimized
          className="h-auto w-full"
        />
        <ul className="absolute inset-0">
          {markers.map((marker, index) => (
            <li
              key={marker.id}
              style={{ left: marker.left, top: marker.top }}
              className="group absolute z-0 -translate-x-1/2 -translate-y-1/2 p-2 hover:z-20"
            >
              <span className="relative block size-6 max-lg:size-5">
                <span
                  aria-hidden
                  className="map-pin-ring absolute inset-0 rounded-full border border-brand-primary"
                  style={{ animationDelay: `${index * 0.18}s` }}
                />
                <span
                  aria-hidden
                  className="map-pin-ring absolute inset-0 rounded-full border border-brand-primary"
                  style={{ animationDelay: `${0.9 + index * 0.18}s` }}
                />
                <span
                  aria-hidden
                  className="absolute inset-1 rounded-full bg-brand-primary max-lg:inset-0.75"
                />
                <span
                  role="tooltip"
                  className={`font-riposte pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full bg-white px-3 py-1.5 text-[13px] leading-none font-medium whitespace-nowrap text-brand-primary opacity-0 transition-opacity duration-150 group-hover:opacity-100 ${
                    Number.parseFloat(marker.left) > 75
                      ? "right-full mr-2"
                      : "left-full ml-2"
                  }`}
                >
                  {marker.name}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
