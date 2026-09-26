import { getGalleryPage } from "@/lib/content";
import { getSeoMetadata } from "@/shared/seo";
import Badge from "@/shared/ui/atoms/badge";
import Heading from "@/shared/ui/atoms/heading";
import Image from "next/image";

export const dynamic = "force-dynamic";

const wide = "(min-width: 1024px) 756px, 100vw";
const narrow = "(min-width: 1024px) 504px, 100vw";
const half = "(min-width: 1024px) 630px, 100vw";

const rowLayouts = [
  { id: "harvest", aspect: "453 / 163", className: "gallery-harvest", photos: [{ aspect: "270 / 163", sizes: wide }, { aspect: "178 / 163", sizes: narrow }] },
  { id: "market", aspect: "453 / 170", className: "gallery-market", photos: [{ aspect: "178 / 170", sizes: narrow }, { aspect: "270 / 170", sizes: wide }] },
  { id: "orchard", aspect: "453 / 188", className: "gallery-orchard", photos: [{ aspect: "224 / 188", sizes: half }, { aspect: "224 / 188", sizes: half }] },
  { id: "grove", aspect: "453 / 140", className: "gallery-grove", photos: [{ aspect: "178 / 140", sizes: narrow }, { aspect: "270 / 140", sizes: wide }] },
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

export async function generateMetadata() {
  const page = await getGalleryPage();
  return getSeoMetadata(page.seo);
}

export default async function GalleryPage() {
  const page = await getGalleryPage();
  const rows = [];
  for (let index = 0; index < page.photos.length; index += 2) {
    rows.push({ layout: rowLayouts[(index / 2) % rowLayouts.length], photos: page.photos.slice(index, index + 2) });
  }

  return (
    <main className="bg-canvas text-ink">
      <style>{galleryLayout}</style>
      <div className="mx-auto flex w-full min-w-0 max-w-360 flex-col items-center px-20 pt-20 pb-20 max-lg:px-5 max-lg:pt-12 max-lg:pb-12">
        <Badge>{page.badge}</Badge>
        <Heading as="h1" className="mt-7.5 text-center">
          {page.title}
        </Heading>

        <div className="mt-12 flex w-full min-w-0 flex-col gap-5">
          {rows.map((row, rowIndex) => (
            <div
              key={`${row.layout.id}-${rowIndex}`}
              className={`gallery-row ${row.layout.className} grid grid-cols-1 gap-5`}
              style={{ ["--row-aspect" as string]: row.layout.aspect }}
            >
              {row.photos.map((photo, index) => (
                <div
                  key={photo.src}
                  className="gallery-photo relative overflow-hidden rounded-2xl"
                  style={{ ["--photo-aspect" as string]: row.layout.photos[index]?.aspect ?? "1 / 1" }}
                >
                  <Image src={photo.src} alt={photo.alt} fill priority={rowIndex === 0 && index === 0} sizes={row.layout.photos[index]?.sizes ?? wide} className="object-cover" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
