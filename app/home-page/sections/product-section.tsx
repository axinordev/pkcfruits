"use client";

import { useProductCatalog } from "@/shared/hooks/use-product-catalog";
import ProductCard from "@/shared/ui/molecules/product-card";
import ProductCountryFilters, { ProductCategoryToggle } from "@/shared/ui/molecules/product-country-filters";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const riposte = "font-['Riposte','Helvetica_Neue',Helvetica,Arial,sans-serif] font-light";

export default function ProductSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { catalog, category, country, products, selectCategory, setCountryId } = useProductCatalog();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.scrollLeft = 0;

    const update = () => {
      setCanScrollLeft(scroller.scrollLeft > 4);
      setCanScrollRight(scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 4);
    };

    update();
    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      scroller.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [category.id, country.id]);

  function scrollByCard(direction: 1 | -1) {
    const scroller = scrollerRef.current;
    const card = scroller?.querySelector("article");
    if (!scroller || !card) return;
    scroller.scrollBy({ left: direction * (card.getBoundingClientRect().width + 20), behavior: "smooth" });
  }

  return (
    <section id="products" className="bg-[#F4F4F4] text-[#212221]">
      <div className="mx-auto flex w-full max-w-360 flex-col px-20 pt-10 pb-12 max-lg:px-5 max-lg:pt-8 max-lg:pb-10">
        <div className="flex justify-center">
          <p className={`${riposte} inline-flex h-7.5 items-center rounded-[33px] bg-[#FED7E4] px-2.5 text-[16px] leading-5 text-brand-primary/80`}>
            {catalog.badge}
          </p>
        </div>
        <h2 className="mt-5 text-center text-[40px] leading-12.5 font-bold tracking-normal max-lg:text-[28px]! max-lg:leading-9!">
          {catalog.title}
        </h2>

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
          {products.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>

        <div className="mt-19 flex items-center justify-between gap-6 max-lg:mt-10">
          <div className="flex items-center gap-3.75">
            <button
              type="button"
              aria-label="Previous products"
              disabled={!canScrollLeft}
              onClick={() => scrollByCard(-1)}
              className="flex size-12 items-center justify-center rounded-full border border-brand-primary text-brand-primary disabled:opacity-30"
            >
              <ArrowLeft className="size-5.5" strokeWidth={2} />
            </button>
            <button
              type="button"
              aria-label="Next products"
              disabled={!canScrollRight}
              onClick={() => scrollByCard(1)}
              className="flex size-12 items-center justify-center rounded-full border border-brand-primary text-brand-primary disabled:opacity-30"
            >
              <ArrowRight className="size-5.5" strokeWidth={2} />
            </button>
          </div>
          <Link href={catalog.explore.href} className={`${riposte} flex items-center gap-2.5 text-[20px] leading-9.75 text-[#212221]`}>
            {catalog.explore.label}
            <span className="flex size-7 items-center justify-center rounded-[5px] bg-brand-primary text-white">
              <ArrowRight className="size-3" strokeWidth={2.5} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
