import { galleryPageContent, galleryRows } from "@/app/gallery/constants";
import Badge from "@/shared/ui/atoms/badge";
import Heading from "@/shared/ui/atoms/heading";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = galleryPageContent.metadata;

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

export default function GalleryPage() {
  return (
    <main className="bg-canvas text-ink">
      <style>{galleryLayout}</style>
      <div className="mx-auto flex w-full min-w-0 max-w-360 flex-col items-center px-20 pt-20 pb-20 max-lg:px-5 max-lg:pt-12 max-lg:pb-12">
        <Badge>{galleryPageContent.badge}</Badge>
        <Heading as="h1" className="mt-7.5 text-center">
          {galleryPageContent.title}
        </Heading>

        <div className="mt-12 flex w-full min-w-0 flex-col gap-5">
          {galleryRows.map((row) => (
            <div
              key={row.id}
              className={`gallery-row gallery-${row.id} grid grid-cols-1 gap-5`}
              style={{ ["--row-aspect" as string]: row.aspect }}
            >
              {row.photos.map((photo, index) => (
                <div
                  key={photo.src}
                  className="gallery-photo relative overflow-hidden rounded-2xl"
                  style={{ ["--photo-aspect" as string]: photo.aspect }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    priority={row.id === "harvest" && index === 0}
                    sizes={photo.sizes}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
