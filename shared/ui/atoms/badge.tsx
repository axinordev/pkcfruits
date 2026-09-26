import { cn } from "cn";
import type { ReactNode } from "react";

type BadgeProps = {
  className?: string;
  children: ReactNode;
};

export default function Badge({ className, children }: BadgeProps) {
  return (
    <p
      className={cn(
        "font-riposte inline-flex h-7.5 items-center rounded-[33px] bg-blush px-2.5 text-[16px] leading-5 font-light text-brand-primary/80",
        className,
      )}
    >
      {children}
    </p>
  );
}
