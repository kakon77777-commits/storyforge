import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionCookieFromRequest, resolveSession } from "../../../db/admin-auth";
import { listStoryDrafts } from "../../../db/story-drafts";

export const metadata: Metadata = {
  title: "Drafts — Storyforge Admin",
  robots: { index: false, follow: false },
};

export default async function DraftsList() {
  const requestHeaders = await headers();
  const account = await resolveSession(getSessionCookieFromRequest(requestHeaders));
  if (!account) redirect("/admin/login");

  const drafts = await listStoryDrafts();

  return (
    <div className="story-page admin-page">
      <nav className="story-page-nav" aria-label="Storyforge">
        <Link href="/">Storyforge</Link>
        <span aria-hidden="true">·</span>
        <Link href="/admin">Admin</Link>
      </nav>

      <header className="story-index-head">
        <p className="eyebrow">Storyforge Admin</p>
        <h1>Story drafts</h1>
        <p>
          Drafts live in D1, editable here. Publishing to the live site is still
          a manual step — generate the <code>content/*.ts</code> snippets from a
          draft and hand-integrate them, same as every story so far.
        </p>
      </header>

      <p>
        <Link href="/admin/drafts/new" className="primary-small">
          New draft
        </Link>
      </p>

      <ol className="story-index-list">
        {drafts.length === 0 && <li>No drafts yet.</li>}
        {drafts.map((draft) => (
          <li key={draft.id}>
            <h2>
              <Link href={`/admin/drafts/${draft.id}`}>{draft.titleEn || draft.id}</Link>
            </h2>
            <p className="story-index-meta">
              {draft.status} · updated {draft.updatedAt}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
