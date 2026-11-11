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

/** Auto-built link field. Users can see it, but they cannot edit it. */
export function autoSlugField(options: {
  from: string;
  fallback: string;
  label?: string;
  description?: string;
  hidden?: boolean;
}): Field {
  return {
    name: "slug",
    type: "text",
    unique: true,
    index: true,
    label: options.label ?? "Link",
    admin: {
      readOnly: true,
      hidden: options.hidden ?? false,
      description:
        options.description ?? "Made automatically. You cannot edit this.",
    },
    hooks: {
      beforeValidate: [
        ({ value, data, siblingData }) => {
          // Keep an existing slug so old page links do not break.
          if (typeof value === "string" && value.trim()) {
            return slugify(value);
          }

          const source =
            siblingData?.[options.from] ??
            data?.[options.from] ??
            options.fallback;
          return slugify(String(source || options.fallback));
        },
      ],
    },
  };
}
