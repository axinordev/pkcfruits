import type { GlobalConfig } from "payload";

import { contentAccess, section } from "@/lib/cms/access";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "About Page",
  admin: { group: "Pages", hideAPIURL: true },
  access: contentAccess,
  fields: [
    section("SEO", [
      { name: "seoTitle", type: "text", required: true, label: "Meta title" },
      {
        name: "seoDescription",
        type: "textarea",
        required: true,
        label: "Meta description",
      },
    ]),
    section("Intro", [
      { name: "introBadge", type: "text", required: true, label: "Eye label" },
      { name: "introTitle", type: "textarea", required: true, label: "Title" },
      { name: "introBody", type: "textarea", required: true, label: "Text" },
      {
        name: "introImage",
        type: "upload",
        relationTo: "media",
        label: "Photo",
      },
      {
        name: "stats",
        type: "array",
        label: "Numbers",
        fields: [
          { name: "value", type: "number", required: true, label: "Number" },
          { name: "suffix", type: "text", required: true, label: "Suffix" },
          { name: "label", type: "text", required: true, label: "Label" },
        ],
      },
    ]),
    section("Story", [
      {
        name: "storyImage",
        type: "upload",
        relationTo: "media",
        label: "Photo",
      },
      { name: "storyBody", type: "textarea", required: true, label: "Text" },
    ]),
    section("Founders", [
      {
        name: "foundersBadge",
        type: "text",
        required: true,
        label: "Eye label",
      },
      { name: "foundersTitle", type: "text", required: true, label: "Title" },
      {
        name: "founders",
        type: "array",
        label: "People",
        fields: [
          { name: "name", type: "text", required: true },
          { name: "role", type: "text", required: true, label: "Role" },
          {
            name: "photo",
            type: "upload",
            relationTo: "media",
            required: true,
            label: "Photo",
          },
        ],
      },
    ]),
  ],
};
