"use client";

import type { MarqueeFruit } from "@/app/home-page/hooks/use-hero-fruit-marquee";
import { useHeroSection } from "@/app/home-page/hooks/use-hero-section";
import Button from "@/shared/ui/atoms/button";
  import { motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Mozilla_Headline } from "next/font/google";
import HeroFruitMarqueeCard from "../components/hero-fruit-marquee-card";
import AboutSection from "./about-section";

const mozillaHeadline = Mozilla_Headline({
  subsets: ["latin"],
  weight: "600",
  adjustFontFallback: false,
});

type HeroSectionProps = {
  eyeLabel: string;
  title: string;
  description: string;
  button: string;
  fruits: MarqueeFruit[];
  about: { title: string; description: string; button: string };
};

export default function HeroSection({
  eyeLabel,
  title,
  description,
  button,
  fruits,
  about,
}: HeroSectionProps) {
  const {
    sectionRef,
    imageScale,
    heroOpacity,
    heroScale,
    aboutOpacity,
    aboutScale,
    heroPointerEvents,
    aboutPointerEvents,
  } = useHeroSection();
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();

  function scrollToAbout() {
    const section = sectionRef.current;
    if (!section) return;
    const distance = section.offsetHeight - window.innerHeight;
    const top = window.scrollY + section.getBoundingClientRect().top;
    const target = top + distance * 0.82;
    if (lenis) {
      lenis.scrollTo(target);
      return;
    }
    window.scrollTo({ top: target, behavior: "smooth" });
  }

  return (
    <section ref={sectionRef} data-site-hero className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden text-white">
        <motion.div
          aria-hidden
          style={{ scale: imageScale }}
          className="absolute inset-0 z-0 origin-top"
        >
          <motion.div
            initial={reduceMotion ? false : { scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 origin-center"
          >
            <Image
              src="/hero-bg.png"
              alt=""
              fill
              preload
              sizes="100vw"
              quality={60}
              className="object-cover object-[left_33%]"
            />
          </motion.div>
        </motion.div>
        <div
          className="absolute inset-0 z-[1] bg-black/50"
          aria-hidden="true"
        />
        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            pointerEvents: heroPointerEvents,
          }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 px-5 pt-20 pb-6 lg:px-0 lg:pt-0 lg:pb-0"
        >
          <Image
            src="/hero-customer-badge.png"
            alt="500K+ Happy Customers"
            width={567}
            height={406}
            className="pointer-events-none absolute top-142.5 left-[32.88px] h-[220.19px] w-[306.55px] border-[1.08px] opacity-100 max-lg:hidden"
          />
          <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-3 lg:gap-4 lg:px-6">
            <Image
              src="/hero-customer-badge.png"
              alt="500K+ Happy Customers"
              width={567}
              height={406}
              className="pointer-events-none h-auto w-[132px] lg:hidden"
            />
            <p
              className={`${mozillaHeadline.className} text-[18px] leading-8 font-semibold tracking-[0.08em]`}
            >
              {eyeLabel}
            </p>
            <h1 className="-mt-2 text-center text-[28px] leading-[42px] font-bold tracking-normal lg:-mt-6 lg:text-[75.57px] lg:leading-[107.96px]">
              {title}
            </h1>
            <p className="font-riposte text-center text-[15px] leading-6 font-light tracking-normal lg:text-[23.75px] lg:leading-[42.11px]">
              {description}
            </p>

            <Button href="/product">
              {button}{" "}
              <ArrowRight className="size-6 shrink-0 opacity-100" aria-hidden />
            </Button>
          </div>
          <HeroFruitMarqueeCard fruits={fruits} />
          <button
            type="button"
            onClick={scrollToAbout}
            className="group z-20 flex flex-col items-center gap-3 whitespace-nowrap text-white lg:hidden"
          >
            <span className="font-riposte text-[14px] leading-5 font-light tracking-normal">
              Scroll down
            </span>
            <span className="inline-flex size-12 cursor-pointer items-center justify-center rounded-full border border-white">
              <ArrowDown className="size-6 opacity-100" aria-hidden />
            </span>
          </button>
        </motion.div>
        <motion.button
          type="button"
          style={{
            opacity: heroOpacity,
            pointerEvents: heroPointerEvents,
          }}
          onClick={scrollToAbout}
          className="group absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 whitespace-nowrap text-white lg:flex"
        >
          <span className="font-riposte text-[14px] leading-5 font-light tracking-normal">
            Scroll down
          </span>
          <span className="inline-flex size-12 cursor-pointer items-center justify-center rounded-full border border-white">
            <ArrowDown className="size-6 opacity-100" aria-hidden />
          </span>
        </motion.button>
        <motion.div
          style={{
            opacity: aboutOpacity,
            scale: aboutScale,
            pointerEvents: aboutPointerEvents,
          }}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <AboutSection {...about} />
        </motion.div>
      </div>
    </section>
  );
}
