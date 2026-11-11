import type { CollectionConfig } from "payload";

import { contentAccess, slugify } from "@/lib/cms/access";

export const Awards: CollectionConfig = {
  slug: "awards",
  labels: { singular: "Award", plural: "Awards" },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "order"],
    description: "Awards. Choose these on the home page.",
    hideAPIURL: true,
  },
  access: contentAccess,
  defaultSort: "order",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "summary", type: "textarea", label: "Short text" },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Photo",
    },
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
            return slugify(String(siblingData?.title || "award"));
          },
        ],
      },
    },
  ],
};
