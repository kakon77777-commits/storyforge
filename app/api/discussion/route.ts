import { createDiscussionPost, listDiscussionPosts, validateDiscussionPost } from "../../../db/discussion";

function unavailable(error: unknown) {
  console.error("Discussion API error", error);
  return Response.json(
    { error: "Discussion board is temporarily unavailable" },
    { status: 503 },
  );
}

export async function GET() {
  try {
    return Response.json(
      { posts: await listDiscussionPosts() },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (error) {
    return unavailable(error);
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { authorLabel?: unknown; content?: unknown };
    const validated = validateDiscussionPost(payload);

    if (!validated) {
      return Response.json({ error: "Invalid post" }, { status: 400 });
    }

    const post = await createDiscussionPost(validated.authorLabel, validated.content);
    return Response.json({ post }, { status: 201 });
  } catch (error) {
    return unavailable(error);
  }
}
