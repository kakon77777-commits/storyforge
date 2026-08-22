import { getSessionCookieFromRequest, resolveSession } from "../../../../db/admin-auth";
import { createStoryDraft, listStoryDrafts, validateStoryDraft } from "../../../../db/story-drafts";

function unavailable(error: unknown) {
  console.error("Admin drafts API error", error);
  return Response.json({ error: "Drafts are temporarily unavailable" }, { status: 503 });
}

async function requireSession(request: Request) {
  return resolveSession(getSessionCookieFromRequest(request.headers));
}

export async function GET(request: Request) {
  try {
    const account = await requireSession(request);
    if (!account) return Response.json({ error: "Unauthorized" }, { status: 401 });

    return Response.json({ drafts: await listStoryDrafts() }, { headers: { "cache-control": "no-store" } });
  } catch (error) {
    return unavailable(error);
  }
}

export async function POST(request: Request) {
  try {
    const account = await requireSession(request);
    if (!account) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const payload = (await request.json()) as Record<string, unknown>;
    const validated = validateStoryDraft(payload);
    if (!validated) return Response.json({ error: "Invalid draft" }, { status: 400 });

    const draft = await createStoryDraft(validated, account.id);
    return Response.json({ draft }, { status: 201 });
  } catch (error) {
    return unavailable(error);
  }
}
