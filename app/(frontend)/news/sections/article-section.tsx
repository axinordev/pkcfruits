import ShareLinks from "@/app/news/components/share-links";
import Badge from "@/shared/ui/atoms/badge";
import Heading from "@/shared/ui/atoms/heading";
import { ArrowLeft, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const intro = "font-riposte text-[18px] leading-8 font-light text-[#253326]";
const featureCopy =
  "font-riposte text-[20px] leading-9 font-light text-[#253326]";

type ArticleView = {
  title: string;
  date: string;
  paragraphs: string[];
  cover: { src: string; alt: string } | null;
  feature: {
    heading: string;
    paragraphs: string[];
    image: { src: string; alt: string };
  } | null;
};

export default function ArticleSection({ article }: { article: ArticleView }) {
  return (
    <section className="overflow-x-clip bg-canvas text-ink">
      <div className="mx-auto flex w-full min-w-0 max-w-360 flex-col px-20 pt-10 pb-20 max-lg:px-5 max-lg:pt-8 max-lg:pb-12">
        <Link
          href="/news"
          className="font-riposte inline-flex items-center gap-2.5 text-[16px] leading-6 font-light text-[#253326]"
        >
          <ArrowLeft className="size-3" strokeWidth={2} />
          Back
        </Link>

        <div className="mt-8 flex items-center justify-between gap-4">
          <Badge className="gap-1.25 text-brand-primary">
            <Calendar
              className="size-3.5 shrink-0"
              strokeWidth={2.25}
              aria-hidden
            />
            {article.date}
          </Badge>
          <Badge className="text-brand-primary">Share</Badge>
        </div>

        <div className="mt-6 flex flex-col items-start gap-5 lg:flex-row lg:justify-between lg:gap-10">
          <Heading as="h1" className="max-w-[695px]">
            {article.title}
          </Heading>
          <ShareLinks title={article.title} />
        </div>

        <div className="relative mt-10 aspect-[1279/749] overflow-hidden rounded-2xl">
          {article.cover ? (
            <Image
              src={article.cover.src}
              alt={article.cover.alt}
              fill
              priority
              sizes="(min-width: 1024px) 1280px, 100vw"
              className="object-cover"
            />
          ) : null}
          <div aria-hidden className="absolute inset-0 bg-black/10" />
        </div>

        <div className="mt-12 flex max-w-[1280px] flex-col gap-4">
          {article.paragraphs.map((paragraph) => (
            <p key={paragraph} className={intro}>
              {paragraph}
            </p>
          ))}
        </div>

        {article.feature ? (
          <div className="mt-16 grid items-start gap-8 lg:grid-cols-[minmax(0,650px)_minmax(0,1fr)] lg:gap-14">
            <div className="relative aspect-[650/772] overflow-hidden rounded-2xl">
              <Image
                src={article.feature.image.src}
                alt={article.feature.image.alt}
                fill
                sizes="(min-width: 1024px) 650px, 100vw"
                className="object-cover object-left"
              />
            </div>
            <div className="min-w-0 lg:pt-5">
              <h2 className="text-[35px] leading-[42px] font-bold text-ink max-lg:text-[28px] max-lg:leading-9">
                {article.feature.heading}
              </h2>
              <div className="mt-6 flex flex-col gap-8">
                {article.feature.paragraphs.map((paragraph) => (
                  <p key={paragraph} className={featureCopy}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
