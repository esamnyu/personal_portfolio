import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ideas } from "@/lib/data";
import { ideasContent } from "@/lib/ideas-content";
import { IdeaArticle } from "./IdeaArticle";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return ideas.map((idea) => ({ slug: idea.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const idea = ideas.find((i) => i.slug === params.slug);
  if (!idea) return {};

  return {
    title: `${idea.title} — Ethan Sam`,
    description: idea.excerpt,
    openGraph: {
      title: idea.title,
      description: idea.excerpt,
      type: "article",
      publishedTime: idea.publishedAt,
      authors: ["Ethan Sam"],
    },
    twitter: {
      card: "summary_large_image",
      title: idea.title,
      description: idea.excerpt,
    },
  };
}

export default function IdeaPage({ params }: PageProps) {
  const idea = ideas.find((i) => i.slug === params.slug);
  const content = ideasContent[params.slug];

  if (!idea || !content) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: idea.title,
    description: idea.excerpt,
    datePublished: idea.publishedAt,
    author: {
      "@type": "Person",
      name: "Ethan Sam",
      url: "https://ethansam.io",
    },
    publisher: {
      "@type": "Person",
      name: "Ethan Sam",
    },
  };

  return (
    <div className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <IdeaArticle idea={idea} content={content} />
    </div>
  );
}
