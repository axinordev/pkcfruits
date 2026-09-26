import { newsSectionContent } from "@/app/home-page/constants";
import { listNewsStories } from "@/app/news/constants";
import ArrowLink from "@/shared/ui/atoms/arrow-link";
import Badge from "@/shared/ui/atoms/badge";
import Heading from "@/shared/ui/atoms/heading";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RecentNewsSection() {
  return (
    <section id="news" className="bg-canvas text-ink">
      <div className="mx-auto flex w-full max-w-360 flex-col px-20 pt-22.5 pb-20 max-lg:px-5 max-lg:pt-12 max-lg:pb-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Badge>{newsSectionContent.badge}</Badge>
            <Heading className="mt-7.5 max-lg:mt-4">{newsSectionContent.title}</Heading>
          </div>
          <ArrowLink href={newsSectionContent.viewAll.href}>{newsSectionContent.viewAll.label}</ArrowLink>
        </div>

        <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-2">
          {listNewsStories().map((story) => (
            <Link key={story.slug} href={story.href} className="flex flex-col rounded-2xl bg-white p-3.75 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
              <div className="relative aspect-600/366 overflow-hidden rounded-[10px]">
                <Image src={story.image} alt={story.imageAlt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
                <div aria-hidden className="absolute inset-0 bg-black/5" />
              </div>
              <h3 className="font-riposte mt-3.75 text-[20px] leading-8 font-light text-[#253326]">{story.title}</h3>
              <p className="font-riposte mt-1.5 flex items-center gap-1.25 text-[16px] leading-8 font-light text-brand-primary lg:mt-auto lg:pt-1.5">
                <Calendar className="size-3.5 shrink-0 text-brand-primary" strokeWidth={2.25} aria-hidden />
                {story.date}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
