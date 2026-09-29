"use client";

import { navContent } from "@/shared/constants/site";
import { cn } from "cn";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavbarProps = {
  variant?: "overlay" | "solid";
};

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar({ variant = "solid" }: NavbarProps) {
  const pathname = usePathname();
  const overlay = variant === "overlay";
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;

  return (
    <nav
      className={cn(
        "relative flex items-center justify-between gap-4 px-5 py-3 lg:px-10 lg:py-4 xl:px-16",
        overlay
          ? "border-b border-white/20 bg-black/25 text-white backdrop-blur-md"
          : " top-0 z-40 border-b border-[#E6E6E6] bg-canvas text-[#3d3d3d]",
      )}
    >
      <Link href="/" className="shrink-0" aria-label="PKC Fruits home">
        <Image
          src="/logo.png"
          alt="PKC Fruits"
          width={188}
          height={58}
          priority
          className="h-10 w-auto lg:h-13"
        />
      </Link>

      <div className="flex shrink-0 items-center gap-8 xl:gap-10">
        <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
          {navContent.links.map((item) => {
            const active = !overlay && isCurrent(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 align-middle font-riposte text-center text-[18px] leading-6 font-light tracking-normal whitespace-nowrap",
                    overlay
                      ? "text-white"
                      : active
                        ? "text-brand-primary"
                        : "text-[#3d3d3d] hover:text-ink",
                  )}
                >
                  {active ? (
                    <span
                      aria-hidden
                      className="size-1.5 shrink-0 rounded-full bg-brand-primary"
                    />
                  ) : null}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={navContent.action.href}
            className="hidden h-11 items-center justify-center rounded-full bg-brand-primary px-6 text-[15px] font-medium whitespace-nowrap text-white lg:inline-flex"
          >
            {navContent.action.label}
          </Link>
          <button
            type="button"
            className="inline-flex size-10 shrink-0 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setMenuPath(open ? null : pathname)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <ul
          id="site-menu"
          className={cn(
            "absolute inset-x-0 top-full z-30 flex flex-col border-b px-5 py-3 lg:hidden",
            overlay
              ? "border-white/20 bg-black/80 text-white backdrop-blur-md"
              : "border-[#E6E6E6] bg-canvas",
          )}
        >
          {navContent.links.map((item) => {
            const active = isCurrent(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 py-2.5 text-[15px]",
                    active
                      ? "text-brand-primary"
                      : overlay
                        ? "text-white"
                        : "text-[#3d3d3d]",
                  )}
                >
                  {active ? (
                    <span
                      aria-hidden
                      className="size-1.5 shrink-0 rounded-full bg-brand-primary"
                    />
                  ) : null}
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="pt-2">
            <Link
              href={navContent.action.href}
              className="inline-flex h-10 items-center justify-center rounded-full bg-brand-primary px-5 text-[15px] font-medium text-white"
            >
              {navContent.action.label}
            </Link>
          </li>
        </ul>
      ) : null}
    </nav>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Navbar />;
}
