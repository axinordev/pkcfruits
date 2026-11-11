import type { CollectionConfig } from "payload";

import { contentAccess, section, slugify } from "@/lib/cms/access";

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
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      label: "Link",
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (typeof value === "string" && value.trim())
              return slugify(value);
            return slugify(String(siblingData?.title || "news"));
          },
        ],
      },
    },
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
