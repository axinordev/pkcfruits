import Badge from "@/shared/ui/atoms/badge";
import Heading from "@/shared/ui/atoms/heading";
import Image from "next/image";

type FoundersSectionProps = {
  founders: {
    badge: string;
    title: string;
    members: { name: string; role: string; image: { src: string; alt: string } }[];
  };
};

export default function FoundersSection({ founders }: FoundersSectionProps) {
  return (
    <section className="bg-canvas text-ink">
      <div className="mx-auto flex w-full max-w-360 flex-col items-center px-20 pt-30 pb-30 max-lg:px-5 max-lg:py-14">
        <Badge>{founders.badge}</Badge>
        <Heading className="mt-5 text-center max-lg:mt-4">{founders.title}</Heading>

        <div className="mt-12.5 grid w-full grid-cols-1 gap-5 md:grid-cols-2 max-lg:mt-8">
          {founders.members.map((member) => (
            <article key={member.name} className="relative aspect-630/786 overflow-hidden rounded-2xl">
              <Image
                src={member.image.src}
                alt={member.image.alt}
                width={1086}
                height={1448}
                sizes="(min-width: 768px) 630px, 100vw"
                className="max-w-none"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "138%",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 flex h-[73px] items-center justify-between border-t border-[rgba(195,208,196,0.2)] bg-black/20 px-6 backdrop-blur-[14px] sm:px-10">
                <p className="font-riposte text-[18px] leading-[35px] font-light text-white sm:text-[20px]">{member.name}</p>
                <p className="font-riposte text-[18px] leading-[35px] font-light text-white sm:text-[20px]">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
