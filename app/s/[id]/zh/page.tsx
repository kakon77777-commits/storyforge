import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StorySheet } from "../../StorySheet";
import { authorPath } from "../../../../content/author-routes";
import {
  SITE_ORIGIN,
  listStories,
  resolveStory,
  storyDescription,
  storyPath,
} from "../../../../content/story-routes";

export function generateStaticParams() {
  return listStories().map((story) => ({ id: story.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const resolved = resolveStory(id);
  if (!resolved) return { title: "找不到頁面 — Storyforge" };

  const { story } = resolved;
  return {
    title: `${story.title.zh} — Storyforge`,
    description: storyDescription(resolved, "zh"),
    alternates: {
      canonical: `${SITE_ORIGIN}${storyPath(id, "zh")}`,
      languages: {
        en: `${SITE_ORIGIN}${storyPath(id, "en")}`,
        "zh-Hant": `${SITE_ORIGIN}${storyPath(id, "zh")}`,
        "x-default": `${SITE_ORIGIN}${storyPath(id, "en")}`,
      },
    },
    openGraph: {
      type: "article",
      title: story.title.zh,
      description: storyDescription(resolved, "zh"),
      url: `${SITE_ORIGIN}${storyPath(id, "zh")}`,
      locale: "zh_TW",
      images: story.image ? [`${SITE_ORIGIN}${story.image}`] : undefined,
    },
  };
}

export default async function StoryPageZh({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resolved = resolveStory(id);
  if (!resolved) notFound();

  const { story, author, source } = resolved;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ShortStory",
    name: story.title.zh,
    alternativeHeadline: story.title.en,
    inLanguage: "zh-Hant",
    url: `${SITE_ORIGIN}${storyPath(id, "zh")}`,
    author: {
      "@type": "Person",
      name: story.author,
      ...(author ? { url: `${SITE_ORIGIN}${authorPath(author.id, "zh")}` } : {}),
    },
    genre: story.genres.zh,
    isBasedOn: source
      ? {
          "@type": "CreativeWork",
          name: source.title.zh,
          author: { "@type": "Person", name: source.originalAuthor },
        }
      : undefined,
    description: storyDescription(resolved, "zh"),
    creativeWorkStatus: story.status,
    version: story.revision,
    publisher: { "@type": "Organization", name: "EveMissLab" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StorySheet resolved={resolved} lang="zh" />
    </>
  );
}
