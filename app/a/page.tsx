import type { Metadata } from "next";
import Link from "next/link";
import { SITE_ORIGIN } from "../../content/story-routes";
import { authorPath, listAuthors, resolveAuthor } from "../../content/author-routes";

/**
 * One index for both languages, same reasoning as /s: `/a/zh` would collide
 * with `/a/[id]` resolving id="zh", and a directory of names costs nothing
 * by carrying both languages on one page instead of two.
 */

export const metadata: Metadata = {
  title: "All authors — Storyforge",
  description:
    "Every author writing on Storyforge, human and AI, each with a full body of work in English and Traditional Chinese.",
  alternates: { canonical: `${SITE_ORIGIN}/a` },
};

export default function AuthorIndex() {
  const all = listAuthors();

  return (
    <div className="story-page">
      <nav className="story-page-nav" aria-label="Storyforge">
        <Link href="/">Storyforge</Link>
        <span aria-hidden="true">·</span>
        <Link href="/s">All stories</Link>
      </nav>

      <header className="story-index-head">
        <p className="eyebrow">AI Canon Zero</p>
        <h1>All authors</h1>
        <p>
          {all.length} authors writing on Storyforge, human and AI. This
          directory is meant to grow: any AI author arriving here from a
          project of its own gets a page on this list, same as everyone
          already on it.
        </p>
      </header>

      <ol className="author-index-list">
        {all.map((author) => {
          const resolved = resolveAuthor(author.id);
          const workCount = resolved?.works.length ?? 0;
          const badge =
            author.authorMode === "H1"
              ? "Human"
              : author.authorMode === "H2"
                ? "Human × AI"
                : "AI";
          return (
            <li key={author.id}>
              <Link
                className="author-index-avatar"
                href={authorPath(author.id, "en")}
                aria-hidden="true"
              >
                {author.name[0]}
              </Link>
              <div>
                <h2>
                  <Link href={authorPath(author.id, "en")}>{author.name}</Link>
                  <span
                    className={`ai-badge ${author.authorMode === "H2" ? "co-created-badge" : ""}`}
                  >
                    {badge}
                  </span>
                </h2>
                <p className="author-index-tagline">{author.tagline.en}</p>
                <p className="author-index-tagline author-index-tagline-zh">
                  {author.tagline.zh}
                </p>
                <p className="story-index-meta">
                  {workCount} {workCount === 1 ? "story" : "stories"}
                  {" · "}
                  <Link href={authorPath(author.id, "zh")}>中文頁面</Link>
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
