import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getSessionCookieFromRequest, resolveSession } from "../../../../db/admin-auth";
import { getStoryDraft } from "../../../../db/story-drafts";
import { DraftEditor } from "../DraftEditor";

export const metadata: Metadata = {
  title: "Edit draft — Storyforge Admin",
  robots: { index: false, follow: false },
};

export default async function EditDraftPage({ params }: { params: Promise<{ id: string }> }) {
  const requestHeaders = await headers();
  const account = await resolveSession(getSessionCookieFromRequest(requestHeaders));
  if (!account) redirect("/admin/login");

  const { id } = await params;
  const draft = await getStoryDraft(id);
  if (!draft) notFound();

  return (
    <div className="story-page admin-page">
      <nav className="story-page-nav" aria-label="Storyforge">
        <Link href="/">Storyforge</Link>
        <span aria-hidden="true">·</span>
        <Link href="/admin/drafts">Drafts</Link>
      </nav>

      <header className="story-index-head">
        <p className="eyebrow">Storyforge Admin</p>
        <h1>{draft.titleEn || draft.id}</h1>
      </header>

      <DraftEditor initialDraft={draft} />
    </div>
  );
}
