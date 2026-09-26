import type { Award } from "@/app/home-page/constants/awards";
import { cn } from "cn";
import Image from "next/image";

const riposte = "font-['Riposte','Helvetica_Neue',Helvetica,Arial,sans-serif] font-light";

export const captionClass = `${riposte} flex items-center justify-center rounded-2xl bg-white px-4 text-center text-[18px] text-[#253326] shadow-[0_1px_2px_rgba(0,0,0,0.05)]`;

export function AwardCard({ award, className }: { award: Award; className?: string }) {
  const longCaption = award.title.length > 80;

  return (
    <article className={cn("flex flex-col gap-2.5", className)}>
      <div
        className="relative overflow-hidden rounded-2xl bg-white"
        style={{ aspectRatio: `${award.width} / ${award.height}` }}
      >
        <Image
          src={award.image}
          alt={award.imageAlt}
          fill
          sizes="(min-width: 1024px) 590px, 100vw"
          className="object-cover"
        />
        {award.overlay ? <div aria-hidden className="absolute inset-0 bg-black/5" /> : null}
      </div>
      <p className={cn(captionClass, longCaption ? "min-h-21.25 leading-7.25" : "min-h-13.25 leading-5.5")}>
        {award.title}
      </p>
    </article>
  );
}

export const sectionPhotos = {
  secretary: {
    image: "/awards/youth-award.jpg",
    imageAlt: "Mr. Navas with officials at an award ceremony",
    width: 960,
    height: 720,
  },
  youth: {
    image: "/awards/fruit-logistica.jpg",
    imageAlt: "Mr. Navas shaking hands at a fruit trade show",
    width: 2048,
    height: 957,
  },
  logistica: {
    image: "/awards/navas-portrait.jpg",
    imageAlt: "Portrait of Mr. Navas",
    width: 778,
    height: 664,
  },
} as const;

export const collageSlots: {
  id: Award["id"];
  src: string;
  alt: string;
  card: string;
  image: string;
  caption: string;
  photo: string;
  fromLeft: number;
  fromTop: number;
  toLeft: number;
  toTop: number;
}[] = [
  {
    id: "secretary",
    src: sectionPhotos.secretary.image,
    alt: sectionPhotos.secretary.imageAlt,
    card: "h-[43.433%] w-[40.972%]",
    image: "flex-[282]",
    caption: "flex-[85] px-8 leading-7.25",
    photo: "object-[center_42%]",
    fromLeft: 29.514,
    fromTop: 28.284,
    toLeft: 5.556,
    toTop: 0,
  },
  {
    id: "youth",
    src: sectionPhotos.youth.image,
    alt: sectionPhotos.youth.imageAlt,
    card: "h-[62.673%] w-[30.833%]",
    image: "flex-[481]",
    caption: "flex-[53] leading-5.5",
    photo: "object-center",
    fromLeft: 34.584,
    fromTop: 18.664,
    toLeft: 63.611,
    toTop: 18.203,
  },
  {
    id: "logistica",
    src: sectionPhotos.logistica.image,
    alt: sectionPhotos.logistica.imageAlt,
    card: "h-[45.507%] w-[27.014%]",
    image: "flex-[332]",
    caption: "flex-[53] leading-5.5",
    photo: "object-center",
    fromLeft: 36.493,
    fromTop: 27.247,
    toLeft: 8.403,
    toTop: 54.493,
  },
];
