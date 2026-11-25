"use client";

import AccentTitle from "@/app/home-page/components/accent-title";
import { useProductCatalog } from "@/shared/hooks/use-product-catalog";
import type { ProductCatalog } from "@/shared/product-catalog";
import Badge from "@/shared/ui/atoms/badge";
import Heading from "@/shared/ui/atoms/heading";
import { siteGutter } from "@/shared/ui/gutter";
import ProductCard from "@/shared/ui/molecules/product-card";
import ProductCountryFilters, {
  ProductCategoryToggle,
} from "@/shared/ui/molecules/product-country-filters";

export default function ProductBrowser({
  catalog,
}: {
  catalog: ProductCatalog;
}) {
  const { category, country, products, selectCategory, setCountryId } =
    useProductCatalog(catalog);
  if (!category || !country) return null;

  return (
    <main className="min-h-full bg-white bg-[url(/bg.webp)] bg-cover bg-top bg-no-repeat text-ink">
      {/* Full width with the navbar's side padding, like the home page's
          products section. */}
      <div className={`flex w-full flex-col py-12 max-lg:py-8 ${siteGutter}`}>
        <div className="flex items-end justify-between gap-8 max-lg:flex-col max-lg:items-start">
          <div>
            <Badge>{catalog.badge}</Badge>
            <Heading as="h1" className="mt-4">
              <AccentTitle text={catalog.title} />
            </Heading>
          </div>
          <ProductCategoryToggle
            categories={catalog.categories}
            categoryId={category.id}
            onSelect={selectCategory}
          />
        </div>

        <ProductCountryFilters
          countries={category.countries}
          countryId={country.id}
          onSelect={setCountryId}
          className="mt-10 lg:mt-21"
        />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-15.5 lg:gap-6.25 xl:grid-cols-3 3xl:grid-cols-4">
          {products.map(({ slug, ...product }) => (
            <ProductCard
              key={`${country.id}-${slug}`}
              {...product}
              href={`/product/${slug}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
