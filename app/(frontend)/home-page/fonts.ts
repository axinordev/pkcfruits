import { Playfair_Display } from "next/font/google";

// Serif accent for the hero eyebrow, the italic end of the hero title and the
// second hero text's heading.
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});
