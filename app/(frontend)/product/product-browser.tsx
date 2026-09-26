"use client";

import { useProductCatalog } from "@/shared/hooks/use-product-catalog";
import type { ProductCatalog } from "@/shared/product-catalog";
import Badge from "@/shared/ui/atoms/badge";
import Heading from "@/shared/ui/atoms/heading";
import ProductCard from "@/shared/ui/molecules/product-card";
import ProductCountryFilters, { ProductCategoryToggle } from "@/shared/ui/molecules/product-country-filters";

export default function ProductBrowser({ catalog }: { catalog: ProductCatalog }) {
  const { category, country, products, selectCategory, setCountryId } = useProductCatalog(catalog);
  if (!category || !country) return null;

  return (
    <main className="min-h-full bg-canvas text-ink">
      <div className="mx-auto flex w-full max-w-360 flex-col px-20 py-12 max-lg:px-5 max-lg:py-8">
        <div className="flex items-end justify-between gap-8 max-lg:flex-col max-lg:items-start">
          <div>
            <Badge>{catalog.badge}</Badge>
            <Heading as="h1" className="mt-4">
              {catalog.title}
            </Heading>
          </div>
          <ProductCategoryToggle categories={catalog.categories} categoryId={category.id} onSelect={selectCategory} />
        </div>

        <ProductCountryFilters countries={category.countries} countryId={country.id} onSelect={setCountryId} className="mt-10" />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map(({ slug, ...product }) => (
            <ProductCard key={`${country.id}-${slug}`} {...product} href={`/product/${slug}`} variant="grid" />
          ))}
        </div>
      </div>
    </main>
  );
}
