import type { MetadataRoute } from "next";
import { elifbaLessons } from "@/src/data/elifba-lessons";
import { tecvidLessons } from "@/src/data/tecvid-lessons";
import { namazSureleri } from "@/src/data/namaz-sureleri";
import { absoluteUrl } from "@/src/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const corePages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/elifba"), lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: absoluteUrl("/tecvid"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/namaz-sureleri"), lastModified, changeFrequency: "weekly", priority: 0.9 },
  ];

  const elifbaPages: MetadataRoute.Sitemap = elifbaLessons.map((lesson) => ({
    url: absoluteUrl(`/${lesson.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const tecvidPages: MetadataRoute.Sitemap = tecvidLessons.map((lesson) => ({
    url: absoluteUrl(`/tecvid/${lesson.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const surePages: MetadataRoute.Sitemap = namazSureleri.flatMap((sure) => [
    {
      url: absoluteUrl(`/namaz-sureleri/${sure.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...sure.ayahs.map((ayah) => ({
      url: absoluteUrl(`/namaz-sureleri/${sure.slug}/${ayah.number}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]);

  return [...corePages, ...elifbaPages, ...tecvidPages, ...surePages];
}
