import type { CollectionConfig } from "payload";

import { contentAccess } from "@/lib/cms/access";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  labels: { singular: "Review", plural: "Reviews" },
  admin: {
    group: "Content",
    useAsTitle: "name",
    defaultColumns: ["name", "showOnHome", "createdAt"],
    hideAPIURL: true,
    description:
      "Customer reviews. The home page and the top of the news page show the 4 newest ticked reviews, newest first.",
  },
  access: contentAccess,
  defaultSort: "-createdAt",
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
      label: "Show on the home and news pages",
    },
  ],
};
