import { cn } from "cn";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type ArrowLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export default function ArrowLink({
  href,
  className,
  children,
}: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "font-riposte flex items-center gap-2.5 text-[20px] leading-9.75 font-light text-ink",
        className,
      )}
    >
      {children}
      <span className="flex size-7 items-center justify-center rounded-[5px] bg-brand-primary text-white">
        <ArrowRight className="size-3" strokeWidth={2.5} />
      </span>
    </Link>
  );
}
