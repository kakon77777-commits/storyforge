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
};
