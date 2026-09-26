"use client";

import { mapSectionContent } from "@/app/home-page/constants";
import { useCountUps } from "@/app/home-page/hooks/use-count-up";
import Heading from "@/shared/ui/atoms/heading";
import { Manrope } from "next/font/google";
import Image from "next/image";

const manrope = Manrope({ subsets: ["latin"], weight: "800" });
const statTargets = mapSectionContent.stats.map((stat) => stat.value);

export default function MapSection() {
  const { rootRef, values } = useCountUps(statTargets);

  return (
    <section id="world" className="bg-[#253326] text-[#FFFFF0]">
      <div className="mx-auto w-full max-w-360 px-20 pt-27 pb-19 max-lg:px-5 max-lg:pt-14 max-lg:pb-12">
        <ul ref={rootRef} className="grid grid-cols-3 gap-4 text-center">
          {mapSectionContent.stats.map((stat, index) => (
            <li key={stat.id}>
              <p className={`${manrope.className} text-[40px] leading-15 font-extrabold tracking-normal max-lg:text-[28px] max-lg:leading-10`}>
                {values[index]}
                {stat.suffix}
              </p>
              <p className="font-riposte text-[16px] leading-6.5 font-light text-[#FFFFF0]/80 capitalize">{stat.label}</p>
            </li>
          ))}
        </ul>

        <div className="mt-20 border-t border-white/30 max-lg:mt-8" />

        <div className="mt-12.5 flex items-start justify-between gap-8 max-lg:mt-8 max-lg:flex-col max-lg:gap-3">
          <Heading className="text-[#FAF6F0]">{mapSectionContent.title}</Heading>
          <p className="font-riposte max-w-109.75 pt-2 text-[18px] leading-7 font-light text-[#EEF4F1]/80 max-lg:pt-0">
            {mapSectionContent.description}
          </p>
        </div>

        <div className="relative mt-16 max-lg:mt-10">
          <Image src="/world-map.svg" alt="" width={2000} height={1201} unoptimized className="h-auto w-full" />
          <ul className="absolute inset-0">
            {mapSectionContent.markers.map((marker, index) => (
              <li key={marker.id}>
                <span
                  aria-hidden
                  style={{ left: marker.left, top: marker.top }}
                  className="absolute size-4.5 -translate-x-1/2 -translate-y-1/2 max-lg:size-3.5"
                >
                  <span className="map-pin-ring absolute inset-0 rounded-full border border-brand-primary" style={{ animationDelay: `${index * 0.18}s` }} />
                  <span className="map-pin-ring absolute inset-0 rounded-full border border-brand-primary" style={{ animationDelay: `${0.9 + index * 0.18}s` }} />
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
