import { getAwardsPage } from "@/lib/content";
import { getSeoMetadata } from "@/shared/seo";
import Badge from "@/shared/ui/atoms/badge";
import Heading from "@/shared/ui/atoms/heading";
import Image from "next/image";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const page = await getAwardsPage();
  return getSeoMetadata(page.seo);
}

export default async function AwardsPage() {
  const page = await getAwardsPage();

  return (
    <main className="bg-canvas text-ink">
      <div className="mx-auto flex w-full max-w-360 flex-col items-center px-5 py-14 max-lg:py-10 lg:px-20">
        <Badge className="h-7 rounded-full bg-[#FDE8F0] px-3.5 text-[14px] text-brand-primary">
          {page.badge}
        </Badge>
        <Heading
          as="h1"
          className="mt-6 max-w-[36rem] text-center leading-[52px] max-lg:max-w-none"
        >
          {page.titleLines[0]} <br className="max-sm:hidden" />
          {page.titleLines[1]}
        </Heading>

        <div className="mt-12 grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {page.awards.map((card) => (
            <article
              key={card.id}
              className="flex flex-col rounded-[20px] bg-white p-3 shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
            >
              <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
                {card.image ? (
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 400px, 100vw"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="px-2 pt-4 pb-3">
                {card.summary ? (
                  <>
                    <h2 className="text-[16px] leading-6 font-semibold text-ink">
                      {card.title}
                    </h2>
                    <p className="relative mt-1 max-h-11 overflow-hidden text-[14px] leading-[22px] text-[#3d3d3d]">
                      {card.summary}
                      <span className="font-riposte absolute right-0 bottom-0 bg-white pl-4 font-light text-brand-primary">
                        … Read more
                      </span>
                    </p>
                  </>
                ) : (
                  <p className="relative max-h-[4.5rem] overflow-hidden text-[16px] leading-6 font-semibold text-ink">
                    {card.title}
                    <span className="font-riposte absolute right-0 bottom-0 bg-white pl-4 text-[15px] font-normal text-brand-primary">
                      Read more
                    </span>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
