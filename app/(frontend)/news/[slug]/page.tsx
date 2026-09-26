import { getNewsArticle, getRelatedArticles, newsSlugs } from "@/app/news/constants";
import { ArticleSection, RelatedArticlesSection } from "@/app/news/sections";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type NewsArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return newsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) return { title: "News | PKC Fruits" };

  return {
    title: `${article.title} | PKC Fruits`,
    description: article.paragraphs[0],
  };
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) notFound();

  return (
    <main className="min-w-0">
      <ArticleSection article={article} />
      <RelatedArticlesSection articles={getRelatedArticles(article.related)} />
    </main>
  );
}
