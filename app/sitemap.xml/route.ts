import { SITE_ORIGIN, listStories, storyPath } from "../../content/story-routes";
import { authorPath, listAuthors } from "../../content/author-routes";
import { revisionLedgers } from "../../content/revisions";

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
 *
 * `lastmod` and the `xhtml:hreflang` alternates were added 2026-08-26, once a
 * missing `/robots.txt` Sitemap directive turned out to correlate with Google
 * having indexed zero pages of the site — cheap, standard signals a crawler
 * uses to decide what's fresh and how the en/zh pair of a page relate.
 */

function latestRevisionDate(storyId: string): string | undefined {
  const ledger = revisionLedgers[storyId];
  if (!ledger || ledger.length === 0) return undefined;
  return ledger.reduce((latest, entry) => (entry.date > latest ? entry.date : latest), ledger[0].date);
}

type SitemapUrl = {
  loc: string;
  lastmod?: string;
  alternates?: { hreflang: string; href: string }[];
};

export function GET() {
  const urls: SitemapUrl[] = [
    { loc: "/" },
    { loc: "/s" },
    ...listStories().flatMap((story): SitemapUrl[] => {
      const en = storyPath(story.id, "en");
      const zh = storyPath(story.id, "zh");
      const lastmod = latestRevisionDate(story.id);
      const alternates = [
        { hreflang: "en", href: `${SITE_ORIGIN}${en}` },
        { hreflang: "zh-Hant", href: `${SITE_ORIGIN}${zh}` },
        { hreflang: "x-default", href: `${SITE_ORIGIN}${en}` },
      ];
      return [
        { loc: en, lastmod, alternates },
        { loc: zh, lastmod, alternates },
      ];
    }),
    ...listAuthors().flatMap((author): SitemapUrl[] => {
      const en = authorPath(author.id, "en");
      const zh = authorPath(author.id, "zh");
      const alternates = [
        { hreflang: "en", href: `${SITE_ORIGIN}${en}` },
        { hreflang: "zh-Hant", href: `${SITE_ORIGIN}${zh}` },
        { hreflang: "x-default", href: `${SITE_ORIGIN}${en}` },
      ];
      return [
        { loc: en, alternates },
        { loc: zh, alternates },
      ];
    }),
  ];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls.map((url) => {
      const lastmodTag = url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : "";
      const alternateTags = (url.alternates ?? [])
        .map((alt) => `<xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>`)
        .join("");
      return `<url><loc>${SITE_ORIGIN}${url.loc}</loc>${lastmodTag}${alternateTags}</url>`;
    }),
    "</urlset>",
  ].join("");

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=600",
    },
  });
}
