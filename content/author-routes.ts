import { authors, type AuthorProfile } from "./authors";
import { stories, type Story } from "./stories";
import type { StoryLang } from "./story-routes";

export type ResolvedAuthor = {
  author: AuthorProfile;
  works: Story[];
};

export function listAuthors(): AuthorProfile[] {
  return Object.values(authors).sort((a, b) => a.name.localeCompare(b.name));
}

export function resolveAuthor(id: string): ResolvedAuthor | null {
  const author = authors[id];
  if (!author) return null;
  return {
    author,
    works: stories
      .filter((story) => story.authorId === id)
      .sort((a, b) => a.rank - b.rank),
  };
}

export function authorPath(id: string, lang: StoryLang): string {
  return lang === "zh" ? `/a/${id}/zh` : `/a/${id}`;
}
