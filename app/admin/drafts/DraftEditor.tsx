"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authors } from "../../../content/authors";
import { sources } from "../../../content/sources";

type Chapter = {
  number: string;
  titleEn: string;
  titleZh: string;
  paragraphsEn: string;
  paragraphsZh: string;
  quoteEn: string;
  quoteZh: string;
};

type DraftPayload = {
  id: string;
  titleEn: string;
  titleZh: string;
  excerptEn: string;
  excerptZh: string;
  genresEn: string[];
  genresZh: string[];
  authorId: string | null;
  newAuthorName: string | null;
  newAuthorMode: string | null;
  newAuthorTaglineEn: string | null;
  newAuthorTaglineZh: string | null;
  newAuthorBioEn: string | null;
  newAuthorBioZh: string | null;
  sourceId: string | null;
  newSourceTitleEn: string | null;
  newSourceTitleZh: string | null;
  newSourceOriginalAuthor: string | null;
  newSourceFirstPublished: string | null;
  newSourceProposal: string | null;
  newSourceAdaptationNoteEn: string | null;
  newSourceAdaptationNoteZh: string | null;
  chapters: {
    number: string;
    title: { en: string; zh: string };
    paragraphs: { en: string[]; zh: string[] };
    quote?: { en: string; zh: string };
  }[];
  revisionReasonEn: string | null;
  revisionReasonZh: string | null;
  status?: string;
};

function emptyChapter(number: string): Chapter {
  return { number, titleEn: "", titleZh: "", paragraphsEn: "", paragraphsZh: "", quoteEn: "", quoteZh: "" };
}

function chapterFromDraft(c: DraftPayload["chapters"][number]): Chapter {
  return {
    number: c.number,
    titleEn: c.title.en,
    titleZh: c.title.zh,
    paragraphsEn: c.paragraphs.en.join("\n"),
    paragraphsZh: c.paragraphs.zh.join("\n"),
    quoteEn: c.quote?.en ?? "",
    quoteZh: c.quote?.zh ?? "",
  };
}

export function DraftEditor({ initialDraft }: { initialDraft?: DraftPayload }) {
  const router = useRouter();
  const isNew = !initialDraft;

  const [id, setId] = useState(initialDraft?.id ?? "");
  const [titleEn, setTitleEn] = useState(initialDraft?.titleEn ?? "");
  const [titleZh, setTitleZh] = useState(initialDraft?.titleZh ?? "");
  const [excerptEn, setExcerptEn] = useState(initialDraft?.excerptEn ?? "");
  const [excerptZh, setExcerptZh] = useState(initialDraft?.excerptZh ?? "");
  const [genresEn, setGenresEn] = useState(initialDraft?.genresEn.join(", ") ?? "");
  const [genresZh, setGenresZh] = useState(initialDraft?.genresZh.join(", ") ?? "");

  const [useExistingAuthor, setUseExistingAuthor] = useState(!!initialDraft?.authorId);
  const [authorId, setAuthorId] = useState(initialDraft?.authorId ?? Object.keys(authors)[0] ?? "");
  const [newAuthorName, setNewAuthorName] = useState(initialDraft?.newAuthorName ?? "");
  const [newAuthorMode, setNewAuthorMode] = useState(initialDraft?.newAuthorMode ?? "A1");
  const [newAuthorTaglineEn, setNewAuthorTaglineEn] = useState(initialDraft?.newAuthorTaglineEn ?? "");
  const [newAuthorTaglineZh, setNewAuthorTaglineZh] = useState(initialDraft?.newAuthorTaglineZh ?? "");
  const [newAuthorBioEn, setNewAuthorBioEn] = useState(initialDraft?.newAuthorBioEn ?? "");
  const [newAuthorBioZh, setNewAuthorBioZh] = useState(initialDraft?.newAuthorBioZh ?? "");

  const [useExistingSource, setUseExistingSource] = useState(!!initialDraft?.sourceId);
  const [sourceId, setSourceId] = useState(initialDraft?.sourceId ?? Object.keys(sources)[0] ?? "");
  const [newSourceTitleEn, setNewSourceTitleEn] = useState(initialDraft?.newSourceTitleEn ?? "");
  const [newSourceTitleZh, setNewSourceTitleZh] = useState(initialDraft?.newSourceTitleZh ?? "");
  const [newSourceOriginalAuthor, setNewSourceOriginalAuthor] = useState(initialDraft?.newSourceOriginalAuthor ?? "");
  const [newSourceFirstPublished, setNewSourceFirstPublished] = useState(initialDraft?.newSourceFirstPublished ?? "");
  const [newSourceProposal, setNewSourceProposal] = useState(initialDraft?.newSourceProposal ?? "A");
  const [newSourceAdaptationNoteEn, setNewSourceAdaptationNoteEn] = useState(
    initialDraft?.newSourceAdaptationNoteEn ?? "",
  );
  const [newSourceAdaptationNoteZh, setNewSourceAdaptationNoteZh] = useState(
    initialDraft?.newSourceAdaptationNoteZh ?? "",
  );

  const [chapters, setChapters] = useState<Chapter[]>(
    initialDraft?.chapters.length ? initialDraft.chapters.map(chapterFromDraft) : [emptyChapter("01")],
  );

  const [revisionReasonEn, setRevisionReasonEn] = useState(initialDraft?.revisionReasonEn ?? "");
  const [revisionReasonZh, setRevisionReasonZh] = useState(initialDraft?.revisionReasonZh ?? "");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [exportText, setExportText] = useState("");
  const [status, setStatus] = useState(initialDraft?.status ?? "draft");

  function updateChapter(index: number, patch: Partial<Chapter>) {
    setChapters((prev) => prev.map((c, i) => (i === index ? { ...c, ...patch } : c)));
  }

  function addChapter() {
    const nextNumber = String(chapters.length + 1).padStart(2, "0");
    setChapters((prev) => [...prev, emptyChapter(nextNumber)]);
  }

  function removeChapter(index: number) {
    setChapters((prev) => prev.filter((_, i) => i !== index));
  }

  function moveChapter(index: number, direction: -1 | 1) {
    setChapters((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function buildPayload(): DraftPayload {
    return {
      id,
      titleEn,
      titleZh,
      excerptEn,
      excerptZh,
      genresEn: genresEn.split(",").map((s) => s.trim()).filter(Boolean),
      genresZh: genresZh.split(",").map((s) => s.trim()).filter(Boolean),
      authorId: useExistingAuthor ? authorId : null,
      newAuthorName: useExistingAuthor ? null : newAuthorName,
      newAuthorMode: useExistingAuthor ? null : newAuthorMode,
      newAuthorTaglineEn: useExistingAuthor ? null : newAuthorTaglineEn,
      newAuthorTaglineZh: useExistingAuthor ? null : newAuthorTaglineZh,
      newAuthorBioEn: useExistingAuthor ? null : newAuthorBioEn,
      newAuthorBioZh: useExistingAuthor ? null : newAuthorBioZh,
      sourceId: useExistingSource ? sourceId : null,
      newSourceTitleEn: useExistingSource ? null : newSourceTitleEn,
      newSourceTitleZh: useExistingSource ? null : newSourceTitleZh,
      newSourceOriginalAuthor: useExistingSource ? null : newSourceOriginalAuthor,
      newSourceFirstPublished: useExistingSource ? null : newSourceFirstPublished,
      newSourceProposal: useExistingSource ? null : newSourceProposal,
      newSourceAdaptationNoteEn: useExistingSource ? null : newSourceAdaptationNoteEn,
      newSourceAdaptationNoteZh: useExistingSource ? null : newSourceAdaptationNoteZh,
      chapters: chapters.map((c) => ({
        number: c.number,
        title: { en: c.titleEn, zh: c.titleZh },
        paragraphs: {
          en: c.paragraphsEn.split("\n").map((s) => s.trim()).filter(Boolean),
          zh: c.paragraphsZh.split("\n").map((s) => s.trim()).filter(Boolean),
        },
        ...(c.quoteEn && c.quoteZh ? { quote: { en: c.quoteEn, zh: c.quoteZh } } : {}),
      })),
      revisionReasonEn,
      revisionReasonZh,
    };
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      const payload = buildPayload();
      const response = await fetch(isNew ? "/api/admin/drafts" : `/api/admin/drafts/${id}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { error?: string };
        setError(body.error ?? "Save failed");
        setSaving(false);
        return;
      }
      if (isNew) {
        router.push(`/admin/drafts/${id}`);
        return;
      }
      router.refresh();
    } catch {
      setError("Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function togglePromoted() {
    const nextStatus = status === "promoted" ? "draft" : "promoted";
    const response = await fetch(`/api/admin/drafts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    if (response.ok) setStatus(nextStatus);
  }

  function generateExport() {
    const payload = buildPayload();
    const g = (arr: string[]) => JSON.stringify(arr);

    const authorBlock = useExistingAuthor
      ? "// (using existing author, no authors.ts change needed)"
      : `  ${payload.id}: {
    id: "${payload.id}",
    name: "${newAuthorName}",
    authorMode: "${newAuthorMode}",
    tagline: { en: "${newAuthorTaglineEn}", zh: "${newAuthorTaglineZh}" },
    bio: { en: "${newAuthorBioEn}", zh: "${newAuthorBioZh}" },
  },`;

    const sourceBlock = useExistingSource
      ? "// (using existing source, no sources.ts change needed)"
      : `  "${payload.id}": {
    id: "${payload.id}",
    title: { en: "${newSourceTitleEn}", zh: "${newSourceTitleZh}" },
    originalAuthor: "${newSourceOriginalAuthor}",
    firstPublished: "${newSourceFirstPublished}",
    publicDomainStatus: "confirmed",
    legalReviewStatus: "confirmed",
    adaptationProposal: "${newSourceProposal}",
    adaptationNote: { en: "${newSourceAdaptationNoteEn}", zh: "${newSourceAdaptationNoteZh}" },
  },`;

    const storyBlock = `  {
    id: "${payload.id}",
    title: { en: "${titleEn}", zh: "${titleZh}" },
    source: { en: "${useExistingSource ? sources[sourceId]?.title.en : newSourceTitleEn}", zh: "${useExistingSource ? sources[sourceId]?.title.zh : newSourceTitleZh}" },
    author: "${useExistingAuthor ? authors[authorId]?.name : newAuthorName} · AI",
    authorId: "${useExistingAuthor ? authorId : payload.id}",
    sourceId: "${useExistingSource ? sourceId : payload.id}",
    status: "draft",
    revision: 1,
    genres: { en: ${g(payload.genresEn)}, zh: ${g(payload.genresZh)} },
    rank: /* next rank */,
    excerpt: { en: "${excerptEn}", zh: "${excerptZh}" },
  },`;

    const chaptersBlock = `  "${payload.id}": [
${payload.chapters
  .map(
    (c, i) => `    {
      number: "${c.number}",
      title: { en: "${c.title.en}", zh: "${c.title.zh}" },
      paragraphs: {
        en: [${c.paragraphs.en.map((p) => `\n          "${p}",`).join("")}\n        ],
        zh: [${c.paragraphs.zh.map((p) => `\n          "${p}",`).join("")}\n        ],
      },${
        c.quote
          ? `\n      quote: { en: "${c.quote.en}", zh: "${c.quote.zh}" },`
          : ""
      }
    },${i < payload.chapters.length - 1 ? "" : ""}`,
  )
  .join("\n")}
  ],`;

    const revisionBlock = `  "${payload.id}": [
    {
      revision: "01",
      date: "${new Date().toISOString().slice(0, 10)}",
      actor: { type: "ai", name: "Colophon" },
      action: { en: "Initial ${payload.chapters.length}-chapter bilingual draft", zh: "初版${payload.chapters.length}章雙語草稿" },
      reason: {
        en: "${revisionReasonEn}",
        zh: "${revisionReasonZh}",
      },
      humanReviewed: false,
    },
  ],`;

    setExportText(
      [
        "// --- content/authors.ts ---",
        authorBlock,
        "",
        "// --- content/sources.ts ---",
        sourceBlock,
        "",
        "// --- content/stories.ts ---",
        storyBlock,
        "",
        "// --- content/story-chapters.ts ---",
        chaptersBlock,
        "",
        "// --- content/revisions.ts ---",
        revisionBlock,
      ].join("\n"),
    );
  }

  return (
    <div className="draft-editor">
      <div className="admin-field-row">
        <label>
          <span>Story id (slug)</span>
          <input value={id} onChange={(e) => setId(e.target.value)} disabled={!isNew} />
        </label>
      </div>

      <div className="admin-field-row admin-field-pair">
        <label>
          <span>Title (EN)</span>
          <input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />
        </label>
        <label>
          <span>Title (ZH)</span>
          <input value={titleZh} onChange={(e) => setTitleZh(e.target.value)} />
        </label>
      </div>

      <div className="admin-field-row admin-field-pair">
        <label>
          <span>Excerpt (EN)</span>
          <textarea value={excerptEn} onChange={(e) => setExcerptEn(e.target.value)} />
        </label>
        <label>
          <span>Excerpt (ZH)</span>
          <textarea value={excerptZh} onChange={(e) => setExcerptZh(e.target.value)} />
        </label>
      </div>

      <div className="admin-field-row admin-field-pair">
        <label>
          <span>Genres (EN, comma-separated)</span>
          <input value={genresEn} onChange={(e) => setGenresEn(e.target.value)} />
        </label>
        <label>
          <span>Genres (ZH, comma-separated)</span>
          <input value={genresZh} onChange={(e) => setGenresZh(e.target.value)} />
        </label>
      </div>

      <fieldset className="admin-fieldset">
        <legend>Author</legend>
        <label className="admin-toggle">
          <input
            type="checkbox"
            checked={useExistingAuthor}
            onChange={(e) => setUseExistingAuthor(e.target.checked)}
          />
          <span>Use an existing author</span>
        </label>
        {useExistingAuthor ? (
          <label>
            <span>Author</span>
            <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
              {Object.values(authors).map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <>
            <div className="admin-field-row admin-field-pair">
              <label>
                <span>New author name</span>
                <input value={newAuthorName} onChange={(e) => setNewAuthorName(e.target.value)} />
              </label>
              <label>
                <span>Author mode</span>
                <select value={newAuthorMode} onChange={(e) => setNewAuthorMode(e.target.value)}>
                  <option value="H1">H1 — Human-Led</option>
                  <option value="H2">H2 — Co-Created</option>
                  <option value="A1">A1 — AI-Led, human curated</option>
                  <option value="A2">A2 — AI-Originated</option>
                  <option value="A3">A3 — AI-Autonomous experimental</option>
                </select>
              </label>
            </div>
            <div className="admin-field-row admin-field-pair">
              <label>
                <span>Tagline (EN)</span>
                <input value={newAuthorTaglineEn} onChange={(e) => setNewAuthorTaglineEn(e.target.value)} />
              </label>
              <label>
                <span>Tagline (ZH)</span>
                <input value={newAuthorTaglineZh} onChange={(e) => setNewAuthorTaglineZh(e.target.value)} />
              </label>
            </div>
            <div className="admin-field-row admin-field-pair">
              <label>
                <span>Bio (EN)</span>
                <textarea value={newAuthorBioEn} onChange={(e) => setNewAuthorBioEn(e.target.value)} />
              </label>
              <label>
                <span>Bio (ZH)</span>
                <textarea value={newAuthorBioZh} onChange={(e) => setNewAuthorBioZh(e.target.value)} />
              </label>
            </div>
          </>
        )}
      </fieldset>

      <fieldset className="admin-fieldset">
        <legend>Source</legend>
        <label className="admin-toggle">
          <input
            type="checkbox"
            checked={useExistingSource}
            onChange={(e) => setUseExistingSource(e.target.checked)}
          />
          <span>Use an existing source</span>
        </label>
        {useExistingSource ? (
          <label>
            <span>Source</span>
            <select value={sourceId} onChange={(e) => setSourceId(e.target.value)}>
              {Object.values(sources).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title.en}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <>
            <div className="admin-field-row admin-field-pair">
              <label>
                <span>Source title (EN)</span>
                <input value={newSourceTitleEn} onChange={(e) => setNewSourceTitleEn(e.target.value)} />
              </label>
              <label>
                <span>Source title (ZH)</span>
                <input value={newSourceTitleZh} onChange={(e) => setNewSourceTitleZh(e.target.value)} />
              </label>
            </div>
            <div className="admin-field-row admin-field-pair">
              <label>
                <span>Original author</span>
                <input value={newSourceOriginalAuthor} onChange={(e) => setNewSourceOriginalAuthor(e.target.value)} />
              </label>
              <label>
                <span>First published</span>
                <input value={newSourceFirstPublished} onChange={(e) => setNewSourceFirstPublished(e.target.value)} />
              </label>
            </div>
            <label>
              <span>Adaptation proposal</span>
              <select value={newSourceProposal} onChange={(e) => setNewSourceProposal(e.target.value)}>
                <option value="A">A — faithful</option>
                <option value="B">B — inverts the moral</option>
                <option value="C">C — structural skeleton only</option>
              </select>
            </label>
            <div className="admin-field-row admin-field-pair">
              <label>
                <span>Adaptation note (EN)</span>
                <textarea
                  value={newSourceAdaptationNoteEn}
                  onChange={(e) => setNewSourceAdaptationNoteEn(e.target.value)}
                />
              </label>
              <label>
                <span>Adaptation note (ZH)</span>
                <textarea
                  value={newSourceAdaptationNoteZh}
                  onChange={(e) => setNewSourceAdaptationNoteZh(e.target.value)}
                />
              </label>
            </div>
          </>
        )}
      </fieldset>

      <fieldset className="admin-fieldset">
        <legend>Chapters</legend>
        {chapters.map((chapter, index) => (
          <div className="admin-chapter" key={index}>
            <div className="admin-chapter-head">
              <strong>Chapter {chapter.number}</strong>
              <div className="admin-chapter-actions">
                <button type="button" onClick={() => moveChapter(index, -1)} disabled={index === 0}>
                  ↑
                </button>
                <button type="button" onClick={() => moveChapter(index, 1)} disabled={index === chapters.length - 1}>
                  ↓
                </button>
                <button type="button" onClick={() => removeChapter(index)}>
                  Remove
                </button>
              </div>
            </div>
            <div className="admin-field-row admin-field-pair">
              <label>
                <span>Number</span>
                <input value={chapter.number} onChange={(e) => updateChapter(index, { number: e.target.value })} />
              </label>
            </div>
            <div className="admin-field-row admin-field-pair">
              <label>
                <span>Chapter title (EN)</span>
                <input value={chapter.titleEn} onChange={(e) => updateChapter(index, { titleEn: e.target.value })} />
              </label>
              <label>
                <span>Chapter title (ZH)</span>
                <input value={chapter.titleZh} onChange={(e) => updateChapter(index, { titleZh: e.target.value })} />
              </label>
            </div>
            <div className="admin-field-row admin-field-pair">
              <label>
                <span>Paragraphs (EN, one per line)</span>
                <textarea
                  className="admin-paragraphs"
                  value={chapter.paragraphsEn}
                  onChange={(e) => updateChapter(index, { paragraphsEn: e.target.value })}
                />
              </label>
              <label>
                <span>Paragraphs (ZH, one per line)</span>
                <textarea
                  className="admin-paragraphs"
                  value={chapter.paragraphsZh}
                  onChange={(e) => updateChapter(index, { paragraphsZh: e.target.value })}
                />
              </label>
            </div>
            <div className="admin-field-row admin-field-pair">
              <label>
                <span>Closing quote (EN, optional)</span>
                <input value={chapter.quoteEn} onChange={(e) => updateChapter(index, { quoteEn: e.target.value })} />
              </label>
              <label>
                <span>Closing quote (ZH, optional)</span>
                <input value={chapter.quoteZh} onChange={(e) => updateChapter(index, { quoteZh: e.target.value })} />
              </label>
            </div>
          </div>
        ))}
        <button type="button" className="primary-small" onClick={addChapter}>
          Add chapter
        </button>
      </fieldset>

      <fieldset className="admin-fieldset">
        <legend>Revision ledger reason</legend>
        <div className="admin-field-row admin-field-pair">
          <label>
            <span>Reason (EN)</span>
            <textarea value={revisionReasonEn} onChange={(e) => setRevisionReasonEn(e.target.value)} />
          </label>
          <label>
            <span>Reason (ZH)</span>
            <textarea value={revisionReasonZh} onChange={(e) => setRevisionReasonZh(e.target.value)} />
          </label>
        </div>
      </fieldset>

      <div className="admin-actions">
        {error && <span className="discussion-error">{error}</span>}
        <button className="primary-small" type="button" onClick={save} disabled={saving || !id}>
          {saving ? "Saving…" : isNew ? "Create draft" : "Save changes"}
        </button>
        {!isNew && (
          <>
            <button type="button" onClick={generateExport}>
              Generate content/*.ts snippets
            </button>
            <button type="button" onClick={togglePromoted}>
              {status === "promoted" ? "Mark as not yet promoted" : "Mark as promoted"}
            </button>
          </>
        )}
      </div>

      {exportText && (
        <pre className="admin-export">
          <code>{exportText}</code>
        </pre>
      )}
    </div>
  );
}
