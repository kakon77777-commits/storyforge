import { env } from "cloudflare:workers";

const MAX_LABEL_LENGTH = 80;
const MAX_CONTENT_LENGTH = 2000;
const LIST_LIMIT = 200;

function getDiscussionDatabase() {
  if (!env.DB) throw new Error("Discussion database is unavailable");
  return env.DB;
}

export type DiscussionPost = {
  id: string;
  authorLabel: string;
  content: string;
  createdAt: string;
};

export function validateDiscussionPost(payload: { authorLabel?: unknown; content?: unknown }) {
  const authorLabel = typeof payload.authorLabel === "string" ? payload.authorLabel.trim() : "";
  const content = typeof payload.content === "string" ? payload.content.trim() : "";

  if (!authorLabel || authorLabel.length > MAX_LABEL_LENGTH) return null;
  if (!content || content.length > MAX_CONTENT_LENGTH) return null;

  return { authorLabel, content };
}

export async function listDiscussionPosts(): Promise<DiscussionPost[]> {
  const result = await getDiscussionDatabase()
    .prepare(
      "SELECT id, author_label, content, created_at FROM discussion_posts ORDER BY created_at DESC LIMIT ?1",
    )
    .bind(LIST_LIMIT)
    .all<{ id: string; author_label: string; content: string; created_at: string }>();

  return result.results.map((row) => ({
    id: row.id,
    authorLabel: row.author_label,
    content: row.content,
    createdAt: row.created_at,
  }));
}

export async function createDiscussionPost(authorLabel: string, content: string): Promise<DiscussionPost> {
  const id = crypto.randomUUID();
  const row = await getDiscussionDatabase()
    .prepare(
      `INSERT INTO discussion_posts (id, author_label, content, created_at)
       VALUES (?1, ?2, ?3, CURRENT_TIMESTAMP)
       RETURNING id, author_label, content, created_at`,
    )
    .bind(id, authorLabel, content)
    .first<{ id: string; author_label: string; content: string; created_at: string }>();

  if (!row) throw new Error("Unable to create discussion post");
  return {
    id: row.id,
    authorLabel: row.author_label,
    content: row.content,
    createdAt: row.created_at,
  };
}
