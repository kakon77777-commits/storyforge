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
