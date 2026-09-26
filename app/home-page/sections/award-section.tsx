"use client";

import { captionClass, collageSlots, sectionPhotos } from "@/app/home-page/components/award-card";
import { AwardCard } from "@/app/home-page/components/award-card";
import { awards } from "@/app/home-page/constants/awards";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const easeOut = (progress: number) => 1 - (1 - progress) ** 3;

function track(spread: string, from: number, to: number) {
  return `calc((1 - ${spread}) * ${from}% + ${spread} * ${to}%)`;
}

export default function AwardSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start 0.95", "start 0.22"],
  });
  const spread = useTransform(scrollYProgress, (progress) => (reduceMotion ? 1 : easeOut(progress)));
  const arrowOpacity = useTransform(spread, [0.45, 1], [reduceMotion ? 1 : 0, 1]);
  const spreadVar = "var(--spread, 1)";

  return (
    <section id="awards" className="bg-[#F4F4F4] text-[#212221]">
      <div className="mx-auto flex w-full max-w-360 flex-col px-5 pt-10 pb-12 min-[1280px]:px-0 min-[1280px]:pt-16 min-[1280px]:pb-12.75">
        <h2 className="text-center text-[32px] leading-12.5 font-bold tracking-normal max-lg:text-[28px] max-lg:leading-9 min-[1280px]:hidden">
          Our Awards
        </h2>

        <div className="mt-8 flex flex-col gap-8 min-[1280px]:hidden">
          {awards.map((award, index) => (
            <motion.div
              key={award.id}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : index * 0.06 }}
            >
              <AwardCard award={{ ...award, ...sectionPhotos[award.id] }} />
            </motion.div>
          ))}
          <Link
            href="/awards"
            aria-label="View all awards"
            className="mx-auto flex size-18 items-center justify-center rounded-full bg-brand-primary text-white"
          >
            <ArrowRight className="size-7" strokeWidth={2.2} />
          </Link>
        </div>

        <motion.div
          ref={stageRef}
          style={{ ["--spread" as string]: spread }}
          className="relative hidden aspect-1440/868 w-full min-[1280px]:block"
        >
          {collageSlots.map((slot) => {
            const award = awards.find((item) => item.id === slot.id);
            if (!award) return null;

            return (
              <article
                key={slot.id}
                style={{
                  left: track(spreadVar, slot.fromLeft, slot.toLeft),
                  top: track(spreadVar, slot.fromTop, slot.toTop),
                }}
                className={`absolute flex flex-col ${slot.card}`}
              >
                <div className={`relative min-h-0 overflow-hidden rounded-2xl ${slot.image}`}>
                  <Image src={slot.src} alt={slot.alt} fill sizes="590px" className={`object-cover ${slot.photo}`} />
                  {award.overlay ? <div aria-hidden className="absolute inset-0 bg-black/5" /> : null}
                </div>
                <div className="flex-10 shrink-0" />
                <p className={`${captionClass} min-h-0 px-3 text-[clamp(13px,1.15vw,18px)] ${slot.caption}`}>
                  {award.title}
                </p>
              </article>
            );
          })}

          <h2
            style={{ top: `calc((1 - ${spreadVar}) * (50% - 1.5625rem) + ${spreadVar} * (61.29% - 4.75rem))` }}
            className="absolute left-1/2 z-10 -translate-x-1/2 text-[32px] leading-12.5 font-bold tracking-normal whitespace-nowrap"
          >
            Our Awards
          </h2>

          <motion.div style={{ opacity: arrowOpacity }} className="absolute top-[61.29%] left-1/2 z-10 -translate-x-1/2">
            <Link
              href="/awards"
              aria-label="View all awards"
              className="flex size-18 items-center justify-center rounded-full bg-brand-primary text-white"
            >
              <ArrowRight className="size-7" strokeWidth={2.2} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
