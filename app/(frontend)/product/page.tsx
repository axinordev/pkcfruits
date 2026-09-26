import ProductBrowser from "@/app/product/product-browser";
import { getProductsPage } from "@/lib/content";
import { getSeoMetadata } from "@/shared/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const page = await getProductsPage();
  return getSeoMetadata(page.seo);
}

export default async function ProductPage() {
  const page = await getProductsPage();
  return <ProductBrowser catalog={page.catalog} />;
}
