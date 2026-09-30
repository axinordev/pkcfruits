import { cn } from "cn";
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
  variant?: "carousel" | "grid";
};

export default function ProductCard({
  name,
  image,
  alt,
  width,
  height,
  href,
  variant = "carousel",
}: ProductCardProps) {
  const isGrid = variant === "grid";
  const className = cn(
    "block box-border bg-white",
    isGrid
      ? "relative aspect-[410/458] w-full rounded-[22.1913px] border-[1.10956px] border-[rgba(250,246,240,0.2)] shadow-[0px_1.10956px_6.65739px_rgba(0,0,0,0.05)]"
      : "h-103 w-92.5 shrink-0 rounded-[20px] border border-[rgba(250,246,240,0.2)] shadow-[0px_1px_6px_rgba(0,0,0,0.05)] max-lg:h-85 max-lg:w-70",
  );

  const card = isGrid ? (
    <>
      <h3 className="absolute top-[7.269%] left-[5.412%] font-riposte text-[19.9722px] leading-5.5 font-light text-ink">
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
          className="absolute top-[19.264%] left-1/2 h-[65.18%] w-[91.165%] -translate-x-1/2 object-contain"
        />
      </div>
    </>
  ) : (
    <>
      <h3 className="font-riposte pt-7.5 text-center text-[18px] leading-5 font-light text-ink">
        {name}
      </h3>
      <div className="relative mx-auto mt-8.5 h-77 w-82.5 overflow-hidden rounded-[20px] border border-[rgba(244,180,0,0.05)] bg-[rgba(244,180,0,0.1)] backdrop-blur-[4.5px] max-lg:mt-6 max-lg:h-60 max-lg:w-62">
        <div
          aria-hidden
          className="absolute top-40.25 left-9.75 h-28.25 w-[224.5px] rounded-full bg-[rgba(33,34,33,0.18)] blur-[12.15px] max-lg:top-30 max-lg:left-1/2 max-lg:w-42.5 max-lg:-translate-x-1/2"
        />
        <Image
          src={image}
          alt={alt}
          width={width}
          height={height}
          className="absolute top-7 left-1/2 h-55 w-72.5 -translate-x-1/2 object-contain max-lg:top-4 max-lg:h-45 max-lg:w-52.5"
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
