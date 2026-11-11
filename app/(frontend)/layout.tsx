import Footer from "@/shared/ui/molecules/footer";
import { SiteHeader } from "@/shared/ui/molecules/navbar";
import SmoothScroll from "@/shared/ui/smooth-scroll";
import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased">
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
