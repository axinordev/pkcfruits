import type { GlobalConfig } from "payload";

import { gallerySectionContent } from "@/app/home-page/constants";
import { contentAccess, section } from "@/lib/cms/access";

const statFields = [
  { name: "value", type: "number" as const, required: true, label: "Number" },
  {
    name: "suffix",
    type: "text" as const,
    required: true,
    label: "Suffix",
    admin: { description: "For example K+ or +" },
  },
  { name: "label", type: "text" as const, required: true, label: "Label" },
];

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home Page",
  admin: {
    group: "Pages",
    hideAPIURL: true,
    description:
      "Headings for each part of the home page, plus the products and news to show.",
  },
  access: contentAccess,
  fields: [
    section("SEO", [
      {
        name: "seo",
        type: "group",
        label: false,
        fields: [
          { name: "title", type: "text", required: true, label: "Meta title" },
          {
            name: "description",
            type: "textarea",
            required: true,
            label: "Meta description",
          },
        ],
      },
    ]),
    section("Hero", [
      {
        name: "hero",
        type: "group",
        label: false,
        fields: [
          {
            name: "eyeLabel",
            type: "text",
            required: true,
            label: "Eye label",
          },
          { name: "title", type: "text", required: true, label: "Title" },
          {
            name: "description",
            type: "textarea",
            required: true,
            label: "Description",
          },
          {
            name: "button",
            type: "text",
            required: true,
            label: "Button",
            defaultValue: "Explore",
          },
        ],
      },
    ]),
    section("About", [
      {
        name: "about",
        type: "group",
        label: false,
        fields: [
          { name: "title", type: "text", required: true, label: "Title" },
          {
            name: "description",
            type: "textarea",
            required: true,
            label: "Description",
          },
          {
            name: "button",
            type: "text",
            required: true,
            label: "Button",
            defaultValue: "Read more",
          },
        ],
      },
    ]),
    section("Products", [
      {
        name: "productsSection",
        type: "group",
        label: false,
        fields: [
          { name: "badge", type: "text", required: true, label: "Eye label" },
          { name: "title", type: "text", required: true, label: "Title" },
          {
            name: "button",
            type: "text",
            required: true,
            label: "Button",
            defaultValue: "Explore All",
          },
          {
            name: "products",
            type: "relationship",
            relationTo: "products",
            hasMany: true,
            label: "Products to show",
          },
        ],
      },
    ]),
    section("World", [
      {
        name: "world",
        type: "group",
        label: false,
        fields: [
          { name: "title", type: "text", required: true, label: "Title" },
          {
            name: "description",
            type: "textarea",
            required: true,
            label: "Description",
          },
          {
            name: "stats",
            type: "array",
            label: "Numbers",
            fields: statFields,
          },
        ],
      },
    ]),
    section("Gallery", [
      {
        name: "gallerySection",
        type: "group",
        label: false,
        admin: {
          description:
            "The carousel shows Gallery photos that have “Show in the home page carousel” ticked, in Gallery order.",
        },
        fields: [
          {
            name: "badge",
            type: "text",
            required: true,
            label: "Eye label",
            defaultValue: gallerySectionContent.badge,
          },
          {
            name: "title",
            type: "text",
            required: true,
            label: "Title",
            defaultValue: gallerySectionContent.title,
          },
          {
            name: "highlight",
            type: "text",
            label: "Highlighted line",
            defaultValue: gallerySectionContent.highlight,
            admin: { description: "Shown under the title in pink italics." },
          },
          {
            name: "description",
            type: "textarea",
            required: true,
            label: "Description",
            defaultValue: gallerySectionContent.description,
          },
        ],
      },
    ]),
    section("News", [
      {
        name: "newsSection",
        type: "group",
        label: false,
        fields: [
          { name: "badge", type: "text", required: true, label: "Eye label" },
          { name: "title", type: "text", required: true, label: "Title" },
          {
            name: "button",
            type: "text",
            required: true,
            label: "Button",
            defaultValue: "View All",
          },
          {
            name: "news",
            type: "relationship",
            relationTo: "news",
            hasMany: true,
            label: "Stories to show",
          },
        ],
      },
    ]),
  ],
};
