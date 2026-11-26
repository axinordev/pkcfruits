import type { ProductCountry } from "@/shared/product-catalog";
import { cn } from "cn";

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
  return (
    // The pills keep their own width and fixed padding. As many as fit sit
    // on a row; the rest wrap onto the next one.
    <div
      className={cn(
        "flex flex-wrap gap-x-2.5 gap-y-2.5 lg:gap-x-5 lg:gap-y-5.5",
        className,
      )}
    >
      {countries.map((item) => {
        const selected = item.id === countryId;
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(item.id)}
            className={cn(
              riposte,
              "flex h-[38px] items-center justify-center rounded-[30px] border px-2.5 text-[13.3px] leading-none whitespace-nowrap uppercase max-lg:min-w-[79px] lg:px-5.75",
              selected
                ? "border-brand-primary bg-brand-primary text-white"
                : "border-[#21222180] text-[#21222180]",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
