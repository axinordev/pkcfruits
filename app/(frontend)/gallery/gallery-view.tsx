"use client";

import { ProductCategoryToggle } from "@/shared/ui/molecules/product-country-filters";
import Image from "next/image";
import { useState } from "react";

import type { CmsImage } from "@/lib/content";

export type GalleryVideo = {
  slug: string;
  title: string;
  src: string;
};

const tabs = [
  { id: "photos", label: "Photos" },
  { id: "videos", label: "Videos" },
] as const;

const wide = "(min-width: 1024px) 756px, 100vw";
const narrow = "(min-width: 1024px) 504px, 100vw";
const half = "(min-width: 1024px) 630px, 100vw";

const rowLayouts = [
  {
    id: "harvest",
    aspect: "453 / 163",
    className: "gallery-harvest",
    photos: [
      { aspect: "270 / 163", sizes: wide },
      { aspect: "178 / 163", sizes: narrow },
    ],
  },
  {
    id: "market",
    aspect: "453 / 170",
    className: "gallery-market",
    photos: [
      { aspect: "178 / 170", sizes: narrow },
      { aspect: "270 / 170", sizes: wide },
    ],
  },
  {
    id: "orchard",
    aspect: "453 / 188",
    className: "gallery-orchard",
    photos: [
      { aspect: "224 / 188", sizes: half },
      { aspect: "224 / 188", sizes: half },
    ],
  },
  {
    id: "grove",
    aspect: "453 / 140",
    className: "gallery-grove",
    photos: [
      { aspect: "178 / 140", sizes: narrow },
      { aspect: "270 / 140", sizes: wide },
    ],
  },
];

const galleryLayout = `
  .gallery-photo { aspect-ratio: var(--photo-aspect); }
  @media (min-width: 1024px) {
    .gallery-row { aspect-ratio: var(--row-aspect); }
    .gallery-photo { aspect-ratio: auto; height: 100%; }
    .gallery-harvest { grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); }
    .gallery-market,
    .gallery-grove { grid-template-columns: minmax(0, 2fr) minmax(0, 3fr); }
    .gallery-orchard { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
  }
`;

export default function GalleryView({
  photos,
  videos,
}: {
  photos: CmsImage[];
  videos: GalleryVideo[];
}) {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("photos");
  const rows = [];
  for (let index = 0; index < photos.length; index += 2) {
    rows.push({
      layout: rowLayouts[(index / 2) % rowLayouts.length],
      photos: photos.slice(index, index + 2),
    });
  }

  return (
    <>
      <style>{galleryLayout}</style>
      <ProductCategoryToggle
        categories={tabs}
        categoryId={tab}
        onSelect={(id) => setTab(id === "videos" ? "videos" : "photos")}
        label="Gallery"
        className="mt-10"
      />

      {tab === "photos" ? (
        <div className="mt-12 flex w-full min-w-0 flex-col gap-5">
          {rows.length === 0 ? (
            <p className="text-center font-riposte text-lg text-ink/70">
              Photos will appear here once they are added.
            </p>
          ) : (
            rows.map((row, rowIndex) => (
              <div
                key={row.photos.map((photo) => photo.src).join("|")}
                className={`gallery-row ${row.layout.className} grid grid-cols-1 gap-5`}
                style={{ ["--row-aspect" as string]: row.layout.aspect }}
              >
                {row.photos.map((photo, index) => (
                  <div
                    key={photo.src}
                    className="gallery-photo relative overflow-hidden rounded-2xl"
                    style={{
                      ["--photo-aspect" as string]:
                        row.layout.photos[index]?.aspect ?? "1 / 1",
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      priority={rowIndex === 0 && index === 0}
                      sizes={row.layout.photos[index]?.sizes ?? wide}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="mt-12 grid w-full min-w-0 grid-cols-1 gap-5 lg:grid-cols-2">
          {videos.length === 0 ? (
            <p className="text-center font-riposte text-lg text-ink/70 lg:col-span-2">
              Videos will appear here once they are added.
            </p>
          ) : (
            videos.map((video) => (
              <div
                key={video.slug}
                className="relative aspect-video overflow-hidden rounded-2xl bg-ink"
              >
                <iframe
                  src={video.src}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 size-full border-0"
                />
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}
