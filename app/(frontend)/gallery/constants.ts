export const galleryPageContent = {
  metadata: {
    title: "Photo Gallery | PKC Fruits",
    description: "Photos from PKC Fruits orchards, markets, and stores.",
  },
  badge: "Gallery",
  title: "Photo Gallery",
} as const;

type GalleryPhoto = {
  src: string;
  alt: string;
  aspect: string;
  sizes: string;
};

type GalleryRow = {
  id: string;
  aspect: string;
  photos: readonly GalleryPhoto[];
};

const wide = "(min-width: 1024px) 756px, 100vw";
const narrow = "(min-width: 1024px) 504px, 100vw";
const half = "(min-width: 1024px) 630px, 100vw";

export const galleryRows: readonly GalleryRow[] = [
  {
    id: "harvest",
    aspect: "453 / 163",
    photos: [
      {
        src: "/gallery/red-apples.jpg",
        alt: "Close-up of red apples covered in water droplets",
        aspect: "270 / 163",
        sizes: wide,
      },
      {
        src: "/gallery/orange-crates.jpg",
        alt: "Wooden crates of harvested oranges beside a dirt path",
        aspect: "178 / 163",
        sizes: narrow,
      },
    ],
  },
  {
    id: "market",
    aspect: "453 / 170",
    photos: [
      {
        src: "/gallery/produce-display.png",
        alt: "PKC Fruits produce display with grapes, apples, and oranges",
        aspect: "178 / 170",
        sizes: narrow,
      },
      {
        src: "/gallery/store-visit.jpg",
        alt: "Visitors standing beside a wall of neatly arranged fruit",
        aspect: "270 / 170",
        sizes: wide,
      },
    ],
  },
  {
    id: "orchard",
    aspect: "453 / 188",
    photos: [
      {
        src: "/gallery/apple-basket.jpg",
        alt: "Basket of red apples lined with cloth on a wooden table",
        aspect: "224 / 188",
        sizes: half,
      },
      {
        src: "/gallery/orchard-workers.jpg",
        alt: "Workers picking apples from trees in an orchard",
        aspect: "224 / 188",
        sizes: half,
      },
    ],
  },
  {
    id: "grove",
    aspect: "453 / 140",
    photos: [
      {
        src: "/gallery/branch-apples.jpg",
        alt: "Red apples hanging from a leafy branch",
        aspect: "178 / 140",
        sizes: narrow,
      },
      {
        src: "/gallery/orange-tree.jpg",
        alt: "Ripe oranges on a sunlit tree",
        aspect: "270 / 140",
        sizes: wide,
      },
    ],
  },
];
