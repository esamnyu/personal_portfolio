import { MetadataRoute } from "next";
import { ideas } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ethansam.io";

  const ideaRoutes = ideas.map((idea) => ({
    url: `${baseUrl}/ideas/${idea.slug}`,
    lastModified: new Date(idea.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/ideas`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...ideaRoutes,
  ];
}
