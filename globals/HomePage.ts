import type { GlobalConfig } from "payload";

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
      "Headings for each part of the home page, plus the products, awards, and news to show.",
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
    section("Awards", [
      {
        name: "awardsSection",
        type: "group",
        label: false,
        fields: [
          { name: "title", type: "text", required: true, label: "Title" },
          {
            name: "awards",
            type: "relationship",
            relationTo: "awards",
            hasMany: true,
            label: "Awards to show",
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
