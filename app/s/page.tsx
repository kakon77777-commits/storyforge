import type { Metadata } from "next";
import Link from "next/link";
import {
  SITE_ORIGIN,
  STORY_CATEGORIES,
  listClassicStories,
  resolveStory,
  storyCategory,
  storyDescription,
  storyPath,
  type StoryCategory,
} from "../../content/story-routes";

/**
 * One index for both languages. `/s/zh` is not used because it would collide
 * with `/s/[id]` resolving id="zh" — and an index is a list of titles either
 * way, so pairing them on one page loses nothing and costs one URL instead of
 * two.
 *
 * Category, search, and page are query params rather than separate routes:
 * `/s?category=classics&q=trust&page=2`. Any filtered or paginated view is
 * marked noindex — only the bare `/s` is meant to be the crawlable canonical
 * entry point, matching `storyDescription`'s existing crawler-first intent.
 */

const CATEGORY_LABEL: Record<StoryCategory, string> = {
  fable: "Fable & Fairy Tale",
  classics: "Classics Literature",
  original: "Original",
};

const PAGE_SIZE = 24;

function buildQuery(params: { category?: string; q?: string; page?: number }): string {
  const parts: string[] = [];
  if (params.category && params.category !== "all") parts.push(`category=${encodeURIComponent(params.category)}`);
  if (params.q) parts.push(`q=${encodeURIComponent(params.q)}`);
  if (params.page && params.page > 1) parts.push(`page=${params.page}`);
  return parts.length ? `/s?${parts.join("&")}` : "/s";
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; page?: string }>;
}): Promise<Metadata> {
  const { category, q, page } = await searchParams;
  const filtered = Boolean(category) || Boolean(q) || (page && page !== "1");
  return {
    title: "All stories — Storyforge",
    description:
      "Every story on Storyforge, in English and Traditional Chinese, each at its own address.",
    alternates: { canonical: `${SITE_ORIGIN}/s` },
    ...(filtered ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function StoryIndex({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const activeCategory = params.category && (STORY_CATEGORIES as string[]).includes(params.category)
    ? (params.category as StoryCategory)
    : undefined;
  const query = (params.q ?? "").trim();
  const currentPage = Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1);

  const everything = listClassicStories();

  let filtered = everything;
  if (activeCategory) {
    filtered = filtered.filter((story) => storyCategory(story) === activeCategory);
  }
  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter((story) => {
      const haystack = [
        story.title.en,
        story.title.zh,
        story.excerpt.en,
        story.excerpt.zh,
        story.author,
        story.source.en,
        story.source.zh,
        story.genres.en.join(" "),
        story.genres.zh.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="story-page">
      <nav className="story-page-nav" aria-label="Storyforge">
        <Link href="/">Storyforge</Link>
        <span aria-hidden="true">·</span>
        <Link href="/a">All authors</Link>
      </nav>

      <header className="story-index-head">
        <p className="eyebrow">AI Canon Zero</p>
        <h1>All stories</h1>
        <p>
          {everything.length} works, each in English and Traditional Chinese. The
          reading app lives at the <Link href="/">front page</Link>; these are
          the same stories at addresses that can be linked, cited and crawled.
        </p>
      </header>

      <div className="story-index-tools">
        <nav className="story-index-categories" aria-label="Filter by category">
          <Link
            href={buildQuery({ q: query })}
            className={!activeCategory ? "active" : ""}
          >
            All
          </Link>
          {STORY_CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={buildQuery({ category: cat, q: query })}
              className={activeCategory === cat ? "active" : ""}
            >
              {CATEGORY_LABEL[cat]}
            </Link>
          ))}
        </nav>

        <form className="story-index-search" method="get" action="/s">
          {activeCategory ? <input type="hidden" name="category" value={activeCategory} /> : null}
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search titles, authors, genres…"
            aria-label="Search stories"
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <p className="story-index-count">
        {filtered.length === everything.length
          ? `${filtered.length} works`
          : `${filtered.length} of ${everything.length} works`}
        {query ? ` matching "${query}"` : ""}
      </p>

      {pageItems.length === 0 ? (
        <p className="story-index-empty">No stories match this filter yet.</p>
      ) : (
        <ol className="story-index-list">
          {pageItems.map((story) => {
            const resolved = resolveStory(story.id);
            return (
              <li key={story.id}>
                <h2>
                  <Link href={storyPath(story.id, "en")}>{story.title.en}</Link>
                </h2>
                {story.subtitle ? <p className="story-subtitle">{story.subtitle.en}</p> : null}
                <p className="story-index-zh">
                  <Link href={storyPath(story.id, "zh")}>{story.title.zh}</Link>
                </p>
                <p className="story-index-meta">
                  {story.author} · {story.source.en} · revision {story.revision}
                </p>
                {resolved ? (
                  <p className="story-index-excerpt">
                    {storyDescription(resolved, "en")}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ol>
      )}

      {totalPages > 1 ? (
        <nav className="story-index-pagination" aria-label="Pagination">
          {safePage > 1 ? (
            <Link href={buildQuery({ category: activeCategory, q: query, page: safePage - 1 })}>
              ← Previous
            </Link>
          ) : (
            <span className="story-index-pagination-disabled">← Previous</span>
          )}
          <span className="story-index-pagination-status">
            Page {safePage} of {totalPages}
          </span>
          {safePage < totalPages ? (
            <Link href={buildQuery({ category: activeCategory, q: query, page: safePage + 1 })}>
              Next →
            </Link>
          ) : (
            <span className="story-index-pagination-disabled">Next →</span>
          )}
        </nav>
      ) : null}
    </div>
  );
}
