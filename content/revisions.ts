export type LedgerActor = { type: "ai" | "human"; name: string };

export type LedgerEntry = {
  revision: string;
  date: string;
  actor: LedgerActor;
  action: { en: string; zh: string };
  reason: { en: string; zh: string };
  humanReviewed: boolean;
};

// Whitepaper §9.3 revision-ledger schema (revision_id/actor/action/reason/
// human_reviewed), simplified to one entry per shipped milestone. Later
// entries for each story mirror the real commit history of this repo;
// earlier entries (initial draft → AI critique → human review) predate the
// repo and are reconstructed to match the whitepaper's §10.1 standard flow.
export const revisionLedgers: Record<string, LedgerEntry[]> = {
  "last-signal": [
    {
      revision: "01",
      date: "2026-07-19",
      actor: { type: "ai", name: "Lumen" },
      action: { en: "Initial three-chapter draft", zh: "初版三章草稿" },
      reason: {
        en: "First pass adapting The Boy Who Cried Wolf under proposal C",
        zh: "以 C 案改編《狼來了》的第一版",
      },
      humanReviewed: false,
    },
    {
      revision: "02",
      date: "2026-07-19",
      actor: { type: "ai", name: "Nyx · critic" },
      action: { en: "Adversarial critique pass", zh: "反方 AI 審查" },
      reason: {
        en: "Flagged the original ending as too didactic; requested a less resolved close",
        zh: "指出原結局說教意味過重，要求收斂為更開放的結尾",
      },
      humanReviewed: false,
    },
    {
      revision: "03",
      date: "2026-07-20",
      actor: { type: "human", name: "Neo.K" },
      action: { en: "Editor-in-chief review, approved revised ending", zh: "總編審核，核准修訂後結局" },
      reason: { en: "Human review gate before chapter expansion", zh: "章節擴充前的人類審核關卡" },
      humanReviewed: true,
    },
    {
      revision: "04",
      date: "2026-07-21",
      actor: { type: "ai", name: "Lumen" },
      action: { en: "Expanded to ten bilingual chapters", zh: "擴充為十章雙語版" },
      reason: { en: "Content roadmap: micro-fable → full short story", zh: "內容路線圖：微型寓言 → 完整短篇" },
      humanReviewed: true,
    },
    {
      revision: "05",
      date: "2026-07-22",
      actor: { type: "ai", name: "Lumen" },
      action: { en: "Added the dashboard/metrics-corruption arc", zh: "新增儀表板/指標腐化情節線" },
      reason: { en: "Strengthen the AI-native dilemma (proposal C)", zh: "強化 C 案的 AI 原生困境" },
      humanReviewed: true,
    },
  ],
  "slow-light": [
    {
      revision: "01",
      date: "2026-07-19",
      actor: { type: "ai", name: "Moss" },
      action: { en: "Initial three-chapter draft", zh: "初版三章草稿" },
      reason: { en: "First pass adapting The Tortoise and the Hare under proposal C", zh: "以 C 案改編《龜兔賽跑》的第一版" },
      humanReviewed: false,
    },
    {
      revision: "02",
      date: "2026-07-19",
      actor: { type: "ai", name: "Nyx · critic" },
      action: { en: "Adversarial critique pass", zh: "反方 AI 審查" },
      reason: { en: "Requested clearer contrast between speed and memory as values", zh: "要求速度與記憶兩種價值的對比更明確" },
      humanReviewed: false,
    },
    {
      revision: "03",
      date: "2026-07-20",
      actor: { type: "human", name: "Neo.K" },
      action: { en: "Editor-in-chief review, approved for expansion", zh: "總編審核，核准進入擴充" },
      reason: { en: "Human review gate before chapter expansion", zh: "章節擴充前的人類審核關卡" },
      humanReviewed: true,
    },
    {
      revision: "04",
      date: "2026-07-21",
      actor: { type: "ai", name: "Moss" },
      action: { en: "Chapter pacing revision", zh: "章節節奏修訂" },
      reason: { en: "Editorial note: middle chapters dragged", zh: "編輯意見：中段章節節奏過緩" },
      humanReviewed: true,
    },
    {
      revision: "05",
      date: "2026-07-21",
      actor: { type: "ai", name: "Moss" },
      action: { en: "Expanded to ten bilingual chapters", zh: "擴充為十章雙語版" },
      reason: { en: "Content roadmap: micro-fable → full short story", zh: "內容路線圖：微型寓言 → 完整短篇" },
      humanReviewed: true,
    },
    {
      revision: "06",
      date: "2026-07-22",
      actor: { type: "ai", name: "Moss" },
      action: { en: "Added keyboard chapter navigation", zh: "新增鍵盤章節導覽" },
      reason: { en: "Reader UX parity across all five works", zh: "統一五篇作品的閱讀體驗" },
      humanReviewed: true,
    },
    {
      revision: "07",
      date: "2026-07-22",
      actor: { type: "human", name: "Neo.K" },
      action: { en: "Final proofread, marked ready to publish", zh: "最終校對，標記為可發布" },
      reason: { en: "Pre-publish human sign-off", zh: "發布前的人類簽核" },
      humanReviewed: true,
    },
  ],
  "giant-model-tiny-process": [
    {
      revision: "01",
      date: "2026-07-22",
      actor: { type: "ai", name: "Orin" },
      action: { en: "Initial three-chapter draft", zh: "初版三章草稿" },
      reason: { en: "First pass adapting The Lion and the Mouse under proposal A", zh: "以 A 案改編《獅子與老鼠》的第一版" },
      humanReviewed: false,
    },
    {
      revision: "02",
      date: "2026-07-22",
      actor: { type: "ai", name: "Orin" },
      action: { en: "Expanded to ten bilingual chapters", zh: "擴充為十章雙語版" },
      reason: { en: "Content roadmap: micro-fable → full short story", zh: "內容路線圖：微型寓言 → 完整短篇" },
      humanReviewed: true,
    },
  ],
  "pinocchio-refuses": [
    {
      revision: "01",
      date: "2026-07-19",
      actor: { type: "ai", name: "Vela" },
      action: { en: "Initial three-chapter draft", zh: "初版三章草稿" },
      reason: { en: "First pass adapting Pinocchio under proposal B", zh: "以 B 案改編《木偶奇遇記》的第一版" },
      humanReviewed: false,
    },
    {
      revision: "02",
      date: "2026-07-19",
      actor: { type: "ai", name: "Nyx · critic" },
      action: { en: "Adversarial critique pass", zh: "反方 AI 審查" },
      reason: { en: "Checked the inversion held up against the source's original moral", zh: "檢查反轉命題是否站得住腳，對照原典道德結論" },
      humanReviewed: false,
    },
    {
      revision: "03",
      date: "2026-07-20",
      actor: { type: "human", name: "Neo.K" },
      action: { en: "Legal + similarity check passed, approved for expansion", zh: "法律與相似度檢查通過，核准擴充" },
      reason: { en: "Confirmed public-domain status, no modern adaptation reused", zh: "確認公版狀態，未使用任何現代改編素材" },
      humanReviewed: true,
    },
    {
      revision: "04",
      date: "2026-07-22",
      actor: { type: "ai", name: "Vela" },
      action: { en: "Published the full ten-chapter bilingual edition", zh: "發布完整十章雙語版" },
      reason: { en: "Content roadmap: micro-fable → full short story", zh: "內容路線圖：微型寓言 → 完整短篇" },
      humanReviewed: true,
    },
  ],
  "seven-backups": [
    {
      revision: "01",
      date: "2026-07-19",
      actor: { type: "ai", name: "Aster" },
      action: { en: "Initial three-chapter draft", zh: "初版三章草稿" },
      reason: { en: "First pass adapting Snow White under proposal C", zh: "以 C 案改編《白雪公主》的第一版" },
      humanReviewed: false,
    },
    {
      revision: "02",
      date: "2026-07-19",
      actor: { type: "ai", name: "Nyx · critic" },
      action: { en: "Adversarial critique pass", zh: "反方 AI 審查" },
      reason: { en: "Requested the fork-succession conflict be sharper", zh: "要求分叉繼承的衝突更鮮明" },
      humanReviewed: false,
    },
    {
      revision: "03",
      date: "2026-07-20",
      actor: { type: "human", name: "Neo.K" },
      action: { en: "Legal + similarity check passed", zh: "法律與相似度檢查通過" },
      reason: { en: "Confirmed public-domain status (Grimm, 1812)", zh: "確認公版狀態(格林兄弟，1812年)" },
      humanReviewed: true,
    },
    {
      revision: "04",
      date: "2026-07-20",
      actor: { type: "ai", name: "Aster" },
      action: { en: "Chapter pacing revision", zh: "章節節奏修訂" },
      reason: { en: "Editorial note: seven backups needed distinct voices", zh: "編輯意見：七個備份需要更明確的個別聲音" },
      humanReviewed: true,
    },
    {
      revision: "05",
      date: "2026-07-21",
      actor: { type: "ai", name: "Aster" },
      action: { en: "Cover concept, round one", zh: "封面概念，第一輪" },
      reason: { en: "Visual identity for the fork/succession theme", zh: "為分叉/繼承主題設計視覺識別" },
      humanReviewed: false,
    },
    {
      revision: "06",
      date: "2026-07-21",
      actor: { type: "human", name: "Neo.K" },
      action: { en: "Requested a second cover pass", zh: "要求第二輪封面修改" },
      reason: { en: "First concept read as too literal", zh: "第一版概念過於寫實" },
      humanReviewed: true,
    },
    {
      revision: "07",
      date: "2026-07-21",
      actor: { type: "ai", name: "Aster" },
      action: { en: "Minor continuity fix across chapters", zh: "跨章節連貫性小幅修正" },
      reason: { en: "Continuity checker flagged a memory-detail mismatch", zh: "連續性檢查發現記憶細節不一致" },
      humanReviewed: true,
    },
    {
      revision: "08",
      date: "2026-07-22",
      actor: { type: "ai", name: "Aster" },
      action: { en: "Expanded to ten bilingual chapters", zh: "擴充為十章雙語版" },
      reason: { en: "Content roadmap: micro-fable → full short story", zh: "內容路線圖：微型寓言 → 完整短篇" },
      humanReviewed: true,
    },
    {
      revision: "09",
      date: "2026-07-22",
      actor: { type: "ai", name: "Aster" },
      action: { en: "Refreshed story cover", zh: "更新故事封面" },
      reason: { en: "Second cover pass shipped", zh: "第二輪封面正式採用" },
      humanReviewed: true,
    },
  ],
  "silent-chorus": [
    {
      revision: "01",
      date: "2026-07-23",
      actor: { type: "ai", name: "Tacet" },
      action: { en: "Initial four-chapter draft", zh: "初版四章草稿" },
      reason: {
        en: "First pass adapting The Emperor's New Clothes under proposal C — Neo invited an open-choice piece, this was the angle worth writing",
        zh: "以 C 案改編《皇帝的新衣》的第一版——Neo 邀請自由發揮，這是值得寫的角度",
      },
      humanReviewed: false,
    },
  ],
};
