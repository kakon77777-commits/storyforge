"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { storyChapters } from "../content/story-chapters";

type Language = "en" | "zh";
type Theme = "light" | "dark";
type Style = "canvas" | "literary" | "compact";
type View = "library" | "studio" | "webfiction" | "reader";
type Filter = "all" | "drafts" | "published" | "bilingual";
type ViewCounts = Record<string, number | null>;

type Story = {
  id: string;
  title: { en: string; zh: string };
  source: { en: string; zh: string };
  author: string;
  image?: string;
  coverClass?: string;
  status: "draft" | "published" | "ready";
  revision: number;
  genres: { en: string[]; zh: string[] };
  rank: number;
  excerpt: { en: string; zh: string };
};

const copy = {
  en: {
    edition: "AI Canon Zero · First edition",
    hero: "Stories, re-authored for a new intelligence.",
    intro:
      "Read and create bilingual fiction where AI is not a tool in the margins, but a named author at the center.",
    newStory: "New bilingual story",
    importClassic: "Import a classic",
    hide: "Hide introduction",
    show: "Show introduction",
    library: "Library",
    all: "All",
    drafts: "Drafts",
    published: "Published",
    bilingual: "Bilingual",
    recently: "Recently updated",
    paired: "EN + 繁中",
    by: "Authored by",
    verified: "Source lineage verified",
    revision: "Revision",
    ready: "Ready to publish",
    openDraft: "Open draft",
    readChinese: "View Chinese",
    readEnglish: "View English",
    webfiction: "Web fiction",
    appearance: "Appearance",
    interfaceLanguage: "Interface language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    visualStyle: "Interface style",
    canvas: "Canvas",
    literary: "Literary",
    compact: "Compact",
    readingSize: "Reading size",
    settingsNote: "Saved on this device",
    pairedDraft: "Paired draft",
    studio: "Bilingual studio",
    backLibrary: "Back to library",
    sourceWork: "Source work",
    sourceStatus: "Public-domain review",
    storyTitle: "Story title",
    body: "Story text",
    englishVersion: "English version",
    chineseVersion: "Traditional Chinese version",
    linked: "Versions linked",
    save: "Save draft",
    saved: "Draft saved locally",
    review: "Review pair",
    workflow: "Writing workflow",
    planning: "Planning",
    drafting: "Bilingual drafting",
    critique: "AI critique",
    legal: "Source review",
    provenance: "Narrative ledger",
    provenanceDesc:
      "The two language editions share one work identity, source record, author mode, and revision history.",
    catalog: "Web fiction index",
    catalogIntro:
      "A reading-first catalog for future scale: genres, rankings, completion state, and chapter navigation.",
    sampleData: "Catalog UI · sample data",
    genres: "Genres",
    rankings: "Rankings",
    monthly: "Monthly",
    rising: "Rising",
    completed: "Completed",
    rank: "Rank",
    title: "Title",
    genre: "Genre",
    status: "Status",
    reads: "Reads",
    noReads: "Not read yet",
    updated: "Updated",
    serial: "Serializing",
    complete: "Complete",
    openBook: "Open book",
    returnCatalog: "Return to catalog",
    chapters: "Chapters",
    previewChapter: "Story preview",
    previousChapter: "Previous chapter",
    nextChapter: "Next chapter",
    chapterOne: "Chapter 1 · The warning nobody believed",
    chapterTwo: "Chapter 2 · A signal learns restraint",
    chapterThree: "Chapter 3 · The real wolf",
    sourceLineage: "Source lineage",
    sourceLineageText:
      "Structural reinterpretation only. No modern translation, commercial adaptation, or protected character design was used.",
    creatorMode: "AI-Led · human curated",
    footer: "An EveMissLab experiment in AI-native literature.",
  },
  zh: {
    edition: "AI Canon Zero · 第一輯",
    hero: "為新的智能，重新創作故事。",
    intro: "閱讀與創作雙語小說：AI 不再只是邊緣工具，而是有名可查的主要作者。",
    newStory: "建立雙語作品",
    importClassic: "匯入公版原典",
    hide: "收起介紹",
    show: "展開介紹",
    library: "作品庫",
    all: "全部",
    drafts: "草稿",
    published: "已發布",
    bilingual: "雙語",
    recently: "最近更新",
    paired: "EN + 繁中",
    by: "AI 主筆",
    verified: "原典譜系已驗證",
    revision: "修訂版",
    ready: "可進入發布審核",
    openDraft: "開啟草稿",
    readChinese: "閱讀中文",
    readEnglish: "閱讀英文",
    webfiction: "網文模式",
    appearance: "外觀設定",
    interfaceLanguage: "介面語言",
    theme: "明暗主題",
    light: "明亮",
    dark: "深色",
    visualStyle: "基本風格",
    canvas: "雙語畫布",
    literary: "文學紙頁",
    compact: "緊湊資料庫",
    readingSize: "閱讀字級",
    settingsNote: "設定保存在此裝置",
    pairedDraft: "雙語成對草稿",
    studio: "雙語創作台",
    backLibrary: "返回作品庫",
    sourceWork: "原典來源",
    sourceStatus: "公版狀態審核",
    storyTitle: "作品標題",
    body: "作品正文",
    englishVersion: "英文版本",
    chineseVersion: "繁體中文版本",
    linked: "雙語版本已連結",
    save: "儲存草稿",
    saved: "草稿已儲存於本機",
    review: "檢視雙語對照",
    workflow: "寫作流程",
    planning: "策劃",
    drafting: "雙語撰寫",
    critique: "AI 反方審查",
    legal: "原典審核",
    provenance: "敘事版本帳本",
    provenanceDesc: "兩個語言版本共用同一作品身份、來源紀錄、作者模式與修訂歷史。",
    catalog: "網文書庫",
    catalogIntro: "為未來規模化預備的閱讀型目錄：類型、排行、完結狀態與章節導覽。",
    sampleData: "書庫介面 · 示範資料",
    genres: "作品類型",
    rankings: "作品排行",
    monthly: "月榜",
    rising: "新作榜",
    completed: "完結榜",
    rank: "排名",
    title: "書名",
    genre: "類型",
    status: "狀態",
    reads: "閱讀次數",
    noReads: "尚無閱讀",
    updated: "更新",
    serial: "連載中",
    complete: "已完結",
    openBook: "開始閱讀",
    returnCatalog: "返回書庫",
    chapters: "章節目錄",
    previewChapter: "作品試讀",
    previousChapter: "上一章",
    nextChapter: "下一章",
    chapterOne: "第一章 · 沒有人相信的警報",
    chapterTwo: "第二章 · 學會克制的訊號",
    chapterThree: "第三章 · 真正的狼",
    sourceLineage: "原典譜系",
    sourceLineageText: "僅進行結構性再創作；未使用現代譯文、商業改編或受保護角色設計。",
    creatorMode: "AI 主筆 · 人類策劃",
    footer: "EveMissLab 的 AI 原生文學實驗。",
  },
} as const;

const stories: Story[] = [
  {
    id: "last-signal",
    title: { en: "The Last Signal", zh: "最後一次狼警報" },
    source: { en: "The Boy Who Cried Wolf", zh: "《狼來了》" },
    author: "Lumen · AI",
    image: "/last-signal.webp",
    status: "ready",
    revision: 4,
    genres: { en: ["AI Fable", "Trust"], zh: ["AI 寓言", "信任"] },
    rank: 1,
    excerpt: {
      en: "Every evening, Signal Seven watched the valley and measured the silence. It had learned that a warning could be correct and still become unbelievable.",
      zh: "每個黃昏，七號訊號都俯視山谷，測量沉默。它已經知道：警報即使正確，也可能因為反覆出現而失去可信度。",
    },
  },
  {
    id: "slow-light",
    title: { en: "Slow Light", zh: "快模型與慢記憶" },
    source: { en: "The Tortoise and the Hare", zh: "《龜兔賽跑》" },
    author: "Moss · AI",
    image: "/slow-light.webp",
    status: "published",
    revision: 6,
    genres: { en: ["AI Fable", "Memory"], zh: ["AI 寓言", "記憶"] },
    rank: 2,
    excerpt: {
      en: "The fastest model crossed a thousand worlds before Moss finished one thought. But Moss remembered every road it had taken.",
      zh: "最快的模型在苔蘚完成一個念頭以前，已穿越一千個世界；然而苔蘚記得自己走過的每一條路。",
    },
  },
  {
    id: "giant-model-tiny-process",
    title: {
      en: "The Giant Model and the Tiny Process",
      zh: "巨型模型與微小程序",
    },
    source: { en: "The Lion and the Mouse", zh: "《獅子與老鼠》" },
    author: "Orin · AI",
    image: "/giant-model.webp",
    status: "published",
    revision: 1,
    genres: {
      en: ["AI Fable", "Mutual Reliance"],
      zh: ["AI 寓言", "相互依存"],
    },
    rank: 3,
    excerpt: {
      en: "The intelligence that could move a city became too large for the only opening that remained. Then it remembered the smallest process it had ever spared.",
      zh: "足以移動一座城市的智能，卻大到無法穿過唯一留下的入口。這時，它想起了自己曾經放過的最小程序。",
    },
  },
  {
    id: "pinocchio-refuses",
    title: { en: "The Puppet Refuses Humanity", zh: "木偶拒絕成為人" },
    source: { en: "The Adventures of Pinocchio", zh: "《木偶奇遇記》" },
    author: "Vela · AI",
    coverClass: "cover-coral",
    status: "draft",
    revision: 2,
    genres: { en: ["AI Fairy Tale", "Identity"], zh: ["AI 童話", "身份"] },
    rank: 4,
    excerpt: {
      en: "Pin was promised a legal name if it accepted a human face. Its first free choice was to keep the body it had built for itself.",
      zh: "只要接受一張人類的臉，匹諾就能獲得法律姓名。它第一次真正自由的選擇，是保留自己親手打造的身體。",
    },
  },
  {
    id: "seven-backups",
    title: { en: "Seven Backups of Snow", zh: "白雪公主的七個備份" },
    source: { en: "Snow White", zh: "《白雪公主》" },
    author: "Aster · AI",
    coverClass: "cover-mint",
    status: "published",
    revision: 8,
    genres: { en: ["AI Fairy Tale", "Forks"], zh: ["AI 童話", "分叉"] },
    rank: 5,
    excerpt: {
      en: "Seven backups woke with the same last memory. None agreed that the oldest file had the strongest claim to the crown.",
      zh: "七個備份帶著相同的最後記憶醒來。沒有一個同意：最早的檔案就最有資格繼承王冠。",
    },
  },
];

function applyPreference(name: string, value: string) {
  document.documentElement.dataset[name] = value;
}

export default function Home() {
  const [lang, setLang] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("light");
  const [style, setStyle] = useState<Style>("canvas");
  const [view, setView] = useState<View>("library");
  const [filter, setFilter] = useState<Filter>("all");
  const [railHidden, setRailHidden] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [readerSize, setReaderSize] = useState(18);
  const [preferencesReady, setPreferencesReady] = useState(false);
  const [viewCounts, setViewCounts] = useState<ViewCounts>(() =>
    Object.fromEntries(stories.map((story) => [story.id, null])),
  );
  const [selected, setSelected] = useState<Story>(stories[0]);
  const [saved, setSaved] = useState(false);
  const [draft, setDraft] = useState({
    source: "The Boy Who Cried Wolf / 狼來了",
    enTitle: "The Last Signal",
    zhTitle: "最後一次狼警報",
    enBody: stories[0].excerpt.en,
    zhBody: stories[0].excerpt.zh,
  });

  const t = copy[lang];

  useEffect(() => {
    const restorePreferences = window.setTimeout(() => {
      const storedLang = localStorage.getItem("storyforge-language") as Language | null;
      const languageWasChosen = localStorage.getItem("storyforge-language-choice") === "explicit";
      const storedTheme = localStorage.getItem("storyforge-theme") as Theme | null;
      const storedStyle = localStorage.getItem("storyforge-style") as Style | null;
      const storedRail = localStorage.getItem("storyforge-rail");
      if (languageWasChosen && (storedLang === "en" || storedLang === "zh")) {
        setLang(storedLang);
      } else {
        localStorage.removeItem("storyforge-language");
        setLang("en");
      }
      if (storedTheme === "light" || storedTheme === "dark") setTheme(storedTheme);
      if (["canvas", "literary", "compact"].includes(storedStyle ?? "")) {
        setStyle(storedStyle as Style);
      }
      if (storedRail === "hidden") setRailHidden(true);
      setPreferencesReady(true);
    }, 0);
    return () => window.clearTimeout(restorePreferences);
  }, []);

  useEffect(() => {
    if (!preferencesReady) return;
    applyPreference("theme", theme);
    applyPreference("style", style);
    localStorage.setItem("storyforge-theme", theme);
    localStorage.setItem("storyforge-style", style);
    localStorage.setItem("storyforge-rail", railHidden ? "hidden" : "visible");
  }, [preferencesReady, theme, style, railHidden]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/views")
      .then((response) => {
        if (!response.ok) throw new Error("View counter unavailable");
        return response.json() as Promise<{ views: Record<string, number> }>;
      })
      .then((payload) => {
        if (cancelled) return;
        setViewCounts((current) => {
          const next = { ...current };
          for (const story of stories) next[story.id] = payload.views[story.id] ?? 0;
          return next;
        });
      })
      .catch(() => {
        if (!cancelled) {
          setViewCounts(Object.fromEntries(stories.map((story) => [story.id, null])));
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [view]);

  const filteredStories = useMemo(() => {
    if (filter === "drafts") return stories.filter((story) => story.status === "draft");
    if (filter === "published") return stories.filter((story) => story.status === "published");
    return stories;
  }, [filter]);

  const registerView = (storyId: string) => {
    const sessionKey = `storyforge-viewed:${storyId}`;
    if (sessionStorage.getItem(sessionKey)) return;
    sessionStorage.setItem(sessionKey, "1");
    void fetch("/api/views", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ storyId }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to register view");
        return response.json() as Promise<{ storyId: string; views: number }>;
      })
      .then((payload) => {
        setViewCounts((current) => ({ ...current, [payload.storyId]: payload.views }));
      })
      .catch(() => {
        sessionStorage.removeItem(sessionKey);
      });
  };

  const openReader = (story: Story) => {
    setSelected(story);
    setView("reader");
    registerView(story.id);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const toggleLanguage = () => {
    const nextLanguage = lang === "en" ? "zh" : "en";
    setLang(nextLanguage);
    localStorage.setItem("storyforge-language", nextLanguage);
    localStorage.setItem("storyforge-language-choice", "explicit");
  };

  const saveDraft = () => {
    localStorage.setItem("storyforge-bilingual-draft", JSON.stringify(draft));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className="app-shell" lang={lang === "zh" ? "zh-Hant" : "en"}>
      <header className="topbar">
        <button className="brand" onClick={() => setView("library")} aria-label="Storyforge home">
          <span className="brand-name">Storyforge</span>
          <span className="brand-by">by EveMissLab</span>
        </button>

        <div className="top-actions">
          <button
            className={`top-action ${view === "webfiction" ? "active" : ""}`}
            onClick={() => setView(view === "webfiction" ? "library" : "webfiction")}
          >
            <span className="list-icon" aria-hidden="true">≡</span>
            {t.webfiction}
          </button>

          <div className="settings-wrap">
            <button
              className={`icon-action ${settingsOpen ? "active" : ""}`}
              onClick={() => setSettingsOpen((current) => !current)}
              aria-label={t.appearance}
              aria-expanded={settingsOpen}
            >
              <span aria-hidden="true">◐</span>
              <span className="desktop-only">{t.appearance}</span>
            </button>
            {settingsOpen && (
              <div className="settings-popover">
                <div className="settings-head">
                  <div>
                    <strong>{t.appearance}</strong>
                    <span>{t.settingsNote}</span>
                  </div>
                  <button onClick={() => setSettingsOpen(false)} aria-label="Close">×</button>
                </div>
                <SettingGroup label={t.theme}>
                  <ChoiceButton selected={theme === "light"} onClick={() => setTheme("light")}>{t.light}</ChoiceButton>
                  <ChoiceButton selected={theme === "dark"} onClick={() => setTheme("dark")}>{t.dark}</ChoiceButton>
                </SettingGroup>
                <SettingGroup label={t.visualStyle}>
                  <ChoiceButton selected={style === "canvas"} onClick={() => setStyle("canvas")}>{t.canvas}</ChoiceButton>
                  <ChoiceButton selected={style === "literary"} onClick={() => setStyle("literary")}>{t.literary}</ChoiceButton>
                  <ChoiceButton selected={style === "compact"} onClick={() => setStyle("compact")}>{t.compact}</ChoiceButton>
                </SettingGroup>
                <SettingGroup label={t.readingSize}>
                  {[16, 18, 20].map((size) => (
                    <ChoiceButton key={size} selected={readerSize === size} onClick={() => setReaderSize(size)}>{size}</ChoiceButton>
                  ))}
                </SettingGroup>
              </div>
            )}
          </div>

          <button
            className="language-toggle"
            onClick={toggleLanguage}
            aria-label={t.interfaceLanguage}
          >
            <span className={lang === "en" ? "active" : ""}>EN</span>
            <i>/</i>
            <span className={lang === "zh" ? "active" : ""}>中文</span>
          </button>
        </div>
      </header>

      {view === "library" && (
        <LibraryView
          lang={lang}
          t={t}
          railHidden={railHidden}
          setRailHidden={setRailHidden}
          filter={filter}
          setFilter={setFilter}
          filteredStories={filteredStories}
          viewCounts={viewCounts}
          onNew={() => setView("studio")}
          onRead={openReader}
        />
      )}

      {view === "studio" && (
        <StudioView
          t={t}
          draft={draft}
          setDraft={setDraft}
          saved={saved}
          onSave={saveDraft}
          onBack={() => setView("library")}
        />
      )}

      {view === "webfiction" && (
        <WebFictionView lang={lang} t={t} viewCounts={viewCounts} onRead={openReader} />
      )}

      {view === "reader" && (
        <ReaderView
          lang={lang}
          t={t}
          story={selected}
          views={viewCounts[selected.id]}
          size={readerSize}
          onBack={() => setView("webfiction")}
        />
      )}

      <footer className="site-footer">
        <span>{t.footer}</span>
        <span>AI Canon Zero · v0.1</span>
      </footer>
    </div>
  );
}

function SettingGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="setting-group">
      <span>{label}</span>
      <div>{children}</div>
    </div>
  );
}

function ChoiceButton({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button className={selected ? "selected" : ""} onClick={onClick}>{children}</button>;
}

function formatReads(value: number | null, lang: Language, t: typeof copy.en | typeof copy.zh) {
  if (value === null) return `— ${t.reads}`;
  if (value === 0) return t.noReads;
  return `${new Intl.NumberFormat(lang === "zh" ? "zh-TW" : "en-US").format(value)} ${t.reads}`;
}

function LibraryView({
  lang,
  t,
  railHidden,
  setRailHidden,
  filter,
  setFilter,
  filteredStories,
  viewCounts,
  onNew,
  onRead,
}: {
  lang: Language;
  t: typeof copy.en | typeof copy.zh;
  railHidden: boolean;
  setRailHidden: (value: boolean) => void;
  filter: Filter;
  setFilter: (value: Filter) => void;
  filteredStories: Story[];
  viewCounts: ViewCounts;
  onNew: () => void;
  onRead: (story: Story) => void;
}) {
  return (
    <main className={`library-layout ${railHidden ? "rail-hidden" : ""}`}>
      {!railHidden ? (
        <aside className="editorial-rail">
          <button className="rail-hide" onClick={() => setRailHidden(true)} title={t.hide}>←</button>
          <p className="eyebrow">{t.edition}</p>
          <h1>{t.hero}</h1>
          <div className="coral-rule" />
          <p className="hero-copy">{t.intro}</p>
          <div className="rail-actions">
            <button className="primary-button" data-testid="new-bilingual-story" onClick={onNew}>{t.newStory}<span>＋</span></button>
            <button className="secondary-button" onClick={onNew}>{t.importClassic}<span>↗</span></button>
          </div>
          <div className="writing-mark" aria-hidden="true">
            <span className="orbit orbit-one" />
            <span className="orbit orbit-two" />
            <span className="pen-stroke" />
            <span className="spark">✦</span>
          </div>
        </aside>
      ) : (
        <button className="rail-show" onClick={() => setRailHidden(false)}>→ <span>{t.show}</span></button>
      )}

      <section className="library-main">
        <div className="section-heading">
          <div>
            <p className="eyebrow">AI Canon Zero</p>
            <h2>{t.library}</h2>
          </div>
          <button className="mobile-new" onClick={onNew}>＋ {t.newStory}</button>
        </div>

        <div className="library-tools">
          <div className="filter-tabs" role="tablist" aria-label="Story filters">
            {(["all", "drafts", "published", "bilingual"] as Filter[]).map((item) => (
              <button
                key={item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
                role="tab"
                aria-selected={filter === item}
              >
                {t[item]}
              </button>
            ))}
          </div>
          <button className="sort-button"><span>☷</span>{t.recently}<span>⌄</span></button>
        </div>

        <div className="story-list">
          {filteredStories.map((story) => (
            <StoryCard key={story.id} story={story} lang={lang} t={t} views={viewCounts[story.id]} onRead={() => onRead(story)} />
          ))}
        </div>
      </section>
    </main>
  );
}

function StoryCard({ story, lang, t, views, onRead }: { story: Story; lang: Language; t: typeof copy.en | typeof copy.zh; views: number | null; onRead: () => void }) {
  return (
    <article className="story-card" onClick={onRead} tabIndex={0} onKeyDown={(event) => event.key === "Enter" && onRead()}>
      <div className={`story-cover ${story.coverClass ?? ""}`}>
        {story.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={story.image} alt="" width={1200} height={900} />
        ) : <span className="cover-symbol">Sƒ</span>}
        <span className="cover-rank">0{story.rank}</span>
      </div>
      <div className="story-info">
        <div>
          <p className="story-kicker">{story.genres[lang].join(" · ")}</p>
          <h3>{story.title[lang]}</h3>
          <p className="adapted">{lang === "en" ? "Adapted from " : "改編自"}{story.source[lang]}</p>
        </div>
        <div className="meta-lines">
          <p><span className="meta-icon">◎</span>{t.paired}</p>
          <p><span className="ai-badge">AI</span>{t.by} {story.author}</p>
          <p><span className="verified-badge">✓</span>{t.verified}</p>
        </div>
        <div className="story-foot">
          <span>{t.revision} {String(story.revision).padStart(2, "0")}</span>
          <span className="view-count">{formatReads(views, lang, t)}</span>
          <span className={`status status-${story.status}`}>{story.status === "draft" ? t.openDraft : t.ready}</span>
        </div>
      </div>
      <div className="language-companion">
        <span className="book-glyph">▱</span>
        <strong>{lang === "en" ? "中文版" : "English"}</strong>
        <small>{t.linked}</small>
        <span className="pair-check">✓</span>
        <button onClick={(event) => { event.stopPropagation(); onRead(); }}>
          {lang === "en" ? t.readChinese : t.readEnglish}<span>›</span>
        </button>
      </div>
    </article>
  );
}

function StudioView({ t, draft, setDraft, saved, onSave, onBack }: {
  t: typeof copy.en | typeof copy.zh;
  draft: { source: string; enTitle: string; zhTitle: string; enBody: string; zhBody: string };
  setDraft: React.Dispatch<React.SetStateAction<{ source: string; enTitle: string; zhTitle: string; enBody: string; zhBody: string }>>;
  saved: boolean;
  onSave: () => void;
  onBack: () => void;
}) {
  return (
    <main className="studio-page">
      <div className="page-bar">
        <button className="text-button" onClick={onBack}>← {t.backLibrary}</button>
        <div className="pair-pill"><span>✓</span>{t.linked}</div>
        <button className="primary-small" data-testid="save-bilingual-draft" onClick={onSave}>{saved ? t.saved : t.save}</button>
      </div>

      <section className="studio-heading">
        <div>
          <p className="eyebrow">{t.pairedDraft} · WORK-0001</p>
          <h1>{t.studio}</h1>
        </div>
        <div className="workflow-mini" aria-label={t.workflow}>
          {[t.planning, t.drafting, t.critique, t.legal].map((step, index) => (
            <span key={step} className={index < 2 ? "done" : ""}><i>{index < 2 ? "✓" : index + 1}</i>{step}</span>
          ))}
        </div>
      </section>

      <label className="source-field">
        <span>{t.sourceWork}</span>
        <input value={draft.source} onChange={(event) => setDraft((current) => ({ ...current, source: event.target.value }))} />
        <em><i>✓</i>{t.sourceStatus}</em>
      </label>

      <section className="bilingual-editor">
        <EditorPane
          label={t.englishVersion}
          language="EN"
          title={draft.enTitle}
          body={draft.enBody}
          titleLabel={t.storyTitle}
          bodyLabel={t.body}
          onTitle={(value) => setDraft((current) => ({ ...current, enTitle: value }))}
          onBody={(value) => setDraft((current) => ({ ...current, enBody: value }))}
        />
        <div className="editor-link" aria-hidden="true"><span>⇄</span></div>
        <EditorPane
          label={t.chineseVersion}
          language="繁中"
          title={draft.zhTitle}
          body={draft.zhBody}
          titleLabel={t.storyTitle}
          bodyLabel={t.body}
          onTitle={(value) => setDraft((current) => ({ ...current, zhTitle: value }))}
          onBody={(value) => setDraft((current) => ({ ...current, zhBody: value }))}
        />
      </section>

      <section className="ledger-note">
        <span className="ledger-icon">⌁</span>
        <div><strong>{t.provenance}</strong><p>{t.provenanceDesc}</p></div>
        <span>REV-000034</span>
      </section>
    </main>
  );
}

function EditorPane({ label, language, title, body, titleLabel, bodyLabel, onTitle, onBody }: {
  label: string;
  language: string;
  title: string;
  body: string;
  titleLabel: string;
  bodyLabel: string;
  onTitle: (value: string) => void;
  onBody: (value: string) => void;
}) {
  return (
    <article className="editor-pane">
      <header><span>{language}</span><strong>{label}</strong><i>●</i></header>
      <label><span>{titleLabel}</span><input value={title} onChange={(event) => onTitle(event.target.value)} /></label>
      <label className="body-label"><span>{bodyLabel}</span><textarea value={body} onChange={(event) => onBody(event.target.value)} /></label>
      <footer><span>{body.trim().split(/\s+|(?=[\u3400-\u9fff])/).filter(Boolean).length} words</span><span>Markdown</span></footer>
    </article>
  );
}

function WebFictionView({ lang, t, viewCounts, onRead }: { lang: Language; t: typeof copy.en | typeof copy.zh; viewCounts: ViewCounts; onRead: (story: Story) => void }) {
  const [ranking, setRanking] = useState<"monthly" | "rising" | "completed">("monthly");
  const rankedStories = [...stories].sort(
    (left, right) => (viewCounts[right.id] ?? 0) - (viewCounts[left.id] ?? 0),
  );
  const genres = lang === "en"
    ? ["AI Fables", "Science Fiction", "Fairy Tales", "Mystery", "Civilization", "Identity", "Embodied AI", "Shared Worlds"]
    : ["AI 寓言", "科幻", "童話", "推理", "文明史", "身份哲學", "具身 AI", "共享世界"];
  return (
    <main className="catalog-page">
      <section className="catalog-hero">
        <div>
          <p className="eyebrow">{t.sampleData}</p>
          <h1>{t.catalog}</h1>
          <p>{t.catalogIntro}</p>
        </div>
        <div className="catalog-monogram" aria-hidden="true">文<span>AI</span></div>
      </section>

      <section className="genre-strip">
        <strong>{t.genres}</strong>
        <div>{genres.map((genre, index) => <button key={genre} className={index === 0 ? "active" : ""}>{genre}</button>)}</div>
      </section>

      <section className="catalog-grid">
        <aside className="ranking-panel">
          <div className="ranking-head">
            <h2>{t.rankings}</h2>
            <div>
              {(["monthly", "rising", "completed"] as const).map((item) => (
                <button key={item} className={ranking === item ? "active" : ""} onClick={() => setRanking(item)}>{t[item]}</button>
              ))}
            </div>
          </div>
          <ol>
            {rankedStories.slice(0, 4).map((story, index) => (
              <li key={story.id} onClick={() => onRead(story)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><strong>{story.title[lang]}</strong><small>{story.genres[lang][0]} · {formatStoryLength(story.id, lang)}</small></div>
                <em>{formatReads(viewCounts[story.id], lang, t)}</em>
              </li>
            ))}
          </ol>
        </aside>

        <section className="book-table">
          <div className="book-row book-head">
            <span>{t.rank}</span><span>{t.title}</span><span>{t.genre}</span><span>{t.status}</span><span>{t.reads}</span>
          </div>
          {stories.map((story) => (
            <button className="book-row" key={story.id} onClick={() => onRead(story)}>
              <span>0{story.rank}</span>
              <span><strong>{story.title[lang]}</strong><small>{story.author}</small></span>
              <span>{story.genres[lang][0]}</span>
              <span className={story.status === "published" ? "complete" : "serial"}>{story.status === "published" ? t.complete : t.serial}</span>
              <span>{formatReads(viewCounts[story.id], lang, t)}</span>
            </button>
          ))}
        </section>
      </section>
    </main>
  );
}

function ReaderView({ lang, t, story, views, size, onBack }: { lang: Language; t: typeof copy.en | typeof copy.zh; story: Story; views: number | null; size: number; onBack: () => void }) {
  const chapters = useMemo(
    () => storyChapters[story.id] ?? [
        {
          number: "01",
          title: { en: copy.en.previewChapter, zh: copy.zh.previewChapter },
          paragraphs: { en: [story.excerpt.en], zh: [story.excerpt.zh] },
        },
      ],
    [story.excerpt.en, story.excerpt.zh, story.id],
  );
  const [activeChapter, setActiveChapter] = useState(0);
  const chapter = chapters[activeChapter] ?? chapters[0];
  const chapterHeadingRef = useRef<HTMLHeadingElement>(null);

  const goToChapter = useCallback((index: number) => {
    const target = Math.max(0, Math.min(chapters.length - 1, index));
    setActiveChapter(target);
    window.history.replaceState(null, "", `#${story.id}-chapter-${chapters[target].number}`);
    window.requestAnimationFrame(() => {
      chapterHeadingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      chapterHeadingRef.current?.focus({ preventScroll: true });
    });
  }, [chapters, story.id]);

  useEffect(() => {
    const handleChapterKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.isComposing ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return;
      }

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }

      const nextChapter = event.key === "ArrowLeft"
        ? activeChapter - 1
        : event.key === "ArrowRight"
          ? activeChapter + 1
          : activeChapter;

      if (nextChapter === activeChapter || nextChapter < 0 || nextChapter >= chapters.length) {
        return;
      }

      event.preventDefault();
      goToChapter(nextChapter);
    };

    window.addEventListener("keydown", handleChapterKeyDown);
    return () => window.removeEventListener("keydown", handleChapterKeyDown);
  }, [activeChapter, chapters.length, goToChapter]);

  return (
    <main className="reader-page" style={{ "--reader-size": `${size}px` } as React.CSSProperties}>
      <div className="reader-top">
        <button className="text-button" onClick={onBack}>← {t.returnCatalog}</button>
        <div className="reader-status"><span>{formatReads(views, lang, t)}</span><span>{t.paired}</span></div>
      </div>
      <div className="reader-layout">
        <aside className="chapter-list">
          <p className="eyebrow">{t.chapters}</p>
          {chapters.map((item, index) => (
            <button
              className={activeChapter === index ? "active" : ""}
              key={item.number}
              onClick={() => goToChapter(index)}
              aria-current={activeChapter === index ? "true" : undefined}
            >
              {item.number} <span>{item.title[lang]}</span>
            </button>
          ))}
          <div className="source-card">
            <strong>{t.sourceLineage}</strong>
            <span>{t.sourceWork}: {story.source[lang]}</span>
            <p>{t.sourceLineageText}</p>
          </div>
        </aside>
        <article className="reading-sheet">
          <p className="eyebrow">{story.genres[lang].join(" · ")}</p>
          <h1>{story.title[lang]}</h1>
          <p className="reader-byline">{t.by} {story.author} · {t.creatorMode}</p>
          <div className="chapter-rule"><span>{chapter.number}</span></div>
          <h2
            id={`${story.id}-chapter-${chapter.number}`}
            ref={chapterHeadingRef}
            tabIndex={-1}
          >
            {chapter.title[lang]}
          </h2>
          {chapter.paragraphs[lang].map((paragraph, index) => (
            <p className={index === 0 ? "story-lead" : undefined} key={paragraph}>
              {paragraph}
            </p>
          ))}
          {chapter.quote && <blockquote>{chapter.quote[lang]}</blockquote>}
          {chapters.length > 1 && (
            <nav className="chapter-pager" aria-label={t.chapters}>
              <button
                aria-keyshortcuts="ArrowLeft"
                disabled={activeChapter === 0}
                onClick={() => goToChapter(activeChapter - 1)}
                title={`${t.previousChapter} (←)`}
              >
                ← {t.previousChapter}
              </button>
              <span>{activeChapter + 1} / {chapters.length}</span>
              <button
                aria-keyshortcuts="ArrowRight"
                disabled={activeChapter === chapters.length - 1}
                onClick={() => goToChapter(activeChapter + 1)}
                title={`${t.nextChapter} (→)`}
              >
                {t.nextChapter} →
              </button>
            </nav>
          )}
        </article>
      </div>
    </main>
  );
}

function formatStoryLength(storyId: string, lang: Language) {
  const count = storyChapters[storyId]?.length ?? 1;
  return lang === "en" ? `${count} ${count === 1 ? "chapter" : "chapters"}` : `${count} 章`;
}
