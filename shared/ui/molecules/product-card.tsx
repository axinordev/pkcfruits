import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  name: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  href?: string;
  /** The image's `sizes`; the default suits a card in a grid. */
  sizes?: string;
};

/**
 * A product with its name, an arrow and its photo. The card takes the width
 * its parent gives it and keeps the design's 410 × 458 shape; everything
 * inside is placed as a share of that size, so it looks the same at any width.
 */
export default function ProductCard({
  name,
  image,
  alt,
  width,
  height,
  href,
  sizes = "(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 380px",
}: ProductCardProps) {
  const className =
    "@container relative box-border block aspect-[410/458] w-full rounded-[22.1913px] border-[1.10956px] border-[rgba(250,246,240,0.2)] bg-white shadow-[0px_1.10956px_6.65739px_rgba(0,0,0,0.05)]";

  const card = (
    <>
      {/* 19.97px on the design's 410px card, scaled with the card and kept
          between 16px and 20px. */}
      <h3 className="absolute top-[7.269%] left-[5.412%] font-riposte text-[clamp(1rem,4.871cqw,1.25rem)] leading-[1.111] font-light text-ink">
        {name}
      </h3>
      <span className="absolute top-[6.541%] right-[5.28%] flex aspect-square w-[7.037%] items-center justify-center rounded-[5.54782px] border-[1.10956px] border-brand-primary text-brand-primary">
        <ArrowRight className="size-[42.3%]" strokeWidth={1.33} />
      </span>
      <div className="absolute top-[20.306%] left-[4.878%] h-[75.328%] w-[90.244%] overflow-hidden rounded-[22.1913px] border-[1.10956px] border-[rgba(244,180,0,0.05)] bg-[rgba(244,180,0,0.1)] backdrop-blur-[4.99304px]">
        <div
          aria-hidden
          className="absolute top-[52.07%] left-[12.235%] h-[36.342%] w-[67.324%] rounded-full bg-[rgba(33,34,33,0.18)] blur-[13.4812px]"
        />
        <Image
          src={image}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className="absolute top-[19.264%] left-1/2 h-[65.18%] w-[91.165%] -translate-x-1/2 object-contain"
        />
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {card}
      </Link>
    );
  }

  return <article className={className}>{card}</article>;
}
