import {
  FoundersSection,
  IntroSection,
  StorySection,
} from "@/app/about/sections";
import { getAboutPage } from "@/lib/content";
import { getSeoMetadata } from "@/shared/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const page = await getAboutPage();
  return getSeoMetadata(page.seo);
}

export default async function AboutPage() {
  const page = await getAboutPage();

  return (
    <main>
      <IntroSection intro={page.intro} stats={page.stats} />
      <StorySection story={page.story} />
      <FoundersSection founders={page.founders} />
    </main>
  );
}
