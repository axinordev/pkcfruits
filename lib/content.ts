import config from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";

import { slugify } from "@/lib/cms/access";
import { youtubeEmbed } from "@/lib/youtube";
import type { Award, Media, News, Product } from "@/payload-types";
import type { CatalogProduct, ProductCatalog } from "@/shared/product-catalog";

export const getCMS = cache(async () => getPayload({ config }));

export type CmsImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

function isMedia(value: unknown): value is Media {
  return Boolean(value && typeof value === "object" && "url" in value);
}

export function cmsImage(
  value: string | Media | null | undefined,
  alt = "",
): CmsImage | null {
  if (!isMedia(value) || !value.url) return null;
  return {
    src: value.url,
    alt: value.alt || alt,
    width: value.width || 1200,
    height: value.height || 800,
  };
}

export function paragraphs(value?: string | null) {
  return (value ?? "")
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function formatDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function populated<T extends { id: string }>(
  value: string | T | null | undefined,
): T | null {
  if (!value || typeof value === "string") return null;
  return value;
}

function cardFromProduct(product: Product): CatalogProduct | null {
  const image = cmsImage(product.image, product.name);
  if (!image || !product.slug) return null;
  return {
    slug: product.slug,
    name: `[${product.name}]`,
    image: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
  };
}

export function buildCatalog(
  products: Product[],
  headings: { badge: string; title: string; button: string },
): ProductCatalog {
  const fruits: ProductCatalog["fruits"] = {};
  const groups = new Map<
    string,
    Map<
      string,
      { label: string; row: number; order: number; products: string[] }
    >
  >();

  for (const product of products) {
    const card = cardFromProduct(product);
    if (!card) continue;
    fruits[card.slug] = card;
    for (const place of product.placements ?? []) {
      const countries = groups.get(place.category) ?? new Map();
      const current = countries.get(place.country) ?? {
        label: place.country,
        row: Number(place.row ?? 0),
        order: place.order ?? 999,
        products: [],
      };
      current.products.push(card.slug);
      countries.set(place.country, current);
      groups.set(place.category, countries);
    }
  }

  const labels = { imported: "Imported", indian: "Indian" } as const;
  const categories = (["imported", "indian"] as const).flatMap((id) => {
    const countries = groups.get(id);
    if (!countries?.size) return [];
    return [
      {
        id,
        label: labels[id],
        countries: [...countries.values()]
          .toSorted((a, b) => a.order - b.order)
          .map((country) => ({
            id: slugify(country.label),
            label: country.label,
            row: country.row,
            products: country.products,
          })),
      },
    ];
  });

  return { ...headings, categories, fruits };
}

export function productCards(products: Product[]) {
  return products.flatMap((product) => {
    const card = cardFromProduct(product);
    return card ? [card] : [];
  });
}

export const getHomePage = cache(async () => {
  const payload = await getCMS();
  const home = await payload.findGlobal({ slug: "home-page", depth: 2 });
  const products = (home.productsSection?.products ?? []).flatMap((item) => {
    const product = populated(item);
    return product ? [product] : [];
  });
  const awards = (home.awardsSection?.awards ?? []).flatMap((item) => {
    const award = populated<Award>(item);
    return award ? [awardView(award)] : [];
  });
  const stories = (home.newsSection?.news ?? []).flatMap((item) => {
    const story = populated<News>(item);
    return story ? [newsCard(story)] : [];
  });

  return {
    seo: {
      title: home.seo?.title ?? "",
      description: home.seo?.description ?? "",
    },
    hero: {
      eyeLabel: home.hero?.eyeLabel ?? "",
      title: home.hero?.title ?? "",
      description: home.hero?.description ?? "",
      button: home.hero?.button ?? "",
      fruits: productCards(products).slice(0, 3),
    },
    about: {
      title: home.about?.title ?? "",
      description: home.about?.description ?? "",
      button: home.about?.button ?? "",
    },
    catalog: buildCatalog(products, {
      badge: home.productsSection?.badge ?? "",
      title: home.productsSection?.title ?? "",
      button: home.productsSection?.button ?? "",
    }),
    world: {
      title: home.world?.title ?? "",
      description: home.world?.description ?? "",
      stats: (home.world?.stats ?? []).map((stat) => ({
        id: stat.id || stat.label,
        value: stat.value,
        suffix: stat.suffix,
        label: stat.label,
      })),
    },
    awards: { title: home.awardsSection?.title ?? "", items: awards },
    news: {
      badge: home.newsSection?.badge ?? "",
      title: home.newsSection?.title ?? "",
      button: home.newsSection?.button ?? "",
      stories,
    },
  };
});

function awardView(award: Award) {
  const image = cmsImage(award.image, award.title);
  return {
    id: award.id,
    title: award.title,
    summary: award.summary ?? "",
    image: image?.src ?? "",
    imageAlt: image?.alt ?? award.title,
    width: image?.width ?? 960,
    height: image?.height ?? 720,
  };
}

export function newsCard(story: News) {
  const image = cmsImage(story.image, story.title);
  return {
    slug: story.slug ?? story.id,
    title: story.title,
    date: formatDate(story.date),
    image: image?.src ?? "",
    imageAlt: image?.alt ?? story.title,
    href: `/news/${story.slug ?? story.id}`,
  };
}

export const getAboutPage = cache(async () => {
  const payload = await getCMS();
  const page = await payload.findGlobal({ slug: "about-page", depth: 1 });
  return {
    seo: { title: page.seoTitle ?? "", description: page.seoDescription ?? "" },
    intro: {
      badge: page.introBadge ?? "",
      title: page.introTitle ?? "",
      paragraphs: paragraphs(page.introBody),
      image: cmsImage(page.introImage, page.introBadge),
    },
    stats: (page.stats ?? []).map((stat) => ({
      id: stat.id || stat.label,
      value: stat.value,
      suffix: stat.suffix,
      label: stat.label,
    })),
    story: {
      image: cmsImage(page.storyImage),
      paragraphs: paragraphs(page.storyBody),
    },
    founders: {
      badge: page.foundersBadge ?? "",
      title: page.foundersTitle ?? "",
      members: (page.founders ?? []).flatMap((member) => {
        const image = cmsImage(member.photo, member.name);
        return image ? [{ name: member.name, role: member.role, image }] : [];
      }),
    },
  };
});

async function pageHeading(
  slug: "products-page" | "awards-page" | "gallery-page" | "news-page",
) {
  const payload = await getCMS();
  const page = await payload.findGlobal({ slug, depth: 0 });
  return {
    seo: { title: page.seoTitle ?? "", description: page.seoDescription ?? "" },
    badge: page.badge ?? "",
    title: page.title ?? "",
  };
}

export const getProductsPage = cache(async () => {
  const payload = await getCMS();
  const [page, result] = await Promise.all([
    pageHeading("products-page"),
    payload.find({
      collection: "products",
      limit: 100,
      depth: 1,
      sort: "name",
    }),
  ]);
  return {
    ...page,
    catalog: buildCatalog(result.docs, {
      badge: page.badge,
      title: page.title,
      button: "Explore All",
    }),
  };
});

export const getAwardsPage = cache(async () => {
  const payload = await getCMS();
  const [page, result] = await Promise.all([
    pageHeading("awards-page"),
    payload.find({ collection: "awards", limit: 100, depth: 1, sort: "order" }),
  ]);
  const [first = "", second = ""] = page.title.split("\n");
  return {
    ...page,
    titleLines: [first, second],
    awards: result.docs.map(awardView),
  };
});

export const getGalleryPage = cache(async () => {
  const payload = await getCMS();
  const [page, result] = await Promise.all([
    pageHeading("gallery-page"),
    payload.find({
      collection: "gallery",
      limit: 100,
      depth: 1,
      sort: "order",
    }),
  ]);
  const photos = result.docs.flatMap((item) => {
    if (item.kind === "video") return [];
    const image = cmsImage(item.image, item.alt);
    return image ? [{ ...image, alt: item.alt || image.alt }] : [];
  });
  const videos = result.docs.flatMap((item) => {
    if (item.kind !== "video") return [];
    const embed = youtubeEmbed(item.youtubeUrl);
    if (!embed) return [];
    return [
      {
        slug: item.slug || item.id,
        title: item.alt,
        src: embed.src,
      },
    ];
  });
  return { ...page, photos, videos };
});

export const getNewsList = cache(async () => {
  const payload = await getCMS();
  const [page, result] = await Promise.all([
    pageHeading("news-page"),
    payload.find({ collection: "news", limit: 100, depth: 1, sort: "-date" }),
  ]);
  return { ...page, stories: result.docs.map(newsCard) };
});

export const getNewsArticle = cache(async (slug: string) => {
  const payload = await getCMS();
  const result = await payload.find({
    collection: "news",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  });
  const article = result.docs[0];
  if (!article) return null;
  const cover =
    cmsImage(article.cover, article.title) ??
    cmsImage(article.image, article.title);
  const featureImage = cmsImage(
    article.featureImage,
    article.featureHeading ?? "",
  );
  const page = await pageHeading("news-page");
  return {
    title: article.title,
    date: formatDate(article.date),
    paragraphs: paragraphs(article.body),
    cover,
    feature:
      article.featureHeading && featureImage
        ? {
            heading: article.featureHeading,
            paragraphs: paragraphs(article.featureBody),
            image: featureImage,
          }
        : null,
    related: (article.related ?? []).flatMap((item) => {
      const story = populated<News>(item);
      return story ? [newsCard(story)] : [];
    }),
    relatedBadge: page.badge,
  };
});

export const getProduct = cache(async (slug: string) => {
  const payload = await getCMS();
  const result = await payload.find({
    collection: "products",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  });
  const product = result.docs[0];
  if (!product) return null;
  const image =
    cmsImage(product.detailImage, product.name) ??
    cmsImage(product.image, product.name);
  const benefitsImage = cmsImage(product.benefitsImage, product.name);
  const page = await pageHeading("products-page");
  return {
    name: product.name,
    summary: product.summary ?? "",
    origin: product.origin ?? "",
    availability: product.availability ?? "",
    availabilityNote: product.availabilityNote ?? "",
    bestFor: product.bestFor ?? "",
    benefits: product.benefits ?? "",
    season: product.season ?? "",
    image,
    benefitsImage,
    badge: page.badge,
    related: (product.related ?? []).flatMap((item) => {
      const related = populated(item);
      const card = related ? cardFromProduct(related) : null;
      return card ? [card] : [];
    }),
  };
});

export const getContactPage = cache(async () => {
  const payload = await getCMS();
  const page = await payload.findGlobal({ slug: "contact-page", depth: 1 });
  return {
    seo: { title: page.seoTitle ?? "", description: page.seoDescription ?? "" },
    badge: page.badge ?? "",
    title: page.title ?? "",
    image: cmsImage(page.image, page.title),
    enquireTitle: page.enquireTitle ?? "",
    nameLabel: page.nameLabel ?? "",
    mobileLabel: page.mobileLabel ?? "",
    emailLabel: page.emailLabel ?? "",
    messageLabel: page.messageLabel ?? "",
    sendLabel: page.sendLabel ?? "",
    success: page.success ?? "",
    address: page.address ?? "",
    email: page.email ?? "",
    phone: page.phone ?? "",
    mapEmbed: page.mapEmbed ?? "",
  };
});
