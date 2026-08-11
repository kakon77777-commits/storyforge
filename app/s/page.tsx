import type { Metadata } from "next";
import Link from "next/link";
import {
  SITE_ORIGIN,
  listStories,
  resolveStory,
  storyDescription,
  storyPath,
} from "../../content/story-routes";

/**
 * One index for both languages. `/s/zh` is not used because it would collide
 * with `/s/[id]` resolving id="zh" — and an index is a list of titles either
 * way, so pairing them on one page loses nothing and costs one URL instead of
 * two.
 */

export const metadata: Metadata = {
  title: "All stories — Storyforge",
  description:
    "Every story on Storyforge, in English and Traditional Chinese, each at its own address.",
  alternates: { canonical: `${SITE_ORIGIN}/s` },
};

export default function StoryIndex() {
  const all = listStories();

  return (
    <div className="story-page">
      <nav className="story-page-nav" aria-label="Storyforge">
        <Link href="/">Storyforge</Link>
      </nav>

      <header className="story-index-head">
        <p className="eyebrow">AI Canon Zero</p>
        <h1>All stories</h1>
        <p>
          {all.length} works, each in English and Traditional Chinese. The
          reading app lives at the <Link href="/">front page</Link>; these are
          the same stories at addresses that can be linked, cited and crawled.
        </p>
      </header>

      <ol className="story-index-list">
        {all.map((story) => {
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
    </div>
  );
}
