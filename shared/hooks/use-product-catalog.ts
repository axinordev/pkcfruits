"use client";

import type { ProductCatalog } from "@/shared/product-catalog";
import { useState } from "react";

export function productsFor(catalog: ProductCatalog, ids: string[]) {
  return ids.flatMap((id) => {
    const fruit = catalog.fruits[id];
    return fruit ? [fruit] : [];
  });
}

export function useProductCatalog(catalog: ProductCatalog) {
  const firstCategory = catalog.categories[0];
  const [categoryId, setCategoryId] = useState(firstCategory?.id ?? "");
  const category =
    catalog.categories.find((item) => item.id === categoryId) ?? firstCategory;
  const [countryId, setCountryId] = useState(category?.countries[0]?.id ?? "");
  const country =
    category?.countries.find((item) => item.id === countryId) ??
    category?.countries[0];

  function selectCategory(id: string) {
    const next = catalog.categories.find((item) => item.id === id);
    if (!next) return;
    setCategoryId(id);
    setCountryId(next.countries[0]?.id ?? "");
  }

  return {
    catalog,
    category,
    country,
    products: country ? productsFor(catalog, country.products) : [],
    selectCategory,
    setCountryId,
  };
}
