import type { GlobalConfig } from "payload";

import { contentAccess, section } from "@/lib/cms/access";

function pageSettings(slug: string, label: string): GlobalConfig {
  return {
    slug,
    label,
    admin: { group: "Pages" },
    access: contentAccess,
    fields: [
      section("SEO", [
        { name: "seoTitle", type: "text", required: true, label: "Meta title" },
        { name: "seoDescription", type: "textarea", required: true, label: "Meta description" },
      ]),
      section("Heading", [
        { name: "badge", type: "text", required: true, label: "Eye label" },
        { name: "title", type: "textarea", required: true, label: "Title" },
      ]),
    ],
  };
}

export const ProductsPage = pageSettings("products-page", "Products Page");
export const AwardsPage = pageSettings("awards-page", "Awards Page");
export const GalleryPage = pageSettings("gallery-page", "Gallery Page");
export const NewsPage = pageSettings("news-page", "News Page");

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  label: "Contact Page",
  admin: { group: "Pages" },
  access: contentAccess,
  fields: [
    section("SEO", [
      { name: "seoTitle", type: "text", required: true, label: "Meta title" },
      { name: "seoDescription", type: "textarea", required: true, label: "Meta description" },
    ]),
    section("Heading", [
      { name: "badge", type: "text", required: true, label: "Eye label" },
      { name: "title", type: "text", required: true, label: "Title" },
      { name: "image", type: "upload", relationTo: "media", label: "Photo" },
    ]),
    section("Form", [
      { name: "enquireTitle", type: "text", required: true, label: "Form title", defaultValue: "Enquire Now" },
      { name: "nameLabel", type: "text", required: true, label: "Name label", defaultValue: "Full Name" },
      { name: "mobileLabel", type: "text", required: true, label: "Mobile label", defaultValue: "Mobile Number" },
      { name: "emailLabel", type: "text", required: true, label: "Email label", defaultValue: "E mail" },
      { name: "messageLabel", type: "text", required: true, label: "Message label", defaultValue: "Message" },
      { name: "sendLabel", type: "text", required: true, label: "Button", defaultValue: "Send" },
      { name: "success", type: "textarea", required: true, label: "Success message" },
    ]),
    section("Details", [
      { name: "address", type: "textarea", required: true, label: "Address" },
      { name: "email", type: "email", required: true, label: "Email" },
      { name: "phone", type: "text", required: true, label: "Phone" },
      { name: "mapEmbed", type: "textarea", label: "Map embed link" },
    ]),
  ],
};
