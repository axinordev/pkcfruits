"use client";

import catalog from "@/shared/constants/products.json";
import { useState } from "react";

const fruits = catalog.fruits;

export type ProductFruit = (typeof fruits)[keyof typeof fruits];
export type ProductCategory = (typeof catalog.categories)[number];
export type ProductCountry = ProductCategory["countries"][number];

export function productsFor(ids: string[]) {
  return ids.flatMap((id) => {
    const fruit = fruits[id as keyof typeof fruits] as ProductFruit | undefined;
    return fruit ? [fruit] : [];
  });
}

export function useProductCatalog() {
  const [categoryId, setCategoryId] = useState(catalog.categories[0].id);
  const category = catalog.categories.find((item) => item.id === categoryId) ?? catalog.categories[0];
  const [countryId, setCountryId] = useState(category.countries[0].id);
  const country = category.countries.find((item) => item.id === countryId) ?? category.countries[0];

  function selectCategory(id: string) {
    const next = catalog.categories.find((item) => item.id === id);
    if (!next) return;
    setCategoryId(id);
    setCountryId(next.countries[0].id);
  }

  return {
    catalog,
    category,
    country,
    products: productsFor(country.products),
    selectCategory,
    setCountryId,
  };
}
