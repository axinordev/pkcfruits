"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

function ease(value: number, start: number, end: number) {
  const progress = Math.min(Math.max((value - start) / (end - start), 0), 1);
  return 1 - (1 - progress) ** 3;
}

export default function StorySection({
  story,
}: {
  story: { image: { src: string; alt: string } | null; paragraphs: string[] };
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.92", "center 0.42"],
  });

  const imageScale = useTransform(scrollYProgress, (progress) =>
    reduceMotion ? 1 : 1.16 - 0.16 * progress,
  );
  const backdropScale = useTransform(scrollYProgress, (progress) =>
    reduceMotion ? 1 : 1.12 - 0.12 * progress,
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full min-w-0 overflow-hidden bg-[#3a4f22] text-[#F6F7F5]"
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
            className="object-cover object-left"
            style={{ filter: "blur(16px)" }}
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      ) : null}

      <div className="mx-auto grid w-full min-w-0 max-w-360 grid-cols-1 items-start gap-10 py-12 max-lg:px-5 lg:grid-cols-[minmax(0,272fr)_minmax(0,244fr)] lg:gap-x-[16%] lg:pt-[15.7%] lg:pr-[6.04%] lg:pb-[10.2%] lg:pl-[7.85%]">
        <div
          className="relative w-full min-w-0 overflow-hidden rounded-[10px] shadow-[0_8px_28px_rgba(0,0,0,0.14)]"
          style={{ aspectRatio: "272 / 216" }}
        >
          {story.image ? (
            <motion.div
              className="absolute inset-0"
              style={{
                scale: imageScale,
                transformOrigin: "22% 48%",
              }}
            >
              <Image
                src={story.image.src}
                alt={story.image.alt}
                fill
                sizes="(min-width: 1024px) 549px, 100vw"
                className="object-cover"
                style={{
                  objectPosition: "22% 48%",
                  transform: "scale(1.9)",
                  transformOrigin: "22% 48%",
                }}
              />
            </motion.div>
          ) : null}
        </div>

        <div className="relative z-10 flex w-full min-w-0 max-w-[calc(100vw-2.5rem)] flex-col gap-6 lg:max-w-[28.5rem] lg:pt-[42%]">
          {story.paragraphs.map((paragraph, index) => (
            <StoryParagraph
              key={paragraph}
              paragraph={paragraph}
              index={index}
              count={story.paragraphs.length}
              progress={scrollYProgress}
              reduceMotion={Boolean(reduceMotion)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryParagraph({
  paragraph,
  index,
  count,
  progress,
  reduceMotion,
}: {
  paragraph: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const span = 0.42;
  const gap = count > 1 ? (1 - span) / (count - 1) : 0;
  const start = index * gap * 0.45;
  const end = Math.min(start + span, 1);
  const opacity = useTransform(progress, (value) => {
    if (reduceMotion) return 1;
    return ease(value, start, end);
  });
  const y = useTransform(progress, (value) => {
    if (reduceMotion) return 0;
    return 28 * (1 - ease(value, start, end));
  });

  return (
    <motion.p
      style={{ opacity, y }}
      className="font-riposte wrap-break-word text-[18px] leading-8 font-light"
    >
      {paragraph}
    </motion.p>
  );
}
