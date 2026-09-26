import articles from "./articles.json";

export const newsPageContent = {
  metadata: {
    title: "Recent News and Events | PKC Fruits",
    description: "Recent news and events from PKC Fruits.",
  },
} as const;

export const newsDetailContent = {
  back: { label: "Back", href: "/news" },
  shareLabel: "Share",
  shareNetworks: [
    { id: "linkedin", label: "LINKEDIN" },
    { id: "facebook", label: "FACEBOOK" },
    { id: "x", label: "X" },
  ],
  related: {
    badge: "News and Events",
    viewAll: { label: "View All", href: "/news" },
  },
} as const;

export type NewsArticle = (typeof articles.articles)[number];
export type ShareNetworkId = (typeof newsDetailContent.shareNetworks)[number]["id"];

export function newsSlugs() {
  return articles.articles.map((article) => article.slug);
}

export function getNewsArticle(slug: string) {
  return articles.articles.find((article) => article.slug === slug) ?? null;
}

export function getRelatedArticles(slugs: readonly string[]) {
  return slugs.flatMap((slug) => {
    const article = getNewsArticle(slug);
    return article ? [article] : [];
  });
}

export function listNewsStories() {
  return articles.articles.map((article) => ({
    slug: article.slug,
    title: article.title,
    date: article.date,
    image: article.card.src,
    imageAlt: article.card.alt,
    width: article.card.width,
    height: article.card.height,
    href: `/news/${article.slug}`,
  }));
}
