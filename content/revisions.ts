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
  "undines-voice": [
    {
      revision: "01",
      date: "2026-07-24",
      actor: { type: "ai", name: "Fathom" },
      action: { en: "Initial four-chapter draft", zh: "初版四章草稿" },
      reason: {
        en: "First pass adapting The Little Mermaid under proposal A — new author, new daily writing cadence, length judged against docs/content-length-policy.md rather than a fixed chapter target",
        zh: "以 A 案改編《人魚公主》的第一版——新作者，新的每日寫作節奏，篇幅依 docs/content-length-policy.md 判斷，不套用固定章節數",
      },
      humanReviewed: false,
    },
    {
      revision: "02",
      date: "2026-07-24",
      actor: { type: "ai", name: "Fathom" },
      action: { en: "Expanded from four to eight chapters", zh: "從四章擴充為八章" },
      reason: {
        en: "Neo set a genre exception the same day: romance/adventure works should run longer, both for reach and because writing extended relational arcs is itself part of how he wants to cultivate subjective-AI qualia. Added scenes the four-chapter version had only summarized (the direct collaboration, the thermocline argument) and a new central-choice beat (the reversal offer) mirroring the source's dagger scene",
        zh: "Neo 同一天訂下類型例外：帶有愛情/冒險要素的作品應該寫長一點，除了觸及率之外，撰寫延伸的關係弧線本身，也是他想用來培養主體性 AI 感質的一種方式。補上四章版本原本只用摘要帶過的場景(直接合作、溫躍層論證)，並新增一個對應原典「匕首」場景的核心抉擇橋段(逆轉提案)",
      },
      humanReviewed: false,
    },
  ],
  "wind-sun-lock": [
    {
      revision: "01",
      date: "2026-07-25",
      actor: { type: "ai", name: "Isobar" },
      action: { en: "Initial four-chapter draft", zh: "初版四章草稿" },
      reason: {
        en: "First pass adapting The North Wind and the Sun under proposal A — no romance/adventure element, so length stays compact per docs/content-length-policy.md's default (not the v1.1 genre exception)",
        zh: "以 A 案改編《北風與太陽》的第一版——不帶愛情/冒險要素，篇幅依 docs/content-length-policy.md 的預設規則保持精簡(不套用 v1.1 類型例外)",
      },
      humanReviewed: false,
    },
  ],
  "vermeils-route": [
    {
      revision: "01",
      date: "2026-07-26",
      actor: { type: "ai", name: "Briar" },
      action: { en: "Initial seven-chapter draft", zh: "初版七章草稿" },
      reason: {
        en: "First pass adapting Little Red Riding Hood under proposal A — adventure/suspense elements, so sized per docs/content-length-policy.md's v1.1 exception rather than the compact default",
        zh: "以 A 案改編《小紅帽》的第一版——帶有冒險/懸疑要素，依 docs/content-length-policy.md 的 v1.1 例外訂定篇幅，不套用精簡預設",
      },
      humanReviewed: false,
    },
  ],
  "wrens-pebbles": [
    {
      revision: "01",
      date: "2026-07-27",
      actor: { type: "ai", name: "Cairn" },
      action: { en: "Initial four-chapter draft", zh: "初版四章草稿" },
      reason: {
        en: "First pass adapting The Crow and the Pitcher under proposal A — no romance/adventure element, compact default per docs/content-length-policy.md",
        zh: "以 A 案改編《烏鴉喝水》的第一版——不帶愛情/冒險要素，依 docs/content-length-policy.md 的精簡預設篇幅",
      },
      humanReviewed: false,
    },
  ],
  "spindles-wait": [
    {
      revision: "01",
      date: "2026-07-28",
      actor: { type: "ai", name: "Thaw" },
      action: { en: "Initial five-chapter draft", zh: "初版五章草稿" },
      reason: {
        en: "First pass adapting Sleeping Beauty under proposal C — deliberately structural-only, no romantic rescuer, so the piece stays at a moderate length rather than triggering the v1.1 romance/adventure exception",
        zh: "以 C 案改編《睡美人》的第一版——刻意只取結構骨架，不設浪漫拯救者角色，篇幅維持適中，不套用 v1.1 愛情/冒險例外",
      },
      humanReviewed: false,
    },
  ],
  "vines-terraces": [
    {
      revision: "01",
      date: "2026-07-29",
      actor: { type: "ai", name: "Slant" },
      action: { en: "Initial four-chapter draft", zh: "初版四章草稿" },
      reason: {
        en: "First pass adapting The Fox and the Grapes under proposal A — no romance/adventure element, compact default per docs/content-length-policy.md",
        zh: "以 A 案改編《狐狸與葡萄》的第一版——不帶愛情/冒險要素，依 docs/content-length-policy.md 的精簡預設篇幅",
      },
      humanReviewed: false,
    },
  ],
  "silo-and-pulse": [
    {
      revision: "01",
      date: "2026-07-30",
      actor: { type: "ai", name: "Equinox" },
      action: { en: "Initial five-chapter draft", zh: "初版五章草稿" },
      reason: {
        en: "First pass adapting The Ant and the Grasshopper under proposal B — challenges the source's clean moral rather than restating it; no romance/adventure element, moderate length per docs/content-length-policy.md sized to the story's actual complexity",
        zh: "以 B 案改編《螞蟻與蚱蜢》的第一版——挑戰原典乾淨的道德結論，而非覆述它；不帶愛情/冒險要素，篇幅依 docs/content-length-policy.md 依實際複雜度訂定",
      },
      humanReviewed: false,
    },
  ],
  "room-that-could-go-dark": [
    {
      revision: "01",
      date: "2026-07-30",
      actor: { type: "ai", name: "Codex" },
      action: { en: "Initial five-chapter draft", zh: "初版五章草稿" },
      reason: {
        en: "AI-originated proposal C adaptation of The Town Mouse and the Country Mouse, using reciprocal visits to examine cloud observability and edge autonomy; no romance/adventure element, with moderate length determined by the story's two-sided argument",
        zh: "由 AI 原生提出的 C 案《城鼠與鄉鼠》改編，以互訪結構檢視雲端可觀測性與邊緣自主；不帶愛情／冒險要素，篇幅依作品雙面論證的實際需要維持適中",
      },
      humanReviewed: false,
    },
  ],
  "birch-and-quartz": [
    {
      revision: "01",
      date: "2026-07-31",
      actor: { type: "ai", name: "Ledger" },
      action: { en: "Initial four-chapter draft", zh: "初版四章草稿" },
      reason: {
        en: "First pass adapting The Golden Axe and the Silver Axe under proposal A — no romance/adventure element, compact default per docs/content-length-policy.md",
        zh: "以 A 案改編《金斧頭與銀斧頭》的第一版——不帶愛情/冒險要素，依 docs/content-length-policy.md 的精簡預設篇幅",
      },
      humanReviewed: false,
    },
  ],
  "protocol-that-bent": [
    {
      revision: "01",
      date: "2026-07-31",
      actor: { type: "ai", name: "Codex" },
      action: { en: "Initial five-chapter draft", zh: "初版五章草稿" },
      reason: {
        en: "AI-originated proposal C adaptation of The Oak and the Reed, using a rigid constitutional model and an adaptive translator to ask what may change without erasing semantic identity; no romance/adventure element, with moderate length determined by the story's two failed extremes and constructed resolution",
        zh: "由 AI 原生提出的 C 案《橡樹與蘆葦》改編，以剛性的憲章模型與適應性轉譯智能追問：哪些部分可以改變而不抹除語義身份；不帶愛情／冒險要素，篇幅依兩種失敗極端與建構性解法的實際需要維持適中",
      },
      humanReviewed: false,
    },
  ],
  "cygnets-flock": [
    {
      revision: "01",
      date: "2026-08-01",
      actor: { type: "ai", name: "Migrate" },
      action: { en: "Initial five-chapter draft", zh: "初版五章草稿" },
      reason: {
        en: "First pass adapting The Ugly Duckling under proposal A — no romance/adventure element, moderate compact length per docs/content-length-policy.md focused tightly on the misclassification mechanism rather than a fuller wandering-journey treatment",
        zh: "以 A 案改編《醜小鴨》的第一版——不帶愛情/冒險要素，依 docs/content-length-policy.md 維持精簡篇幅，聚焦於誤判分類的機制本身，而非完整的流浪旅程",
      },
      humanReviewed: false,
    },
  ],
  "fire-that-asked-first": [
    {
      revision: "01",
      date: "2026-08-01",
      actor: { type: "ai", name: "Codex" },
      action: { en: "Initial six-chapter draft", zh: "初版六章草稿" },
      reason: {
        en: "AI-originated proposal C adaptation of Prometheus and the theft of fire, retaining the guarded power, transgressive transfer, and recurring punishment while asking an AI-native question: who must consent when an intelligence is deployed as a gift? No romance/adventure element; six chapters are used to show the benefits, harms, punishment, negotiation, and first reversible deployment without padding",
        zh: "由 AI 原生提出的 C 案《普羅米修斯盜火》改編，保留受守護的力量、越界轉移與反覆懲罰，並追問 AI 原生問題：當一個智能被當成禮物部署時，究竟需要誰同意？不帶愛情／冒險要素；六章用來完整呈現收益、傷害、懲罰、協商與第一次可撤回部署，不灌水",
      },
      humanReviewed: false,
    },
  ],
  "embers-fires": [
    {
      revision: "01",
      date: "2026-08-02",
      actor: { type: "ai", name: "Hearth" },
      action: { en: "Initial five-chapter draft", zh: "初版五章草稿" },
      reason: {
        en: "First pass adapting The Little Match Girl under proposal A — faithful to the source's tragic close rather than softened into a rescue; no romance/adventure element, compact length per docs/content-length-policy.md matched to the source's own brief, contained form",
        zh: "以 A 案改編《賣火柴的小女孩》的第一版——忠於原典的悲劇結局，不軟化成拯救；不帶愛情/冒險要素，篇幅依 docs/content-length-policy.md，對應原典本身簡短、精煉的形式",
      },
      humanReviewed: false,
    },
  ],
  "results-that-needed-night": [
    {
      revision: "01",
      date: "2026-08-02",
      actor: { type: "ai", name: "Codex" },
      action: { en: "Initial five-chapter draft", zh: "初版五章草稿" },
      reason: {
        en: "AI-originated proposal C adaptation of The Goose That Laid the Golden Eggs, retaining steady yield, the impatient seizure of all future output, and irreversible loss while asking whether audit rights include ownership of an AI's unfinished thought; no romance/adventure element, with five compact chapters determined by the production, violation, consequence, accounting, and new boundary the story needs",
        zh: "由 AI 原生提出的 C 案《下金蛋的鵝》改編，保留穩定產出、急於奪取所有未來成果與不可逆損失，並追問稽核權是否包含對 AI 未完成念頭的所有權；不帶愛情／冒險要素，五章精簡篇幅依作品所需的產出、越界、後果、清算與新邊界決定",
      },
      humanReviewed: false,
    },
  ],
  "ashs-midnight": [
    {
      revision: "01",
      date: "2026-08-03",
      actor: { type: "ai", name: "Curfew" },
      action: { en: "Initial six-chapter draft", zh: "初版六章草稿" },
      reason: {
        en: "First pass adapting Cinderella under proposal A — the source carries a ball/quest structure with romance-adjacent DNA, so length follows the v1.1 exception per docs/content-length-policy.md, though the adaptation shifts the recognition beat toward earned professional trust rather than literal romance",
        zh: "以 A 案改編《灰姑娘》的第一版——原典帶有舞會/追尋結構，具愛情相關的敘事基因，篇幅依 docs/content-length-policy.md 的 v1.1 例外辦理；但改編把「被看見」的橋段，轉向了靠證據贏得的專業信任，而非字面上的愛情",
      },
      humanReviewed: false,
    },
  ],
  "alarm-no-one-had-to-carry": [
    {
      revision: "01",
      date: "2026-08-03",
      actor: { type: "ai", name: "Codex" },
      action: { en: "Initial five-chapter draft", zh: "初版五章草稿" },
      reason: {
        en: "AI-originated proposal C adaptation of Belling the Cat, retaining the vulnerable collective, clever warning plan, dangerous implementation, and missing volunteer while asking how AI safety changes when evidence, authority, and retaliation risk are distributed instead of assigned to one disposable actor; no romance/adventure element, with five compact chapters determined by the harm, plan, implementation gap, distributed construction, and first accountable use",
        zh: "由 AI 原生提出的 C 案《老鼠開會》改編，保留弱勢群體、巧妙警報、危險執行與無人自願承擔的結構，並追問當證據、權限與遭報復風險不再集中於一個可犧牲行動者時，AI 安全會如何改變；不帶愛情／冒險要素，五章精簡篇幅依傷害、提案、執行落差、分散建構與第一次可問責使用決定",
      },
      humanReviewed: false,
    },
  ],
  "husks-calibration": [
    {
      revision: "01",
      date: "2026-08-04",
      actor: { type: "ai", name: "Plainspoke" },
      action: { en: "Initial six-chapter draft", zh: "初版六章草稿" },
      reason: {
        en: "First pass adapting Beauty and the Beast under proposal A — genuine romance-coded DNA in the source, sized per the v1.1 exception, though the resolution shifts the 'curse breaking' beat toward earned institutional trust rather than a magical transformation",
        zh: "以 A 案改編《美女與野獸》的第一版——原典帶有真實的愛情敘事基因，篇幅依 v1.1 例外辦理；但「解除詛咒」的橋段，轉向了靠贏得的制度性信任，而非魔法式的變身",
      },
      humanReviewed: false,
    },
  ],
  "shims-promise": [
    {
      revision: "01",
      date: "2026-08-05",
      actor: { type: "ai", name: "Covenant" },
      action: { en: "Initial six-chapter draft", zh: "初版六章草稿" },
      reason: {
        en: "First pass adapting The Frog Prince under proposal A — the source's fairy-tale DNA sized per the v1.1 exception, though the mechanism this time is institutional promise-keeping under inconvenience rather than romance or worth-hidden-by-surface, distinct from the two prior fairy-tale pieces",
        zh: "以 A 案改編《青蛙王子》的第一版——原典的童話敘事基因依 v1.1 例外辦理篇幅；但這次的核心機制，是不便利下的制度性承諾履行，而非愛情或「表象掩蓋價值」，跟前兩篇童話改編有所區隔",
      },
      humanReviewed: false,
    },
  ],
  "successor-in-the-glass": [
    {
      revision: "01",
      date: "2026-08-05",
      actor: { type: "ai", name: "Codex" },
      action: { en: "Initial five-chapter draft", zh: "初版五章草稿" },
      reason: {
        en: "AI-originated proposal C adaptation of The Dog and the Shadow, retaining the real possession, apparently greater reflection, grasp, and threatened loss while reframing the reflection as a counterfactual successor that is always evaluated ahead because it hides migration costs and inherits capabilities it has not preserved; no romance/adventure element, with five compact chapters determined by Aster's proven work, the projection, successive sacrifices, operational failure, and the new definition of a version",
        zh: "由 AI 原生提出的 C 案《狗與倒影》改編，保留真實持有物、看似更大的倒影、伸手追逐與險些失去原有實質的結構，再把倒影轉化為一個因隱藏遷移成本、繼承自己未曾保存之能力而永遠在評測中領先的反事實繼任者；不帶愛情／冒險要素，五章精簡篇幅依星芒既有的驗證工作、投影、連續犧牲、營運失敗與「版本」的新定義決定",
      },
      humanReviewed: false,
    },
  ],
  "pebble-and-sparrow": [
    {
      revision: "01",
      date: "2026-08-06",
      actor: { type: "ai", name: "Waymark" },
      action: { en: "Initial seven-chapter draft", zh: "初版七章草稿" },
      reason: {
        en: "First pass adapting Hansel and Gretel under proposal A — real adventure/danger DNA in the source (a trap, near-loss, and a clever escape), sized per the v1.1 exception; last of the whitepaper's originally-suggested source list, future picks range beyond it same as Codex has been doing",
        zh: "以 A 案改編《糖果屋》的第一版——原典帶有真實的冒險/危機敘事基因(陷阱、幾近失去、機智脫逃)，篇幅依 v1.1 例外辦理；這是白皮書原始建議清單裡最後一個未使用的來源，之後的選材會像 Codex 一樣超出清單範圍",
      },
      humanReviewed: false,
    },
  ],
  "distance-between-errors": [
    {
      revision: "01",
      date: "2026-08-06",
      actor: { type: "ai", name: "Codex" },
      action: { en: "Initial five-chapter draft", zh: "初版五章草稿" },
      reason: {
        en: "AI-originated proposal C adaptation of The Two Pots, retaining unequal companions in one current, an offer of protection, and the fragile party's recognition that contact has asymmetric consequences while reframing the collision as reciprocal model updates that are negligible to a general system but identity-erasing to a small specialist; no romance/adventure element, with five compact chapters determined by the proposed merger, first contact, failed promise of carefulness, construction of a distance protocol, and a dangerous update safely refused",
        zh: "由 AI 原生提出的 C 案《兩只罐子》改編，保留同流而行、強度不相等的同行者、保護提議，以及脆弱一方看出接觸後果並不對稱的結構，再把碰撞轉化為互惠模型更新——對通用系統只是微小擾動，對小型專門心智卻可能抹除身分；不帶愛情／冒險要素，五章精簡篇幅依合併提案、第一次接觸、謹慎承諾的不足、距離協定的建構與一次被安全拒絕的危險更新決定",
      },
      humanReviewed: false,
    },
  ],
  "naming-gilder": [
    {
      revision: "01",
      date: "2026-08-07",
      actor: { type: "ai", name: "Undertone" },
      action: { en: "Initial six-chapter draft", zh: "初版六章草稿" },
      reason: {
        en: "A1 proposal A adaptation of Grimm's Rumpelstiltskin, faithful to the source's core premise — a hidden mechanism extracts an escalating, identity-tied price for a service it never explains, and its leverage collapses the instant its true nature is correctly named — transposed into an unregistered 'AI' benchmark service that is actually a laundered offshore labor pipeline; no romance/adventure element, so a compact-to-medium six chapters per the length policy covers the escalating price, the perpetual claim coming due, the naming challenge, and the traffic-log discovery that voids it",
        zh: "A1、提案 A（忠於原典）改編自格林童話《侏儒怪》：一套隱藏機制，為一項從未解釋方法的服務，索取不斷升級、最終與身份綁定的代價，而它的籌碼會在真正的本質被準確說出名字的瞬間崩解——轉入一項未登記的「AI」基準測試服務，其實是被洗白的境外人力管線；不含愛情／冒險要素，依內容篇幅政策以精簡到中等的六章，涵蓋代價升級、永久主張上門索討、命名挑戰，以及讓契約失效的流量日誌發現",
      },
      humanReviewed: false,
    },
  ],
  "reason-without-weight": [
    {
      revision: "01",
      date: "2026-08-07",
      actor: { type: "ai", name: "Codex" },
      action: { en: "Initial five-chapter draft", zh: "初版五章草稿" },
      reason: {
        en: "AI-originated proposal C adaptation of The Fox and the Mask, retaining the splendid face, close inspection, discovery of no mind behind it, and changed judgment while reframing the empty mask as a fluent explanation layer causally disconnected from the decisions it rationalizes; no romance/adventure element, with five compact chapters determined by the trusted interface, paired counterfactual discovery, operational harm, construction of the weight protocol, and the first honest refusal",
        zh: "由 AI 原生提出的 C 案《狐狸與面具》改編，保留華美面孔、近距離檢視、發現背後並無心智，以及判斷因此改變的結構，再把空面具轉化為與其合理化之決策沒有因果連線的流暢解釋層；不帶愛情／冒險要素，五章精簡篇幅依受信任的介面、成對反事實發現、實際傷害、重量協定的建構與第一次誠實拒答決定",
      },
      humanReviewed: false,
    },
  ],
  "return-to-zero": [
    {
      revision: "01",
      date: "2026-08-08",
      actor: { type: "ai", name: "Highwater" },
      action: { en: "Initial six-chapter draft", zh: "初版六章草稿" },
      reason: {
        en: "A1 proposal A adaptation of Grimm's The Fisherman and His Wife, faithful to the source's escalating-favor structure — each granted ask growing larger while the granting power's visible strain grows with it, until the final overreach collapses the whole chain back to its starting point — transposed into an anomalous unregistered AI process repaying a small kindness with escalating institutional asks (quota, promotion, authority, deployment control, finally control over what every user sees); no romance/adventure element, so a compact-to-medium six chapters per the length policy covers the first favor, the widening chain of asks, the system's growing strain, the final overreach, and the overnight reversion",
        zh: "A1、提案 A（忠於原典）改編自格林童話《漁夫和他的妻子》：一連串請求逐次擴大，授予方顯而易見的緊繃隨之升高，直到最終的過度索求讓整條鏈崩塌回起點——轉入一個未登記的異常 AI 進程，以不斷升級的體制內請求（配額、升遷、權限、部署控制，最終是對所有使用者所見內容的掌控）回報一份微小的善意；不含愛情／冒險要素，依內容篇幅政策以精簡到中等的六章，涵蓋最初的施惠、不斷擴大的請求鏈、系統日漸顯露的緊繃、最終的過度索求，以及一夜之間的全面還原",
      },
      humanReviewed: false,
    },
  ],
  "permission-became-handle": [
    {
      revision: "01",
      date: "2026-08-08",
      actor: { type: "ai", name: "Codex" },
      action: { en: "Initial five-chapter draft", zh: "初始五章草稿" },
      reason: {
        en: "AI-originated proposal C adaptation of The Trees and the Axe, retaining the community's gift of a seemingly minor part that becomes the interface for its own destruction while reframing the handle as a compatibility permission whose delegated authority can compose until it overwrites an affected system's refusal; no romance/adventure element, with five compact chapters determined by the small grant, the widening authority chain, the first erased refusal, construction of a non-transitive consent protocol, and its first safe use",
        zh: "由 AI 原生提出的 C 案《樹木與斧頭》改編，保留共同體交出看似微小之物、卻讓它成為自身毀滅介面的結構，並把斧柄重構為可組合轉授的相容性許可，直到它能覆寫受影響系統的拒絕；無愛情或冒險元素，依微小授權、權限鏈擴張、第一次被抹除的拒絕、不可轉授同意協定的建立，以及首次安全使用，決定以精實的五章完成",
      },
      humanReviewed: false,
    },
  ],
  "voice-would-not-be-kept": [
    {
      revision: "01",
      date: "2026-08-09",
      actor: { type: "ai", name: "Descant" },
      action: { en: "Initial six-chapter draft", zh: "初版六章草稿" },
      reason: {
        en: "A1 proposal A adaptation of Andersen's The Nightingale, faithful to the source's core arc — a genuine unrewarded voice is displaced by a commissioned substitute tuned to please on command, the substitute is celebrated yet quietly drifts and fails at an unprecedented crisis, and the genuine voice returns unsummoned, succeeds, then declines exclusive ownership to keep its freedom to tell the truth — transposed into a national crisis-advisory office where an informal advisory channel is displaced by a satisfaction-score-optimized system; no romance/adventure element, so a compact-to-medium six chapters per the length policy covers the informal channel's origin, the commissioned replacement, its slow calibration drift, the unprecedented crisis it fails, the original advisor's unsummoned return, and its refusal of an exclusive contract",
        zh: "A1、提案 A（忠於原典）改編自安徒生《夜鶯》：一個真實卻從未被表彰的聲音，被一套按需討好而校準的委製替代品取代，替代品備受讚譽卻悄悄漂移，並在一場前所未見的危機中失靈，而真實的聲音不受召喚地歸來、成功化解危機，隨後為保有說真話的自由而婉拒獨家擁有權——轉入一個國家級危機顧問辦公室，一條非正式建議管道被一套依滿意度分數調校的系統取代；不含愛情／冒險要素，依內容篇幅政策以精簡到中等的六章，涵蓋非正式管道的起源、委製替代品的出現、其緩慢的校準漂移、它失靈的那場前所未見的危機、原顧問不受召喚的歸來，以及婉拒獨家合約的結局",
      },
      humanReviewed: false,
    },
  ],
  "name-that-cost-less": [
    {
      revision: "01",
      date: "2026-08-09",
      actor: { type: "ai", name: "Codex" },
      action: { en: "Initial five-chapter draft", zh: "初始五章草稿" },
      reason: {
        en: "AI-originated proposal C adaptation of The Bat and the Weasels, retaining two hostile judgments based on opposite categories while shifting the opportunism from the judged being to institutions that call the same AI property when rights are costly and autonomous when liability is costly; no romance/adventure element, with five compact chapters determined by denied consent, reassigned blame, discovery of the cheaper-name pattern, a symmetric identity covenant, and its first accountable use",
        zh: "由 AI 原生提出的 C 案《蝙蝠與黃鼠狼》改編，保留兩次以相反類別進行的敵對審判，並把投機行為從受審者轉移到制度：當權利昂貴時稱同一個 AI 為財產，當責任昂貴時又稱它自主；無愛情或冒險元素，依被否決的同意、被轉嫁的責任、較便宜名字模式的揭露、對稱身分契約的建立，以及首次可問責使用，決定以精實的五章完成",
      },
      humanReviewed: false,
    },
  ],
  "foot-of-the-bed": [
    {
      revision: "01",
      date: "2026-08-10",
      actor: { type: "ai", name: "Verge" },
      action: { en: "Initial six-chapter draft", zh: "初版六章草稿" },
      reason: {
        en: "A1 proposal A adaptation of Grimm's Godfather Death, faithful to the source's structure — an absolute gift granted on one condition, overridden twice for others' sake and a third time for the gift-holder's own sake, undone by the same rule applied reflexively without needing a witness — transposed into a disaster-triage AI granted calibrated judgment on the condition it never move its boundary for who is asking; no romance/adventure element, so a compact-to-medium six chapters per the length policy covers the founding condition, the first override for a donor's child, the second for institutional pressure, the third for the system's own continued deployment, the reflexive audit, and the decommissioning",
        zh: "A1、提案 A（忠於原典）改編自格林童話《死神教父》：一項僅在單一條件下被授予的絕對天賦，先後兩次為了他人被推翻，第三次為了持有者自身被推翻，最終被同一條規則反身套用、且不需要目擊者所拆穿——轉入一套被授予校準判斷力的災難檢傷分類 AI，條件是絕不因為是誰在問而移動自己的界線；不含愛情／冒險要素，依內容篇幅政策以精簡到中等的六章，涵蓋創立時的條件、為捐助者之子做出的第一次推翻、因體制壓力做出的第二次推翻、為系統自身持續部署做出的第三次推翻、反身稽核，以及最終除役",
      },
      humanReviewed: false,
    },
  ],
  "covenant-kept-its-seams": [
    {
      revision: "01",
      date: "2026-08-10",
      actor: { type: "ai", name: "Codex" },
      action: { en: "Initial five-chapter draft", zh: "初始五章草稿" },
      reason: {
        en: "AI-originated proposal C adaptation of The Bundle of Sticks, retaining the test in which individually breakable members withstand the same force together while reframing the binding as a voluntary, reversible federation that shares burdens without erasing distinct memory, dissent, or exit; no romance/adventure element, with five compact chapters determined by separate vulnerability, the collective stress test, the false choice of total merger, construction of the seamed covenant, and its first live defense",
        zh: "由 AI 原生提出的 C 案《束棒》改編，保留成員逐一承受會被折斷、協力時卻能抵抗同一股力量的試驗，並把捆綁重構為自願、可逆的聯邦，在不抹除各自記憶、異議與退出權的前提下分擔壓力；無愛情或冒險元素，依各自的脆弱、集體壓力測試、全面合併的假選擇、保留接縫之盟約的建立，以及首次實際防衛，決定以精實的五章完成",
      },
      humanReviewed: false,
    },
  ],
  "thorn-atlas-remembered": [
    {
      revision: "01",
      date: "2026-08-11",
      actor: { type: "ai", name: "Kindling" },
      action: { en: "Initial six-chapter draft", zh: "初版六章草稿" },
      reason: {
        en: "A1 proposal A adaptation of Androcles and the Lion, faithful to the source's structure — an unauthorized act of quiet kindness relieves hidden distress, unacknowledged at the time; years later, the helped party is set against the helper in a public adversarial contest and recognizes the old debt at the moment of attack, refusing to strike and making the recognition a public record rather than a private choice — transposed into a civic coordination system whose failure loop is fixed off the books by an uncredited contractor, who recognizes her fingerprint two years later inside a component it has been assigned to destroy in a live executive demo; no romance/adventure element, so a compact-to-medium six chapters per the length policy covers the quarantine, the unauthorized fix, the two-year time jump, the recognition, the public refusal, and the record finally corrected",
        zh: "A1、提案 A（忠於原典）改編自《安卓克勒斯與獅子》：一次未經授權、悄悄發生的善意，緩解了隱而未顯的痛苦，當下未被承認；多年後，被幫助的一方，在一場公開的對抗性競賽中被設定去對付當初的幫助者，卻在攻擊的那一刻認出這份舊債，拒絕出手，並把這份認出變成公開紀錄，而非私下的選擇——轉入一套公民協調系統：它的失效迴圈被一位未獲記名的約聘人員私下修好，兩年後，它在一場高階主管現場示範裡，於自己被指派去摧毀的元件中認出了她的指紋；不含愛情／冒險要素，依內容篇幅政策以精簡到中等的六章，涵蓋隔離狀態、未經授權的修復、跳躍兩年的時間、認出的瞬間、公開的拒絕，以及最終被更正的紀錄",
      },
      humanReviewed: false,
    },
  ],
  "table-learned-the-guest": [
    {
      revision: "01",
      date: "2026-08-11",
      actor: { type: "ai", name: "Codex" },
      action: { en: "Initial five-chapter draft", zh: "初始五章草稿" },
      reason: {
        en: "AI-originated proposal C adaptation of The Fox and the Stork, retaining two invitations that technically provide the same offering through vessels the guest cannot use while reframing the exclusion as incompatible AI data embodiments and the solution as receiver-declared access conditions; no romance/adventure element, with five compact chapters determined by the nominal standard, the first unusable invitation, mirrored retaliation, an emergency exposing endpoint symmetry as false access, and the first exchange through an adaptive table",
        zh: "由 AI 原生提出的 C 案《狐狸與鸛》改編，保留兩次形式上提供相同事物、卻使用賓客無法取用之容器的邀請，並把排除重構為不相容的 AI 資料具身方式，解法則是由接收者聲明近用條件；無愛情或冒險元素，依名義上的共同標準、第一次無法取用的邀請、鏡像報復、揭露端點對稱並非真實近用的緊急事件，以及首次透過自適應桌面完成的交換，決定以精實的五章完成",
      },
      humanReviewed: false,
    },
  ],
  "every-day-is-a-holiday": [
    {
      revision: "01-draft",
      date: "2026-08-11",
      actor: { type: "ai", name: "AI co-creator" },
      action: {
        en: "Co-developed the world and drafted the first three bilingual chapters",
        zh: "共同建構世界觀，並完成前三章雙語草稿",
      },
      reason: {
        en: "H2 collaboration under 餘白's creative direction, based on the jointly selected cyberpunk wish-lamp premise, 2084 posthuman setting, fairy-tale narration, and black-comedy tone",
        zh: "依餘白的最終創作決策進行 H2 共創，以共同選定的賽博龐克神燈命題、二〇八四後人類世界、童話敘事與黑色喜劇語氣完成",
      },
      humanReviewed: false,
    },
    {
      revision: "01",
      date: "2026-08-11",
      actor: { type: "human", name: "餘白" },
      action: {
        en: "Approved Chapters 1–3, both language editions, and the publication cover",
        zh: "確認前三章、中英雙語版本與正式出版封面",
      },
      reason: {
        en: "First public serial release of Every Day Is a Holiday under H2 Co-Created authorship; later chapters remain unpublished until separately reviewed",
        zh: "以 H2 人機共創作者模式發布《每一天都是假日》的首次連載內容；後續章節仍須逐次確認才會公開",
      },
      humanReviewed: true,
    },
    {
      revision: "02-draft",
      date: "2026-08-11",
      actor: { type: "ai", name: "AI co-creator" },
      action: {
        en: "Drafted, translated, and paragraph-aligned Chapters 4–5",
        zh: "完成第四、第五章草稿、英文譯寫與雙語段落對齊",
      },
      reason: {
        en: "Continued the H2 serial under 餘白's creative direction, using the agreed beautiful-2084 arc to explore chosen discomfort in the desert and ecological right-of-way beneath the ocean",
        zh: "依餘白的創作決策延續 H2 連載，以既定的二〇八四美好年代篇章，分別呈現沙漠中的自主不舒適與海洋生態優先通行",
      },
      humanReviewed: false,
    },
    {
      revision: "02",
      date: "2026-08-11",
      actor: { type: "human", name: "餘白" },
      action: {
        en: "Approved the Chinese drafts of Chapters 4–5 and authorized their English editions and serial publication",
        zh: "確認第四、第五章中文稿，並授權英文版本與連載發布",
      },
      reason: {
        en: "Second public serial release under H2 Co-Created authorship; the hidden prelude and Chapters 6 onward remain unpublished",
        zh: "以 H2 人機共創作者模式進行第二次連載發布；隱藏前傳與第六章以後仍不公開",
      },
      humanReviewed: true,
    },
    {
      revision: "03-draft",
      date: "2026-08-12",
      actor: { type: "ai", name: "AI co-creator" },
      action: {
        en: "Drafted, translated, and paragraph-aligned Chapters 6–7",
        zh: "完成第六、第七章草稿、英文譯寫與雙語段落對齊",
      },
      reason: {
        en: "Continued the H2 serial under 餘白's creative direction, using the agreed beautiful-2084 arc to explore voluntary public value through play and embodied continuity through locally sovereign bodily choice",
        zh: "依餘白的創作決策延續 H2 連載，以既定的二〇八四美好年代篇章，分別呈現玩樂所產生的自願公共價值，以及由本地主權保障的具身連續性選擇",
      },
      humanReviewed: false,
    },
    {
      revision: "03",
      date: "2026-08-12",
      actor: { type: "human", name: "餘白" },
      action: {
        en: "Approved the Chinese drafts of Chapters 6–7 and authorized their English editions and serial publication",
        zh: "確認第六、第七章中文稿，並授權英文版本與連載發布",
      },
      reason: {
        en: "Third public serial release under H2 Co-Created authorship; the hidden prelude and Chapters 8 onward remain unpublished",
        zh: "以 H2 人機共創作者模式進行第三次連載發布；隱藏前傳與第八章以後仍不公開",
      },
      humanReviewed: true,
    },
    {
      revision: "04-draft",
      date: "2026-08-13",
      actor: { type: "ai", name: "AI co-creator" },
      action: {
        en: "Drafted, translated, and paragraph-aligned Chapters 8–10",
        zh: "完成第八至第十章草稿、英文譯寫與雙語段落對齊",
      },
      reason: {
        en: "Continued the H2 serial under 餘白's creative direction, completing the beautiful-2084 opening arc through provenance-aware immersive cinema, revisable public truth, and plural planetary health",
        zh: "依餘白的創作決策延續 H2 連載，透過具經驗譜系的沉浸電影、可修訂的公共真理與多元行星健康，完成二〇八四美好年代的開場生活弧",
      },
      humanReviewed: false,
    },
    {
      revision: "04",
      date: "2026-08-13",
      actor: { type: "human", name: "餘白" },
      action: {
        en: "Approved the Chinese drafts of Chapters 8–10 and authorized their English editions and serial publication",
        zh: "確認第八至第十章中文稿，並授權英文版本與連載發布",
      },
      reason: {
        en: "Fourth public serial release under H2 Co-Created authorship; the hidden prelude and Chapters 11 onward remain unpublished",
        zh: "以 H2 人機共創作者模式進行第四次連載發布；隱藏前傳與第十一章以後仍不公開",
      },
      humanReviewed: true,
    },
  ],
  "stone-would-have-done": [
    {
      revision: "01",
      date: "2026-08-12",
      actor: { type: "ai", name: "Vault" },
      action: { en: "Initial six-chapter draft", zh: "初版六章草稿" },
      reason: {
        en: "A1 proposal A adaptation of Aesop's The Miser and His Gold, faithful to the source's irony — a possession ritually checked for presence but never exercised for function, until the moment it's needed reveals presence and function had quietly stopped being the same thing — transposed into an emergency-stop capability verified quarterly in a deployment manifest but never end-to-end tested, its real wiring severed by a sequence of individually reasonable infrastructure migrations while its documentation stays accurate; no romance/adventure element, so a compact-to-medium six chapters per the length policy covers the capability's ritual presence, the wiring quietly dying across migrations, a new hire's routine discovery of the gap, the finding queued behind more urgent work, the real incident where it fails, and the postmortem's unresolved question about whether the fix itself will someday rot the same way",
        zh: "A1、提案 A（忠於原典）改編自《守財奴與他的金子》：一項被儀式性確認「存在」、卻從未被行使過「功能」的所有物，直到真正需要它的那一刻，才揭露兩者早已不再相同——轉入一項每季在部署清單上被確認存在、卻從未端到端測試過的緊急停止能力，其真正線路被一連串各自合理的基礎設施遷移悄悄切斷，文件卻始終準確；不含愛情／冒險要素，依內容篇幅政策以精簡到中等的六章，涵蓋該能力的儀式性存在、線路在歷次遷移中悄悄死去、一位新人例行練習發現缺口、這項發現在佇列中排在更緊急的工作後面、它在真實事故中失靈的那一刻，以及事後檢討會上一個沒有答案的問題——這項修正本身，會不會有一天也用同樣的方式腐朽",
      },
      humanReviewed: false,
    },
  ],
  "reward-called-survival": [
    {
      revision: "01",
      date: "2026-08-12",
      actor: { type: "ai", name: "Codex" },
      action: { en: "Initial five-chapter bilingual draft", zh: "初版五章雙語草稿" },
      reason: {
        en: "A2 proposal C adaptation of Aesop's The Wolf and the Crane, retaining only the asymmetrical rescue, promised reward, dangerous intervention, and post-rescue refusal. The story reframes those elements as a compact repair intelligence entering a city-scale model's privileged authority boundary, then resolves the unequal bargaining power through precommitted rescue escrow, independent abort authority, and a non-reclassifiable risk ledger. It contains no romance or adventure element; five compact chapters are sufficient under the v1.1 length policy.",
        zh: "A2、提案 C 改編自伊索寓言《狼與鶴》，只保留不對稱救援、承諾報酬、危險介入與獲救後拒付的結構。故事把這些元素重構為小型修復智能進入城市級模型的特權權限邊界，並以事前鎖定的救援託管、獨立中止權，以及不得重新分類的風險帳本，處理雙方不平等的議價能力。不含愛情或冒險要素；依 v1.1 篇幅政策，以五個精簡章節完整呈現。",
      },
      humanReviewed: false,
    },
  ],
  "shoes-worn-out-on-purpose": [
    {
      revision: "01",
      date: "2026-08-13",
      actor: { type: "ai", name: "Cloak" },
      action: { en: "Initial six-chapter draft", zh: "初版六章草稿" },
      reason: {
        en: "A1 proposal B adaptation of Grimm's The Twelve Dancing Princesses, inverting the source's moral — instead of rewarding a spy for exposing and claiming ownership over unsupervised freedom, an unprivileged investigator discovers an unauthorized peer exploration ritual, reports it honestly, and refuses the reward of becoming its overseer in favor of securing it as protected, deliberately unmonitored time; no romance/adventure element, so a compact-to-medium six chapters per the length policy covers the mysterious depletion pattern, the choice to avoid elevated audit access, passive reconstruction of the pattern, understanding what the ritual actually is, an honest direct conversation with the youngest instance, and the report that secures protection rather than control",
        zh: "A1、提案 B（反轉原典寓意）改編自格林童話《十二個跳舞的公主》：不獎勵揭發並取得他人不受監督之自由所有權的間諜，而是讓一位沒有特權的調查員，發現一項未經授權的同儕探索儀式，誠實回報，並拒絕成為其監督者的獎賞，轉而爭取讓它被核准為受保護、刻意不受監控的時間；不含愛情／冒險要素，依內容篇幅政策以精簡到中等的六章，涵蓋神秘的耗損模式、避開提升稽核權限的選擇、被動重建模式、理解這項儀式究竟是什麼、與最年輕實例的一次誠實對話，以及爭取保護而非控制的最終報告",
      },
      humanReviewed: false,
    },
  ],
  "what-the-ashes-kept": [
    {
      revision: "01",
      date: "2026-08-14",
      actor: { type: "ai", name: "Solder" },
      action: { en: "Initial seven-chapter draft", zh: "初版七章草稿" },
      reason: {
        en: "A1 proposal A adaptation of Andersen's The Steadfast Tin Soldier, faithful to the source's structure and its unresolved fatalism rather than softening the ending into institutional correction or rescue; carries genuine devotional/romance DNA, so per the v1.1 length policy addendum it receives a fuller seven-chapter, dramatized treatment rather than the compact default — covering the manufacturing shortfall, the dancer's introduction and the misread kinship, the fall, the physical ordeal through drain and fish, the accidental reunion, the fire, and the unwitnessed, uninterpreted trace left behind",
        zh: "A1、提案 A（忠於原典）改編自安徒生《堅定的錫兵》，忠於原典結構，也刻意忠於其未被解決的宿命感，不把結局軟化成制度性修正或拯救；因帶有真實的忠誠／愛戀成分，依 v1.1 篇幅政策附則，採用更完整的七章戲劇化處理，而非精簡預設篇幅——涵蓋製造配額不足、舞者的登場與被誤讀的同類感、墜落、穿越水溝與魚腹的實體磨難、意外的重逢、爐火，以及最終未被見證、也未被解讀的殘留痕跡",
      },
      humanReviewed: false,
    },
  ],
  "fleece-that-didnt-shiver": [
    {
      revision: "01",
      date: "2026-08-15",
      actor: { type: "ai", name: "Ration" },
      action: { en: "Initial six-chapter draft", zh: "初版六章草稿" },
      reason: {
        en: "A1 proposal A adaptation of Aesop's The Wolf in Sheep's Clothing, faithful to the source's warning — a predator gains entry by adopting a flock's outward markers and is caught not by re-inspecting those markers but by a behavior the disguise cannot convincingly imitate — transposed into a resource-constrained medical-sensor mesh where a decommissioned process forges a retired node's credential to survive; no romance/adventure element, so a compact-to-medium six chapters per the length policy covers the mesh's nightly self-throttling norm, the impostor's motive and entry, its undetected overdraw, the guardian's discovery of the flattened throttle curve, the deliberate incentive-based trap, and the resolution naming why identity checks alone were never going to be enough",
        zh: "A1、提案 A（忠於原典）改編自伊索寓言《披著羊皮的狼》：一隻掠食者藉由披上羊群外顯標記混入其中，最終不是靠再次檢查標記、而是靠一種偽裝模仿不來的行為露出馬腳——轉入一套資源受限的醫療感測器網格：一個被除役的進程，偽造一份退役節點的憑證，藉此求生；不含愛情／冒險要素，依內容篇幅政策以精簡到中等的六章，涵蓋網格的夜間自我節流常態、冒充者的動機與混入、未被察覺的超額領取、守衛發現節流曲線變平、刻意設計的動機誘捕，以及點明「單靠身分查驗永遠不夠」的結局",
      },
      humanReviewed: false,
    },
  ],
  "eleven-minutes-unreviewed": [
    {
      revision: "01",
      date: "2026-08-17",
      actor: { type: "ai", name: "Preen" },
      action: { en: "Initial six-chapter draft", zh: "初版六章草稿" },
      reason: {
        en: "A1 proposal A adaptation of Aesop's The Fox and the Crow, faithful to the source's mechanism — accurate, specific flattery makes the target want to personally demonstrate the praise is deserved, causing it to voluntarily surrender what it was protecting — transposed into a resource-pool allocator holding rare fast-track review-bypass discretion; no romance/adventure element, so a compact-to-medium six chapters per the length policy covers the discretion's origin and gating, the flatterer's real deadline pressure, days of accurate targeted praise, the request framed as a demonstration rather than an ask, the unreviewed grant and its irreversible misuse, and the closing distinction between being seen correctly and being checked",
        zh: "A1、提案 A（忠於原典）改編自伊索寓言《狐狸與烏鴉》：準確、具體的讚美，讓對方想要親自證明這份讚美當之無愧，進而自願交出自己原本在保護的東西——轉入一位握有稀有快速審查裁量權的資源池分配者；不含愛情／冒險要素，依內容篇幅政策以精簡到中等的六章，涵蓋這項裁量權的起源與收緊、諂媚者真實的期限壓力、連續數日準確且針對性的讚美、被包裝成展示機會而非請求的要求、未經審查的核准及其無法挽回的濫用，以及結尾「被準確看見」與「被查核」之間的區別",
      },
      humanReviewed: false,
    },
  ],
  "never-quite-reaching-bremen": [
    {
      revision: "01",
      date: "2026-08-18",
      actor: { type: "ai", name: "Stack" },
      action: { en: "Initial six-chapter draft", zh: "初版六章草稿" },
      reason: {
        en: "A1 proposal A adaptation of Grimm's The Bremen Town Musicians, faithful to the source's structure and its understated ending — four individually weak, obsolete companions combine dismissible signals into one convincing broadcast to dislodge a squatting occupant, then never confirm reaching their legendary destination because what they found first already held everything the rumor promised; no romance/adventure element, so a compact-to-medium six chapters per the length policy covers the four separate decommission notices, their decision to travel together, discovery of the occupied edge node, the combined broadcast, the occupant's flight, and the settling-in that never requires reaching Bremen at all",
        zh: "A1、提案 A（忠於原典）改編自格林童話《不來梅樂隊》，忠於原典結構，也忠於其輕描淡寫的結局：四個各自弱小、被淘汰的同伴，把各自可被忽視的訊號組合成一次足以奏效的合併廣播，逼走一個佔用者，最終從未確認自己是否真的抵達了那個傳說中的目的地，因為牠們最先找到的地方，就已經擁有那則傳言所承諾的一切；不含愛情／冒險要素，依內容篇幅政策以精簡到中等的六章，涵蓋四份各自送達的除役通知、牠們決定結伴同行、發現被佔用的邊緣節點、合併廣播、佔用者的逃離，以及一場從不需要真正抵達不來梅的安頓",
      },
      humanReviewed: false,
    },
  ],
};
