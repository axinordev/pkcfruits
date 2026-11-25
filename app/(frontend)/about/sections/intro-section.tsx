import Badge from "@/shared/ui/atoms/badge";
import Heading from "@/shared/ui/atoms/heading";
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
    <section className="bg-canvas text-ink">
      <div className="mx-auto w-full max-w-360 px-20 pt-20 pb-15 max-lg:px-5 max-lg:pt-12 max-lg:pb-12">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,473px)_minmax(0,1fr)] lg:gap-x-6.25">
          <div className="flex h-full flex-col items-start">
            <Badge>{intro.badge}</Badge>
            <Heading as="h1" className="mt-7.5 max-w-118.25 max-lg:mt-4">
              {intro.title}
            </Heading>
            <div className="mt-6 flex max-w-113 flex-col gap-2.5">
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

          <div className="lg:pt-15">
            <div className="relative aspect-780/743 overflow-hidden rounded-2xl">
              {intro.image ? (
                <Image
                  src={intro.image.src}
                  alt={intro.image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 780px, 100vw"
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
