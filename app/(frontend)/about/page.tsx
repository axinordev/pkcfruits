import { aboutPageContent } from "@/app/about/constants";
import { FoundersSection, IntroSection, StorySection } from "@/app/about/sections";
import type { Metadata } from "next";

export const metadata: Metadata = aboutPageContent.metadata;

export default function AboutPage() {
  return (
    <main>
      <IntroSection />
      <StorySection />
      <FoundersSection />
    </main>
  );
}
