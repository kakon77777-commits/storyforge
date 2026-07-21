import {
  incrementStoryView,
  isKnownStoryId,
  listStoryViews,
} from "../../../db/view-counts";

function unavailable(error: unknown) {
  console.error("Story view API error", error);
  return Response.json(
    { error: "Story view counter is temporarily unavailable" },
    { status: 503 },
  );
}

export async function GET() {
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
