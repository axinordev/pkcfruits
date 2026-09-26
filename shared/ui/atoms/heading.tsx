import { cn } from "cn";
import type { ReactNode } from "react";

type HeadingProps = {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: ReactNode;
};

const sectionTitle =
  "text-[40px] leading-12.5 font-bold tracking-normal max-lg:text-[28px]! max-lg:leading-9!";

export default function Heading({ as: Tag = "h2", className, children }: HeadingProps) {
  return <Tag className={cn(sectionTitle, className)}>{children}</Tag>;
}
