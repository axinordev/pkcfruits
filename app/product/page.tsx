"use client";

import { useProductCatalog } from "@/shared/hooks/use-product-catalog";
import ProductCard from "@/shared/ui/molecules/product-card";
import ProductCountryFilters, { ProductCategoryToggle } from "@/shared/ui/molecules/product-country-filters";

const riposte = "font-['Riposte','Helvetica_Neue',Helvetica,Arial,sans-serif] font-light";

export default function ProductPage() {
  const { catalog, category, country, products, selectCategory, setCountryId } = useProductCatalog();

  return (
    <main className="min-h-full bg-[#F4F4F4] text-[#212221]">
      <div className="mx-auto flex w-full max-w-360 flex-col px-20 py-12 max-lg:px-5 max-lg:py-8">
        <div className="flex items-end justify-between gap-8 max-lg:flex-col max-lg:items-start">
          <div>
            <p className={`${riposte} inline-flex h-7.5 items-center rounded-[33px] bg-[#FED7E4] px-2.5 text-[16px] leading-5 text-brand-primary/80`}>
              {catalog.badge}
            </p>
            <h1 className="mt-4 text-[40px] leading-12.5 font-bold tracking-normal max-lg:text-[28px]! max-lg:leading-9!">
              {catalog.title}
            </h1>
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
          className="mt-10"
        />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={`${country.id}-${product.name}`} {...product} variant="grid" />
          ))}
        </div>
      </div>
    </main>
  );
}
