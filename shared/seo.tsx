import type { Metadata } from "next";

export type SeoContent = {
  title: string;
  description: string;
};

export function getSeoMetadata({ title, description }: SeoContent): Metadata {
  return {
    title,
    description,
  };
}
