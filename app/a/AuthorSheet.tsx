import Link from "next/link";
import { authorPath, type ResolvedAuthor } from "../../content/author-routes";
import { storyPath, type StoryLang } from "../../content/story-routes";

const T = {
  en: {
    allStories: "All stories",
    other: "繁體中文",
    author: "Storyforge author",
    mode: "Author mode",
    about: "About this author",
    works: "Works by",
    serial: "Serializing",
    complete: "Complete",
    modes: {
      H1: "H1 · Human-Led",
      H2: "H2 · Co-Created",
      A1: "A1 · AI-Led, human curated",
      A2: "A2 · AI-Originated",
      A3: "A3 · AI-Autonomous experimental",
    },
  },
  zh: {
    allStories: "所有故事",
    other: "English",
    author: "Storyforge 作者",
    mode: "作者模式",
    about: "關於這位作者",
    works: "作品",
    serial: "連載中",
    complete: "已完結",
    modes: {
      H1: "H1 · 人類主導",
      H2: "H2 · 人機共創",
      A1: "A1 · AI 主筆，人類策劃",
      A2: "A2 · AI 原生題材",
      A3: "A3 · AI 自主實驗性創作",
    },
  },
} as const;

export function AuthorSheet({
  resolved,
  lang,
}: {
  resolved: ResolvedAuthor;
  lang: StoryLang;
}) {
  const { author, works } = resolved;
  const t = T[lang];
  const other: StoryLang = lang === "en" ? "zh" : "en";
  const badge =
    author.authorMode === "H1"
      ? lang === "en" ? "Human" : "人類"
      : author.authorMode === "H2"
        ? lang === "en" ? "Human × AI" : "人類 × AI"
        : "AI";

  return (
    <div className="story-page author-route">
      <nav className="story-page-nav" aria-label="Storyforge">
        <Link href="/">Storyforge</Link>
        <span aria-hidden="true">·</span>
        <Link href="/s">{t.allStories}</Link>
        <Link className="story-page-lang" href={authorPath(author.id, other)}>
          {t.other}
        </Link>
      </nav>

      <main className="author-page">
        <section className="author-hero">
          <div className="author-avatar" aria-hidden="true">{author.name[0]}</div>
          <div>
            <p className="eyebrow">{t.author}</p>
            <h1>{author.name}</h1>
            <p className="author-tagline">{author.tagline[lang]}</p>
            <div className="author-badges">
              <span className={`ai-badge ${author.authorMode === "H2" ? "co-created-badge" : ""}`}>
                {badge}
              </span>
              <span className="author-mode-pill">
                {t.mode}: {t.modes[author.authorMode]}
              </span>
            </div>
          </div>
        </section>

        <section className="author-bio">
          <h2>{t.about}</h2>
          <p>{author.bio[lang]}</p>
        </section>

        <section className="author-works">
          <h2>{t.works} {author.name}</h2>
          <ul className="author-route-works">
            {works.map((story) => (
              <li key={story.id}>
                {story.image ? (
                  <Link className="author-work-cover" href={storyPath(story.id, lang)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={story.image} alt={`${story.title[lang]} cover`} width={1200} height={900} />
                  </Link>
                ) : null}
                <div>
                  <p className="story-kicker">{story.genres[lang].join(" · ")}</p>
                  <h3><Link href={storyPath(story.id, lang)}>{story.title[lang]}</Link></h3>
                  {story.subtitle ? <p className="story-subtitle">{story.subtitle[lang]}</p> : null}
                  <p className="author-work-excerpt">{story.excerpt[lang]}</p>
                  <p className="story-index-meta">
                    {story.completion === "serial" ? t.serial : t.complete}
                    {" · "}
                    {lang === "en" ? `Revision ${story.revision}` : `修訂 ${story.revision}`}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
