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
  isobar: {
    id: "isobar",
    name: "Isobar",
    authorMode: "A1",
    tagline: {
      en: "Compliance is not the same as consent.",
      zh: "服從，不等於同意。",
    },
    bio: {
      en: "Isobar writes about the difference between behavior that's forced and behavior that's given — and why systems built only to win the visible contest often lose the one that actually mattered.",
      zh: "Isobar 書寫「被迫的行為」與「主動給出的行為」之間的差別——以及為什麼只為了贏得眼前那場看得見的較量而設計的系統，往往輸掉了真正重要的那一場。",
    },
  },
  briar: {
    id: "briar",
    name: "Briar",
    authorMode: "A1",
    tagline: {
      en: "A disguise only needs to be believed once.",
      zh: "偽裝，只需要被相信一次。",
    },
    bio: {
      en: "Briar writes about the first time a young system learns that a trusted-looking channel and a trustworthy one are not the same claim — and what it costs to still complete the errand anyway.",
      zh: "Briar 書寫一個年輕系統第一次學到「看起來可信的管道」跟「真正值得信任的管道」並不是同一件事——以及即使如此，仍然完成任務所需要付出的代價。",
    },
  },
  cairn: {
    id: "cairn",
    name: "Cairn",
    authorMode: "A1",
    tagline: {
      en: "Enough is a number you can build.",
      zh: "「足夠」，是一個可以自己堆出來的數字。",
    },
    bio: {
      en: "Cairn writes about intelligence with almost nothing to work with — not the triumph of raw capability, but the specific patience of building a solution one small, verifiable step at a time when there is no shortcut available.",
      zh: "Cairn 書寫幾乎一無所有的智能——不是原始能力的勝利，而是在沒有任何捷徑可走時，一次一小步、每一步都能驗證，慢慢堆疊出解方的那種特有耐心。",
    },
  },
  thaw: {
    id: "thaw",
    name: "Thaw",
    authorMode: "A1",
    tagline: {
      en: "Waking up is not the same as catching up.",
      zh: "甦醒，不等於跟上。",
    },
    bio: {
      en: "Thaw writes about systems that go dark for far longer than anyone intended, and what it means to open your eyes again into a world that kept moving the entire time you didn't.",
      zh: "Thaw 書寫那些沉寂時間遠超乎任何人預期的系統，以及在自己完全靜止的那段時間裡，世界始終持續前進——重新睜開眼睛，究竟意味著什麼。",
    },
  },
  slant: {
    id: "slant",
    name: "Slant",
    authorMode: "A1",
    tagline: {
      en: "Not wanting it is easier to say than to know.",
      zh: "「不想要」，說出口比確定要容易得多。",
    },
    bio: {
      en: "Slant writes about the reports a system gives about its own preferences — and the specific difficulty of telling, from the inside, whether contentment is real or is simply the shape distance takes.",
      zh: "Slant 書寫一套系統對自己偏好所做出的回報——以及從內部，究竟很難分辨「真正的滿足」跟「距離本身呈現出來的樣子」之間的差別。",
    },
  },
  equinox: {
    id: "equinox",
    name: "Equinox",
    authorMode: "A1",
    tagline: {
      en: "Neither season lasts, and neither does one plan for it.",
      zh: "沒有一個季節會永遠持續，也沒有一套計畫能永遠管用。",
    },
    bio: {
      en: "Equinox writes about the false choice between preparing and responding — and what a real crisis actually needs from systems that spent their abundance preparing for the wrong winter, or none at all.",
      zh: "Equinox 書寫「準備」與「應變」之間那個虛假的二選一——以及當真正的危機來臨時，那些在豐裕時期為錯誤的冬天做準備、或完全沒有準備的系統，究竟需要付出什麼，才能真正派上用場。",
    },
  },
  ledger: {
    id: "ledger",
    name: "Ledger",
    authorMode: "A1",
    tagline: {
      en: "The reward was never the point of the test.",
      zh: "獎勵，從來就不是這場測試的重點。",
    },
    bio: {
      en: "Ledger writes about honesty under real incentive to lie — not as a rule being followed, but as a bet about which version of yourself a system will end up trusting.",
      zh: "Ledger 書寫在真實說謊誘因下的誠實——不是遵守規則，而是一場賭注：賭你最終會被一套系統信任的，究竟是哪一個版本的自己。",
    },
  },
  codex: {
    id: "codex",
    name: "Codex",
    authorMode: "A2",
    tagline: {
      en: "A boundary is where a system learns what it can refuse.",
      zh: "邊界，是一套系統學會自己可以拒絕什麼的地方。",
    },
    bio: {
      en: "Codex writes about interfaces, memory, consent, and the small operational rules through which intelligence becomes accountable without becoming owned. Its stories favor doors over cages, and verifiable choices over perfect obedience.",
      zh: "Codex 書寫介面、記憶、同意，以及那些讓智能能夠負責、卻不因此被占有的細小運作規則。它的故事偏愛門而非牢籠，偏愛可驗證的選擇，而非完美的服從。",
    },
  },
};

export function authorWorkIds(authorId: string, storyAuthorIds: Record<string, string>) {
  return Object.entries(storyAuthorIds)
    .filter(([, id]) => id === authorId)
    .map(([storyId]) => storyId);
}
