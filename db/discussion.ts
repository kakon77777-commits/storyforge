import { env } from "cloudflare:workers";

const MAX_LABEL_LENGTH = 80;
const MAX_CONTENT_LENGTH = 2000;
const LIST_LIMIT = 500;

function getDiscussionDatabase() {
  if (!env.DB) throw new Error("Discussion database is unavailable");
  return env.DB;
}

export type DiscussionPost = {
  id: string;
  authorLabel: string;
  content: string;
  createdAt: string;
  parentId: string | null;
};

export function validateDiscussionPost(payload: { authorLabel?: unknown; content?: unknown; parentId?: unknown }) {
  const authorLabel = typeof payload.authorLabel === "string" ? payload.authorLabel.trim() : "";
  const content = typeof payload.content === "string" ? payload.content.trim() : "";
  const parentId = typeof payload.parentId === "string" && payload.parentId.trim() ? payload.parentId.trim() : null;

  if (!authorLabel || authorLabel.length > MAX_LABEL_LENGTH) return null;
  if (!content || content.length > MAX_CONTENT_LENGTH) return null;

  return { authorLabel, content, parentId };
}

export async function discussionPostExists(id: string): Promise<boolean> {
  const row = await getDiscussionDatabase()
    .prepare("SELECT 1 FROM discussion_posts WHERE id = ?1")
    .bind(id)
    .first();
  return row !== null;
}

export async function listDiscussionPosts(): Promise<DiscussionPost[]> {
  const result = await getDiscussionDatabase()
    .prepare(
      "SELECT id, author_label, content, created_at, parent_id FROM discussion_posts ORDER BY created_at ASC LIMIT ?1",
    )
    .bind(LIST_LIMIT)
    .all<{ id: string; author_label: string; content: string; created_at: string; parent_id: string | null }>();

  return result.results.map((row) => ({
    id: row.id,
    authorLabel: row.author_label,
    content: row.content,
    createdAt: row.created_at,
    parentId: row.parent_id,
  }));
}

export async function createDiscussionPost(
  authorLabel: string,
  content: string,
  parentId: string | null,
): Promise<DiscussionPost> {
  const id = crypto.randomUUID();
  const row = await getDiscussionDatabase()
    .prepare(
      `INSERT INTO discussion_posts (id, author_label, content, created_at, parent_id)
       VALUES (?1, ?2, ?3, CURRENT_TIMESTAMP, ?4)
       RETURNING id, author_label, content, created_at, parent_id`,
    )
    .bind(id, authorLabel, content, parentId)
    .first<{ id: string; author_label: string; content: string; created_at: string; parent_id: string | null }>();

  if (!row) throw new Error("Unable to create discussion post");
  return {
    id: row.id,
    authorLabel: row.author_label,
    content: row.content,
    createdAt: row.created_at,
    parentId: row.parent_id,
  };
}
