import type { CollectionConfig } from "payload";

import { autoSlugField, contentAccess, section } from "@/lib/cms/access";

export const News: CollectionConfig = {
  slug: "news",
  labels: { singular: "News story", plural: "News" },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "date"],
    description: "News and events. Choose these on the home page.",
    hideAPIURL: true,
  },
  access: contentAccess,
  fields: [
    { name: "title", type: "text", required: true },
    autoSlugField({
      from: "title",
      fallback: "news",
      description: "Made from the title. Used in the page address.",
    }),
    { name: "date", type: "date", required: true, label: "Date" },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Photo",
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      label: "Article photo",
    },
    { name: "body", type: "textarea", required: true, label: "Story" },
    section("Extra block", [
      { name: "featureHeading", type: "text", label: "Heading" },
      { name: "featureBody", type: "textarea", label: "Text" },
      {
        name: "featureImage",
        type: "upload",
        relationTo: "media",
        label: "Photo",
      },
    ]),
    {
      name: "related",
      type: "relationship",
      relationTo: "news",
      hasMany: true,
      label: "Related stories",
    },
  ],
};
