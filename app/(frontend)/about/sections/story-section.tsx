"use client";

import { useStorySection } from "@/app/about/hook";
import { motion } from "framer-motion";
import Image from "next/image";

export default function StorySection({
  story,
}: {
  story: { image: { src: string; alt: string } | null; paragraphs: string[] };
}) {
  const { sectionRef, frameRef, cutout, backdropScale } = useStorySection();

  return (
    <section
      ref={sectionRef}
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

      <div className="relative z-10 mx-auto grid w-full min-w-0 max-w-360 grid-cols-1 items-start gap-10 py-12 max-lg:px-5 lg:grid-cols-[minmax(0,340fr)_minmax(0,244fr)] lg:gap-x-[16%] lg:pt-[15.7%] lg:pr-[6.04%] lg:pb-[10.2%] lg:pl-[7.85%]">
        <div
          ref={frameRef}
          className="relative aspect-534/442 w-full max-w-133.5 min-w-0 overflow-hidden rounded-md shadow-[0_8px_28px_rgba(0,0,0,0.14)] lg:h-110.5 lg:w-133.5"
        >
          {story.image && cutout.sectionWidth > 0 ? (
            <motion.div
              className="absolute"
              style={{
                width: cutout.sectionWidth,
                height: cutout.sectionHeight,
                left: -cutout.x,
                top: -cutout.y,
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
        </div>

        <div className="relative z-10 flex w-full min-w-0 max-w-[calc(100vw-2.5rem)] flex-col gap-6 lg:max-w-114 lg:pt-[42%]">
          {story.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="font-riposte wrap-break-word text-[18px] leading-8 font-light"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
