"use client";

import { useBalancedRows } from "@/shared/hooks/use-balanced-rows";
import type { ProductCountry } from "@/shared/product-catalog";
import { cn } from "cn";
import { Fragment } from "react";

const riposte = "font-riposte font-light";

type Country = ProductCountry;

type ProductCategoryToggleProps = {
  categories: readonly { id: string; label: string }[];
  categoryId: string;
  onSelect: (id: string) => void;
  className?: string;
  label?: string;
};

export function ProductCategoryToggle({
  categories,
  categoryId,
  onSelect,
  className,
  label = "Product origin",
}: ProductCategoryToggleProps) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        "flex h-12 w-66.5 shrink-0 items-stretch rounded-[34px] border border-brand-primary max-lg:w-full max-lg:max-w-89",
        className,
      )}
    >
      {categories.map((item) => {
        const selected = item.id === categoryId;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onSelect(item.id)}
            className={cn(
              riposte,
              "h-full flex-1 rounded-[34px] text-[15px] leading-7",
              selected ? "bg-brand-primary text-white" : "text-ink",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

type ProductCountryFiltersProps = {
  countries: readonly Country[];
  countryId: string;
  onSelect: (id: string) => void;
  className?: string;
};

export default function ProductCountryFilters({
  countries,
  countryId,
  onSelect,
  className,
}: ProductCountryFiltersProps) {
  const [listRef, breaks] = useBalancedRows<HTMLDivElement>(
    countries.map((item) => item.id).join(),
  );

  return (
    // Every row of pills runs the full width: the pills grow to share what is
    // left of their row. The rows are balanced, so the last one never has a
    // single pill stretched across it. Rows are spaced with margins rather
    // than a row gap, so the zero-height row breaks add no extra space; the
    // negative bottom margin takes back the last row's.
    <div
      ref={listRef}
      className={cn(
        "-mb-2.5 flex flex-wrap gap-x-2.5 lg:-mb-5.5 lg:gap-x-5",
        className,
      )}
    >
      {countries.map((item, index) => {
        const selected = item.id === countryId;
        return (
          <Fragment key={item.id}>
            {breaks.includes(index) && (
              <span data-row-break aria-hidden className="basis-full" />
            )}
            <button
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(item.id)}
              className={cn(
                riposte,
                "mb-2.5 flex h-[38px] grow items-center justify-center rounded-[30px] border px-2.5 text-[13.3px] leading-none whitespace-nowrap uppercase max-lg:min-w-[79px] lg:mb-5.5 lg:px-5.75",
                selected
                  ? "border-brand-primary bg-brand-primary text-white"
                  : "border-[#21222180] text-[#21222180]",
              )}
            >
              {item.label}
            </button>
          </Fragment>
        );
      })}
    </div>
  );
}
