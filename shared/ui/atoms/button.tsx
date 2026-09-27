import { cn } from "cn";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const variants = {
  primary:
    "inline-flex h-[56.14px] w-[235.36px] items-center justify-center gap-[10.8px] rounded-[33.47px] bg-brand-primary p-[10.8px] text-white",
} as const;

type Variant = keyof typeof variants;

type SharedProps = {
  variant?: Variant;
  className?: string;
  children?: ReactNode;
};

type ButtonAsButton = SharedProps &
  Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  > & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  Omit<ComponentProps<typeof Link>, "className" | "children">;

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  variant = "primary",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(variants[variant], className);

  if (href !== undefined) {
    return (
      <Link
        href={href}
        className={classes}
        {...(props as Omit<
          ComponentProps<typeof Link>,
          "href" | "className" | "children"
        >)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
