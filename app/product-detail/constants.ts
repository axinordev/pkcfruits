import catalog from "@/shared/constants/products.json";
import details from "./details.json";

const fruits = catalog.fruits;

export const productDetailContent = {
  back: details.back,
  badge: details.badge,
  related: details.related,
};

export type ProductDetail = (typeof details.products)[keyof typeof details.products];

export function productSlugs() {
  return Object.keys(details.products);
}

export function getProductDetail(slug: string) {
  if (!(slug in details.products)) return null;
  return details.products[slug as keyof typeof details.products];
}

export function getRelatedProducts(ids: readonly string[]) {
  return ids.flatMap((id) => {
    const fruit = fruits[id as keyof typeof fruits];
    return fruit ? [{ ...fruit, slug: id }] : [];
  });
}
