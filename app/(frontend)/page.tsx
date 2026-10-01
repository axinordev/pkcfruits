import {
  AwardSection,
  HeroSection,
  MapSection,
  ProductSection,
  RecentNewsSection,
} from "./home-page/sections";
import { getHomePage } from "@/lib/content";
import { getSeoMetadata } from "@/shared/seo";

export const revalidate = 300;

export async function generateMetadata() {
  const home = await getHomePage();
  return getSeoMetadata(home.seo);
}

export default async function Home() {
  const home = await getHomePage();

  return (
    <main>
      <HeroSection
        eyeLabel={home.hero.eyeLabel}
        title={home.hero.title}
        description={home.hero.description}
        button={home.hero.button}
        fruits={home.hero.fruits.map((fruit) => ({
          name: fruit.name,
          image: fruit.image,
          imageAlt: fruit.alt,
          imageWidth: fruit.width,
          imageHeight: fruit.height,
        }))}
        about={home.about}
      />
      <ProductSection catalog={home.catalog} />
      <MapSection {...home.world} />
      <AwardSection title={home.awards.title} awards={home.awards.items} />
      <RecentNewsSection {...home.news} />
    </main>
  );
}
