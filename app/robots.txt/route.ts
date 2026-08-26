import { SITE_ORIGIN } from "../../content/story-routes";

/**
 * Written as a route handler for the same reason as `/sitemap.xml`: it goes
 * through the mechanism this deployment already serves `/api/views` through.
 *
 * Before this route existed, `/robots.txt` fell through to Cloudflare's
 * zone-level default — comment-only boilerplate with no Sitemap directive and
 * no stated content-signal preference, confirmed 2026-08-26 to correlate with
 * Google having indexed zero pages of the site. Content-Signal follows
 * Cloudflare's published syntax (search/ai-input/ai-train); this site's stance
 * (2026-08-26, Neo): searchable and citable, not trainable.
 */

export function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Content-Signal: search=yes, ai-input=yes, ai-train=no",
    "",
    `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
