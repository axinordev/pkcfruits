"use client";

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
  if (!category || !country) return null;

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
    <section id="products" className="bg-canvas text-ink">
      <div className="mx-auto flex w-full max-w-360 flex-col px-20 pt-10 pb-12 max-lg:px-5 max-lg:pt-8 max-lg:pb-10">
        <div className="flex justify-center">
          <Badge>{catalog.badge}</Badge>
        </div>
        <Heading className="mt-5 text-center">{catalog.title}</Heading>

        <ProductCategoryToggle
          categories={catalog.categories}
          categoryId={category.id}
          onSelect={selectCategory}
          className="mx-auto mt-10"
        />
        <ProductCountryFilters
          countries={category.countries}
          countryId={country.id}
          onSelect={setCountryId}
          className="mt-13.25"
        />

        <div
          ref={scrollerRef}
          className="mt-12 flex gap-5 overflow-x-auto scroll-smooth pb-1 scrollbar-none"
        >
          {products.map(({ slug, ...product }) => (
            <ProductCard key={slug} {...product} href={`/product/${slug}`} />
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
      </div>
    </section>
  );
}
