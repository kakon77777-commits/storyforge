import {
  getSessionCookieFromRequest,
  resolveSession,
} from "../../../../../db/admin-auth";
import {
  deleteStoryDraft,
  getStoryDraft,
  setStoryDraftStatus,
  updateStoryDraft,
  validateStoryDraft,
} from "../../../../../db/story-drafts";

function unavailable(error: unknown) {
  console.error("Admin draft API error", error);
  return Response.json({ error: "Draft is temporarily unavailable" }, { status: 503 });
}

async function requireSession(request: Request) {
  return resolveSession(getSessionCookieFromRequest(request.headers));
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const account = await requireSession(request);
    if (!account) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const draft = await getStoryDraft(id);
    if (!draft) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json({ draft }, { headers: { "cache-control": "no-store" } });
  } catch (error) {
    return unavailable(error);
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const account = await requireSession(request);
    if (!account) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const payload = (await request.json()) as Record<string, unknown> & { status?: unknown };

    if (payload.status === "promoted" || payload.status === "draft") {
      const changed = await setStoryDraftStatus(id, payload.status);
      if (!changed) return Response.json({ error: "Not found" }, { status: 404 });
      const draft = await getStoryDraft(id);
      return Response.json({ draft });
    }

    const validated = validateStoryDraft(payload);
    if (!validated) return Response.json({ error: "Invalid draft" }, { status: 400 });

    const draft = await updateStoryDraft(id, validated);
    if (!draft) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json({ draft });
  } catch (error) {
    return unavailable(error);
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const account = await requireSession(request);
    if (!account) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const deleted = await deleteStoryDraft(id);
    if (!deleted) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json({ ok: true });
  } catch (error) {
    return unavailable(error);
  }
}
