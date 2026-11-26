import { dmSans } from "@/app/about/fonts";
import { newsreader } from "@/app/fonts/newsreader";
import AccentTitle from "@/app/home-page/components/accent-title";
import Badge from "@/shared/ui/atoms/badge";
import Heading from "@/shared/ui/atoms/heading";
import { siteGutter } from "@/shared/ui/gutter";
import Image from "next/image";

type IntroSectionProps = {
  intro: {
    badge: string;
    title: string;
    paragraphs: string[];
    image: { src: string; alt: string } | null;
  };
};

export default function IntroSection({ intro }: IntroSectionProps) {
  return (
    <section className="bg-[#FFFAFC] text-ink">
      {/* Full width with the navbar's side padding: the text lines up with
          the logo and the photo, which takes the rest of the row, with the
          Contact button. */}
      <div
        className={`w-full pt-20 pb-30 max-lg:pt-12 max-lg:pb-12 ${siteGutter}`}
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,473px)_minmax(0,1fr)] lg:gap-x-6.25">
          {/* The badge and title sit at the top, level with the photo's top
              edge; the text sits at the bottom, level with its bottom edge. */}
          <div className="flex flex-col items-start">
            <Badge>{intro.badge}</Badge>
            <Heading
              as="h1"
              size="page"
              className={`${dmSans.className} mt-7.5 leading-13.5 font-semibold tracking-[-0.05em] max-lg:mt-4 lg:max-w-98.5`}
            >
              <AccentTitle
                text={intro.title}
                accentClassName={`${newsreader.className} leading-none font-bold tracking-[0.01em]`}
              />
            </Heading>
            <div className="mt-6 flex max-w-111.25 flex-col gap-2.5 lg:mt-auto lg:pt-10">
              {intro.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-riposte text-[18px] leading-7 font-light text-[#253326]/80"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* The photo keeps its shape, and grows taller when the text
              beside it needs more room, so the two still end level. */}
          <div className="flex flex-col lg:pt-15">
            <div className="relative aspect-780/743 overflow-hidden rounded-xl lg:flex-1">
              {intro.image ? (
                <Image
                  src={intro.image.src}
                  alt={intro.image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 67vw, 100vw"
                  className="object-cover"
                />
              ) : null}
              <div aria-hidden className="absolute inset-0 bg-black/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
