"use client";

import { useStorySection } from "@/app/about/hook";
import { useCountUps } from "@/app/home-page/hooks/use-count-up";
import { siteGutter } from "@/shared/ui/gutter";
import { motion } from "framer-motion";
import { Manrope } from "next/font/google";
import Image from "next/image";
import { useMemo } from "react";

const manrope = Manrope({ subsets: ["latin"], weight: "800" });

type StorySectionProps = {
  story: { image: { src: string; alt: string } | null; paragraphs: string[] };
  stats: { id: string; value: number; suffix: string; label: string }[];
};

export default function StorySection({ story, stats }: StorySectionProps) {
  const {
    sectionRef,
    frameRef,
    cutout,
    backdropScale,
    frameX,
    frameY,
    imageX,
    imageY,
    onPointerMove,
    onPointerLeave,
  } = useStorySection();
  const targets = useMemo(() => stats.map((stat) => stat.value), [stats]);
  const { rootRef, values } = useCountUps(targets);

  return (
    <section
      ref={sectionRef}
      // With a mouse, the sharp window follows the cursor around the section.
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative isolate w-full min-w-0 overflow-hidden bg-[#1a1a1a] text-[#F6F7F5]"
    >
      {story.image ? (
        <motion.div
          aria-hidden
          style={{ scale: backdropScale }}
          className="absolute inset-0 origin-center"
        >
          <Image
            src={story.image.src}
            alt=""
            fill
            sizes="100vw"
            className="scale-110 object-cover object-center blur-lg bg-fixed"
          />
        </motion.div>
      ) : null}
      {/* <div aria-hidden className="absolute inset-0 bg-black/60" /> */}

      {/* Full width with the navbar's side padding: the photo window starts
          in line with the logo and the story ends in line with the Contact
          button. The text column keeps the design's 456px and the space
          left of it gives way first on smaller screens. */}
      <div
        className={`relative z-10 grid w-full min-w-0 grid-cols-1 items-start gap-10 py-12 lg:grid-cols-[minmax(20rem,1fr)_minmax(0,28.5rem)] lg:pt-[13.4%] lg:pb-[5.75%] ${siteGutter}`}
      >
        <motion.div
          ref={frameRef}
          style={{ x: frameX, y: frameY }}
          className="relative aspect-534/442 w-full max-w-80 min-w-0 overflow-hidden rounded-md shadow-[0_8px_28px_rgba(0,0,0,0.14)] lg:mt-15 lg:h-66.25 lg:w-80"
        >
          {story.image && cutout.sectionWidth > 0 ? (
            <motion.div
              className="absolute"
              style={{
                width: cutout.sectionWidth,
                height: cutout.sectionHeight,
                left: -cutout.x,
                top: -cutout.y,
                x: imageX,
                y: imageY,
                scale: backdropScale,
                transformOrigin: "center center",
              }}
            >
              <Image
                src={story.image.src}
                alt={story.image.alt}
                fill
                sizes="100vw"
                className="scale-110 object-cover object-center"
              />
            </motion.div>
          ) : null}
        </motion.div>

        <div className="relative z-10 flex w-full min-w-0 max-w-[calc(100vw-2.5rem)] flex-col gap-2.5 lg:max-w-none">
          {story.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="font-riposte wrap-break-word text-[18px] leading-[1.75] font-light"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* The numbers sit under a hairline that runs the full width. */}
      <div
        className={`relative z-10 border-t border-white/10 py-10 lg:pt-27 lg:pb-26 ${siteGutter}`}
      >
        <ul
          ref={rootRef}
          className="mx-auto grid w-full max-w-227.5 grid-cols-3 text-center text-[#FAF6F0]"
        >
          {stats.map((stat, index) => (
            <li key={stat.id} className="min-w-0 px-1">
              <p
                className={`${manrope.className} text-[28px] leading-10 font-extrabold tracking-normal lg:text-[40px] lg:leading-15`}
              >
                {values[index]}
                {stat.suffix}
              </p>
              <p className="font-riposte mt-1 text-balance text-[13px] leading-5 font-light text-[#FAF6F0]/80 capitalize lg:text-[16px] lg:leading-6.5">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
