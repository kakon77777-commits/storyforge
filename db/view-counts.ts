import { env } from "cloudflare:workers";

const KNOWN_STORY_IDS = new Set([
  "last-signal",
  "slow-light",
  "pinocchio-refuses",
  "seven-backups",
]);

function getViewsDatabase() {
  if (!env.DB) throw new Error("Story view database is unavailable");
  return env.DB;
}

export function isKnownStoryId(storyId: string) {
  return KNOWN_STORY_IDS.has(storyId);
}

export async function listStoryViews() {
  const result = await getViewsDatabase()
    .prepare("SELECT story_id, views FROM story_views ORDER BY story_id")
    .all<{ story_id: string; views: number }>();

  return Object.fromEntries(
    result.results.map((row) => [row.story_id, Number(row.views)]),
  );
}

export async function incrementStoryView(storyId: string) {
  const row = await getViewsDatabase()
    .prepare(
      `INSERT INTO story_views (story_id, views, updated_at)
       VALUES (?1, 1, CURRENT_TIMESTAMP)
       ON CONFLICT(story_id) DO UPDATE SET
         views = story_views.views + 1,
         updated_at = CURRENT_TIMESTAMP
       RETURNING story_id, views`,
    )
    .bind(storyId)
    .first<{ story_id: string; views: number }>();

  if (!row) throw new Error("Unable to update story view count");
  return { storyId: row.story_id, views: Number(row.views) };
}
