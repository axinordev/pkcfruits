import {
  ProductDetailSection,
  RelatedProductsSection,
} from "@/app/product-detail/sections";
import { getProduct } from "@/lib/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product | PKC Fruits" };
  return {
    title: `${product.name} | PKC Fruits`,
    description: product.summary,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <main className="min-w-0">
      <ProductDetailSection product={product} />
      <RelatedProductsSection products={product.related} />
    </main>
  );
}
