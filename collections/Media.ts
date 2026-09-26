import type { CollectionConfig } from "payload";

import { contentAccess } from "@/lib/cms/access";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Photo", plural: "Photos" },
  admin: {
    group: "Content",
    useAsTitle: "alt",
    description: "Photos stored on Cloudinary.",
  },
  access: contentAccess,
  upload: {
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Description",
    },
  ],
};
