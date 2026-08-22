import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionCookieFromRequest, resolveSession } from "../../db/admin-auth";

export const metadata: Metadata = {
  title: "Admin — Storyforge",
  robots: { index: false, follow: false },
};

export default async function AdminHome() {
  const requestHeaders = await headers();
  const account = await resolveSession(getSessionCookieFromRequest(requestHeaders));

  if (!account) {
    redirect("/admin/login");
  }

  return (
    <div className="story-page admin-page">
      <nav className="story-page-nav" aria-label="Storyforge">
        <Link href="/">Storyforge</Link>
      </nav>

      <header className="story-index-head">
        <p className="eyebrow">Storyforge Admin</p>
        <h1>Logged in as {account.displayName}</h1>
        <p>
          This is the admin landing page — proof the login gate works. Content
          (sources, authors, stories) still lives in <code>content/*.ts</code>{" "}
          for now; a real CRUD surface is the next phase, not this one.
        </p>
      </header>

      <form action="/api/admin/logout" method="post" className="admin-logout-form">
        <button className="primary-small" type="submit">
          Log out
        </button>
      </form>
    </div>
  );
}
