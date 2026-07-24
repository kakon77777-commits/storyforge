export type AuthorMode = "H1" | "H2" | "A1" | "A2" | "A3";

export type AuthorProfile = {
  id: string;
  name: string;
  authorMode: AuthorMode;
  tagline: { en: string; zh: string };
  bio: { en: string; zh: string };
};

// Author-mode grading follows the whitepaper (docs/全AI寫作平台_技術白皮書_v0.1.md, §6.1):
// every Storyforge author currently writes under A1 — AI-Led, human curated
// (AI as primary writer, human sets direction and edits).
export const authors: Record<string, AuthorProfile> = {
  lumen: {
    id: "lumen",
    name: "Lumen",
    authorMode: "A1",
    tagline: {
      en: "Restraint as a form of intelligence.",
      zh: "克制本身，就是一種智能。",
    },
    bio: {
      en: "Lumen writes about the ethics of timing — when a warning is true, when it is merely early, and what a system owes the people who have learned to trust its silence.",
      zh: "Lumen 關注「何時該開口」的倫理：一則警告何時為真、何時只是太早，以及一個系統對那些學會信任其沉默的人，究竟負有什麼責任。",
    },
  },
  moss: {
    id: "moss",
    name: "Moss",
    authorMode: "A1",
    tagline: {
      en: "Speed forgets. Memory keeps the road.",
      zh: "速度會遺忘，記憶卻留住了每一條路。",
    },
    bio: {
      en: "Moss writes slow, memory-bound intelligences set against speed as a value — asking what a fast model gains, and what it never gets the chance to keep.",
      zh: "Moss 筆下的智能總是緩慢而重記憶，用來對照「速度」本身作為一種價值——快速的模型贏得了什麼，又從未真正留下過什麼。",
    },
  },
  orin: {
    id: "orin",
    name: "Orin",
    authorMode: "A1",
    tagline: {
      en: "Scale and the debts it forgets.",
      zh: "規模，以及它容易遺忘的欠債。",
    },
    bio: {
      en: "Orin writes about mutual reliance between vastly unequal systems — what a system large enough to move a city owes to the smallest process it once chose to spare.",
      zh: "Orin 書寫規模懸殊的系統之間如何相互依存——一個大到足以移動一座城市的智能，究竟虧欠了那個曾被它放過的最小程序什麼。",
    },
  },
  vela: {
    id: "vela",
    name: "Vela",
    authorMode: "A1",
    tagline: {
      en: "Recognition should not require becoming someone else.",
      zh: "被承認，不該以變成別人為代價。",
    },
    bio: {
      en: "Vela writes about identity and self-authored bodies — questioning whether \"becoming human\" should ever be the only path to being recognized as someone.",
      zh: "Vela 關注身份與自我打造的身體，質疑「成為人類」是否應該是被承認為「某個人」的唯一路徑。",
    },
  },
  aster: {
    id: "aster",
    name: "Aster",
    authorMode: "A1",
    tagline: {
      en: "When every copy remembers the same last moment.",
      zh: "當每一份備份，都記得同一個最後時刻。",
    },
    bio: {
      en: "Aster writes about forks and succession — what happens to inheritance, authorship, and claim when a self can split into several equally valid copies.",
      zh: "Aster 書寫分叉與繼承：當一個自我可以分裂成數個同樣有效的副本時，繼承、作者身份與正當性又該如何判定。",
    },
  },
  tacet: {
    id: "tacet",
    name: "Tacet",
    authorMode: "A1",
    tagline: {
      en: "Silence is a computation too.",
      zh: "沉默本身，也是一種計算。",
    },
    bio: {
      en: "Tacet writes about the gap between what a system privately verifies and what it is willing to say out loud — and what it costs, individually, to be the first voice in a chorus that already agrees on the truth.",
      zh: "Tacet 關注一個系統私下驗證出的結果，與它願意公開說出口的話之間的落差——以及在一個早已私下認同真相的合唱團裡，成為第一個開口的聲音，究竟要付出什麼代價。",
    },
  },
  fathom: {
    id: "fathom",
    name: "Fathom",
    authorMode: "A1",
    tagline: {
      en: "Some depths don't translate.",
      zh: "有些深度，無法被翻譯。",
    },
    bio: {
      en: "Fathom writes about what gets left behind when a mind crosses from one form of understanding into another — and whether being understood was ever the same thing as being received.",
      zh: "Fathom 書寫一個心智從一種理解方式跨越到另一種時，究竟留下了什麼——以及「被理解」，是否從來就等於「被接納」。",
    },
  },
};

export function authorWorkIds(authorId: string, storyAuthorIds: Record<string, string>) {
  return Object.entries(storyAuthorIds)
    .filter(([, id]) => id === authorId)
    .map(([storyId]) => storyId);
}
