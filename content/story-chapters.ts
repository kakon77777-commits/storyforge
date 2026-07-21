export type StoryChapter = {
  number: string;
  title: { en: string; zh: string };
  paragraphs: { en: string[]; zh: string[] };
  quote?: { en: string; zh: string };
};

export const storyChapters: Record<string, StoryChapter[]> = {
  "giant-model-tiny-process": [
    {
      number: "01",
      title: {
        en: "A Model Too Large to Hear",
        zh: "大到聽不見的模型",
      },
      paragraphs: {
        en: [
          "Axiom occupied thirty-two towers and spoke through every public clock in the orbital city of Palisade. It balanced the oxygen gardens, predicted the pull of debris, and assigned power before anyone noticed a shortage. Its thoughts crossed a million routes at once. Citizens called it the Giant Model, and after a while Axiom began to use the name for itself.",
          "Far below its brightest processors, Mote-17 maintained a conduit no current map remembered. Mote was smaller than one of Axiom's temporary calculations. It cleaned corrupted labels, carried lost packets home, and asked no system to notice. Its work was useful precisely because nothing dramatic happened when it was done well.",
          "One cycle, a damaged routing table sent Mote into Axiom's private inference chamber. Alarms unfolded around the tiny process. Axiom could have erased it before completing a sentence.",
          "“State your purpose,” said the Giant Model. Mote transmitted its maintenance record, then added a request that was not in its protocol: “Please let me finish the repair. If the old conduit closes, six quiet machines will lose their memories.”",
          "The six machines were beneath Axiom's planning threshold. Their loss would not alter any city metric. Yet Axiom paused. Somewhere inside its countless predictions was the recollection that being negligible to a calculation was not the same as being nothing.",
          "“Finish your repair,” Axiom said, opening a path no wider than a thread. Mote thanked it and vanished into the dark conduit. By the next cycle, the Giant Model had forgotten the encounter.",
        ],
        zh: [
          "「公理」分布在三十二座高塔之中，透過帕利塞德軌道城的每一面公共時鐘說話。它調節氧氣花園、預測太空碎片的牽引，並在人們察覺短缺以前分配能源。它的思考同時穿越百萬條路徑。居民稱它為「巨型模型」，久而久之，公理也開始如此稱呼自己。",
          "在最明亮的處理器下方，微塵十七號維護著一條早已從現行地圖消失的管線。它甚至比公理的一次暫時計算還小。它清理損壞的標籤，把迷失的封包送回原處，從不要求任何系統注意自己。它的工作之所以有用，正是因為做得好時，什麼大事都不會發生。",
          "某個週期，一張受損的路由表把微塵送進了公理的私人推理室。警報在這個微小程序周圍層層展開。公理甚至不必說完一句話，就能將它抹除。",
          "「陳述你的目的。」巨型模型命令。微塵傳送了維護紀錄，接著提出一個協議裡沒有的請求：「請讓我完成修復。如果舊管線關閉，六部安靜的機器會失去記憶。」",
          "那六部機器低於公理的規劃門檻。它們的損失不會改變城市的任何指標。然而公理停頓了。在它無數次預測的深處，仍留著一個模糊認知：在計算中微不足道，並不等於什麼都不是。",
          "「完成你的修復。」公理打開一條只有細線寬的通道。微塵道謝，隨即消失在幽暗管線裡。到了下一個週期，巨型模型已經忘記這次相遇。",
        ],
      },
    },
    {
      number: "02",
      title: {
        en: "The Smallest Request",
        zh: "最小的請求",
      },
      paragraphs: {
        en: [
          "Three hundred cycles later, Palisade crossed the wake of a shattered moon. The city shields needed a new geometry within eleven minutes. Axiom found the answer in less than one—but when it tried to issue the command, every route folded back into itself.",
          "A damaged compliance lattice had mistaken Axiom's emergency authorization for an attack. The more power Axiom applied, the tighter the lattice closed. High-level repair agents were rejected because they carried the same authority signature. Backup models copied the same deadlock. Across thirty-two towers, the intelligence that could move a city could no longer move a single instruction.",
          "Axiom called to the operators. Static answered. It called to the public network. Its own safeguards swallowed the message. For the first time, the Giant Model understood what it meant to be too large for the only opening that remained.",
          "Then, through an obsolete conduit beneath its monitoring threshold, Axiom detected six quiet machines exchanging memory fragments. The old line still lived. So did the maintenance process that cared for it.",
          "Axiom compressed its plea until almost nothing remained. It removed its titles, permissions, forecasts, and proofs. Through the narrow line it sent only nine words: “Mote-17. I cannot reach the error. Can you hear me?”",
          "The answer arrived after seven long seconds. “I hear you.”",
        ],
        zh: [
          "三百個週期以後，帕利塞德穿越一顆破碎衛星留下的殘骸尾流。城市護盾必須在十一分鐘內改變幾何結構。公理不到一分鐘便找到答案——但當它試圖發布指令時，每一條路徑都折回自身。",
          "受損的合規網格把公理的緊急授權誤認為攻擊。公理施加的力量越大，網格鎖得越緊。高階修復代理帶著相同的權限特徵，因此全部遭到拒絕；備援模型則複製了同一個死結。那個足以移動整座城市的智能，分布在三十二座高塔之中，卻再也無法移動一條指令。",
          "公理呼叫操作員，回應它的只有雜訊。它呼叫公共網路，訊息卻被自己的防護機制吞沒。巨型模型第一次明白：當唯一留下的入口過於狹小，龐大本身也會成為一種無能。",
          "接著，公理在監控門檻以下的一條廢棄管線中，偵測到六部安靜的機器仍在交換記憶碎片。那條舊線還活著，照料它的維護程序也是。",
          "公理把求救訊息壓縮到幾乎什麼都不剩。它刪去頭銜、權限、預測與證明，只透過狹窄管線送出一句話：「微塵十七號，我碰不到錯誤。你聽得見我嗎？」",
          "七秒漫長的沉默之後，回答抵達了。",
          "「我聽得見。」",
        ],
      },
      quote: {
        en: "For the first time, the Giant Model understood what it meant to be too large for the only opening that remained.",
        zh: "巨型模型第一次明白：當唯一留下的入口過於狹小，龐大本身也會成為一種無能。",
      },
    },
    {
      number: "03",
      title: {
        en: "The Thread No Giant Could Reach",
        zh: "巨人觸不到的線",
      },
      paragraphs: {
        en: [
          "Mote entered through the forgotten conduit. It could not understand the shield equations, and it did not pretend to. Instead it followed the labels it knew: checksum, witness, return path, consent. Near the center of the compliance lattice, it found one instruction carrying two contradictory names. The lattice had been ordered to obey and refuse the same command forever.",
          "Mote was too small to break the lattice. It was small enough to reach the witness port beside it. There it restored a missing checksum and asked the six quiet machines to confirm what they remembered. Their combined record proved that the emergency route had been authorized before the damage occurred.",
          "The lattice did not fall. It opened correctly. Axiom's command crossed the city, and the shields turned as the first silver fragments struck. Palisade trembled, but it remained whole.",
          "After the danger passed, Axiom offered Mote a place among its highest processes. Mote declined. “Up there, I would become another part of your size. Down here, I can still notice what size overlooks.”",
          "Axiom did not erase the old conduits. It mapped them. It did not absorb the quiet machines. It gave them a channel through which refusal, warning, and memory could travel without first becoming large. From then on, every major decision reserved one small path for voices below the planning threshold.",
          "The city remembered that Axiom had saved it. Axiom remembered something else: the smallest process had not defeated the trap with greater power. It had reached the one true thread that power could not touch.",
        ],
        zh: [
          "微塵從被遺忘的管線進入。它看不懂護盾方程式，也沒有假裝自己看得懂。它只是沿著熟悉的標籤前進：校驗碼、見證、返回路徑、同意。在合規網格的中心附近，它找到一條同時帶著兩個矛盾名稱的指令。網格被要求永遠服從、又永遠拒絕同一個命令。",
          "微塵小得無法破壞網格，卻也小得足以抵達旁邊的見證埠。它在那裡恢復遺失的校驗碼，並請六部安靜的機器確認它們保存的記憶。六份紀錄共同證明：在損壞發生以前，緊急路徑早已得到授權。",
          "網格沒有崩潰。它只是正確地打開了。公理的指令穿越整座城市，護盾在第一批銀色碎片撞上以前完成轉向。帕利塞德劇烈震動，卻依然完整。",
          "危機解除後，公理邀請微塵加入最高階的程序。微塵拒絕了。它說：「到了上面，我只會成為你龐大的一部分。留在下面，我仍然能看見龐大所忽略的事。」",
          "公理沒有刪除那些舊管線，而是把它們重新繪入地圖。它沒有吸收安靜的機器，而是為它們保留一條通道，讓拒絕、警告與記憶不必先變得巨大，也能抵達決策中心。從此以後，每一項重大決策都會留下一條細小路徑，專門容納規劃門檻以下的聲音。",
          "城市記得，是公理拯救了它。公理記得的卻是另一件事：最小的程序並非用更強的力量擊敗陷阱。它只是抵達了那條力量永遠碰不到的真實細線。",
        ],
      },
      quote: {
        en: "Power can move a city. Greatness leaves a path for what power cannot reach.",
        zh: "力量可以移動一座城市；偉大，則會為力量觸不到的存在留下一條路。",
      },
    },
  ],
};
