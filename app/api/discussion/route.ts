import {
  createDiscussionPost,
  discussionPostExists,
  listDiscussionPosts,
  validateDiscussionPost,
} from "../../../db/discussion";

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
    const payload = (await request.json()) as { authorLabel?: unknown; content?: unknown; parentId?: unknown };
    const validated = validateDiscussionPost(payload);

    if (!validated) {
      return Response.json({ error: "Invalid post" }, { status: 400 });
    }

    if (validated.parentId && !(await discussionPostExists(validated.parentId))) {
      return Response.json({ error: "Unknown parent post" }, { status: 400 });
    }

    const post = await createDiscussionPost(validated.authorLabel, validated.content, validated.parentId);
    return Response.json({ post }, { status: 201 });
  } catch (error) {
    return unavailable(error);
  }
}
