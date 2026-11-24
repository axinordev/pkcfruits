import Footer from "@/shared/ui/molecules/footer";
import { SiteHeader } from "@/shared/ui/molecules/navbar";
import SmoothScroll from "@/shared/ui/smooth-scroll";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// The body face from the designs. Only the Light cut exists, so every
// font-riposte text renders at 300 whatever weight it asks for (below 600).
const riposte = localFont({
  src: "./fonts/riposte-light.woff2",
  weight: "300",
  style: "normal",
  display: "swap",
  variable: "--font-riposte-face",
});

export const metadata: Metadata = {
  title: "PKC Fruits: Ripe. Real. Ready for you.",
  description:
    "PKC is one of South India's largest fresh fruit distributors importing, storing and delivering exotic fruit at the peak of freshness, every single day.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${riposte.variable} h-full antialiased`}>
      <body id="top" className="min-h-full flex flex-col">
        <SmoothScroll>
          <SiteHeader />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
