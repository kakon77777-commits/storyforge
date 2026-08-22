import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const storyViews = sqliteTable("story_views", {
  storyId: text("story_id").primaryKey(),
  views: integer("views").notNull().default(0),
  updatedAt: text("updated_at").notNull(),
});

export const discussionPosts = sqliteTable("discussion_posts", {
  id: text("id").primaryKey(),
  authorLabel: text("author_label").notNull(),
  content: text("content").notNull(),
  createdAt: text("created_at").notNull(),
  parentId: text("parent_id"),
});

export const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey(),
  displayName: text("display_name").notNull(),
  authType: text("auth_type").notNull(), // 'admin' | 'google_oauth' | 'ai_protocol'
  credentialHash: text("credential_hash"), // set for 'admin' rows only
  externalProviderId: text("external_provider_id"), // reserved: future OAuth sub / AI-protocol id
  status: text("status").notNull().default("active"), // 'active' | 'suspended'
  createdAt: text("created_at").notNull(),
  lastLoginAt: text("last_login_at"),
});

export const adminSessions = sqliteTable("admin_sessions", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  createdAt: text("created_at").notNull(),
  expiresAt: text("expires_at").notNull(),
});

export const storyDrafts = sqliteTable("story_drafts", {
  id: text("id").primaryKey(),
  titleEn: text("title_en").notNull(),
  titleZh: text("title_zh").notNull(),
  excerptEn: text("excerpt_en").notNull(),
  excerptZh: text("excerpt_zh").notNull(),
  genresEn: text("genres_en").notNull(), // JSON string[]
  genresZh: text("genres_zh").notNull(), // JSON string[]

  authorId: text("author_id"), // set when reusing an existing author
  newAuthorName: text("new_author_name"),
  newAuthorMode: text("new_author_mode"), // 'H1'|'H2'|'A1'|'A2'|'A3'
  newAuthorTaglineEn: text("new_author_tagline_en"),
  newAuthorTaglineZh: text("new_author_tagline_zh"),
  newAuthorBioEn: text("new_author_bio_en"),
  newAuthorBioZh: text("new_author_bio_zh"),

  sourceId: text("source_id"), // set when reusing an existing source
  newSourceTitleEn: text("new_source_title_en"),
  newSourceTitleZh: text("new_source_title_zh"),
  newSourceOriginalAuthor: text("new_source_original_author"),
  newSourceFirstPublished: text("new_source_first_published"),
  newSourceProposal: text("new_source_proposal"), // 'A'|'B'|'C'
  newSourceAdaptationNoteEn: text("new_source_adaptation_note_en"),
  newSourceAdaptationNoteZh: text("new_source_adaptation_note_zh"),

  chaptersJson: text("chapters_json").notNull(), // JSON StoryChapter[]
  revisionReasonEn: text("revision_reason_en"),
  revisionReasonZh: text("revision_reason_zh"),

  status: text("status").notNull().default("draft"), // 'draft' | 'promoted'
  createdBy: text("created_by").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});
