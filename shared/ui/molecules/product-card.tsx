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
    "block box-border rounded-[20px] border border-[rgba(250,246,240,0.2)] bg-white shadow-[0px_1px_6px_rgba(0,0,0,0.05)]",
    isGrid ? "w-full" : "h-103 w-92.5 shrink-0 max-lg:h-85 max-lg:w-70",
  );

  const card = (
    <>
      {isGrid ? (
        <div className="flex items-center justify-between px-5 pt-5">
          <h3 className="font-riposte text-[18px] leading-5 font-light text-ink">
            {name}
          </h3>
          <span className="flex size-7 items-center justify-center rounded-[5px] bg-brand-primary text-white">
            <ArrowRight className="size-3" strokeWidth={2.5} />
          </span>
        </div>
      ) : (
        <h3 className="font-riposte pt-7.5 text-center text-[18px] leading-5 font-light text-ink">
          {name}
        </h3>
      )}
      <div
        className={cn(
          "relative overflow-hidden rounded-[20px] border border-[rgba(244,180,0,0.05)] bg-[rgba(244,180,0,0.1)] backdrop-blur-[4.5px]",
          isGrid
            ? "mx-4 mt-4 mb-4 h-72 max-lg:h-60"
            : "mx-auto mt-8.5 h-77 w-82.5 max-lg:mt-6 max-lg:h-60 max-lg:w-62",
        )}
      >
        <div
          aria-hidden
          className={cn(
            "absolute h-28.25 rounded-full bg-[rgba(33,34,33,0.18)] blur-[12.15px]",
            isGrid
              ? "top-32 left-1/2 w-[224.5px] -translate-x-1/2"
              : "top-40.25 left-9.75 w-[224.5px] max-lg:top-30 max-lg:left-1/2 max-lg:w-42.5 max-lg:-translate-x-1/2",
          )}
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
