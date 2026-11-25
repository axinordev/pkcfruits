"use client";

import AccentTitle from "@/app/home-page/components/accent-title";
import { useProductCatalog } from "@/shared/hooks/use-product-catalog";
import ArrowLink from "@/shared/ui/atoms/arrow-link";
import { siteGutter } from "@/shared/ui/gutter";
import Badge from "@/shared/ui/atoms/badge";
import Heading from "@/shared/ui/atoms/heading";
import ProductCard from "@/shared/ui/molecules/product-card";
import ProductCountryFilters, {
  ProductCategoryToggle,
} from "@/shared/ui/molecules/product-country-filters";

import type { ProductCatalog } from "@/shared/product-catalog";

export default function ProductSection({
  catalog,
}: {
  catalog: ProductCatalog;
}) {
  const { category, country, products, selectCategory, setCountryId } =
    useProductCatalog(catalog);

  return (
    <section
      id="products"
      className="bg-white bg-[url(/bg.webp)] bg-cover bg-top bg-no-repeat text-ink"
    >
      {/* Full width with the navbar's side padding, so the content lines up
          with the logo and the Contact button on every screen. */}
      <div
        className={`flex w-full flex-col max-lg:pt-12 max-lg:pb-12 lg:pt-20 lg:pb-26 ${siteGutter}`}
      >
        <div className="flex items-end justify-between gap-8 max-lg:flex-col max-lg:items-start">
          <div>
            <Badge>{catalog.badge}</Badge>
            <Heading className="mt-4">
              <AccentTitle text={catalog.title} />
            </Heading>
          </div>
          {category && (
            <ProductCategoryToggle
              categories={catalog.categories}
              categoryId={category.id}
              onSelect={selectCategory}
            />
          )}
        </div>

        {category && country && (
          <>
            <ProductCountryFilters
              countries={category.countries}
              countryId={country.id}
              onSelect={setCountryId}
              className="mt-10 lg:mt-21"
            />

            {/* The same grid as the products page; a fourth column on very
                wide screens keeps the cards near the design's size. */}
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-15.5 lg:gap-6.25 xl:grid-cols-3 3xl:grid-cols-4">
              {products.map(({ slug, ...product }) => (
                <ProductCard
                  key={slug}
                  {...product}
                  href={`/product/${slug}`}
                />
              ))}
            </div>

            <div className="mt-19 flex justify-end max-lg:mt-10">
              <ArrowLink href="/product">{catalog.button}</ArrowLink>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
