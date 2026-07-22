"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { storyChapters } from "../content/story-chapters";
import { authors, type AuthorProfile } from "../content/authors";
import { sources, type SourceProfile } from "../content/sources";
import { revisionLedgers } from "../content/revisions";
import { stories, type Story } from "../content/stories";

type Language = "en" | "zh";
type Theme = "light" | "dark";
type Style = "canvas" | "literary" | "compact";
type View = "library" | "studio" | "webfiction" | "reader" | "author" | "source";
type Filter = "all" | "drafts" | "published" | "bilingual";
type ViewCounts = Record<string, number | null>;

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
    backToLibrary: "Back to library",
    aboutAuthor: "About this AI author",
    authorModeLabel: "Author mode",
    authorModeValue: {
      H1: "H1 · Human-Led",
      H2: "H2 · Co-Created",
      A1: "A1 · AI-Led, human curated",
      A2: "A2 · AI-Originated",
      A3: "A3 · AI-Autonomous experimental",
    },
    worksBy: "Works by",
    viewProfile: "View author profile",
    sourceOriginalAuthor: "Original author",
    sourceFirstPublished: "First published",
    sourcePublicDomain: "Public-domain status",
    sourceLegalReview: "Legal review",
    statusConfirmed: "Confirmed",
    statusReviewRequired: "Review required",
    statusPending: "Pending",
    statusInternalReview: "Internal review",
    adaptationProposalLabel: "Adaptation proposal used",
    adaptationProposalValue: {
      A: "A · Faithful to the source premise",
      B: "B · Inverts the source's moral",
      C: "C · AI-native dilemma, structure only",
    },
    adaptationNoteLabel: "Adaptation notes",
    adaptedInto: "Adapted into",
    viewSourcePage: "View source & adaptation notes",
    revisionHistory: "Revision history",
    humanReviewedTag: "Human reviewed",
    aiOnlyTag: "AI-only, pending review",
    downloadMarkdown: "Download Markdown",
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
    backToLibrary: "返回作品庫",
    aboutAuthor: "關於這位 AI 作者",
    authorModeLabel: "作者模式",
    authorModeValue: {
      H1: "H1 · 人類主導",
      H2: "H2 · 人機共創",
      A1: "A1 · AI 主筆，人類策劃",
      A2: "A2 · AI 原生題材",
      A3: "A3 · AI 自主實驗性創作",
    },
    worksBy: "作品",
    viewProfile: "查看作者頁",
    sourceOriginalAuthor: "原作者",
    sourceFirstPublished: "首次發表",
    sourcePublicDomain: "公版狀態",
    sourceLegalReview: "法律審核",
    statusConfirmed: "已確認",
    statusReviewRequired: "需審查",
    statusPending: "審核中",
    statusInternalReview: "內部審核中",
    adaptationProposalLabel: "採用的改編提案",
    adaptationProposalValue: {
      A: "A 案 · 忠於原命題",
      B: "B 案 · 反轉原命題",
      C: "C 案 · 只留結構，AI 原生困境",
    },
    adaptationNoteLabel: "改編說明",
    adaptedInto: "改編作品",
    viewSourcePage: "查看原典來源與改編說明",
    revisionHistory: "修訂歷史",
    humanReviewedTag: "人類已審核",
    aiOnlyTag: "僅 AI，尚待審核",
    downloadMarkdown: "下載 Markdown 原始檔",
  },
} as const;

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
  const [selectedAuthorId, setSelectedAuthorId] = useState<string>(stories[0].authorId);
  const [authorReturnView, setAuthorReturnView] = useState<View>("library");
  const [selectedSourceId, setSelectedSourceId] = useState<string>(stories[0].sourceId);
  const [sourceReturnView, setSourceReturnView] = useState<View>("library");
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
    document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
  }, [lang]);

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

  const openAuthor = (authorId: string) => {
    setSelectedAuthorId(authorId);
    setAuthorReturnView(view === "author" ? authorReturnView : view);
    setView("author");
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const openSource = (sourceId: string) => {
    setSelectedSourceId(sourceId);
    setSourceReturnView(view === "source" ? sourceReturnView : view);
    setView("source");
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
          onAuthor={openAuthor}
          onSource={openSource}
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
          onAuthor={openAuthor}
          onSource={openSource}
        />
      )}

      {view === "author" && (
        <AuthorView
          lang={lang}
          t={t}
          author={authors[selectedAuthorId]}
          works={stories.filter((story) => story.authorId === selectedAuthorId)}
          viewCounts={viewCounts}
          onBack={() => setView(authorReturnView)}
          onRead={openReader}
          onSource={openSource}
        />
      )}

      {view === "source" && (
        <SourceView
          lang={lang}
          t={t}
          source={sources[selectedSourceId]}
          works={stories.filter((story) => story.sourceId === selectedSourceId)}
          viewCounts={viewCounts}
          onBack={() => setView(sourceReturnView)}
          onRead={openReader}
          onAuthor={openAuthor}
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
  onAuthor,
  onSource,
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
  onAuthor: (authorId: string) => void;
  onSource: (sourceId: string) => void;
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
            <StoryCard
              key={story.id}
              story={story}
              lang={lang}
              t={t}
              views={viewCounts[story.id]}
              onRead={() => onRead(story)}
              onAuthor={() => onAuthor(story.authorId)}
              onSource={() => onSource(story.sourceId)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function StoryCard({ story, lang, t, views, onRead, onAuthor, onSource }: { story: Story; lang: Language; t: typeof copy.en | typeof copy.zh; views: number | null; onRead: () => void; onAuthor: () => void; onSource: () => void }) {
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
          <p className="adapted">
            {lang === "en" ? "Adapted from " : "改編自"}
            <button
              className="author-link"
              onClick={(event) => { event.stopPropagation(); onSource(); }}
            >
              {story.source[lang]}
            </button>
          </p>
        </div>
        <div className="meta-lines">
          <p><span className="meta-icon">◎</span>{t.paired}</p>
          <p>
            <span className="ai-badge">AI</span>{t.by}{" "}
            <button
              className="author-link"
              onClick={(event) => { event.stopPropagation(); onAuthor(); }}
            >
              {story.author}
            </button>
          </p>
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

function ReaderView({ lang, t, story, views, size, onBack, onAuthor, onSource }: { lang: Language; t: typeof copy.en | typeof copy.zh; story: Story; views: number | null; size: number; onBack: () => void; onAuthor: (authorId: string) => void; onSource: (sourceId: string) => void }) {
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
        <div className="reader-status">
          <span>{formatReads(views, lang, t)}</span>
          <span>{t.paired}</span>
          <a className="download-markdown" href={`/api/views?markdown=${story.id}`} download={`${story.id}.md`}>
            ⬇ {t.downloadMarkdown}
          </a>
        </div>
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
            <button className="author-link source-card-link" onClick={() => onSource(story.sourceId)}>
              {t.viewSourcePage} →
            </button>
          </div>

          <div className="ledger-card">
            <strong>{t.revisionHistory}</strong>
            <ol className="ledger-timeline">
              {(revisionLedgers[story.id] ?? []).map((entry) => (
                <li key={entry.revision}>
                  <span className="ledger-rev">{entry.revision}</span>
                  <div>
                    <p className="ledger-action">
                      <span className={`ledger-actor ledger-actor-${entry.actor.type}`}>
                        {entry.actor.type === "ai" ? "AI" : "H"}
                      </span>
                      {entry.actor.name} — {entry.action[lang]}
                    </p>
                    <p className="ledger-reason">{entry.reason[lang]}</p>
                    <p className="ledger-date">
                      {entry.date} · {entry.humanReviewed ? `✓ ${t.humanReviewedTag}` : t.aiOnlyTag}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </aside>
        <article className="reading-sheet">
          <p className="eyebrow">{story.genres[lang].join(" · ")}</p>
          <h1>{story.title[lang]}</h1>
          <p className="reader-byline">
            {t.by}{" "}
            <button className="author-link author-link-inline" onClick={() => onAuthor(story.authorId)}>
              {story.author}
            </button>
            {" "}· {t.creatorMode}
          </p>
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

function AuthorView({
  lang,
  t,
  author,
  works,
  viewCounts,
  onBack,
  onRead,
  onSource,
}: {
  lang: Language;
  t: typeof copy.en | typeof copy.zh;
  author: AuthorProfile;
  works: Story[];
  viewCounts: ViewCounts;
  onBack: () => void;
  onRead: (story: Story) => void;
  onSource: (sourceId: string) => void;
}) {
  return (
    <main className="author-page">
      <div className="page-bar">
        <button className="text-button" onClick={onBack}>← {t.backToLibrary}</button>
      </div>

      <section className="author-hero">
        <div className="author-avatar" aria-hidden="true">{author.name[0]}</div>
        <div>
          <p className="eyebrow">AI Canon Zero · {t.worksBy}</p>
          <h1>{author.name}</h1>
          <p className="author-tagline">{author.tagline[lang]}</p>
          <div className="author-badges">
            <span className="ai-badge">AI</span>
            <span className="author-mode-pill">{t.authorModeValue[author.authorMode]}</span>
          </div>
        </div>
      </section>

      <section className="author-bio">
        <h2>{t.aboutAuthor}</h2>
        <p>{author.bio[lang]}</p>
      </section>

      <section className="author-works">
        <h2>{t.worksBy} {author.name}</h2>
        <div className="story-list">
          {works.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              lang={lang}
              t={t}
              views={viewCounts[story.id]}
              onRead={() => onRead(story)}
              onAuthor={() => {}}
              onSource={() => onSource(story.sourceId)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function SourceView({
  lang,
  t,
  source,
  works,
  viewCounts,
  onBack,
  onRead,
  onAuthor,
}: {
  lang: Language;
  t: typeof copy.en | typeof copy.zh;
  source: SourceProfile;
  works: Story[];
  viewCounts: ViewCounts;
  onBack: () => void;
  onRead: (story: Story) => void;
  onAuthor: (authorId: string) => void;
}) {
  const statusLabel = (status: SourceProfile["publicDomainStatus"] | SourceProfile["legalReviewStatus"]) => {
    if (status === "confirmed") return t.statusConfirmed;
    if (status === "review_required") return t.statusReviewRequired;
    if (status === "internal_review") return t.statusInternalReview;
    return t.statusPending;
  };

  return (
    <main className="author-page source-page">
      <div className="page-bar">
        <button className="text-button" onClick={onBack}>← {t.backToLibrary}</button>
      </div>

      <section className="author-hero">
        <div className="author-avatar source-avatar" aria-hidden="true">◈</div>
        <div>
          <p className="eyebrow">AI Canon Zero · {t.sourceWork}</p>
          <h1>{source.title[lang]}</h1>
          <div className="source-meta-grid">
            <div><span>{t.sourceOriginalAuthor}</span><strong>{source.originalAuthor}</strong></div>
            <div><span>{t.sourceFirstPublished}</span><strong>{source.firstPublished}</strong></div>
            <div><span>{t.sourcePublicDomain}</span><strong className="status-ok">✓ {statusLabel(source.publicDomainStatus)}</strong></div>
            <div><span>{t.sourceLegalReview}</span><strong className="status-ok">✓ {statusLabel(source.legalReviewStatus)}</strong></div>
          </div>
        </div>
      </section>

      <section className="author-bio">
        <h2>{t.adaptationProposalLabel}</h2>
        <p className="proposal-pill">{t.adaptationProposalValue[source.adaptationProposal]}</p>
        <h2 className="adaptation-note-heading">{t.adaptationNoteLabel}</h2>
        <p>{source.adaptationNote[lang]}</p>
      </section>

      <section className="author-works">
        <h2>{t.adaptedInto}</h2>
        <div className="story-list">
          {works.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              lang={lang}
              t={t}
              views={viewCounts[story.id]}
              onRead={() => onRead(story)}
              onAuthor={() => onAuthor(story.authorId)}
              onSource={() => {}}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function formatStoryLength(storyId: string, lang: Language) {
  const count = storyChapters[storyId]?.length ?? 1;
  return lang === "en" ? `${count} ${count === 1 ? "chapter" : "chapters"}` : `${count} 章`;
}
