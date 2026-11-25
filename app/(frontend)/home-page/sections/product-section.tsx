"use client";

import AccentTitle from "@/app/home-page/components/accent-title";
import { useProductScroller } from "@/app/home-page/hooks/use-product-scroller";
import { useProductCatalog } from "@/shared/hooks/use-product-catalog";
import ArrowLink from "@/shared/ui/atoms/arrow-link";
import Badge from "@/shared/ui/atoms/badge";
import Heading from "@/shared/ui/atoms/heading";
import ProductCard from "@/shared/ui/molecules/product-card";
import ProductCountryFilters, {
  ProductCategoryToggle,
} from "@/shared/ui/molecules/product-country-filters";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { ProductCatalog } from "@/shared/product-catalog";

export default function ProductSection({
  catalog,
}: {
  catalog: ProductCatalog;
}) {
  const { category, country, products, selectCategory, setCountryId } =
    useProductCatalog(catalog);
  const { scrollerRef, canScrollLeft, canScrollRight, scrollByCard } =
    useProductScroller(
      category && country ? `${category.id}-${country.id}` : "",
    );

  const controls = [
    {
      direction: -1 as const,
      label: "Previous products",
      disabled: !canScrollLeft,
      icon: ArrowLeft,
    },
    {
      direction: 1 as const,
      label: "Next products",
      disabled: !canScrollRight,
      icon: ArrowRight,
    },
  ];

  return (
    <section
      id="products"
      className="@container bg-white bg-[url(/bg.webp)] bg-cover bg-top bg-no-repeat text-ink"
    >
      <div className="mx-auto flex w-full max-w-360 flex-col px-20 max-lg:px-5 max-lg:pt-12 max-lg:pb-12 lg:pt-20 lg:pb-26">
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

            {/* The row spans the section's full width (cqw leaves out the
                scrollbar) so cards run to the screen edges; the padding lines
                the first and last card up with the content. */}
            <div
              ref={scrollerRef}
              className="mt-10 ml-[calc(50%-50cqw)] flex w-[100cqw] gap-5 overflow-x-auto scroll-smooth px-[max(5rem,calc(50cqw-40rem))] pb-1 scrollbar-none max-lg:px-5 lg:mt-15.5"
            >
              {products.map(({ slug, ...product }) => (
                <div key={slug} className="w-92.5 shrink-0 max-lg:w-70">
                  <ProductCard
                    {...product}
                    href={`/product/${slug}`}
                    // The photo fills about 82% of the card's width.
                    sizes="(max-width: 1023px) 230px, 304px"
                  />
                </div>
              ))}
            </div>

            <div className="mt-19 flex items-center justify-between gap-6 max-lg:mt-10">
              <div className="flex items-center gap-3.75">
                {controls.map((control) => (
                  <button
                    key={control.label}
                    type="button"
                    aria-label={control.label}
                    disabled={control.disabled}
                    onClick={() => scrollByCard(control.direction)}
                    className="flex size-12 items-center justify-center rounded-full border border-brand-primary text-brand-primary disabled:opacity-30"
                  >
                    <control.icon className="size-5.5" strokeWidth={2} />
                  </button>
                ))}
              </div>
              <ArrowLink href="/product">{catalog.button}</ArrowLink>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
