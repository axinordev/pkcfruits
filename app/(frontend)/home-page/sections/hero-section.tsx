"use client";

import type { MarqueeFruit } from "@/app/home-page/hooks/use-hero-fruit-marquee";
import {
  ABOUT_FOCUS,
  HERO_COVER_VH,
  HERO_SCROLL_VH,
  heroPinDistance,
  useHeroSection,
} from "@/app/home-page/hooks/use-hero-section";
import { useScrollFrames } from "@/app/home-page/hooks/use-scroll-frames";
import Button from "@/shared/ui/atoms/button";
import { motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import HeroCustomerBadge from "../components/hero-customer-badge";
import HeroFruitMarqueeCard from "../components/hero-fruit-marquee-card";
import { newsreader, newsreaderText } from "@/app/fonts/newsreader";
import AboutSection from "./about-section";

/**
 * Splits off the title's last sentence, which is set in italic serif:
 * "Ripe. Real. Ready for you." → ["Ripe. Real. ", "Ready for you."].
 * A single-sentence title has no accent.
 */
function splitTitle(title: string): [string, string] {
  const match = title.match(/^(.*[.!?]\s+)(\S.*)$/);
  return match ? [match[1], match[2]] : [title, ""];
}

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
    clipFrame,
    heroOpacity,
    heroScale,
    heroFilter,
    aboutOpacity,
    aboutScale,
    aboutFilter,
    heroPointerEvents,
    aboutPointerEvents,
  } = useHeroSection();
  const reduceMotion = useReducedMotion();
  const canvasRef = useScrollFrames(clipFrame, !reduceMotion);
  const lenis = useLenis();
  const [titleLead, titleAccent] = splitTitle(title);

  function scrollToAbout() {
    const section = sectionRef.current;
    if (!section) return;
    const distance = heroPinDistance(section);
    const top = window.scrollY + section.getBoundingClientRect().top;
    const target = top + distance * ABOUT_FOCUS;
    if (lenis) {
      lenis.scrollTo(target);
      return;
    }
    window.scrollTo({ top: target, behavior: "smooth" });
  }

  return (
    <section
      ref={sectionRef}
      className="relative"
      // One screen for the pinned view, plus the distance it scrolls, plus the
      // screen the products take to slide up over it.
      style={{ height: `${HERO_SCROLL_VH + 100 + HERO_COVER_VH}vh` }}
    >
      {/* Where the hero ends for the navbar: the products' top edge, since
          they cover the section's last screen. */}
      <div
        data-site-hero
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{ bottom: `${HERO_COVER_VH}vh` }}
      />
      <div className="sticky top-0 h-screen overflow-hidden text-white">
        <motion.div
          aria-hidden
          initial={reduceMotion ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          // The first frame as a background, so the hero is never blank
          // before the canvas first paints (and stays put for reduced motion).
          className="absolute inset-0 z-0 origin-center bg-[url(/hero-frames/lg/001.webp)] bg-cover bg-center max-md:portrait:bg-[url(/hero-frames/sm/001.webp)]"
        >
          {/* Hidden until its first paint; the player then reveals it. */}
          <canvas
            ref={canvasRef}
            className="pointer-events-none size-full object-cover opacity-0"
          />
        </motion.div>
        {/* A light wash over the whole clip, and shade behind each text that
            comes and goes with it, so the video stays bright where no text
            needs the contrast. */}
        <div className="absolute inset-0 z-[1] bg-black/10" aria-hidden />
        <motion.div
          aria-hidden
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_50%_at_center,rgb(0_0_0/0.4),transparent)] lg:bg-linear-to-r lg:from-black/50 lg:via-black/20 lg:via-40% lg:to-transparent lg:to-65%"
        />
        <motion.div
          aria-hidden
          style={{ opacity: aboutOpacity }}
          className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_65%_45%_at_center,rgb(0_0_0/0.45),transparent)]"
        />
        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            filter: heroFilter,
            pointerEvents: heroPointerEvents,
          }}
          className="will-change-[transform,filter,opacity] absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 px-5 pt-20 pb-6 lg:items-start lg:px-10 lg:pt-0 lg:pb-0 xl:px-16"
        >
          <HeroCustomerBadge className="absolute bottom-9 left-8 max-lg:hidden xl:left-14" />
          <div className="relative z-10 flex max-w-5xl flex-col items-center gap-3 lg:max-w-[620px] lg:items-start lg:gap-0">
            <HeroCustomerBadge className="lg:hidden" />
            <p
              className={`${newsreaderText.className} text-[14px] leading-6 tracking-[0.08em] uppercase lg:text-[18px] lg:leading-8`}
            >
              {eyeLabel}
            </p>
            <h1 className="-mt-1 text-center text-[28px] leading-[42px] font-bold tracking-tight lg:mt-1 lg:text-left lg:text-[70px] lg:leading-[90px]">
              {titleLead}
              {titleAccent && (
                <em
                  className={`${newsreader.className} font-semibold tracking-normal`}
                >
                  {titleAccent}
                </em>
              )}
            </h1>
            <p className="font-riposte text-center text-[15px] leading-6 font-light tracking-normal lg:mt-8 lg:max-w-[540px] lg:text-left lg:text-[20px] lg:leading-8">
              {description}
            </p>

            <Button href="/product" className="lg:mt-8">
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
            filter: aboutFilter,
            pointerEvents: aboutPointerEvents,
          }}
          className="will-change-[transform,filter,opacity] absolute inset-0 z-10 flex items-center justify-center"
        >
          <AboutSection {...about} />
        </motion.div>
      </div>
    </section>
  );
}
