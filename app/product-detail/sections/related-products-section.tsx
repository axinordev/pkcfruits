import { getRelatedProducts, productDetailContent } from "@/app/product-detail/constants";
import ArrowLink from "@/shared/ui/atoms/arrow-link";
import Badge from "@/shared/ui/atoms/badge";
import ProductCard from "@/shared/ui/molecules/product-card";

export default function RelatedProductsSection({ ids }: { ids: readonly string[] }) {
  const { related } = productDetailContent;
  const products = getRelatedProducts(ids);

  return (
    <section className="overflow-x-clip bg-canvas text-ink">
      <div className="mx-auto w-full max-w-360 px-20 pt-10 pb-16 max-lg:px-5 max-lg:pb-12">
        <div className="flex items-center justify-between gap-6">
          <Badge>{related.badge}</Badge>
          <ArrowLink href={related.viewAll.href}>{related.viewAll.label}</ArrowLink>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {products.map(({ slug, ...product }) => (
            <ProductCard key={slug} {...product} href={`/product/${slug}`} variant="grid" />
          ))}
        </div>
      </div>
    </section>
  );
}
