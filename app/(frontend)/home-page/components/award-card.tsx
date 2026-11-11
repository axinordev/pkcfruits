import { cn } from "cn";
import Image from "next/image";

export const captionClass =
  "font-riposte flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-center text-[18px] font-light text-[#253326] text-pretty shadow-[0_1px_2px_rgba(0,0,0,0.05)]";

type AwardCardData = {
  title: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
};

export function AwardCard({
  award,
  className,
}: {
  award: AwardCardData;
  className?: string;
}) {
  const longCaption = award.title.length > 80;

  return (
    <article className={cn("flex flex-col gap-2.5", className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white">
        <Image
          src={award.image}
          alt={award.imageAlt}
          fill
          sizes="(min-width: 1024px) 590px, 100vw"
          className="object-cover object-top"
        />
      </div>
      <p
        className={cn(
          captionClass,
          longCaption ? "min-h-24 leading-6" : "min-h-13.25 leading-5.5",
        )}
      >
        {award.title}
      </p>
    </article>
  );
}
