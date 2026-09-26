import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const riposte = "font-['Riposte','Helvetica_Neue',Helvetica,Arial,sans-serif] font-light";

const stories = [
  {
    title: "Mr. Navas has been selected as a secretary of the federation of business organisation north zone, Kerala.",
    date: "January 7, 2023",
    image: "/news-federation.jpg",
    imageAlt: "Mr. Navas shaking hands at Asia Fruit Logistica",
    width: 1536,
    height: 718,
  },
  {
    title: "Mega Fruits and Kitchen Expo held at Kozhikode",
    date: "January 7, 2023",
    image: "/news-expo.jpg",
    imageAlt: "Mega Fruits and Kitchen Expo stall in Kozhikode",
    width: 1024,
    height: 576,
  },
] as const;

export default function RecentNewsSection() {
  return (
    <section id="news" className="bg-[#F4F4F4] text-[#212221]">
      <div className="mx-auto flex w-full max-w-360 flex-col px-20 pt-22.5 pb-20 max-lg:px-5 max-lg:pt-12 max-lg:pb-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className={`${riposte} inline-flex h-7.5 items-center rounded-[33px] bg-[#FED7E4] px-2.5 text-[16px] leading-5 text-brand-primary/80`}>
              News and Events
            </p>
            <h2 className="mt-7.5 text-[40px] leading-12.5 font-bold tracking-normal max-lg:mt-4 max-lg:text-[28px]! max-lg:leading-9!">
              Recent News and Events
            </h2>
          </div>
          <Link href="/news" className={`${riposte} flex items-center gap-2.5 text-[20px] leading-9.75 text-[#212221]`}>
            View All
            <span className="flex size-7 items-center justify-center rounded-[5px] bg-brand-primary text-white">
              <ArrowRight className="size-3" strokeWidth={2.5} />
            </span>
          </Link>
        </div>

        <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-2">
          {stories.map((story) => (
            <article
              key={story.title}
              className="flex flex-col rounded-2xl bg-white p-3.75 shadow-[0_1px_4px_rgba(0,0,0,0.05)]"
            >
              <div className="relative aspect-600/366 overflow-hidden rounded-[10px]">
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-black/5" />
              </div>
              <h3 className={`${riposte} mt-3.75 text-[20px] leading-8 text-[#253326]`}>{story.title}</h3>
              <p className={`${riposte} mt-1.5 flex items-center gap-1.25 text-[16px] leading-8 text-brand-primary lg:mt-auto lg:pt-1.5`}>
                <Calendar className="size-3.5 shrink-0 text-brand-primary" strokeWidth={2.25} aria-hidden />
                {story.date}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
