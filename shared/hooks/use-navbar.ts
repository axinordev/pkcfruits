"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useNavbar(variant: "overlay" | "solid" = "solid") {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [overHero, setOverHero] = useState(variant === "overlay");
  const open = menuPath === pathname;
  const overlay = overHero;
  const concealed = hidden && !open;

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      const hero = document.querySelector("[data-site-hero]");
      setOverHero(hero ? hero.getBoundingClientRect().bottom > 72 : false);

      if (y <= 8) {
        setHidden(false);
      } else if (delta > 8) {
        setMenuPath(null);
        setHidden(true);
      } else if (delta < -8) {
        setHidden(false);
      }

      lastY = y;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  function toggleMenu() {
    setMenuPath(open ? null : pathname);
  }

  return { pathname, open, overlay, concealed, toggleMenu };
}
