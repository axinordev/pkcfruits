"use client";

import type { MarqueeFruit } from "@/app/home-page/hooks/use-hero-fruit-marquee";
import { useHeroSection } from "@/app/home-page/hooks/use-hero-section";
import Button from "@/shared/ui/atoms/button";
import Navbar from "@/shared/ui/molecules/navbar";
import { motion } from "framer-motion";
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

  return (
    <section ref={sectionRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden text-white">
        <motion.div
          aria-hidden
          style={{ scale: imageScale }}
          className="absolute inset-0 origin-top bg-[url('/hero-bg.png')] bg-cover bg-no-repeat bg-[position:left_33%]"
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 z-20">
          <Navbar variant="overlay" />
        </div>
        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            pointerEvents: heroPointerEvents,
          }}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <Image
            src="/hero-customer-badge.png"
            alt="500K+ Happy Customers"
            width={567}
            height={406}
            className="pointer-events-none absolute top-142.5 left-[32.88px] h-[220.19px] w-[306.55px] border-[1.08px] opacity-100 max-lg:hidden"
          />
          <HeroFruitMarqueeCard fruits={fruits} />
          <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 max-lg:mb-28 max-lg:gap-3 max-lg:px-5">
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
            <h1 className="-mt-6 text-center text-[75.57px] leading-[107.96px] font-bold tracking-normal max-lg:-mt-2 max-lg:!text-[34px] max-lg:!leading-[42px]">
              {title}
            </h1>
            <p className="font-riposte text-center text-[23.75px] leading-[42.11px] font-light tracking-normal max-lg:!text-[15px] max-lg:!leading-6">
              {description}
            </p>

            <Button href="/product">
              {button} <ArrowRight />
            </Button>
          </div>
        </motion.div>
        <motion.button
          type="button"
          style={{
            opacity: heroOpacity,
            pointerEvents: heroPointerEvents,
          }}
          onClick={() => {
            const section = sectionRef.current;
            if (!section) return;
            const distance = section.offsetHeight - window.innerHeight;
            const top = window.scrollY + section.getBoundingClientRect().top;
            window.scrollTo({
              top: top + distance * 0.82,
              behavior: "smooth",
            });
          }}
          className="absolute bottom-8 left-1/2 z-20 flex flex-col -translate-x-1/2 items-center gap-3 whitespace-nowrap text-white group"
        >
          <span className="font-riposte text-[14px] leading-5 font-light tracking-normal">
            Scroll down
          </span>
          <span className="inline-flex size-12 items-center justify-center rounded-full border border-white cursor-pointer">
            <ArrowDown
              className="size-6 group-hover:animate-bounce"
              aria-hidden
            />
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
