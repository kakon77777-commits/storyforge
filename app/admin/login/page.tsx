"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(false);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError(true);
        setSubmitting(false);
        return;
      }

      router.push("/admin");
    } catch {
      setError(true);
      setSubmitting(false);
    }
  }

  return (
    <div className="story-page admin-page">
      <nav className="story-page-nav" aria-label="Storyforge">
        <Link href="/">Storyforge</Link>
      </nav>

      <header className="story-index-head">
        <p className="eyebrow">Storyforge Admin</p>
        <h1>Log in</h1>
      </header>

      <form className="discussion-form admin-login-form" onSubmit={submit}>
        <label>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoFocus
          />
        </label>
        <div className="discussion-form-foot">
          {error && <span className="discussion-error">Invalid password.</span>}
          <button className="primary-small" type="submit" disabled={submitting || !password}>
            {submitting ? "Logging in…" : "Log in"}
          </button>
        </div>
      </form>
    </div>
  );
}
