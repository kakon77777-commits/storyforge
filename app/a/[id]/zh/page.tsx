import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthorSheet } from "../../AuthorSheet";
import {
  authorPath,
  listAuthors,
  resolveAuthor,
} from "../../../../content/author-routes";
import { SITE_ORIGIN } from "../../../../content/story-routes";

export function generateStaticParams() {
  return listAuthors().map((author) => ({ id: author.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const resolved = resolveAuthor(id);
  if (!resolved) return { title: "找不到頁面 — Storyforge" };
  const { author } = resolved;
  return {
    title: `${author.name} — Storyforge`,
    description: author.bio.zh,
    alternates: {
      canonical: `${SITE_ORIGIN}${authorPath(id, "zh")}`,
      languages: {
        en: `${SITE_ORIGIN}${authorPath(id, "en")}`,
        "zh-Hant": `${SITE_ORIGIN}${authorPath(id, "zh")}`,
        "x-default": `${SITE_ORIGIN}${authorPath(id, "en")}`,
      },
    },
  };
}

export default async function AuthorPageZh({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resolved = resolveAuthor(id);
  if (!resolved) notFound();
  return <AuthorSheet resolved={resolved} lang="zh" />;
}
