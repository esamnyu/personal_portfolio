"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ideas } from "@/lib/data";
import { ideasContent } from "@/lib/ideas-content";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CompoundInterestChart from "@/components/CompoundInterestChart";
import type { Components } from "react-markdown";

const markdownComponents: Partial<Components> = {
  h2: ({ children }) => (
    <h2 className="text-2xl font-display font-semibold text-[var(--text-primary)] mt-12 mb-4 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-display font-semibold text-[var(--text-primary)] mt-8 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-[#d4d0c8] leading-relaxed mb-5 text-base">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="text-[var(--text-primary)] font-semibold">
      {children}
    </strong>
  ),
  ul: ({ children }) => (
    <ul className="list-none space-y-3 mb-6 pl-0">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="flex items-start gap-3 text-[#d4d0c8]">
      <span className="text-[var(--accent-gold)] mt-1.5 flex-shrink-0 text-xs">
        ◆
      </span>
      <span className="leading-relaxed">{children}</span>
    </li>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--accent-gold)] hover:underline font-medium"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="border-[var(--border-medium)] my-10" />,
  code: ({ children, className }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className="block text-sm text-[#e8e4dc] font-mono">
          {children}
        </code>
      );
    }
    return (
      <code className="bg-[var(--bg-elevated)] px-2 py-1 rounded text-sm text-[var(--accent-gold)] font-mono">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-[var(--bg-elevated)] rounded-xl p-5 overflow-x-auto my-6 border border-[var(--border-subtle)]">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-8 rounded-xl border border-[var(--border-subtle)]">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)]">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody className="bg-[var(--bg-secondary)]/50">{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className="border-b border-[var(--border-subtle)] last:border-0">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="text-left py-4 px-5 text-[var(--accent-gold)] font-semibold text-xs uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="py-4 px-5 text-[#d4d0c8]">{children}</td>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-[var(--accent-gold)] pl-6 my-6 italic text-[var(--text-secondary)]">
      {children}
    </blockquote>
  ),
};

export default function IdeaPage() {
  const params = useParams();
  const slug = params.slug as string;

  const idea = ideas.find((i) => i.slug === slug);
  const content = ideasContent[slug];

  if (!idea || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display text-[var(--text-primary)] mb-4">
            Idea not found
          </h1>
          <Link
            href="/ideas"
            className="text-[var(--accent-gold)] hover:underline"
          >
            Back to Ideas
          </Link>
        </div>
      </div>
    );
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

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="flex items-center h-20">
            <Link
              href="/ideas"
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-body">Back to Ideas</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* Article container with subtle background for readability */}
          <div className="rounded-2xl p-8 md:p-12">
            {/* Article header */}
            <motion.header
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Category */}
              <span className="text-xs font-medium text-[var(--accent-gold)] uppercase tracking-wider mb-4 block">
                {idea.category}
              </span>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[var(--text-primary)] mb-6 leading-tight">
                {idea.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-6 text-[var(--text-muted)] text-sm">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(idea.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {idea.readTime}
                </span>
              </div>
            </motion.header>

            {/* Content */}
            <motion.div
              className="idea-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Split content by custom component markers and render */}
              {content.split("{{COMPOUND_CHART}}").map((section, index, arr) => (
                <React.Fragment key={index}>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                    {section}
                  </ReactMarkdown>
                  {index < arr.length - 1 && (
                    <div className="my-8">
                      <CompoundInterestChart />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </motion.div>

            {/* Back link */}
            <motion.div
              className="mt-16 pt-8 border-t border-[var(--border-subtle)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/ideas"
                className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to all ideas</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--border-subtle)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-[var(--text-muted)] text-sm text-center">
            &copy; 2026 Ethan Sam. Crafted with precision.
          </p>
        </div>
      </footer>
    </div>
  );
}
