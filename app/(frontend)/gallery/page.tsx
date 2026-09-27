import GalleryView from "@/app/gallery/gallery-view";
import { getGalleryPage } from "@/lib/content";
import { getSeoMetadata } from "@/shared/seo";
import Badge from "@/shared/ui/atoms/badge";
import Heading from "@/shared/ui/atoms/heading";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const page = await getGalleryPage();
  return getSeoMetadata(page.seo);
}

export default async function GalleryPage() {
  const page = await getGalleryPage();

  return (
    <main className="bg-canvas text-ink">
      <div className="mx-auto flex w-full min-w-0 max-w-360 flex-col items-center px-20 pt-20 pb-20 max-lg:px-5 max-lg:pt-12 max-lg:pb-12">
        <Badge>{page.badge}</Badge>
        <Heading as="h1" className="mt-7.5 text-center">
          {page.title}
        </Heading>
        <GalleryView photos={page.photos} videos={page.videos} />
      </div>
    </main>
  );
}
