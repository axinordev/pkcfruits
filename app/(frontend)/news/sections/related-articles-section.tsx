import ArrowLink from "@/shared/ui/atoms/arrow-link";
import Badge from "@/shared/ui/atoms/badge";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type RelatedStory = {
  slug: string;
  title: string;
  date: string;
  image: string;
  imageAlt: string;
  href: string;
};

export default function RelatedArticlesSection({
  articles,
  badge,
}: {
  articles: RelatedStory[];
  badge: string;
}) {
  if (articles.length === 0) return null;

  return (
    <section className="bg-canvas text-ink">
      <div className="mx-auto w-full min-w-0 max-w-360 px-20 pb-20 max-lg:px-5 max-lg:pb-12">
        <div className="flex flex-col items-start justify-between gap-4 border-t border-ink/10 pt-12 sm:flex-row sm:items-center">
          <Badge>{badge}</Badge>
          <ArrowLink href="/news">View All</ArrowLink>
        </div>

        <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={article.href}
              className="flex flex-col rounded-2xl bg-white p-3.75 shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
            >
              <div className="relative aspect-600/366 overflow-hidden rounded-[10px]">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="object-cover"
                  />
                ) : null}
                <div aria-hidden className="absolute inset-0 bg-black/5" />
              </div>
              <h2 className="font-riposte mt-3.75 text-[20px] leading-8 font-light text-[#253326]">
                {article.title}
              </h2>
              <div className="mt-auto flex items-center justify-between gap-4 pt-4">
                <p className="font-riposte flex items-center gap-1.25 text-[16px] leading-8 font-light text-brand-primary">
                  <Calendar
                    className="size-3.5 shrink-0 text-brand-primary"
                    strokeWidth={2.25}
                    aria-hidden
                  />
                  {article.date}
                </p>
                <span
                  aria-hidden
                  className="flex size-7 shrink-0 items-center justify-center rounded-full border border-brand-primary text-brand-primary"
                >
                  <ArrowRight className="size-3.5" strokeWidth={2} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
