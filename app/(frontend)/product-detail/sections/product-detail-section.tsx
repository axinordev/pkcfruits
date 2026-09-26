import Badge from "@/shared/ui/atoms/badge";
import Heading from "@/shared/ui/atoms/heading";
import { cn } from "cn";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const copy = "font-riposte text-[18px] leading-8 font-light wrap-break-word text-[#253326]/80";

type ProductDetailView = {
  name: string;
  summary: string;
  origin: string;
  availability: string;
  availabilityNote: string;
  bestFor: string;
  benefits: string;
  season: string;
  badge: string;
  image: { src: string; alt: string } | null;
  benefitsImage: { src: string; alt: string; width: number; height: number } | null;
};

export default function ProductDetailSection({ product }: { product: ProductDetailView }) {
  const facts = [
    { label: "Origin", value: product.origin },
    { label: "Availability", value: product.availability, note: product.availabilityNote },
    { label: "Best For", value: product.bestFor },
  ];

  return (
    <section className="overflow-x-clip bg-canvas text-ink">
      <div className="mx-auto flex w-full min-w-0 max-w-360 flex-col px-20 pt-10 pb-4 max-lg:px-5 max-lg:pt-8">
        <div>
          <Link href="/product" className="font-riposte inline-flex items-center gap-2.5 text-[16px] leading-6 font-light text-[#253326]">
            <ArrowLeft className="size-3.5" strokeWidth={2} />
            Back
          </Link>

          <Badge className="mt-8">{product.badge}</Badge>
          <Heading as="h1" className="mt-5 uppercase">
            {product.name}
          </Heading>
        </div>

        <article className="mt-10 w-full min-w-0 rounded-[20px] bg-white p-5 shadow-[0px_1px_8px_0px_rgba(0,0,0,0.05)] max-lg:p-4">
          <div className="grid min-w-0 items-start gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="relative h-72 min-w-0 overflow-hidden rounded-[19px] border-[1.82px] border-[rgba(244,180,0,0.05)] bg-[rgba(244,180,0,0.1)] backdrop-blur-[8px] sm:h-96 lg:h-[508px]">
              <div aria-hidden className="absolute bottom-[18%] left-1/2 h-16 w-2/3 -translate-x-1/2 rounded-full bg-[rgba(33,34,33,0.18)] blur-xl" />
              {product.image ? (
              <Image
                src={product.image.src}
                alt={product.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 609px, 100vw"
                className="object-contain p-6"
              />
              ) : null}
            </div>

            <div className="min-w-0 lg:pt-5 lg:pr-6">
              <p className={copy}>{product.summary}</p>
              <dl className="mt-8 flex flex-col gap-5">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="font-riposte text-[16px] leading-[27px] font-light text-[#253326]/50">{fact.label}</dt>
                    <dd className="font-riposte mt-0.5 text-[20px] leading-[30px] font-light text-[#253326]">
                      {fact.value}
                      {fact.note ? <span className="text-[16px] leading-6 text-brand-primary"> {fact.note}</span> : null}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div
            className={cn(
              "mt-14 w-full min-w-0 items-start gap-8 lg:mt-16 lg:gap-16",
              product.benefitsImage && "grid grid-cols-1 lg:grid-cols-2",
            )}
          >
            <div className="min-w-0">
              <h2 className="text-[24px] leading-[35px] font-medium text-ink">Health Benefits of {product.name}</h2>
              <p className={`${copy} mt-4`}>{product.benefits}</p>
              <h2 className="mt-12 text-[24px] leading-[35px] font-medium text-ink">Availability</h2>
              <p className={`${copy} mt-4`}>{product.season}</p>
            </div>
            {product.benefitsImage ? (
              <Image
                src={product.benefitsImage.src}
                alt={product.benefitsImage.alt}
                width={product.benefitsImage.width}
                height={product.benefitsImage.height}
                sizes="(min-width: 1024px) 520px, 100vw"
                className="mx-auto h-auto w-full max-w-full object-contain lg:max-w-[520px]"
              />
            ) : null}
          </div>
        </article>
      </div>
    </section>
  );
}
