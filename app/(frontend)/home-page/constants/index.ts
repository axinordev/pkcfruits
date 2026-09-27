import type { Award, AwardId } from "@/shared/constants/awards";

export const heroSectionContent = {
  eyebrow: "PKC Fruits",
  title: "Ripe. Real. Ready for you.",
  description:
    "PKC is one of South India's largest fresh fruit distributors importing, storing and delivering exotic fruit at the peak of freshness, every single day.",
  action: "Explore",
  customerBadge: {
    src: "/hero-customer-badge.png",
    alt: "500K+ Happy Customers",
    width: 567,
    height: 406,
  },
};

export const heroFruitCards = [
  {
    label: "New Arrivals",
    name: "[Australian Citrus]",
    image: "/orange.png",
    imageAlt: "Australian citrus oranges",
    imageWidth: 1536,
    imageHeight: 1024,
    cardClass: "bg-[#FDF4CE]",
    panelClass: "border-[rgba(244,180,0,0.05)] bg-[rgba(244,180,0,0.15)]",
  },
  {
    label: "New Arrivals",
    name: "[Red Apple]",
    image: "/apple.png",
    imageAlt: "Red apples",
    imageWidth: 648,
    imageHeight: 482,
    cardClass: "bg-[#FFF3EF]",
    panelClass: "border-[rgba(230,104,58,0.1)] bg-[rgba(230,104,58,0.15)]",
  },
  {
    label: "New Arrivals",
    name: "[Kiwi]",
    image: "/kiwi.png",
    imageAlt: "Kiwi",
    imageWidth: 1536,
    imageHeight: 1024,
    cardClass: "bg-[#FFFCE3]",
    panelClass: "border-[rgba(0,136,82,0.1)] bg-[rgba(0,136,16,0.1)]",
  },
];

export const aboutSectionContent = {
  title: "About PKC FRUITS",
  description:
    "PKC Fruits, one of the biggest distributors of fresh fruits in South India. We have sturdy distribution channels across every city in South India. We import from other Asian, African and European countries and more than 500 persons are employed directly and indirectly through us.",
  action: "Read more",
  href: "/about",
};

export const newsSectionContent = {
  badge: "News and Events",
  title: "Recent News and Events",
  viewAll: { label: "View All", href: "/news" },
};

export const awardSectionContent = {
  title: "Our Awards",
  viewAll: { href: "/awards", label: "View all awards" },
};

type AwardPhoto = Pick<Award, "image" | "imageAlt" | "width" | "height">;

export const awardSectionPhotos = {
  secretary: {
    image: "/awards/youth-award.jpg",
    imageAlt: "Mr. Navas with officials at an award ceremony",
    width: 960,
    height: 720,
  },
  youth: {
    image: "/awards/fruit-logistica.jpg",
    imageAlt: "Mr. Navas shaking hands at a fruit trade show",
    width: 2048,
    height: 957,
  },
  logistica: {
    image: "/awards/navas-portrait.jpg",
    imageAlt: "Portrait of Mr. Navas",
    width: 778,
    height: 664,
  },
} as const satisfies Record<AwardId, AwardPhoto>;

export const mapSectionContent = {
  title: "From Around the World",
  description:
    "Sourcing exceptional fruits from trusted growers across the globe.",
  stats: [
    { id: "fruits", value: 10, suffix: "K+", label: "Imported Fruits" },
    { id: "customers", value: 50, suffix: "K+", label: "Customers Served" },
    { id: "years", value: 5, suffix: "+", label: "Years Of Experience" },
  ],
  markers: [
    { id: "usa", left: "21%", top: "35%" },
    { id: "mexico", left: "21.2%", top: "45.5%" },
    { id: "peru", left: "29.2%", top: "62.9%" },
    { id: "brazil", left: "35.5%", top: "66%" },
    { id: "spain", left: "49.1%", top: "35.7%" },
    { id: "europe", left: "52.9%", top: "29.3%" },
    { id: "east-africa", left: "61%", top: "57%" },
    { id: "south-africa", left: "56.8%", top: "73.6%" },
    { id: "china", left: "74.5%", top: "42%" },
    { id: "southeast-asia", left: "78.2%", top: "50.5%" },
    { id: "australia", left: "86%", top: "69%" },
  ],
};

export const awardCollageSlots: {
  id: AwardId;
  src: string;
  alt: string;
  card: string;
  image: string;
  caption: string;
  photo: string;
  fromLeft: number;
  fromTop: number;
  toLeft: number;
  toTop: number;
}[] = [
  {
    id: "secretary",
    src: awardSectionPhotos.secretary.image,
    alt: awardSectionPhotos.secretary.imageAlt,
    card: "h-[43.433%] w-[40.972%]",
    image: "flex-[282]",
    caption: "flex-[85] px-8 leading-7.25",
    photo: "object-[center_42%]",
    fromLeft: 29.514,
    fromTop: 28.284,
    toLeft: 5.556,
    toTop: 0,
  },
  {
    id: "youth",
    src: awardSectionPhotos.youth.image,
    alt: awardSectionPhotos.youth.imageAlt,
    card: "h-[62.673%] w-[30.833%]",
    image: "flex-[481]",
    caption: "flex-[53] leading-5.5",
    photo: "object-center",
    fromLeft: 34.584,
    fromTop: 18.664,
    toLeft: 63.611,
    toTop: 18.203,
  },
  {
    id: "logistica",
    src: awardSectionPhotos.logistica.image,
    alt: awardSectionPhotos.logistica.imageAlt,
    card: "h-[45.507%] w-[27.014%]",
    image: "flex-[332]",
    caption: "flex-[53] leading-5.5",
    photo: "object-center",
    fromLeft: 36.493,
    fromTop: 27.247,
    toLeft: 8.403,
    toTop: 54.493,
  },
];
