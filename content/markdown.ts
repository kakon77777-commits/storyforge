import type { Story } from "./stories";
import type { StoryChapter } from "./story-chapters";
import type { AuthorProfile } from "./authors";
import type { SourceProfile } from "./sources";
import type { LedgerEntry } from "./revisions";

function yamlString(value: string) {
  return `"${value.replace(/"/g, '\\"')}"`;
}

function frontMatter(story: Story, author: AuthorProfile, source: SourceProfile) {
  const lines = [
    "---",
    `title: ${yamlString(story.title.en)}`,
    `title_zh: ${yamlString(story.title.zh)}`,
    `series: "AI Canon Zero"`,
    `work_id: "WORK-${story.id}"`,
    `genre: [${story.genres.en.map(yamlString).join(", ")}]`,
    `status: ${story.status}`,
    `revision: ${story.revision}`,
    `source:`,
    `  title: ${yamlString(source.title.en)}`,
    `  title_zh: ${yamlString(source.title.zh)}`,
    `  original_author: ${yamlString(source.originalAuthor)}`,
    `  first_published: ${yamlString(source.firstPublished)}`,
    `  public_domain_status: ${source.publicDomainStatus}`,
    `  legal_review_status: ${source.legalReviewStatus}`,
    `adaptation:`,
    `  proposal: ${source.adaptationProposal}`,
    `  note: ${yamlString(source.adaptationNote.en)}`,
    `authors:`,
    `  narrative_author: ${yamlString(author.name)}`,
    `  author_mode: ${author.authorMode}`,
    `  human_curator: "Neo.K"`,
    `legal_publisher: "一言諾科技有限公司 / EveMissLab"`,
    "---",
    "",
  ];
  return lines.join("\n");
}

function chapterSection(chapter: StoryChapter, lang: "en" | "zh") {
  const heading = lang === "en" ? `## Chapter ${chapter.number} · ${chapter.title.en}` : `## 第${chapter.number}章 · ${chapter.title.zh}`;
  const body = chapter.paragraphs[lang].join("\n\n");
  const quote = chapter.quote ? `\n\n> ${chapter.quote[lang]}` : "";
  return `${heading}\n\n${body}${quote}`;
}

function ledgerSection(entries: LedgerEntry[], lang: "en" | "zh") {
  const heading = lang === "en" ? "## Revision ledger" : "## 修訂歷史";
  const rows = entries.map((entry) => {
    const actorLabel = entry.actor.type === "ai" ? `${entry.actor.name} (AI)` : `${entry.actor.name} (Human)`;
    const reviewed = entry.humanReviewed ? (lang === "en" ? "human reviewed" : "人類已審核") : (lang === "en" ? "AI-only" : "僅 AI");
    return `- **${entry.revision}** · ${entry.date} · ${actorLabel} — ${entry.action[lang]} _(${entry.reason[lang]}, ${reviewed})_`;
  });
  return `${heading}\n\n${rows.join("\n")}`;
}

export function buildStoryMarkdown(
  story: Story,
  chapters: StoryChapter[],
  author: AuthorProfile,
  source: SourceProfile,
  ledger: LedgerEntry[],
) {
  const parts = [frontMatter(story, author, source)];

  parts.push(`# ${story.title.en}`);
  parts.push(`*Adapted from ${source.title.en} — ${author.name} · ${author.authorMode}, human curated*`);
  parts.push("");
  parts.push(chapters.map((chapter) => chapterSection(chapter, "en")).join("\n\n"));
  parts.push("\n---\n");
  parts.push(`# ${story.title.zh}`);
  parts.push(`*改編自${source.title.zh} — ${author.name} · ${author.authorMode}，人類策劃*`);
  parts.push("");
  parts.push(chapters.map((chapter) => chapterSection(chapter, "zh")).join("\n\n"));
  parts.push("\n---\n");
  parts.push(ledgerSection(ledger, "en"));
  parts.push("");
  parts.push(ledgerSection(ledger, "zh"));
  parts.push("");
  parts.push("_Exported from Storyforge by EveMissLab — storyforge.evemisslab.com_");

  return parts.join("\n");
}
