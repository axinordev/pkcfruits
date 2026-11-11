import type { CollectionConfig } from "payload";

import { editorsOnly } from "@/lib/cms/access";

export const Enquiries: CollectionConfig = {
  slug: "enquiries",
  labels: { singular: "Enquiry", plural: "Enquiries" },
  admin: {
    group: "Inbox",
    useAsTitle: "fullName",
    defaultColumns: ["fullName", "email", "mobile", "createdAt"],
    description: "Messages sent from the contact form.",
    hideAPIURL: true,
  },
  access: {
    read: editorsOnly,
    create: editorsOnly,
    update: editorsOnly,
    delete: editorsOnly,
  },
  fields: [
    { name: "fullName", type: "text", required: true, label: "Name" },
    { name: "mobile", type: "text", required: true, label: "Mobile" },
    { name: "email", type: "email", required: true, label: "Email" },
    { name: "message", type: "textarea", required: true, label: "Message" },
  ],
};
