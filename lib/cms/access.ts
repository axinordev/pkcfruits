import type { Access, Field } from "payload";

export const editorsOnly: Access = ({ req }) => Boolean(req.user);

export const contentAccess = {
  read: () => true,
  create: editorsOnly,
  update: editorsOnly,
  delete: editorsOnly,
};

export function section(label: string, fields: Field[]): Field {
  return {
    type: "collapsible",
    label,
    admin: { initCollapsed: true },
    fields,
  };
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
