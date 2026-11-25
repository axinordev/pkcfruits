import { DM_Sans, Newsreader } from "next/font/google";

// The About page's title face, and the serif for its pink italic words:
// bold in the intro, regular under Founders.
export const dmSans = DM_Sans({ subsets: ["latin"], weight: "600" });

export const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: "italic",
});
