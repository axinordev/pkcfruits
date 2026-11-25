import { ContactSection } from "@/app/contact/sections";
import FixedBackdrop from "@/app/home-page/components/fixed-backdrop";
import { getContactPage } from "@/lib/content";
import { getSeoMetadata } from "@/shared/seo";

export const revalidate = 300;

export async function generateMetadata() {
  const page = await getContactPage();
  return getSeoMetadata(page.seo);
}

export default async function ContactPage() {
  const page = await getContactPage();
  return (
    <main>
      {/* Like the home page: the silk background stays still while the
          contact card scrolls over it. */}
      <FixedBackdrop>
        <ContactSection page={page} />
      </FixedBackdrop>
    </main>
  );
}
