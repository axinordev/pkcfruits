"use client";

import type { MarqueeFruit } from "@/app/home-page/hooks/use-hero-fruit-marquee";
import { useHeroSection } from "@/app/home-page/hooks/use-hero-section";
import Button from "@/shared/ui/atoms/button";
import Navbar from "@/shared/ui/molecules/navbar";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Mozilla_Headline } from "next/font/google";
import HeroFruitMarqueeCard from "../components/hero-fruit-marquee-card";
import AboutSection from "./about-section";

const mozillaHeadline = Mozilla_Headline({
  subsets: ["latin"],
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
          className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center bg-no-repeat"
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
            className="pointer-events-none absolute top-122.5 left-[32.88px] h-[220.19px] w-[306.55px] border-[1.08px] opacity-100 max-lg:!top-auto max-lg:!bottom-4 max-lg:!left-4 max-lg:!h-auto max-lg:!w-[132px] max-lg:!border-0"
          />
          <HeroFruitMarqueeCard fruits={fruits} />
          <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 max-lg:mb-28 max-lg:gap-3 max-lg:px-5">
            <p className={mozillaHeadline.className}>{eyeLabel}</p>
            <h1 className="text-center text-[75.57px] leading-[107.96px] font-bold tracking-normal max-lg:!text-[34px] max-lg:!leading-[42px]">
              {title}
            </h1>
            <p className="font-riposte text-center text-[23.75px] leading-[42.11px] font-light tracking-normal max-lg:!text-[15px] max-lg:!leading-6">
              {description}
            </p>
            <Button>
              {button} <ArrowRight />
            </Button>
          </div>
        </motion.div>
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
