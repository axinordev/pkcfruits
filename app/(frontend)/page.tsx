import { AwardSection, HeroSection, MapSection, ProductSection, RecentNewsSection } from "./home-page/sections"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductSection />
      <MapSection />
      <AwardSection />
      <RecentNewsSection />
    </main>
  )
}