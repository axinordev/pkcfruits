export const aboutPageContent = {
  metadata: {
    title: "About Us | PKC Fruits",
    description:
      "PKC Fruits is one of the biggest distributors of fresh fruits in South India, with three decades of service, distribution across the region, and a founding team based in Kozhikode.",
  },
  intro: {
    badge: "About Us",
    title: "PKC Fruits, one of the biggest distributors of fresh fruits in South India.",
    paragraphs: [
      "PKC fruits have sturdy distribution channels across every city in South India. We import from other Asian, African and European countries and more than 500 persons are employed directly and indirectly through us.",
      "PKC fruits have completed 3 decades of service in the business sector, we are proud to say that we have achieved what we always wanted to be. We realised through our experience that even though it is really difficult to always stay transparent in any business sector, It actually would have a huge impact on how your peers react to you.",
    ],
    image: {
      src: "/about-hero.png",
      alt: "PKC Fruits at Asia Fruit Logistica",
      width: 1536,
      height: 718,
    },
  },
  stats: [
    { id: "fruits", value: 100, suffix: "K+", label: "Imported Fruits" },
    { id: "customers", value: 600, suffix: "K+", label: "Customers Served" },
    { id: "years", value: 35, suffix: "+", label: "Years Of Experience" },
  ],
  story: {
    image: {
      src: "/about-page-oranges.png",
      alt: "Baskets of oranges sitting on the grass",
    },
    paragraphs: [
      "We as a team are looking forward to the upcoming years to be more efficient in our services and keeping the momentum we have today. We’ve already started the production of several kinds of farming in a 10 acre land in Karnataka including Dragon Fruit, Rambutan, Mangosteen and we plan on expanding the same. We believe our approach will allow us to provide our customers with the best products they can find.",
      "We are proud to say we have a very healthy relationship with everyone we do business with. Which became a brand of its own and we are grateful that PKC Fruits is now associated with trust & honesty. We have had the privilege of receiving many awards throughout these years. Our managing director Mr NAVAS was Chosen as the youth icon in business by Vyapar Vyavasayi Youth.",
    ],
  },
  founders: {
    badge: "Founders",
    title: "Our Founding Team",
    members: [
      {
        name: "Mr. Navas PK",
        role: "Director",
        image: "/navas-portrait.png",
        imageAlt: "Portrait of Mr. Navas PK, Director",
      },
      {
        name: "Mr. Majeed KC",
        role: "Director",
        image: "/majeed.png",
        imageAlt: "Portrait of Mr. Majeed KC, Director",
      },
    ],
  },
} as const;
