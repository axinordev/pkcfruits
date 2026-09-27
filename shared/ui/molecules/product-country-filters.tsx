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
        "flex h-12 w-89 shrink-0 items-stretch rounded-[34px] border border-brand-primary max-lg:w-full max-lg:max-w-89",
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
              "h-full flex-1 rounded-[34px] text-[18px] leading-7",
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
  const midpoint = Math.ceil(countries.length / 2);
  const rows =
    countries.length > 1
      ? [countries.slice(0, midpoint), countries.slice(midpoint)]
      : [countries];

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {rows.map((row) => (
        <div
          key={row[0]?.id}
          className="flex flex-wrap justify-center gap-x-4.5 gap-y-3"
        >
          {row.map((item) => {
            const selected = item.id === countryId;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect(item.id)}
                className={cn(
                  riposte,
                  "rounded-[21px] border px-2.5 py-2.5 text-[16px] leading-7 whitespace-nowrap text-ink uppercase",
                  selected
                    ? "rounded-[30px] border-[rgba(226,26,96,0.2)] bg-blush"
                    : "border-[rgba(33,34,33,0.5)] opacity-40 hover:opacity-70",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
