import { cn } from "cn";
import type { ReactNode } from "react";

type HeadingProps = {
  as?: "h1" | "h2" | "h3";
  /**
   * How big the title is on desktop: "section" (50px) for the home page's
   * section titles, "page" (40px) for the titles on the inner pages. Both
   * are 28px on phones and tablets.
   */
  size?: "section" | "page";
  className?: string;
  children: ReactNode;
};

const desktopSize = {
  section: "text-[50px] leading-15",
  page: "text-[40px] leading-12.5",
};

export default function Heading({
  as: Tag = "h2",
  size = "section",
  className,
  children,
}: HeadingProps) {
  return (
    <Tag
      className={cn(
        desktopSize[size],
        "font-bold tracking-normal max-lg:text-[28px]! max-lg:leading-9!",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
