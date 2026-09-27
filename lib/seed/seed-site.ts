import fs from "fs";
import path from "path";
import type { Payload } from "payload";

import { aboutPageContent } from "@/app/about/constants";
import { awardsPageContent } from "@/app/awards/constants";
import { contactPageContent } from "@/app/contact/constants";
import { galleryPageContent, galleryRows } from "@/app/gallery/constants";
import {
  aboutSectionContent,
  awardSectionContent,
  heroSectionContent,
  mapSectionContent,
  newsSectionContent,
} from "@/app/home-page/constants";
import articlesFile from "@/app/news/articles.json";
import detailsFile from "@/app/product-detail/details.json";
import { awards } from "@/shared/constants/awards";
import catalog from "@/shared/constants/products.json";

const details = detailsFile.products;

function mimeType(filename: string) {
  const ext = path.extname(filename).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  return "application/octet-stream";
}

function text(parts: readonly string[]) {
  return parts.join("\n\n");
}

function relationIds(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map((item) =>
    typeof item === "string"
      ? item
      : item && typeof item === "object" && "id" in item
        ? String(item.id)
        : "",
  );
}

export async function seedSite(payload: Payload) {
  const media = new Map<string, string>();

  async function photo(publicPath: string, alt: string) {
    const cached = media.get(publicPath);
    if (cached) return cached;
    const filename = path.basename(publicPath);
    const existing = await payload.find({
      collection: "media",
      where: { filename: { equals: filename } },
      limit: 1,
      depth: 0,
    });
    if (existing.docs[0]) {
      media.set(publicPath, existing.docs[0].id);
      return existing.docs[0].id;
    }
    const filePath = path.join(
      process.cwd(),
      "public",
      publicPath.replace(/^\//, ""),
    );
    const data = fs.readFileSync(filePath);
    const created = await payload.create({
      collection: "media",
      data: { alt },
      file: {
        data,
        mimetype: mimeType(filename),
        name: filename,
        size: data.length,
      },
    });
    media.set(publicPath, created.id);
    return created.id;
  }

  async function ensure<T extends "products" | "news" | "gallery" | "awards">(
    collection: T,
    slug: string,
    data: Record<string, unknown>,
  ) {
    const existing = await payload.find({
      collection,
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    });
    if (existing.docs[0]) return { id: existing.docs[0].id, created: false };
    const created = await payload.create({ collection, data: data as never });
    return { id: created.id, created: true };
  }

  const productIds = new Map<string, string>();
  let created = 0;

  for (const [slug, fruit] of Object.entries(catalog.fruits)) {
    const detail = details[slug as keyof typeof details];
    const placements = catalog.categories.flatMap((category) =>
      category.countries.flatMap((country, order) =>
        country.products.includes(slug)
          ? [
              {
                category: category.id,
                country: country.label,
                row: String(country.row),
                order,
              },
            ]
          : [],
      ),
    );
    const saved = await ensure("products", slug, {
      name: detail?.name ?? fruit.name.replace(/[[\]]/g, ""),
      slug,
      image: await photo(fruit.image, fruit.alt),
      origin: detail?.origin,
      summary: detail?.summary,
      availability: detail?.availability.label,
      availabilityNote: detail?.availability.note,
      bestFor: detail?.bestFor,
      benefits: detail?.benefits.body,
      benefitsImage: detail?.benefits.image
        ? await photo(detail.benefits.image.src, detail.benefits.image.alt)
        : undefined,
      season: detail?.season.body,
      detailImage: detail
        ? await photo(detail.hero.src, detail.hero.alt)
        : undefined,
      placements,
    });
    productIds.set(slug, saved.id);
    if (saved.created) created += 1;
  }

  for (const [slug, detail] of Object.entries(details)) {
    const id = productIds.get(slug);
    const existing = await payload.findByID({
      collection: "products",
      id: id || "",
      depth: 0,
    });
    if (relationIds(existing.related).length > 0) continue;
    await payload.update({
      collection: "products",
      id: existing.id,
      data: {
        related: detail.related
          .map((item) => productIds.get(item))
          .filter(Boolean),
      },
    });
  }

  const newsIds = new Map<string, string>();
  for (const article of articlesFile.articles) {
    const saved = await ensure("news", article.slug, {
      title: article.title,
      slug: article.slug,
      date: "2023-01-07T00:00:00.000Z",
      image: await photo(article.card.src, article.card.alt),
      cover: await photo(article.hero.src, article.hero.alt),
      body: text(article.paragraphs),
      featureHeading: article.feature?.heading,
      featureBody: article.feature
        ? text(article.feature.paragraphs)
        : undefined,
      featureImage: article.feature
        ? await photo(article.feature.image.src, article.feature.image.alt)
        : undefined,
    });
    newsIds.set(article.slug, saved.id);
    if (saved.created) created += 1;
  }

  for (const article of articlesFile.articles) {
    const id = newsIds.get(article.slug);
    if (!id) continue;
    const existing = await payload.findByID({
      collection: "news",
      id,
      depth: 0,
    });
    if (relationIds(existing.related).length > 0) continue;
    await payload.update({
      collection: "news",
      id,
      data: {
        related: article.related
          .map((item) => newsIds.get(item))
          .filter(Boolean),
      },
    });
  }

  let galleryOrder = 0;
  for (const row of galleryRows) {
    for (const photoItem of row.photos) {
      const slug = `${row.id}-${galleryOrder}`;
      const saved = await ensure("gallery", slug, {
        slug,
        kind: "photo",
        alt: photoItem.alt,
        order: galleryOrder,
        image: await photo(photoItem.src, photoItem.alt),
      });
      if (saved.created) created += 1;
      galleryOrder += 1;
    }
  }

  for (const [index, award] of awards.entries()) {
    const saved = await ensure("awards", award.id, {
      slug: award.id,
      title: award.title,
      summary: award.summary,
      order: index,
      image: await photo(award.image, award.imageAlt),
    });
    if (saved.created) created += 1;
  }

  const home = await payload.findGlobal({ slug: "home-page", depth: 0 });
  const selectedProducts = ["orange", "apple", "kiwi", "cherry", "apricot"]
    .map((slug) => productIds.get(slug))
    .filter(Boolean);
  const selectedAwards = awards.map((award) => award.id);
  const awardDocs = await payload.find({
    collection: "awards",
    limit: 20,
    depth: 0,
  });
  const awardIds = selectedAwards
    .map((slug) => awardDocs.docs.find((doc) => doc.slug === slug)?.id)
    .filter(Boolean);

  await payload.updateGlobal({
    slug: "home-page",
    data: {
      seo: {
        title: home.seo?.title || "PKC Fruits: Ripe. Real. Ready for you.",
        description: home.seo?.description || heroSectionContent.description,
      },
      hero: {
        eyeLabel: home.hero?.eyeLabel || heroSectionContent.eyebrow,
        title: home.hero?.title || heroSectionContent.title,
        description: home.hero?.description || heroSectionContent.description,
        button: home.hero?.button || heroSectionContent.action,
      },
      about: home.about?.title
        ? home.about
        : {
            title: aboutSectionContent.title,
            description: aboutSectionContent.description,
            button: aboutSectionContent.action,
          },
      productsSection: relationIds(home.productsSection?.products).length
        ? home.productsSection
        : {
            badge: catalog.badge,
            title: catalog.title,
            button: catalog.explore.label,
            products: selectedProducts,
          },
      world: home.world?.title
        ? home.world
        : {
            title: mapSectionContent.title,
            description: mapSectionContent.description,
            stats: mapSectionContent.stats.map(({ value, suffix, label }) => ({
              value,
              suffix,
              label,
            })),
          },
      awardsSection: relationIds(home.awardsSection?.awards).length
        ? home.awardsSection
        : { title: awardSectionContent.title, awards: awardIds },
      newsSection: relationIds(home.newsSection?.news).length
        ? home.newsSection
        : {
            badge: newsSectionContent.badge,
            title: newsSectionContent.title,
            button: newsSectionContent.viewAll.label,
            news: [...newsIds.values()],
          },
    },
  });

  const about = await payload.findGlobal({ slug: "about-page", depth: 0 });
  if (!about.introTitle) {
    await payload.updateGlobal({
      slug: "about-page",
      data: {
        seoTitle: aboutPageContent.metadata.title,
        seoDescription: aboutPageContent.metadata.description,
        introBadge: aboutPageContent.intro.badge,
        introTitle: aboutPageContent.intro.title,
        introBody: text(aboutPageContent.intro.paragraphs),
        introImage: await photo(
          aboutPageContent.intro.image.src,
          aboutPageContent.intro.image.alt,
        ),
        stats: aboutPageContent.stats.map(({ value, suffix, label }) => ({
          value,
          suffix,
          label,
        })),
        storyImage: await photo(
          aboutPageContent.story.image.src,
          aboutPageContent.story.image.alt,
        ),
        storyBody: text(aboutPageContent.story.paragraphs),
        foundersBadge: aboutPageContent.founders.badge,
        foundersTitle: aboutPageContent.founders.title,
        founders: await Promise.all(
          aboutPageContent.founders.members.map(async (member) => ({
            name: member.name,
            role: member.role,
            photo: await photo(member.image, member.imageAlt),
          })),
        ),
      },
    });
  }

  await seedPage(payload, "products-page", {
    seoTitle: "Products | PKC Fruits",
    seoDescription: catalog.title,
    badge: catalog.badge,
    title: catalog.title,
  });
  await seedPage(payload, "awards-page", {
    seoTitle: awardsPageContent.metadata.title,
    seoDescription: awardsPageContent.metadata.description,
    badge: awardsPageContent.badge,
    title: awardsPageContent.title.join("\n"),
  });
  await seedPage(payload, "gallery-page", {
    seoTitle: galleryPageContent.metadata.title,
    seoDescription: galleryPageContent.metadata.description,
    badge: galleryPageContent.badge,
    title: galleryPageContent.title,
  });
  await seedPage(payload, "news-page", {
    seoTitle: "Recent News and Events | PKC Fruits",
    seoDescription: "Recent news and events from PKC Fruits.",
    badge: newsSectionContent.badge,
    title: newsSectionContent.title,
  });

  const contact = await payload.findGlobal({ slug: "contact-page", depth: 0 });
  if (!contact.title) {
    await payload.updateGlobal({
      slug: "contact-page",
      data: {
        seoTitle: contactPageContent.metadata.title,
        seoDescription: contactPageContent.metadata.description,
        badge: contactPageContent.badge,
        title: contactPageContent.title,
        image: await photo(
          contactPageContent.image.src,
          contactPageContent.image.alt,
        ),
        enquireTitle: contactPageContent.enquireTitle,
        nameLabel: "Full Name",
        mobileLabel: "Mobile Number",
        emailLabel: "E mail",
        messageLabel: "Message",
        sendLabel: contactPageContent.sendLabel,
        success: contactPageContent.success,
        address: contactPageContent.address,
        email: contactPageContent.email,
        phone: contactPageContent.phone.label,
        mapEmbed: contactPageContent.map.src,
      },
    });
  }

  return {
    message:
      created > 0
        ? `Added ${created} items. Existing entries were kept.`
        : "Default content is already in place. Existing entries were kept.",
  };
}

async function seedPage(
  payload: Payload,
  slug: "products-page" | "awards-page" | "gallery-page" | "news-page",
  data: {
    seoTitle: string;
    seoDescription: string;
    badge: string;
    title: string;
  },
) {
  const page = await payload.findGlobal({ slug, depth: 0 });
  if (page.title) return;
  await payload.updateGlobal({ slug, data });
}
