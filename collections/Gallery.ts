import type { CollectionConfig } from "payload";

import { autoSlugField, contentAccess } from "@/lib/cms/access";
import { youtubeVideoId } from "@/lib/youtube";

function itemKind(data: unknown) {
  if (!data || typeof data !== "object" || !("kind" in data)) return "photo";
  return data.kind === "video" ? "video" : "photo";
}

export const Gallery: CollectionConfig = {
  slug: "gallery",
  labels: { singular: "Gallery item", plural: "Gallery" },
  admin: {
    group: "Content",
    useAsTitle: "alt",
    defaultColumns: ["alt", "kind", "order"],
    hideAPIURL: true,
    description:
      "Photos and YouTube videos on the gallery page. The site shows them on separate tabs.",
  },
  access: contentAccess,
  defaultSort: "order",
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.kind) data.kind = "photo";
        return data;
      },
    ],
  },
  fields: [
    {
      name: "kind",
      type: "select",
      required: true,
      defaultValue: "photo",
      label: "Type",
      options: [
        { label: "Photo", value: "photo" },
        { label: "Video", value: "video" },
      ],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Photo",
      admin: {
        condition: (data) => itemKind(data) !== "video",
      },
      validate: (value: unknown, { siblingData }: { siblingData: unknown }) => {
        if (itemKind(siblingData) === "video") return true;
        return value ? true : "Add a photo.";
      },
    },
    {
      name: "youtubeUrl",
      type: "text",
      label: "YouTube link",
      admin: {
        condition: (data) => itemKind(data) === "video",
        description:
          "Paste a YouTube link, such as https://www.youtube.com/watch?v=...",
      },
      validate: (value: unknown, { siblingData }: { siblingData: unknown }) => {
        if (itemKind(siblingData) !== "video") return true;
        if (typeof value !== "string" || !youtubeVideoId(value)) {
          return "Add a YouTube link, such as https://www.youtube.com/watch?v=...";
        }
        return true;
      },
    },
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Description",
      admin: {
        description: "Photo description, or the title shown with the video.",
      },
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
      label: "Order",
    },
    autoSlugField({
      from: "alt",
      fallback: "photo",
      hidden: true,
    }),
  ],
};
