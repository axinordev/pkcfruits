"use client";

import AccentTitle from "@/app/home-page/components/accent-title";
import {
  REVIEW_SCROLL_PER_CARD_VH,
  pileCardStyle,
  pileTransform,
  useReviewPile,
} from "@/app/home-page/hooks/use-review-pile";
import Badge from "@/shared/ui/atoms/badge";
import Heading from "@/shared/ui/atoms/heading";
import { cn } from "cn";
import type { CSSProperties } from "react";

type Review = { id: string; name: string; review: string };

type ReviewsSectionProps = {
  badge: string;
  title: string;
  reviews: Review[];
};

/**
 * Customer reviews on a pile of tilted cards. The section pins while the page
 * scrolls, and each bit of scroll drops the next review onto the pile; once
 * every review has landed, the section unpins.
 */
export default function ReviewsSection({
  badge,
  title,
  reviews,
}: ReviewsSectionProps) {
  const { sectionRef, stageRef, pileRef } = useReviewPile(reviews.length);
  const pinned = reviews.length > 1;

  return (
    <section
      ref={sectionRef}
      id="reviews"
      style={
        {
          "--reviews-scroll": `${(reviews.length - 1) * REVIEW_SCROLL_PER_CARD_VH}vh`,
        } as CSSProperties
      }
      className={cn(
        "text-ink",
        pinned && "h-[calc(100vh+var(--reviews-scroll))] motion-reduce:h-auto",
      )}
    >
      <div
        className={cn(
          "flex flex-col overflow-hidden pt-24 pb-12 max-lg:pt-20 max-lg:pb-10",
          pinned &&
            "sticky top-0 h-screen motion-reduce:static motion-reduce:h-auto",
        )}
      >
        <div className="flex flex-col items-center px-5 text-center">
          <Badge>{badge}</Badge>
          <Heading className="mt-5 lg:leading-15">
            <AccentTitle text={title} />
          </Heading>
        </div>

        {reviews.length > 0 && (
          <div
            ref={stageRef}
            className={cn(
              "relative mt-8 w-full",
              pinned
                ? "min-h-0 flex-1 motion-reduce:h-[34rem] motion-reduce:flex-none"
                : "h-[18rem]",
            )}
          >
            <ul
              ref={pileRef}
              style={{ transform: pileTransform(1) }}
              className="absolute top-1/2 left-1/2 w-[min(32rem,calc(100vw-4rem))] origin-top"
            >
              {reviews.map((review, index) => (
                <li
                  key={review.id}
                  style={pileCardStyle(index, 1)}
                  className="absolute inset-x-0 top-0 will-change-transform"
                >
                  <figure className="relative rounded-2xl bg-white px-7.5 pt-7 pb-6 shadow-[0_12px_32px_rgba(33,34,33,0.08)] max-lg:px-5 max-lg:pt-6 max-lg:pb-5">
                    <Bookmark />
                    <blockquote className="font-riposte line-clamp-4 pr-8 text-[16px] leading-6.5 font-light text-ink/75 max-lg:text-[15px] max-lg:leading-6">
                      “{review.review}”
                    </blockquote>
                    <figcaption className="font-riposte mt-4.5 text-[18px] leading-6 font-medium text-ink max-lg:text-[16px]">
                      {review.name} –
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function Bookmark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 24"
      className="absolute top-0 right-7 h-6 w-5 text-brand-primary max-lg:right-5"
    >
      <path d="M0 0h20v24l-10-5.5L0 24z" fill="currentColor" />
      <circle cx="10" cy="9.5" r="1.75" fill="white" />
    </svg>
  );
}
