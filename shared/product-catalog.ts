export type CatalogProduct = {
  slug: string;
  name: string;
  image: string;
  alt: string;
  width: number;
  height: number;
};

export type ProductCountry = {
  id: string;
  label: string;
  row: number;
  products: string[];
};

export type ProductCategory = {
  id: string;
  label: string;
  countries: ProductCountry[];
};

export type ProductCatalog = {
  badge: string;
  title: string;
  button: string;
  categories: ProductCategory[];
  fruits: Record<string, CatalogProduct>;
};
