"use client";

import { AwardCard, captionClass } from "@/app/home-page/components/award-card";
import {
  track,
  useAwardSection,
} from "@/app/home-page/hooks/use-award-section";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const collageSlots = [
  {
    card: "h-[43.433%] w-[40.972%]",
    image: "flex-[282]",
    caption: "flex-[85] px-8 leading-7.25",
    photo: "object-[center_42%]",
    fromLeft: 29.514,
    fromTop: 28.284,
    toLeft: 5.556,
    toTop: 0,
  },
  {
    card: "h-[62.673%] w-[30.833%]",
    image: "flex-[481]",
    caption: "flex-[53] leading-5.5",
    photo: "object-center",
    fromLeft: 34.584,
    fromTop: 18.664,
    toLeft: 63.611,
    toTop: 18.203,
  },
  {
    card: "h-[45.507%] w-[27.014%]",
    image: "flex-[332]",
    caption: "flex-[53] leading-5.5",
    photo: "object-center",
    fromLeft: 36.493,
    fromTop: 27.247,
    toLeft: 8.403,
    toTop: 54.493,
  },
];

type HomeAward = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
};

export default function AwardSection({
  title,
  awards,
}: {
  title: string;
  awards: HomeAward[];
}) {
  const { stageRef, reduceMotion, spread, arrowOpacity, spreadVar } =
    useAwardSection();

  return (
    <section id="awards" className="bg-canvas text-ink">
      <div className="mx-auto flex w-full max-w-360 flex-col px-5 pt-16 pb-12 min-[1280px]:px-0 min-[1280px]:pt-42 min-[1280px]:pb-12">
        <h2 className="text-center text-[32px] leading-12.5 font-bold tracking-normal max-lg:text-[28px] max-lg:leading-9 min-[1280px]:hidden">
          {title}
        </h2>

        <div className="mt-8 flex flex-col gap-8 min-[1280px]:hidden">
          {awards.map((award, index) => (
            <motion.div
              key={award.id}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: reduceMotion ? 0 : index * 0.06,
              }}
            >
              <AwardCard award={award} />
            </motion.div>
          ))}
          <ViewAllAwards className="mx-auto" />
        </div>

        <motion.div
          ref={stageRef}
          style={{ ["--spread" as string]: spread }}
          className="relative hidden aspect-1440/868 w-full min-[1280px]:block"
        >
          {collageSlots.map((slot, index) => {
            const award = awards[index];
            if (!award || !award.image) return null;

            return (
              <article
                key={award.id}
                style={{
                  left: track(spreadVar, slot.fromLeft, slot.toLeft),
                  top: track(spreadVar, slot.fromTop, slot.toTop),
                }}
                className={`absolute flex flex-col ${slot.card}`}
              >
                <div
                  className={`relative min-h-0 overflow-hidden rounded-2xl ${slot.image}`}
                >
                  <Image
                    src={award.image}
                    alt={award.imageAlt}
                    fill
                    sizes="590px"
                    className={`object-cover ${slot.photo}`}
                  />
                </div>
                <div className="flex-10 shrink-0" />
                <p
                  className={`${captionClass} min-h-0 px-3 text-[clamp(13px,1.15vw,18px)] ${slot.caption}`}
                >
                  {award.title}
                </p>
              </article>
            );
          })}

          <h2
            style={{
              top: `calc((1 - ${spreadVar}) * (50% - 1.5625rem) + ${spreadVar} * (61.29% - 4.75rem))`,
            }}
            className="absolute left-1/2 z-10 -translate-x-1/2 text-[32px] leading-12.5 font-bold tracking-normal whitespace-nowrap"
          >
            {title}
          </h2>

          <motion.div
            style={{ opacity: arrowOpacity }}
            className="absolute top-[61.29%] left-1/2 z-10 -translate-x-1/2"
          >
            <ViewAllAwards />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ViewAllAwards({ className }: { className?: string }) {
  return (
    <Link
      href="/awards"
      aria-label="View all awards"
      className={`group flex size-18 items-center justify-center rounded-full bg-brand-primary text-white ${className ?? ""}`}
    >
      <ArrowRight
        className="size-7 group-hover:-rotate-45 transition-transform duration-300"
        strokeWidth={2.2}
      />
    </Link>
  );
}
