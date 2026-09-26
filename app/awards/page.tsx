import { awardsPageContent } from "@/app/awards/constants";
import { awards, type Award } from "@/shared/constants/awards";
import Badge from "@/shared/ui/atoms/badge";
import Heading from "@/shared/ui/atoms/heading";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = awardsPageContent.metadata;

export default function AwardsPage() {
  return (
    <main className="bg-canvas text-ink">
      <div className="mx-auto flex w-full max-w-360 flex-col items-center px-5 py-14 max-lg:py-10 lg:px-20">
        <Badge className="h-7 rounded-full bg-[#FDE8F0] px-3.5 text-[14px] text-brand-primary">{awardsPageContent.badge}</Badge>
        <Heading as="h1" className="mt-6 max-w-[36rem] text-center leading-[52px] max-lg:max-w-none">
          {awardsPageContent.title[0]} <br className="max-sm:hidden" />
          {awardsPageContent.title[1]}
        </Heading>

        <div className="mt-12 grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {awards.map((card) => (
            <AwardPageCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </main>
  );
}

function AwardPageCard({ card }: { card: Award }) {
  return (
    <article className="flex flex-col rounded-[20px] bg-white p-3 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
        <Image src={card.image} alt={card.imageAlt} fill sizes="(min-width: 1280px) 400px, 100vw" className={`object-cover ${card.imageClass}`} />
      </div>
      <div className="px-2 pt-4 pb-3">
        {card.summary ? (
          <>
            <h2 className="text-[16px] leading-6 font-semibold text-ink">{card.title}</h2>
            <p className="relative mt-1 max-h-11 overflow-hidden text-[14px] leading-[22px] text-[#3d3d3d]">
              {card.summary}
              <span className="font-riposte absolute right-0 bottom-0 bg-white pl-4 font-light text-brand-primary">… Read more</span>
            </p>
          </>
        ) : (
          <p className="relative max-h-[4.5rem] overflow-hidden text-[16px] leading-6 font-semibold text-ink">
            {card.title}
            <span className="font-riposte absolute right-0 bottom-0 bg-white pl-4 text-[15px] font-normal text-brand-primary">Read more</span>
          </p>
        )}
      </div>
    </article>
  );
}
