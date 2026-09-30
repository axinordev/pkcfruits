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
    <nav className="relative z-40">
      <div
        className={cn(
          "flex items-center justify-between gap-4 px-5 py-3 lg:px-10 lg:py-4 xl:px-16",
          overlay
            ? "bg-white/10 text-white/10 backdrop-blur-sm"
            : "border-b border-[#E6E6E6] bg-canvas text-[#3d3d3d]",
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
              className={cn(
                "inline-flex size-10 shrink-0 items-center justify-center lg:hidden",
                overlay ? "text-white" : "text-[#253326]",
              )}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setMenuPath(open ? null : pathname)}
            >
              <span className="relative grid size-5 place-items-center">
                <Menu
                  className={cn(
                    "col-start-1 row-start-1 size-5 transition duration-200 motion-reduce:transition-none",
                    open ? "scale-75 opacity-0" : "scale-100 opacity-100",
                  )}
                />
                <X
                  className={cn(
                    "col-start-1 row-start-1 size-5 transition duration-200 motion-reduce:transition-none",
                    open ? "scale-100 opacity-100" : "scale-75 opacity-0",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        id="site-menu"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "absolute top-full right-5 z-50 mt-2 w-77.75 max-w-[calc(100%-2.5rem)] origin-top-right rounded-2xl bg-canvas pt-8 pb-10 transition duration-200 ease-out motion-reduce:transition-none lg:hidden",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <ul className="flex flex-col gap-6.25 pl-10">
          {navContent.links.map((item) => {
            const active = isCurrent(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-6 items-center gap-1.5 font-sans text-[18px] leading-6 font-medium",
                    active ? "text-brand-primary" : "text-[#253326]",
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

        <Link
          href={navContent.action.href}
          className="mt-8.75 ml-10 inline-flex h-12 w-46.25 items-center justify-center rounded-[31px] bg-brand-primary font-riposte text-[18px] leading-none font-light text-[#FAF6F0]"
        >
          {navContent.action.label}
        </Link>
      </div>
    </nav>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Navbar />;
}
