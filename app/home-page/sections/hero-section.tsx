import Button from "@/shared/ui/atoms/button";
import Navbar from "@/shared/ui/molecules/navbar";
import { ArrowRight } from "lucide-react";
import { Mozilla_Headline } from "next/font/google";

const mozillaHeadline = Mozilla_Headline({
  subsets: ["latin"],
  adjustFontFallback: false,
});

export default function HeroSection() {
  return (
    <section className="relative flex h-screen flex-col items-center justify-center bg-[url('/hero-bg.png')] bg-cover bg-center bg-no-repeat text-white">
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 z-10">
        <Navbar />
      </div>
      <div className="relative flex flex-col items-center gap-4 max-w-5xl mx-auto">
        <p className={mozillaHeadline.className}>PKC Fruits</p>
        <h1 className="text-center text-[75.57px] leading-[107.96px] font-bold tracking-normal">
          Ripe. Real. Ready for you.
        </h1>
        <p className="text-center font-['Riposte','Helvetica_Neue',Helvetica,Arial,sans-serif] text-[23.75px] leading-[42.11px] font-light tracking-normal">
          PKC is one of South India&apos;s largest fresh fruit distributors importing, storing and delivering exotic fruit at the peak of freshness, every single day.
        </p>
        <Button>
           Explore <ArrowRight />
        </Button>
      </div>
    </section>
  );
}
