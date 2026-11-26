"use client";

import {
  RING_SIZE_VARS,
  galleryScrollVh,
  ringCardStyle,
  ringCards,
  useGalleryRing,
  zoomCardIndex,
} from "@/app/home-page/hooks/use-gallery-ring";
import type { CmsImage } from "@/lib/content";
import Badge from "@/shared/ui/atoms/badge";
import Heading from "@/shared/ui/atoms/heading";
import { cn } from "cn";
import Image from "next/image";
import type { CSSProperties } from "react";
import { newsreader } from "@/app/fonts/newsreader";

type GallerySectionProps = {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  photos: CmsImage[];
};

/**
 * Gallery photos on a ring. The section pins while the page scrolls and the
 * ring turns with the scroll, one photo at a time. Once the photo it started
 * on is back in the middle, that photo zooms in while everything around it
 * blurs; then the section unpins and the page moves on.
 */
export default function GallerySection({
  badge,
  title,
  highlight,
  description,
  photos,
}: GallerySectionProps) {
  const cards = ringCards(photos);
  const zoomIndex = zoomCardIndex(photos.length, cards.length);
  const { sectionRef, stageRef, ringRef } = useGalleryRing(photos.length);
  const pinned = photos.length > 0;

  return (
    <section
      ref={sectionRef}
      id="gallery"
      style={
        {
          "--gallery-scroll": `${galleryScrollVh(photos.length)}vh`,
        } as CSSProperties
      }
      className={cn(
        "text-ink",
        pinned && "h-[calc(100vh+var(--gallery-scroll))] motion-reduce:h-auto",
      )}
    >
      <div
        className={cn(
          "flex flex-col overflow-hidden pt-24 pb-12 max-lg:pt-20 max-lg:pb-10",
          pinned &&
            "sticky top-0 h-screen motion-reduce:static motion-reduce:h-auto",
        )}
      >
        <div
          data-gallery-around
          className="flex flex-col items-center px-5 text-center"
        >
          <Badge>{badge}</Badge>
          <Heading className="mt-5">
            {title}
            {highlight && (
              <em
                className={`${newsreader.className} block font-semibold text-brand-primary`}
              >
                {highlight}
              </em>
            )}
          </Heading>
        </div>

        {pinned && (
          <div
            ref={stageRef}
            className="flex min-h-0 w-full flex-1 items-center max-lg:max-h-96 lg:max-h-140 motion-reduce:h-[min(35rem,60vh)] motion-reduce:flex-none"
          >
            <ul
              ref={ringRef}
              aria-label="Gallery photos"
              style={RING_SIZE_VARS as CSSProperties}
              className="relative w-full shrink-0"
            >
              {cards.map(({ key, photo, repeat }, index) => (
                <li
                  key={key}
                  aria-hidden={repeat || undefined}
                  style={ringCardStyle(index, 0, cards.length)}
                  className="absolute top-1/2 left-1/2 -mt-[calc(var(--card-h)/2)] -ml-[calc(var(--card-w)/2)] h-(--card-h) w-(--card-w) overflow-hidden rounded-(--card-r) bg-blush backface-hidden will-change-transform"
                >
                  <Image
                    src={photo.src}
                    alt={repeat ? "" : photo.alt}
                    fill
                    // The photo that zooms in grows to most of the screen.
                    sizes={
                      index === zoomIndex
                        ? "(max-width: 1023px) 90vw, 50vw"
                        : "(max-width: 1023px) 60vw, 28vw"
                    }
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        <p
          data-gallery-around
          className={cn(
            "font-riposte mx-auto max-w-142 px-5 text-center text-[16px] leading-6.5 font-light text-ink/70",
            !pinned && "mt-10",
          )}
        >
          {description}
        </p>
      </div>
    </section>
  );
}
