import type { CollectionConfig } from "payload";

import { contentAccess, slugify } from "@/lib/cms/access";

export const Gallery: CollectionConfig = {
  slug: "gallery",
  labels: { singular: "Gallery photo", plural: "Gallery" },
  admin: {
    group: "Content",
    useAsTitle: "alt",
    defaultColumns: ["alt", "order"],
    description: "Photos on the gallery page, in order.",
  },
  access: contentAccess,
  defaultSort: "order",
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Photo",
    },
    { name: "alt", type: "text", required: true, label: "Description" },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
      label: "Order",
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      admin: { hidden: true },
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (typeof value === "string" && value.trim())
              return slugify(value);
            return slugify(String(siblingData?.alt || "photo"));
          },
        ],
      },
    },
  ],
};
