import { ContactSection } from "@/app/contact/sections";
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
      <ContactSection page={page} />
    </main>
  );
}
