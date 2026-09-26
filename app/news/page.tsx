import { newsSectionContent } from "@/app/home-page/constants";
import { newsPageContent } from "@/app/news/constants";
import Badge from "@/shared/ui/atoms/badge";
import Heading from "@/shared/ui/atoms/heading";
import { ArrowRight, Calendar } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = newsPageContent.metadata;

export default function NewsPage() {
  return (
    <main className="bg-canvas text-ink">
      <div className="mx-auto flex w-full min-w-0 max-w-360 flex-col items-center px-20 pt-16 pb-20 max-lg:px-5 max-lg:pt-10 max-lg:pb-12">
        <Badge>{newsSectionContent.badge}</Badge>
        <Heading as="h1" className="mt-6 w-full min-w-0 text-center">
          {newsSectionContent.title}
        </Heading>

        <div className="mt-12 grid w-full min-w-0 items-stretch gap-5 lg:grid-cols-2">
          {newsSectionContent.stories.map((story) => (
            <article key={story.title} className="flex flex-col rounded-2xl bg-white p-3.75 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
              <div className="relative aspect-600/366 overflow-hidden rounded-[10px]">
                <Image src={story.image} alt={story.imageAlt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
              </div>
              <h2 className="font-riposte mt-3.75 text-[20px] leading-8 font-light text-[#253326]">{story.title}</h2>
              <div className="mt-auto flex items-center justify-between gap-4 pt-4">
                <p className="font-riposte flex items-center gap-1.25 text-[16px] leading-8 font-light text-brand-primary">
                  <Calendar className="size-3.5 shrink-0 text-brand-primary" strokeWidth={2.25} aria-hidden />
                  {story.date}
                </p>
                <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-full border border-brand-primary text-brand-primary">
                  <ArrowRight className="size-3.5" strokeWidth={2} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
