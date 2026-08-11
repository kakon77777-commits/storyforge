import { SITE_ORIGIN, listStories, storyPath } from "../../content/story-routes";
import { authorPath, listAuthors } from "../../content/author-routes";

/**
 * Written as a route handler rather than Next's `app/sitemap.ts` convention so
 * it goes through the same mechanism as `/api/views`, which this deployment is
 * already known to serve.
 *
 * The URL list is derived from `stories`, so a story added tomorrow is
 * advertised without anyone remembering this file exists — and a story removed
 * stops being advertised. That is the whole reason it is generated rather than
 * typed: the fleet-wide audit on 2026-08-02 found several sitemaps that had
 * drifted from their sites because someone had to remember to update a list.
 */

export function GET() {
  const paths = [
    "/",
    "/s",
    ...listStories().flatMap((story) => [
      storyPath(story.id, "en"),
      storyPath(story.id, "zh"),
    ]),
    ...listAuthors().flatMap((author) => [
      authorPath(author.id, "en"),
      authorPath(author.id, "zh"),
    ]),
  ];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...paths.map((path) => `<url><loc>${SITE_ORIGIN}${path}</loc></url>`),
    "</urlset>",
  ].join("");

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=600",
    },
  });
}
