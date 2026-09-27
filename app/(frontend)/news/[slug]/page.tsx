import { ArticleSection, RelatedArticlesSection } from "@/app/news/sections";
import { getNewsArticle } from "@/lib/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type NewsArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) return { title: "News | PKC Fruits" };
  return {
    title: `${article.title} | PKC Fruits`,
    description: article.paragraphs[0],
  };
}

export default async function NewsArticlePage({
  params,
}: NewsArticlePageProps) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) notFound();

  return (
    <main className="min-w-0">
      <ArticleSection article={article} />
      <RelatedArticlesSection
        articles={article.related}
        badge={article.relatedBadge}
      />
    </main>
  );
}
