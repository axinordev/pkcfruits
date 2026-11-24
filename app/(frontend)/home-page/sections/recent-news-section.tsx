import AccentTitle from "@/app/home-page/components/accent-title";
import ArrowLink from "@/shared/ui/atoms/arrow-link";
import Badge from "@/shared/ui/atoms/badge";
import Heading from "@/shared/ui/atoms/heading";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Story = {
  slug: string;
  title: string;
  date: string;
  image: string;
  imageAlt: string;
  href: string;
};

export default function RecentNewsSection({
  badge,
  title,
  description,
  button,
  stories,
}: {
  badge: string;
  title: string;
  description: string;
  button: string;
  stories: Story[];
}) {
  return (
    <section id="news" className="text-ink">
      <div className="mx-auto flex w-full max-w-360 flex-col px-20 max-lg:px-5 max-lg:pt-12 max-lg:pb-14 lg:pt-22.5 lg:pb-28">
        {/* View All sits level with the title; on phones it follows the description. */}
        <div className="grid items-end gap-x-6 sm:grid-cols-[1fr_auto]">
          <div>
            <Badge>{badge}</Badge>
            <Heading className="mt-7.5 max-lg:mt-4">
              <AccentTitle text={title} />
            </Heading>
          </div>
          <div className="max-sm:order-last max-sm:mt-6">
            <ArrowLink href="/news">{button}</ArrowLink>
          </div>
          {description && (
            <p className="font-riposte mt-4 max-w-136 text-[16px] leading-6.5 font-light text-ink/70">
              {description}
            </p>
          )}
        </div>

        <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-2">
          {stories.map((story) => (
            <Link
              key={story.slug}
              href={story.href}
              className="flex flex-col rounded-2xl bg-white p-3.75 shadow-[0_1px_4px_rgba(0,0,0,0.05)]"
            >
              <div className="relative aspect-600/366 overflow-hidden rounded-[10px]">
                {story.image ? (
                  <Image
                    src={story.image}
                    alt={story.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="object-cover"
                  />
                ) : null}
                <div aria-hidden className="absolute inset-0 bg-black/5" />
              </div>
              <h3 className="font-riposte mt-3.75 text-[20px] leading-8 font-light text-[#253326]">
                {story.title}
              </h3>
              <p className="font-riposte mt-1.5 flex items-center gap-1.25 text-[16px] leading-8 font-light text-brand-primary lg:mt-auto lg:pt-1.5">
                <Calendar
                  className="size-3.5 shrink-0 text-brand-primary"
                  strokeWidth={2.25}
                  aria-hidden
                />
                {story.date}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
