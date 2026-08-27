import { authors, type AuthorProfile } from "./authors";
import { sources, type SourceProfile } from "./sources";
import { stories, type Story } from "./stories";
import { storyChapters, type StoryChapter } from "./story-chapters";

/**
 * Server-side resolution for the addressable story routes.
 *
 * Until 2026-08-02 every story lived at `/` behind client state, with chapter
 * navigation done through `#fragment` — and a fragment is not a distinct URL to
 * a crawler. A site publishing a story a day was, to anything reading it from
 * outside, a single page. These helpers back the `/s/...` routes that give each
 * story an address of its own; the app itself is untouched and still owns the
 * reading experience.
 */

export const SITE_ORIGIN = "https://storyforge.evemisslab.com";

export type StoryLang = "en" | "zh";

export type ResolvedStory = {
  story: Story;
  chapters: StoryChapter[];
  author: AuthorProfile | undefined;
  source: SourceProfile | undefined;
};

/** Ranked the way the library orders them, so the index and sitemap agree. */
export function listStories(): Story[] {
  return [...stories].sort((a, b) => a.rank - b.rank);
}

/**
 * Every story that belongs in the library grid and the front-page ranking —
 * i.e. everything except parallel versions, which render beneath their
 * classic on the classic's own page instead of getting a second card. Not
 * "generated" from the classic side (no `parallelVersions: string[]` list to
 * maintain) — a parallel version's own `parallelOf` field is the only source
 * of truth, matching sitemap.xml's existing "generated, not remembered"
 * approach. `listStories()` itself is untouched and still returns parallel
 * versions, because they still get their own crawlable `/s/:id` page and
 * still belong in the sitemap.
 */
export function listClassicStories(): Story[] {
  return listStories().filter((story) => !story.parallelOf);
}

/** Parallel versions of a classic story, oldest (by rank) first. */
export function listParallelVersions(classicId: string): Story[] {
  return listStories().filter((story) => story.parallelOf === classicId);
}

export function resolveStory(id: string): ResolvedStory | null {
  const story = stories.find((s) => s.id === id);
  if (!story) return null;
  return {
    story,
    chapters: storyChapters[story.id] ?? [],
    author: authors[story.authorId],
    source: sources[story.sourceId],
  };
}

export function storyPath(id: string, lang: StoryLang): string {
  return lang === "zh" ? `/s/${id}/zh` : `/s/${id}`;
}

/** First paragraph of the first chapter, trimmed to a description length. */
export function storyDescription(
  resolved: ResolvedStory,
  lang: StoryLang,
): string {
  const excerpt = resolved.story.excerpt[lang];
  if (excerpt) return excerpt;
  const first = resolved.chapters[0]?.paragraphs[lang]?.[0] ?? "";
  return first.length > 180 ? `${first.slice(0, 177)}…` : first;
}
