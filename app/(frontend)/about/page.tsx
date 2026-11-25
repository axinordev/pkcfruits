import {
  FoundersSection,
  IntroSection,
  StorySection,
} from "@/app/about/sections";
import { getAboutPage } from "@/lib/content";
import { getSeoMetadata } from "@/shared/seo";

export const revalidate = 300;

export async function generateMetadata() {
  const page = await getAboutPage();
  return getSeoMetadata(page.seo);
}

export default async function AboutPage() {
  const page = await getAboutPage();

  return (
    <main>
      <IntroSection intro={page.intro} />
      <StorySection story={page.story} stats={page.stats} />
      <FoundersSection founders={page.founders} />
    </main>
  );
}
