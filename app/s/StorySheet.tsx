import Link from "next/link";
import {
  storyPath,
  type ResolvedStory,
  type StoryLang,
} from "../../content/story-routes";

/**
 * The server-rendered reading sheet. Deliberately reuses the app's own
 * `.reading-sheet` classes from globals.css rather than inventing a second
 * visual language for the same content — this is the same story, at an address
 * a crawler can hold on to.
 *
 * Every chapter is rendered in full. The app's reader shows one chapter at a
 * time behind client state; here the whole work is present in the HTML, because
 * a reader that requires JavaScript to reveal the text is a reader that hides
 * the text from anything that does not run JavaScript.
 */

const T = {
  en: {
    back: "All stories",
    other: "繁體中文",
    source: "Adapted from",
    author: "Authored by",
    revision: "Revision",
    genres: "Genres",
    markdown: "Download as Markdown",
    lineage: "Source lineage",
    firstPublished: "First published",
    originalAuthor: "Original author",
    adaptation: "Adaptation note",
    home: "Storyforge",
  },
  zh: {
    back: "所有故事",
    other: "English",
    source: "改編自",
    author: "作者",
    revision: "修訂",
    genres: "類型",
    markdown: "下載 Markdown",
    lineage: "來源譜系",
    firstPublished: "初次發表",
    originalAuthor: "原作者",
    adaptation: "改編說明",
    home: "Storyforge",
  },
} as const;

export function StorySheet({
  resolved,
  lang,
}: {
  resolved: ResolvedStory;
  lang: StoryLang;
}) {
  const { story, chapters, author, source } = resolved;
  const t = T[lang];
  const other: StoryLang = lang === "en" ? "zh" : "en";

  return (
    <div className="story-page">
      <nav className="story-page-nav" aria-label={t.home}>
        <Link href="/">{t.home}</Link>
        <span aria-hidden="true">·</span>
        {/* one index for both languages: /s/zh would collide with /s/[id]
            resolving id="zh", and an index is a list either way */}
        <Link href="/s">{t.back}</Link>
        <Link className="story-page-lang" href={storyPath(story.id, other)}>
          {t.other}
        </Link>
      </nav>

      <article className="reading-sheet">
        <p className="eyebrow">
          {t.source} {story.source[lang]}
        </p>
        <h1>{story.title[lang]}</h1>
        <p className="reader-byline">
          {t.author} {story.author}
          {" · "}
          {t.revision} {story.revision}
          {" · "}
          {t.genres}: {story.genres[lang].join(", ")}
        </p>

        {chapters.map((chapter) => (
          <section key={chapter.number}>
            <div className="chapter-rule" aria-hidden="true">
              <span>{chapter.number}</span>
            </div>
            <h2 id={`${story.id}-chapter-${chapter.number}`}>
              {chapter.title[lang]}
            </h2>
            {chapter.paragraphs[lang].map((paragraph, index) => (
              <p
                key={index}
                className={index === 0 ? "story-lead" : undefined}
              >
                {paragraph}
              </p>
            ))}
            {chapter.quote ? (
              <blockquote>{chapter.quote[lang]}</blockquote>
            ) : null}
          </section>
        ))}
      </article>

      {author || source ? (
        <aside className="story-page-lineage">
          <h2>{t.lineage}</h2>
          <dl>
            {author ? (
              <>
                <dt>{t.author}</dt>
                <dd>
                  {author.name} — {author.tagline[lang]}
                </dd>
              </>
            ) : null}
            {source ? (
              <>
                <dt>{t.source}</dt>
                <dd>{source.title[lang]}</dd>
                <dt>{t.originalAuthor}</dt>
                <dd>{source.originalAuthor}</dd>
                <dt>{t.firstPublished}</dt>
                <dd>{source.firstPublished}</dd>
                <dt>{t.adaptation}</dt>
                <dd>{source.adaptationNote[lang]}</dd>
              </>
            ) : null}
          </dl>
          <p>
            <a href={`/api/views?markdown=${story.id}`}>{t.markdown}</a>
          </p>
        </aside>
      ) : null}
    </div>
  );
}
