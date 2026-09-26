import { aboutPageContent } from "@/app/about/constants";
import Image from "next/image";

export default function StorySection() {
  const { story } = aboutPageContent;

  return (
    <section className="relative isolate overflow-hidden text-white">
      <Image
        src={story.image.src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        style={{ filter: "blur(22px)", transform: "scale(1.12)" }}
      />
      <div aria-hidden className="absolute inset-0 bg-black/30" />

      <div className="relative mx-auto grid w-full max-w-360 items-center gap-10 px-20 py-20 max-lg:px-5 max-lg:py-12 lg:grid-cols-[minmax(0,534px)_minmax(0,519px)] lg:justify-between lg:pt-28 lg:pb-28">
        <div className="relative w-full overflow-hidden rounded-md" style={{ aspectRatio: "1 / 1" }}>
          <Image
            src={story.image.src}
            alt={story.image.alt}
            fill
            sizes="(min-width: 1024px) 534px, 100vw"
            className="object-cover"
            style={{ objectPosition: "left center" }}
          />
        </div>

        <div className="flex max-w-129.57 flex-col gap-6">
          {story.paragraphs.map((paragraph) => (
            <p key={paragraph} className="font-riposte text-[18px] leading-8 font-light lg:text-[20px] lg:leading-[35px]">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
