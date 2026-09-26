import { contactPageContent } from "@/app/contact/constants";
import { ContactSection } from "@/app/contact/sections";
import type { Metadata } from "next";

export const metadata: Metadata = contactPageContent.metadata;

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
    </main>
  );
}
