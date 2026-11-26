import { dmSans } from "@/app/about/fonts";
import { newsreader } from "@/app/fonts/newsreader";
import AccentTitle from "@/app/home-page/components/accent-title";
import Badge from "@/shared/ui/atoms/badge";
import Heading from "@/shared/ui/atoms/heading";
import { siteGutter } from "@/shared/ui/gutter";
import Image from "next/image";

type FoundersSectionProps = {
  founders: {
    badge: string;
    title: string;
    members: {
      name: string;
      role: string;
      image: { src: string; alt: string };
    }[];
  };
};

export default function FoundersSection({ founders }: FoundersSectionProps) {
  return (
    <section className="bg-white bg-[url(/bg.webp)] bg-cover bg-top bg-no-repeat text-ink">
      <div
        className={`flex w-full flex-col items-center pt-30 pb-30 max-lg:py-14 ${siteGutter}`}
      >
        <Badge>{founders.badge}</Badge>
        <Heading
          size="page"
          className={`${dmSans.className} mt-5 text-center leading-13.5 font-semibold tracking-[-0.05em] max-lg:mt-4`}
        >
          <AccentTitle
            text={founders.title}
            accentClassName={`${newsreader.className} leading-none font-normal`}
          />
        </Heading>

        {/* Two 498px cards side by side, centred; on a phone they stack and
            keep that width at most. */}
        <div className="mt-10.5 grid w-full max-w-255 grid-cols-1 gap-6 max-md:max-w-124.5 max-lg:mt-8 md:grid-cols-2">
          {founders.members.map((member) => (
            <article
              key={member.name}
              className="rounded-[20px] bg-white p-2.5 pb-6 text-center shadow-[0_2px_12px_rgba(33,34,33,0.05)]"
            >
              <div className="relative aspect-478/530 overflow-hidden rounded-xl">
                <Image
                  src={member.image.src}
                  alt={member.image.alt}
                  fill
                  sizes="(min-width: 768px) 480px, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="font-riposte mt-5.5 text-[20px] leading-7 font-light text-[#253326]">
                {member.name}
              </p>
              <p className="font-riposte mt-0.5 text-[18px] leading-6.25 font-light text-[#71757A]">
                {member.role}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
