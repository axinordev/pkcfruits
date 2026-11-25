import localFont from "next/font/local";

// The site's serif: the pink italic words in headings, the hero's italic
// "Ready for you." and the uppercase serif headings. Newsreader's Display
// cut, drawn for large sizes, in only the weights and styles in use. The
// files are subset to Latin; newsreader-OFL.txt is the font's licence.
export const newsreader = localFont({
  src: [
    {
      path: "./newsreader-display-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./newsreader-display-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./newsreader-display-semibold-italic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "./newsreader-display-bold-italic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

// The Text cut, drawn for small sizes: the hero's small uppercase label.
export const newsreaderText = localFont({
  src: "./newsreader-text-regular.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
