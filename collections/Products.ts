import type { CollectionConfig } from "payload";

import { contentAccess, section, slugify } from "@/lib/cms/access";

export const Products: CollectionConfig = {
  slug: "products",
  labels: { singular: "Product", plural: "Products" },
  admin: {
    group: "Content",
    useAsTitle: "name",
    defaultColumns: ["name", "origin", "updatedAt"],
    description: "A fruit. Choose these on the home page.",
  },
  access: contentAccess,
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      label: "Link",
      admin: { description: "Used in the product address, for example kiwi." },
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (typeof value === "string" && value.trim())
              return slugify(value);
            return slugify(String(siblingData?.name || "product"));
          },
        ],
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Photo",
    },
    { name: "origin", type: "text", label: "Origin" },
    { name: "summary", type: "textarea", label: "Short description" },
    section("Product page", [
      {
        name: "availability",
        type: "text",
        label: "Availability",
        defaultValue: "Seasonal",
      },
      { name: "availabilityNote", type: "text", label: "Availability note" },
      { name: "bestFor", type: "text", label: "Best for" },
      { name: "benefits", type: "textarea", label: "Health benefits" },
      {
        name: "benefitsImage",
        type: "upload",
        relationTo: "media",
        label: "Benefits photo",
      },
      { name: "season", type: "textarea", label: "Season" },
      {
        name: "detailImage",
        type: "upload",
        relationTo: "media",
        label: "Detail photo",
      },
      {
        name: "related",
        type: "relationship",
        relationTo: "products",
        hasMany: true,
        label: "Related products",
      },
    ]),
    section("Countries", [
      {
        name: "placements",
        type: "array",
        label: "Sold in",
        labels: { singular: "Country", plural: "Countries" },
        fields: [
          {
            name: "category",
            type: "select",
            required: true,
            label: "Type",
            options: [
              { label: "Imported", value: "imported" },
              { label: "Indian", value: "indian" },
            ],
          },
          { name: "country", type: "text", required: true, label: "Country" },
          {
            name: "row",
            type: "select",
            label: "Row",
            defaultValue: "0",
            options: [
              { label: "First row", value: "0" },
              { label: "Second row", value: "1" },
            ],
          },
          { name: "order", type: "number", admin: { hidden: true } },
        ],
      },
    ]),
  ],
};
