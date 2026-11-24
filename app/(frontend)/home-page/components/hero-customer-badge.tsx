import { cn } from "cn";
import { Star } from "lucide-react";
import Image from "next/image";

export default function HeroCustomerBadge({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 py-1.5 pr-5 pl-1.5 text-white backdrop-blur-md lg:gap-3 lg:py-2 lg:pr-6 lg:pl-2",
        className,
      )}
    >
      <Image
        src="/hero-customer-avatars.webp"
        alt=""
        width={244}
        height={134}
        className="h-9 w-auto lg:h-[54px]"
      />
      <div className="flex flex-col gap-1 lg:gap-1.5">
        <div className="flex gap-0.5 lg:gap-1" aria-hidden>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className="size-3 fill-[#FFC83D] text-[#FFC83D] lg:size-4"
            />
          ))}
        </div>
        <p className="font-riposte text-[11px] leading-[14px] font-light text-white/85 lg:text-[13px] lg:leading-[17px]">
          500K+ Happy
          <br />
          Customers
        </p>
      </div>
    </div>
  );
}
