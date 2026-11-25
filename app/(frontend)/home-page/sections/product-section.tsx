"use client";

import AccentTitle from "@/app/home-page/components/accent-title";
import { useProductScroller } from "@/app/home-page/hooks/use-product-scroller";
import { useProductCatalog } from "@/shared/hooks/use-product-catalog";
import ArrowLink from "@/shared/ui/atoms/arrow-link";
import { siteGutter } from "@/shared/ui/gutter";
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
      className="flex flex-col bg-white bg-[url(/bg.webp)] bg-cover bg-top bg-no-repeat text-ink max-lg:py-12 lg:pt-20 lg:pb-26"
    >
      {/* The navbar's side padding, so the content lines up with the logo and
          the Contact button on every screen. */}
      <div className={`flex flex-col ${siteGutter}`}>
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
          <ProductCountryFilters
            countries={category.countries}
            countryId={country.id}
            onSelect={setCountryId}
            className="mt-10 lg:mt-21"
          />
        )}
      </div>

      {category && country && (
        <>
          {/* A sliding row that runs to both screen edges, so the next cards
              come in from the right; the same side padding lines the first
              and last card up with the content. */}
          <div
            ref={scrollerRef}
            className={`mt-10 flex gap-5 overflow-x-auto scroll-smooth pb-1 scrollbar-none lg:mt-15.5 ${siteGutter}`}
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

          <div
            className={`mt-19 flex items-center justify-between gap-6 max-lg:mt-10 ${siteGutter}`}
          >
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
    </section>
  );
}
