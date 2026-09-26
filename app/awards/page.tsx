import { awards } from "@/app/home-page/constants/awards";
import Image from "next/image";
import type { Metadata } from "next";

const riposte = "font-['Riposte','Helvetica_Neue',Helvetica,Arial,sans-serif] font-light";

export const metadata: Metadata = {
  title: "A Journey of Excellence | PKC Fruits",
  description: "Awards and recognitions received by PKC Fruits.",
};

export default function AwardsPage() {
  return (
    <main className="bg-[#F4F4F4] text-[#212221]">
      <div className="mx-auto flex w-full max-w-360 flex-col items-center px-5 py-14 max-lg:py-10 lg:px-20">
        <p className={`${riposte} inline-flex h-7 items-center rounded-full bg-[#FDE8F0] px-3.5 text-[14px] leading-5 text-brand-primary`}>
          Our Awards
        </p>
        <h1 className="mt-6 max-w-[36rem] text-center text-[40px] leading-[52px] font-bold tracking-normal max-lg:max-w-none max-lg:text-[28px] max-lg:leading-9">
          A Journey of Excellence, <br className="max-sm:hidden" />
          Recognition and Achievement
        </h1>

        <div className="mt-12 grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {awards.map((card) => (
            <article key={card.id} className="flex flex-col rounded-[20px] bg-white p-3 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
              <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  sizes="(min-width: 1280px) 400px, 100vw"
                  className={`object-cover ${card.imageClass}`}
                />
              </div>
              <div className="px-2 pt-4 pb-3">
                {card.summary ? (
                  <>
                    <h2 className="text-[16px] leading-6 font-semibold text-[#212221]">{card.title}</h2>
                    <p className="relative mt-1 max-h-11 overflow-hidden text-[14px] leading-[22px] text-[#3d3d3d]">
                      {card.summary}
                      <span className={`${riposte} absolute right-0 bottom-0 bg-white pl-4 text-brand-primary`}>
                        … Read more
                      </span>
                    </p>
                  </>
                ) : (
                  <p className="relative max-h-[4.5rem] overflow-hidden text-[16px] leading-6 font-semibold text-[#212221]">
                    {card.title}
                    <span className={`${riposte} absolute right-0 bottom-0 bg-white pl-4 text-[15px] font-normal text-brand-primary`}>
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
