import type { CatalogProduct } from "@/shared/product-catalog";
import ArrowLink from "@/shared/ui/atoms/arrow-link";
import Badge from "@/shared/ui/atoms/badge";
import ProductCard from "@/shared/ui/molecules/product-card";

export default function RelatedProductsSection({
  products,
}: {
  products: CatalogProduct[];
}) {
  if (products.length === 0) return null;

  return (
    <section className="bg-canvas text-ink">
      <div className="mx-auto w-full max-w-360 px-20 pt-10 pb-16 max-lg:px-5 max-lg:pb-12">
        <div className="flex items-center justify-between gap-6">
          <Badge>Relatable Products</Badge>
          <ArrowLink href="/product">View All</ArrowLink>
        </div>
        <div className="mt-8 -mr-20 flex gap-5 overflow-x-auto scroll-smooth pr-20 pb-1 scrollbar-none max-lg:-mr-5 max-lg:pr-5">
          {products.map(({ slug, ...product }) => (
            <div key={slug} className="w-92.5 shrink-0 max-lg:w-70">
              <ProductCard
                {...product}
                href={`/product/${slug}`}
                variant="grid"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
