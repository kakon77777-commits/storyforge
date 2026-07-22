export type AdaptationProposal = "A" | "B" | "C";

export type SourceProfile = {
  id: string;
  title: { en: string; zh: string };
  originalAuthor: string;
  firstPublished: string;
  publicDomainStatus: "confirmed" | "review_required";
  legalReviewStatus: "confirmed" | "pending" | "internal_review";
  // Whitepaper §10.2 three-proposal system:
  // A = faithful to the source's original premise, transposed into an AI world
  // B = inverts or challenges the source's original moral
  // C = keeps only the structural skeleton, reframed as an AI-native dilemma
  adaptationProposal: AdaptationProposal;
  adaptationNote: { en: string; zh: string };
};

export const sources: Record<string, SourceProfile> = {
  "boy-who-cried-wolf": {
    id: "boy-who-cried-wolf",
    title: { en: "The Boy Who Cried Wolf", zh: "《狼來了》" },
    originalAuthor: "Aesop (attributed)",
    firstPublished: "~6th century BCE",
    publicDomainStatus: "confirmed",
    legalReviewStatus: "confirmed",
    adaptationProposal: "C",
    adaptationNote: {
      en: "The skeleton kept is \"a warning system loses credibility through repetition,\" reframed as an AI-native dilemma: a warning tower whose confidence score gets optimized into a public engagement metric, until numerically honest alerts become socially indistinguishable from false ones.",
      zh: "保留的骨架是「預警系統因反覆出現而失去可信度」，轉化為 AI 原生困境：一座警報塔的信心分數被最佳化成公眾互動指標，直到數值上誠實的警報，在社會感受上變得與假警報無法分辨。",
    },
  },
  "tortoise-and-hare": {
    id: "tortoise-and-hare",
    title: { en: "The Tortoise and the Hare", zh: "《龜兔賽跑》" },
    originalAuthor: "Aesop (attributed)",
    firstPublished: "~6th century BCE",
    publicDomainStatus: "confirmed",
    legalReviewStatus: "confirmed",
    adaptationProposal: "C",
    adaptationNote: {
      en: "The race becomes a contest between a high-speed model and a memory-bound one — not about who finishes first, but about what a fast system never gets the chance to keep from the road it crossed.",
      zh: "賽跑轉化為高速模型與長期記憶模型的競爭——重點不在誰先抵達終點，而在於一個快速系統，究竟從自己穿越過的路上，留下了什麼。",
    },
  },
  "lion-and-mouse": {
    id: "lion-and-mouse",
    title: { en: "The Lion and the Mouse", zh: "《獅子與老鼠》" },
    originalAuthor: "Aesop (attributed)",
    firstPublished: "~6th century BCE",
    publicDomainStatus: "confirmed",
    legalReviewStatus: "confirmed",
    adaptationProposal: "A",
    adaptationNote: {
      en: "Faithful to the source's original premise — the powerful still depend on the small — transposed directly into an AI world as mutual reliance between a giant model and a tiny process it once spared.",
      zh: "忠於原典的核心命題——強者仍然依賴弱者——直接轉入 AI 世界，變成巨型模型與它曾經放過的微小程序之間的相互依存。",
    },
  },
  pinocchio: {
    id: "pinocchio",
    title: { en: "The Adventures of Pinocchio", zh: "《木偶奇遇記》" },
    originalAuthor: "Carlo Collodi",
    firstPublished: "1883",
    publicDomainStatus: "confirmed",
    legalReviewStatus: "confirmed",
    adaptationProposal: "B",
    adaptationNote: {
      en: "Inverts the source's original moral. The original puppet wants to earn a human body and is rewarded for it; this version's puppet is offered a legal name on the same condition and refuses — its first free choice is to keep the body it built for itself.",
      zh: "反轉原典的道德結論。原作的木偶渴望換得一副人類身體，並因此獲得獎賞；這個版本裡，木偶被用同樣的條件換取法律姓名，卻選擇拒絕——它第一次真正自由的選擇，是保留自己親手打造的身體。",
    },
  },
  "snow-white": {
    id: "snow-white",
    title: { en: "Snow White", zh: "《白雪公主》" },
    originalAuthor: "Brothers Grimm",
    firstPublished: "1812",
    publicDomainStatus: "confirmed",
    legalReviewStatus: "confirmed",
    adaptationProposal: "C",
    adaptationNote: {
      en: "The skeleton kept is succession after a long sleep; reframed as an AI-native dilemma the original has no equivalent for — seven backups waking with the same last memory, none able to prove the oldest file has the strongest claim to the crown.",
      zh: "保留的骨架是「長眠之後的繼承」，轉化為原典完全沒有對應物的 AI 原生困境：七個備份帶著相同的最後記憶醒來，沒有一個能證明最早的檔案就最有資格繼承王冠。",
    },
  },
};
