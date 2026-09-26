"use client";

import { heroSectionContent } from "@/app/home-page/constants";
import { useHeroSection } from "@/app/home-page/hooks/use-hero-section";
import Button from "@/shared/ui/atoms/button";
import Navbar from "@/shared/ui/molecules/navbar";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Mozilla_Headline } from "next/font/google";
import AboutSection from "./about-section";

const mozillaHeadline = Mozilla_Headline({
  subsets: ["latin"],
  adjustFontFallback: false,
});

export default function HeroSection() {
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
          <Navbar />
        </div>
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, pointerEvents: heroPointerEvents }}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6">
            <p className={mozillaHeadline.className}>{heroSectionContent.eyebrow}</p>
            <h1 className="text-center text-[75.57px] leading-[107.96px] font-bold tracking-normal">
              {heroSectionContent.title}
            </h1>
            <p className="text-center font-['Riposte','Helvetica_Neue',Helvetica,Arial,sans-serif] text-[23.75px] leading-[42.11px] font-light tracking-normal">
              {heroSectionContent.description}
            </p>
            <Button>
              {heroSectionContent.action} <ArrowRight />
            </Button>
          </div>
        </motion.div>
        <motion.div
          style={{ opacity: aboutOpacity, scale: aboutScale, pointerEvents: aboutPointerEvents }}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <AboutSection />
        </motion.div>
      </div>
    </section>
  );
}
