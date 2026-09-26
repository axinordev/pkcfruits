import { AwardSection, HeroSection, ProductSection, RecentNewsSection } from "./home-page/sections"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductSection />
      <AwardSection />
      <RecentNewsSection />
    </main>
  )
}