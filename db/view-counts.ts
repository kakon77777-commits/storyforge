import { env } from "cloudflare:workers";
import { stories } from "../content/stories";

// Derived from content/stories.ts rather than hand-listed here: this list
// previously had to be kept in sync by hand on every new story (missed once
// already — "silent-chorus" shipped without an entry here, so its view
// count silently never incremented). One list, one place it can drift from.
const KNOWN_STORY_IDS = new Set(stories.map((story) => story.id));

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
