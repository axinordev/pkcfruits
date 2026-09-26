import { getProductDetail, productSlugs } from "@/app/product-detail/constants";
import { ProductDetailSection, RelatedProductsSection } from "@/app/product-detail/sections";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return productSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductDetail(slug);
  if (!product) return { title: "Product | PKC Fruits" };

  return {
    title: `${product.name} | PKC Fruits`,
    description: product.summary,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductDetail(slug);
  if (!product) notFound();

  return (
    <main className="min-w-0">
      <ProductDetailSection product={product} />
      <RelatedProductsSection ids={product.related} />
    </main>
  );
}
