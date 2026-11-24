import type { ReactNode } from "react";

/**
 * Holds the silk background still behind the sections inside it while their
 * content scrolls over it. It lets go at the end of the last section, so it
 * scrolls away as the footer comes in.
 */
export default function FixedBackdrop({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="sticky top-0 -mb-[100vh] h-screen bg-white bg-[url(/bg.webp)] bg-cover bg-center bg-no-repeat"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
