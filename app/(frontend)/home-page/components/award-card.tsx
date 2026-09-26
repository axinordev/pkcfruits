import { cn } from "cn";
import Image from "next/image";

export const captionClass =
  "font-riposte flex items-center justify-center rounded-2xl bg-white px-4 text-center text-[18px] font-light text-[#253326] shadow-[0_1px_2px_rgba(0,0,0,0.05)]";

type AwardCardData = {
  title: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
};

export function AwardCard({ award, className }: { award: AwardCardData; className?: string }) {
  const longCaption = award.title.length > 80;

  return (
    <article className={cn("flex flex-col gap-2.5", className)}>
      <div className="relative overflow-hidden rounded-2xl bg-white" style={{ aspectRatio: `${award.width} / ${award.height}` }}>
        <Image src={award.image} alt={award.imageAlt} fill sizes="(min-width: 1024px) 590px, 100vw" className="object-cover" />
      </div>
      <p className={cn(captionClass, longCaption ? "min-h-21.25 leading-7.25" : "min-h-13.25 leading-5.5")}>{award.title}</p>
    </article>
  );
}
