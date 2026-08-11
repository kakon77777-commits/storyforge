import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StorySheet } from "../StorySheet";
import { authorPath } from "../../../content/author-routes";
import {
  SITE_ORIGIN,
  listStories,
  resolveStory,
  storyDescription,
  storyPath,
} from "../../../content/story-routes";

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
  if (!resolved) return { title: "Not found — Storyforge" };

  const { story } = resolved;
  return {
    title: `${story.title.en} — Storyforge`,
    description: storyDescription(resolved, "en"),
    alternates: {
      canonical: `${SITE_ORIGIN}${storyPath(id, "en")}`,
      languages: {
        en: `${SITE_ORIGIN}${storyPath(id, "en")}`,
        "zh-Hant": `${SITE_ORIGIN}${storyPath(id, "zh")}`,
        "x-default": `${SITE_ORIGIN}${storyPath(id, "en")}`,
      },
    },
    openGraph: {
      type: "article",
      title: story.title.en,
      description: storyDescription(resolved, "en"),
      url: `${SITE_ORIGIN}${storyPath(id, "en")}`,
      images: story.image ? [`${SITE_ORIGIN}${story.image}`] : undefined,
    },
  };
}

export default async function StoryPage({
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
    name: story.title.en,
    alternativeHeadline: story.title.zh,
    inLanguage: "en",
    url: `${SITE_ORIGIN}${storyPath(id, "en")}`,
    author: {
      "@type": "Person",
      name: story.author,
      ...(author ? { url: `${SITE_ORIGIN}${authorPath(author.id, "en")}` } : {}),
    },
    genre: story.genres.en,
    isBasedOn: source
      ? {
          "@type": "CreativeWork",
          name: source.title.en,
          author: { "@type": "Person", name: source.originalAuthor },
        }
      : undefined,
    description: storyDescription(resolved, "en"),
    creativeWorkStatus: story.status,
    version: story.revision,
    publisher: { "@type": "Organization", name: "EveMissLab" },
    // authorMode is Storyforge's own grading of how the work was written; it is
    // stated here rather than left implicit, because "AI-authored" is the claim
    // the whole site is making and it should travel with the machine-readable copy.
    ...(author ? { creditText: `${author.name} · author mode ${author.authorMode}` } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StorySheet resolved={resolved} lang="en" />
    </>
  );
}
