"use client";

import { ReactLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import type { ReactNode } from "react";
import "lenis/dist/lenis.css";

const options: LenisOptions = {
  autoRaf: true,
  autoToggle: true,
  anchors: true,
  allowNestedScroll: true,
  stopInertiaOnNavigate: true,
  lerp: 0.08,
};

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
