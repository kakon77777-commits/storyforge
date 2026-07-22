import {
  incrementStoryView,
  isKnownStoryId,
  listStoryViews,
} from "../../../db/view-counts";
import { stories } from "../../../content/stories";
import { storyChapters } from "../../../content/story-chapters";
import { authors } from "../../../content/authors";
import { sources } from "../../../content/sources";
import { revisionLedgers } from "../../../content/revisions";
import { buildStoryMarkdown } from "../../../content/markdown";

function unavailable(error: unknown) {
  console.error("Story view API error", error);
  return Response.json(
    { error: "Story view counter is temporarily unavailable" },
    { status: 503 },
  );
}

// Markdown export shares this already-working route file rather than living
// in its own app/api/stories/markdown/route.ts — a brand-new top-level API
// route added after the initial vinext build consistently 404s in
// production (this deployed vinext@0.0.50's own static route-classification
// gap: it flags dynamic API usage as "? Unknown" at build time and appears
// to drop it from the runtime dispatch table). Reusing this pre-existing,
// working route sidesteps that gap entirely.
function markdownExport(storyId: string) {
  const story = stories.find((candidate) => candidate.id === storyId);
  if (!story) {
    return Response.json({ error: "Unknown story" }, { status: 404 });
  }

  const chapters = storyChapters[story.id] ?? [];
  const author = authors[story.authorId];
  const source = sources[story.sourceId];
  const ledger = revisionLedgers[story.id] ?? [];
  const markdown = buildStoryMarkdown(story, chapters, author, source, ledger);

  return new Response(markdown, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "content-disposition": `attachment; filename="${story.id}.md"`,
      "cache-control": "public, max-age=300",
    },
  });
}

export async function GET(request: Request) {
  const markdownId = new URL(request.url).searchParams.get("markdown");
  if (markdownId) {
    return markdownExport(markdownId);
  }

  try {
    return Response.json(
      { views: await listStoryViews() },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (error) {
    return unavailable(error);
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { storyId?: unknown };
    const storyId = typeof payload.storyId === "string" ? payload.storyId : "";

    if (!isKnownStoryId(storyId)) {
      return Response.json({ error: "Unknown story" }, { status: 400 });
    }

    return Response.json(await incrementStoryView(storyId));
  } catch (error) {
    return unavailable(error);
  }
}
