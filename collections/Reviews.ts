import type { CollectionConfig } from "payload";

import { contentAccess } from "@/lib/cms/access";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  labels: { singular: "Review", plural: "Reviews" },
  admin: {
    group: "Content",
    useAsTitle: "name",
    defaultColumns: ["name", "showOnHome", "order"],
    hideAPIURL: true,
    description:
      "Customer reviews on the home page. They drop onto the pile in this order as visitors scroll.",
  },
  access: contentAccess,
  defaultSort: "order",
  fields: [
    { name: "name", type: "text", required: true, label: "Name" },
    {
      name: "review",
      type: "textarea",
      required: true,
      label: "Review",
      admin: {
        description:
          "Leave out the quote marks; the site adds them. Long reviews are cut to four lines on the card.",
      },
    },
    {
      name: "showOnHome",
      type: "checkbox",
      defaultValue: true,
      label: "Show on the home page",
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
      label: "Order",
    },
  ],
};
