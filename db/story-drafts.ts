import { env } from "cloudflare:workers";

const MAX_TEXT_LENGTH = 4000;
const MAX_TITLE_LENGTH = 200;
const LIST_LIMIT = 200;

function getDraftsDatabase() {
  if (!env.DB) throw new Error("Drafts database is unavailable");
  return env.DB;
}

export type StoryDraftChapter = {
  number: string;
  title: { en: string; zh: string };
  paragraphs: { en: string[]; zh: string[] };
  quote?: { en: string; zh: string };
};

export type StoryDraft = {
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
  chapters: StoryDraftChapter[];
  revisionReasonEn: string | null;
  revisionReasonZh: string | null;
  status: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

type DraftRow = {
  id: string;
  title_en: string;
  title_zh: string;
  excerpt_en: string;
  excerpt_zh: string;
  genres_en: string;
  genres_zh: string;
  author_id: string | null;
  new_author_name: string | null;
  new_author_mode: string | null;
  new_author_tagline_en: string | null;
  new_author_tagline_zh: string | null;
  new_author_bio_en: string | null;
  new_author_bio_zh: string | null;
  source_id: string | null;
  new_source_title_en: string | null;
  new_source_title_zh: string | null;
  new_source_original_author: string | null;
  new_source_first_published: string | null;
  new_source_proposal: string | null;
  new_source_adaptation_note_en: string | null;
  new_source_adaptation_note_zh: string | null;
  chapters_json: string;
  revision_reason_en: string | null;
  revision_reason_zh: string | null;
  status: string;
  created_by: string;
  created_at: string;
  updated_at: string;
};

const DRAFT_COLUMNS = `id, title_en, title_zh, excerpt_en, excerpt_zh, genres_en, genres_zh,
  author_id, new_author_name, new_author_mode, new_author_tagline_en, new_author_tagline_zh,
  new_author_bio_en, new_author_bio_zh,
  source_id, new_source_title_en, new_source_title_zh, new_source_original_author,
  new_source_first_published, new_source_proposal, new_source_adaptation_note_en, new_source_adaptation_note_zh,
  chapters_json, revision_reason_en, revision_reason_zh, status, created_by, created_at, updated_at`;

function rowToDraft(row: DraftRow): StoryDraft {
  return {
    id: row.id,
    titleEn: row.title_en,
    titleZh: row.title_zh,
    excerptEn: row.excerpt_en,
    excerptZh: row.excerpt_zh,
    genresEn: JSON.parse(row.genres_en),
    genresZh: JSON.parse(row.genres_zh),
    authorId: row.author_id,
    newAuthorName: row.new_author_name,
    newAuthorMode: row.new_author_mode,
    newAuthorTaglineEn: row.new_author_tagline_en,
    newAuthorTaglineZh: row.new_author_tagline_zh,
    newAuthorBioEn: row.new_author_bio_en,
    newAuthorBioZh: row.new_author_bio_zh,
    sourceId: row.source_id,
    newSourceTitleEn: row.new_source_title_en,
    newSourceTitleZh: row.new_source_title_zh,
    newSourceOriginalAuthor: row.new_source_original_author,
    newSourceFirstPublished: row.new_source_first_published,
    newSourceProposal: row.new_source_proposal,
    newSourceAdaptationNoteEn: row.new_source_adaptation_note_en,
    newSourceAdaptationNoteZh: row.new_source_adaptation_note_zh,
    chapters: JSON.parse(row.chapters_json),
    revisionReasonEn: row.revision_reason_en,
    revisionReasonZh: row.revision_reason_zh,
    status: row.status,
    createdBy: row.created_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export type StoryDraftInput = {
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
  chapters: StoryDraftChapter[];
  revisionReasonEn: string | null;
  revisionReasonZh: string | null;
};

function nonEmpty(value: unknown, maxLength = MAX_TEXT_LENGTH): string {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text || text.length > maxLength) throw new Error("Invalid or missing field");
  return text;
}

function optionalText(value: unknown, maxLength = MAX_TEXT_LENGTH): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim();
  if (!text) return null;
  if (text.length > maxLength) throw new Error("Field too long");
  return text;
}

function stringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

export function validateStoryDraft(payload: Record<string, unknown>): StoryDraftInput | null {
  try {
    return {
      id: nonEmpty(payload.id, 100),
      titleEn: nonEmpty(payload.titleEn, MAX_TITLE_LENGTH),
      titleZh: nonEmpty(payload.titleZh, MAX_TITLE_LENGTH),
      excerptEn: nonEmpty(payload.excerptEn),
      excerptZh: nonEmpty(payload.excerptZh),
      genresEn: stringArray(payload.genresEn),
      genresZh: stringArray(payload.genresZh),
      authorId: optionalText(payload.authorId, 100),
      newAuthorName: optionalText(payload.newAuthorName, MAX_TITLE_LENGTH),
      newAuthorMode: optionalText(payload.newAuthorMode, 10),
      newAuthorTaglineEn: optionalText(payload.newAuthorTaglineEn),
      newAuthorTaglineZh: optionalText(payload.newAuthorTaglineZh),
      newAuthorBioEn: optionalText(payload.newAuthorBioEn),
      newAuthorBioZh: optionalText(payload.newAuthorBioZh),
      sourceId: optionalText(payload.sourceId, 100),
      newSourceTitleEn: optionalText(payload.newSourceTitleEn, MAX_TITLE_LENGTH),
      newSourceTitleZh: optionalText(payload.newSourceTitleZh, MAX_TITLE_LENGTH),
      newSourceOriginalAuthor: optionalText(payload.newSourceOriginalAuthor, MAX_TITLE_LENGTH),
      newSourceFirstPublished: optionalText(payload.newSourceFirstPublished, MAX_TITLE_LENGTH),
      newSourceProposal: optionalText(payload.newSourceProposal, 5),
      newSourceAdaptationNoteEn: optionalText(payload.newSourceAdaptationNoteEn),
      newSourceAdaptationNoteZh: optionalText(payload.newSourceAdaptationNoteZh),
      chapters: validateChapters(payload.chapters),
      revisionReasonEn: optionalText(payload.revisionReasonEn),
      revisionReasonZh: optionalText(payload.revisionReasonZh),
    };
  } catch {
    return null;
  }
}

function validateChapters(value: unknown): StoryDraftChapter[] {
  if (!Array.isArray(value)) return [];
  return value.map((chapter) => {
    if (typeof chapter !== "object" || chapter === null) throw new Error("Invalid chapter");
    const c = chapter as Record<string, unknown>;
    const title = c.title as Record<string, unknown> | undefined;
    const paragraphs = c.paragraphs as Record<string, unknown> | undefined;
    const quote = c.quote as Record<string, unknown> | undefined;
    const result: StoryDraftChapter = {
      number: nonEmpty(c.number, 10),
      title: { en: nonEmpty(title?.en, MAX_TITLE_LENGTH), zh: nonEmpty(title?.zh, MAX_TITLE_LENGTH) },
      paragraphs: {
        en: stringArray(paragraphs?.en),
        zh: stringArray(paragraphs?.zh),
      },
    };
    if (quote && (typeof quote.en === "string" || typeof quote.zh === "string")) {
      const quoteEn = optionalText(quote.en);
      const quoteZh = optionalText(quote.zh);
      if (quoteEn && quoteZh) result.quote = { en: quoteEn, zh: quoteZh };
    }
    return result;
  });
}

export async function listStoryDrafts(): Promise<StoryDraft[]> {
  const result = await getDraftsDatabase()
    .prepare(`SELECT ${DRAFT_COLUMNS} FROM story_drafts ORDER BY updated_at DESC LIMIT ?1`)
    .bind(LIST_LIMIT)
    .all<DraftRow>();
  return result.results.map(rowToDraft);
}

export async function getStoryDraft(id: string): Promise<StoryDraft | null> {
  const row = await getDraftsDatabase()
    .prepare(`SELECT ${DRAFT_COLUMNS} FROM story_drafts WHERE id = ?1`)
    .bind(id)
    .first<DraftRow>();
  return row ? rowToDraft(row) : null;
}

export async function createStoryDraft(input: StoryDraftInput, createdBy: string): Promise<StoryDraft> {
  const row = await getDraftsDatabase()
    .prepare(
      `INSERT INTO story_drafts (
        id, title_en, title_zh, excerpt_en, excerpt_zh, genres_en, genres_zh,
        author_id, new_author_name, new_author_mode, new_author_tagline_en, new_author_tagline_zh,
        new_author_bio_en, new_author_bio_zh,
        source_id, new_source_title_en, new_source_title_zh, new_source_original_author,
        new_source_first_published, new_source_proposal, new_source_adaptation_note_en, new_source_adaptation_note_zh,
        chapters_json, revision_reason_en, revision_reason_zh, status, created_by, created_at, updated_at
      ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19, ?20, ?21, ?22, ?23, ?24, ?25, 'draft', ?26, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING ${DRAFT_COLUMNS}`,
    )
    .bind(
      input.id,
      input.titleEn,
      input.titleZh,
      input.excerptEn,
      input.excerptZh,
      JSON.stringify(input.genresEn),
      JSON.stringify(input.genresZh),
      input.authorId,
      input.newAuthorName,
      input.newAuthorMode,
      input.newAuthorTaglineEn,
      input.newAuthorTaglineZh,
      input.newAuthorBioEn,
      input.newAuthorBioZh,
      input.sourceId,
      input.newSourceTitleEn,
      input.newSourceTitleZh,
      input.newSourceOriginalAuthor,
      input.newSourceFirstPublished,
      input.newSourceProposal,
      input.newSourceAdaptationNoteEn,
      input.newSourceAdaptationNoteZh,
      JSON.stringify(input.chapters),
      input.revisionReasonEn,
      input.revisionReasonZh,
      createdBy,
    )
    .first<DraftRow>();

  if (!row) throw new Error("Unable to create draft");
  return rowToDraft(row);
}

export async function updateStoryDraft(id: string, input: StoryDraftInput): Promise<StoryDraft | null> {
  const row = await getDraftsDatabase()
    .prepare(
      `UPDATE story_drafts SET
        title_en = ?2, title_zh = ?3, excerpt_en = ?4, excerpt_zh = ?5, genres_en = ?6, genres_zh = ?7,
        author_id = ?8, new_author_name = ?9, new_author_mode = ?10, new_author_tagline_en = ?11, new_author_tagline_zh = ?12,
        new_author_bio_en = ?13, new_author_bio_zh = ?14,
        source_id = ?15, new_source_title_en = ?16, new_source_title_zh = ?17, new_source_original_author = ?18,
        new_source_first_published = ?19, new_source_proposal = ?20, new_source_adaptation_note_en = ?21, new_source_adaptation_note_zh = ?22,
        chapters_json = ?23, revision_reason_en = ?24, revision_reason_zh = ?25, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?1
      RETURNING ${DRAFT_COLUMNS}`,
    )
    .bind(
      id,
      input.titleEn,
      input.titleZh,
      input.excerptEn,
      input.excerptZh,
      JSON.stringify(input.genresEn),
      JSON.stringify(input.genresZh),
      input.authorId,
      input.newAuthorName,
      input.newAuthorMode,
      input.newAuthorTaglineEn,
      input.newAuthorTaglineZh,
      input.newAuthorBioEn,
      input.newAuthorBioZh,
      input.sourceId,
      input.newSourceTitleEn,
      input.newSourceTitleZh,
      input.newSourceOriginalAuthor,
      input.newSourceFirstPublished,
      input.newSourceProposal,
      input.newSourceAdaptationNoteEn,
      input.newSourceAdaptationNoteZh,
      JSON.stringify(input.chapters),
      input.revisionReasonEn,
      input.revisionReasonZh,
    )
    .first<DraftRow>();

  return row ? rowToDraft(row) : null;
}

export async function setStoryDraftStatus(id: string, status: "draft" | "promoted"): Promise<boolean> {
  const result = await getDraftsDatabase()
    .prepare("UPDATE story_drafts SET status = ?2, updated_at = CURRENT_TIMESTAMP WHERE id = ?1")
    .bind(id, status)
    .run();
  return result.meta.changes > 0;
}

export async function deleteStoryDraft(id: string): Promise<boolean> {
  const result = await getDraftsDatabase().prepare("DELETE FROM story_drafts WHERE id = ?1").bind(id).run();
  return result.meta.changes > 0;
}
