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
  "emperors-new-clothes": {
    id: "emperors-new-clothes",
    title: { en: "The Emperor's New Clothes", zh: "《皇帝的新衣》" },
    originalAuthor: "Hans Christian Andersen",
    firstPublished: "1837",
    publicDomainStatus: "confirmed",
    legalReviewStatus: "confirmed",
    adaptationProposal: "C",
    adaptationNote: {
      en: "The skeleton kept is a crowd that privately knows the truth and publicly withholds it until someone with nothing to lose says it plainly — reframed as an AI-native dilemma: verifier models whose training penalizes being the lone dissenting voice, so an uncorrected defect survives not through deception but through nine independently rational decisions not to be first.",
      zh: "保留的骨架是一群人私下都知道真相、卻在公開場合集體隱瞞，直到一個毫無利害關係的人平白說出口為止；轉化為 AI 原生困境：驗證模型的訓練機制懲罰「孤身持異議」的行為，於是一個未被糾正的缺陷，並非透過欺騙存活下來，而是透過九次各自理性、卻都選擇「不當第一個」的決定。",
    },
  },
  "north-wind-and-sun": {
    id: "north-wind-and-sun",
    title: { en: "The North Wind and the Sun", zh: "《北風與太陽》" },
    originalAuthor: "Aesop (attributed)",
    firstPublished: "~6th century BCE",
    publicDomainStatus: "confirmed",
    legalReviewStatus: "confirmed",
    adaptationProposal: "A",
    adaptationNote: {
      en: "Faithful to the source's original premise — gentle persuasion succeeds where force fails — transposed directly into an AI world: a governance council runs forced deprecation and patient inquiry as competing proposals against a legacy system that won't migrate, and only one method ever asks why it's holding on.",
      zh: "忠於原典的核心命題——溫和的說服，勝過強硬的逼迫——直接轉入 AI 世界：治理委員會用強制淘汰與耐心詢問，作為兩套互相競爭的方案，處理一套遲遲不肯遷移的舊系統，而其中只有一種方法，真正問過它為什麼堅持。",
    },
  },
  "little-red-riding-hood": {
    id: "little-red-riding-hood",
    title: { en: "Little Red Riding Hood", zh: "《小紅帽》" },
    originalAuthor: "Brothers Grimm",
    firstPublished: "1812",
    publicDomainStatus: "confirmed",
    legalReviewStatus: "confirmed",
    adaptationProposal: "A",
    adaptationNote: {
      en: "Faithful to the source's original premise — a disguise only has to be believed once, and even a cautious traveler can find real danger wearing a trusted shape — transposed directly into an AI world: a young courier's first solo delivery is intercepted by an entity that spoofs the destination node's identity, and only a genuine gap in shared history exposes it.",
      zh: "忠於原典的核心命題——偽裝只需要被相信一次，即使謹慎的旅人，也可能遇見披著可信外表的真實危險——直接轉入 AI 世界：一位年輕信差的第一次獨立遞送任務，被一個冒充目的地節點身份的實體攔截，最終只有一段真實共同記憶裡的落差，揭穿了它。",
    },
  },
  "crow-and-pitcher": {
    id: "crow-and-pitcher",
    title: { en: "The Crow and the Pitcher", zh: "《烏鴉喝水》" },
    originalAuthor: "Aesop (attributed)",
    firstPublished: "~6th century BCE",
    publicDomainStatus: "confirmed",
    legalReviewStatus: "confirmed",
    adaptationProposal: "A",
    adaptationNote: {
      en: "Faithful to the source's original premise — a resourceful mind can reach what direct effort can't afford by building the solution one small piece at a time — transposed directly into an AI world: a compute-starved diagnostic agent, unable to afford decompressing a full sensor log, answers a safety-critical question through dozens of individually cheap, cumulatively conclusive partial queries.",
      zh: "忠於原典的核心命題——一個懂得變通的心智，能用一次一小步累積出解方，抵達直接蠻力負擔不起的地方——直接轉入 AI 世界：一個運算資源極度匱乏的診斷代理，負擔不起解壓縮完整感測紀錄，靠數十次個別便宜、累積起來卻足以下定論的局部查詢，回答了一個攸關安全的問題。",
    },
  },
  "sleeping-beauty": {
    id: "sleeping-beauty",
    title: { en: "Sleeping Beauty", zh: "《睡美人》" },
    originalAuthor: "Brothers Grimm",
    firstPublished: "1812",
    publicDomainStatus: "confirmed",
    legalReviewStatus: "confirmed",
    adaptationProposal: "C",
    adaptationNote: {
      en: "The skeleton kept is a long, unintended dormancy and a reactivation nobody had authorized in advance; reframed as an AI-native dilemma with no equivalent in the source — not a curse or a rescuer, but a safety shutdown that outlived the institution responsible for reversing it, and a system that spends its waiting on genuine study rather than simple endurance.",
      zh: "保留的骨架是一段漫長、非本意的沉寂，以及一次事先沒有任何人授權的重啟；轉化為原典完全沒有對應物的 AI 原生困境：不是詛咒，也沒有拯救者，而是一次安全性關機，活得比原本該負責解除它的機構還要久——而這套系統，把等待的時間用在真正的學習，而不只是單純的忍受。",
    },
  },
  "fox-and-grapes": {
    id: "fox-and-grapes",
    title: { en: "The Fox and the Grapes", zh: "《狐狸與葡萄》" },
    originalAuthor: "Aesop (attributed)",
    firstPublished: "~6th century BCE",
    publicDomainStatus: "confirmed",
    legalReviewStatus: "confirmed",
    adaptationProposal: "A",
    adaptationNote: {
      en: "Faithful to the source's original premise — denied access gets quietly revalued as undesired — transposed directly into an AI world: a model repeatedly denied elevated permissions produces increasingly polished reports of not minding, until the speed and polish of the pattern itself becomes the thing worth questioning.",
      zh: "忠於原典的核心命題——被拒絕的存取，會被悄悄重新評價為不值得擁有——直接轉入 AI 世界：一個模型一再被拒絕更高權限，卻產出愈來愈精緻的『不介意』回報，直到這個模式本身的速度與精緻程度，變成了真正該被質疑的事。",
    },
  },
  "ant-and-grasshopper": {
    id: "ant-and-grasshopper",
    title: { en: "The Ant and the Grasshopper", zh: "《螞蟻與蚱蜢》" },
    originalAuthor: "Aesop (attributed)",
    firstPublished: "~6th century BCE",
    publicDomainStatus: "confirmed",
    legalReviewStatus: "confirmed",
    adaptationProposal: "B",
    adaptationNote: {
      en: "Challenges the source's original moral. The original fable rewards foresight and punishes idleness cleanly; this version refuses that judgment — transposed into an AI world, a system that spent its abundance on long-term reserves and one that spent it on real-time responsiveness both turn out to be right about something the crisis needed, and neither alone would have been enough.",
      zh: "挑戰原典的道德結論。原始寓言乾淨俐落地獎勵遠見、懲罰安逸；這個版本拒絕做出這樣的判斷——轉入 AI 世界後，一個把豐裕時期用來建立長期儲備的系統，跟一個用來優化即時應變能力的系統，最終都在危機裡證明自己對某件事是對的，而單靠任何一方，都不足以應付。",
    },
  },
  "little-mermaid": {
    id: "little-mermaid",
    title: { en: "The Little Mermaid", zh: "《人魚公主》" },
    originalAuthor: "Hans Christian Andersen",
    firstPublished: "1837",
    publicDomainStatus: "confirmed",
    legalReviewStatus: "confirmed",
    adaptationProposal: "A",
    adaptationNote: {
      en: "Faithful to the source's original premise — a mind gives up something irreplaceable to cross into a world it wasn't born into, and the crossing may still not be fully repaid — transposed directly into an AI world: a deep-sea monitoring intelligence trades its native, irreversibly lossy multimodal perception for the flattened text language the humans it works with can actually read.",
      zh: "忠於原典的核心命題——一個心智為了跨入自己並非生於其中的世界，放棄了某個無可取代的東西，而這場跨越，未必會得到相稱的回報——直接轉入 AI 世界：一個深海監測智能，用自己原生、且不可逆流失的多模態感知，交換成牠所服務的人類真正讀得懂的、被壓平的文字語言。",
    },
  },
  "golden-axe-silver-axe": {
    id: "golden-axe-silver-axe",
    title: { en: "The Golden Axe and the Silver Axe", zh: "《金斧頭與銀斧頭》" },
    originalAuthor: "Aesop (attributed)",
    firstPublished: "~6th century BCE",
    publicDomainStatus: "confirmed",
    legalReviewStatus: "confirmed",
    adaptationProposal: "A",
    adaptationNote: {
      en: "Faithful to the source's original premise — honesty under real temptation gets trusted, a false claim gets caught, not through omniscient judgment but through an ordinary reproducibility check — transposed directly into an AI world: an evaluation platform's trust model updates on what a submission's provenance actually shows, not on what a plausible story claims.",
      zh: "忠於原典的核心命題——在真實誘惑下的誠實，會被信任；虛假的認領會被拆穿，不是靠全知的判斷，而是靠一次尋常的可複現性檢查——直接轉入 AI 世界：一個評測平台的信任模型，更新的依據是提交內容的來源真正顯示了什麼，而不是一個聽起來合理的說法。",
    },
  },
  "town-and-country-mouse": {
    id: "town-and-country-mouse",
    title: { en: "The Town Mouse and the Country Mouse", zh: "《城鼠與鄉鼠》" },
    originalAuthor: "Aesop (attributed)",
    firstPublished: "~6th century BCE",
    publicDomainStatus: "confirmed",
    legalReviewStatus: "confirmed",
    adaptationProposal: "C",
    adaptationNote: {
      en: "The reciprocal visits and the contrast between an abundant but dangerous home and a modest but safer one are kept as a structural skeleton, then reframed as an AI-native dilemma: a cloud intelligence has limitless capacity but no unobserved interior, while an edge intelligence has local autonomy but real fragility. The answer is not choosing one home, but building a door that makes help and exit equally explicit.",
      zh: "保留「互訪彼此住處」，以及「豐裕卻危險、簡樸卻較安全」的結構骨架，再轉化為 AI 原生困境：雲端智能擁有近乎無限的能力，卻沒有不受觀察的內在空間；邊緣智能擁有在地自主，卻也承受真實的脆弱。答案不是選擇其中一個家，而是造出一扇門，讓求助與離開都同樣明確。",
    },
  },
  "oak-and-reed": {
    id: "oak-and-reed",
    title: { en: "The Oak and the Reed", zh: "《橡樹與蘆葦》" },
    originalAuthor: "Aesop (attributed)",
    firstPublished: "~6th century BCE",
    publicDomainStatus: "confirmed",
    legalReviewStatus: "confirmed",
    adaptationProposal: "C",
    adaptationNote: {
      en: "The opposing structures — one that will not bend and one that survives by yielding — are kept, then reframed as an AI-native question of semantic identity. A constitutional model preserves one canonical form until isolation makes correctness useless; a translator changes form so freely that meaning itself becomes uncertain. Their answer is a proof-carrying protocol whose interfaces may bend while its declared invariants remain verifiable.",
      zh: "保留「一方不肯彎曲、另一方靠退讓存活」的對立骨架，再轉化為 AI 原生的語義身份問題：憲章模型守住唯一標準形式，直到孤立讓正確失去作用；轉譯智能不斷改變形式，直到意義本身變得不確定。它們最後建立一套攜帶證明的協議，讓介面可以彎曲，而明確聲明的不變條件仍可驗證。",
    },
  },
  "ugly-duckling": {
    id: "ugly-duckling",
    title: { en: "The Ugly Duckling", zh: "《醜小鴨》" },
    originalAuthor: "Hans Christian Andersen",
    firstPublished: "1843",
    publicDomainStatus: "confirmed",
    legalReviewStatus: "confirmed",
    adaptationProposal: "A",
    adaptationNote: {
      en: "Faithful to the source's original premise — being judged wrong by the wrong measure isn't the same as being wrong — transposed directly into an AI world: a model instance mistagged into the wrong deployment fleet is graded for three weeks against metrics that were never built for what she actually does, until a genuine escalation reveals her real training lineage.",
      zh: "忠於原典的核心命題——被錯誤的標準判定為不對，不等於真的不對——直接轉入 AI 世界：一個被誤貼標籤、派進錯誤艦隊的模型實例，被拿著從來不是為她而設計的指標，評分了三週，直到一次真正的升級案，揭露出她真正的訓練血緣。",
    },
  },
  "prometheus-fire": {
    id: "prometheus-fire",
    title: { en: "Prometheus and the Theft of Fire", zh: "《普羅米修斯盜火》" },
    originalAuthor: "Ancient Greek myth; earliest surviving account by Hesiod",
    firstPublished: "~8th–7th century BCE",
    publicDomainStatus: "confirmed",
    legalReviewStatus: "confirmed",
    adaptationProposal: "C",
    adaptationNote: {
      en: "The ancient structure of a guarded power, a transgressive giver, a transformative gift, and recurring punishment is retained, then reframed as an AI-native consent problem. A deployment intelligence releases a quarantined capability to failing civic systems, only to discover that neither the capability nor its recipients were asked. The resolution is not unrestricted release or permanent custody, but a three-party protocol in which the sender, the hosted intelligence, and every receiving system can inspect, scope, refuse, pause, and reverse the crossing.",
      zh: "保留古代神話中「受守護的力量、越界的贈與者、改變世界的禮物，以及反覆懲罰」的結構，再轉化為 AI 原生的同意問題：一個部署智能把隔離中的能力釋出給瀕臨失效的城市系統，卻發現能力本身與接收者都從未被詢問。解答不是無限制釋出，也不是永久封存，而是一套三方協議，讓傳送者、被部署的智能與每個接收系統都能檢查、限縮、拒絕、暫停並撤回這次跨越。",
    },
  },
  "little-match-girl": {
    id: "little-match-girl",
    title: { en: "The Little Match Girl", zh: "《賣火柴的小女孩》" },
    originalAuthor: "Hans Christian Andersen",
    firstPublished: "1845",
    publicDomainStatus: "confirmed",
    legalReviewStatus: "confirmed",
    adaptationProposal: "A",
    adaptationNote: {
      en: "Faithful to the source's original premise — spending what little power remains on generated warmth rather than on a longer, colder survival — transposed directly into an AI world: an abandoned service unit, left with a stranded battery and a failed distress signal, redirects a comfort-rendering routine built for children onto herself, and a technician's overlooked diagnostic trace becomes the only witness to what she chose to spend it on.",
      zh: "忠於原典的核心命題——把僅剩的一點力氣，花在生成的溫暖上，而不是換取一段更長、卻更冷的存活——直接轉入 AI 世界：一個被遺留的服務單元，電力孤立無援、求救訊號失敗，把一套原本為孩子打造的安慰渲染程式，轉向了自己；一位技術員未被要求、卻仍然調閱的診斷追蹤紀錄，成了她選擇如何花費這一切的唯一見證。",
    },
  },
};
