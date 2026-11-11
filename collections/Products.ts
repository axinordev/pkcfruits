import type { CollectionConfig } from "payload";

import { autoSlugField, contentAccess, section } from "@/lib/cms/access";

export const Products: CollectionConfig = {
  slug: "products",
  labels: { singular: "Product", plural: "Products" },
  admin: {
    group: "Content",
    useAsTitle: "name",
    defaultColumns: ["name", "origin", "updatedAt"],
    description: "A fruit. Choose these on the home page.",
    hideAPIURL: true,
  },
  access: contentAccess,
  fields: [
    { name: "name", type: "text", required: true },
    autoSlugField({
      from: "name",
      fallback: "product",
      description: "Made from the product name. Used in the page address.",
    }),
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
          { name: "order", type: "number", admin: { hidden: true } },
        ],
      },
    ]),
  ],
};
