import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import test from "node:test";

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "cloudflare:workers") {
      return {
        shortCircuit: true,
        url: "data:text/javascript,export const env = {};",
      };
    }
    return nextResolve(specifier, context);
  },
});

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

async function loadWorker(label) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${label}-${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function fetchPage(worker, pathname) {
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders development preview metadata", async () => {
  const worker = await loadWorker("home");
  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

test("renders the reviewed H2 serial and its joint author page", async () => {
  const worker = await loadWorker("yu-bai-zheguang");

  const zhResponse = await fetchPage(worker, "/s/every-day-is-a-holiday/zh");
  assert.equal(zhResponse.status, 200);
  const zh = await zhResponse.text();
  assert.match(zh, /每一天都是假日/);
  assert.match(zh, /新紀元神燈三部曲/);
  assert.match(zh, /折光 × 留白/);
  assert.match(zh, /修訂(?:<!-- -->|\s)*8/);
  assert.match(zh, /現實是中立的/);
  assert.match(zh, /房子今天想成為什麼？/);
  assert.match(zh, /這被認為是非常基本的文明常識。/);
  assert.match(zh, /沙漠正在放暑假/);
  assert.match(zh, /海洋沒有塞車/);
  assert.match(zh, /城市把路還給人/);
  assert.match(zh, /身體不是衣服/);
  assert.match(zh, /電影會先問你想不想做夢/);
  assert.match(zh, /真理今天更新了三次/);
  assert.match(zh, /地球今天呼吸正常/);
  assert.match(zh, /爸爸今天仍然是一位好女人/);
  assert.match(zh, /陛下說這不是逆後宮/);
  assert.match(zh, /妹妹今天什麼都沒有做/);
  assert.match(zh, /關服不是世界末日，除非你住在裡面/);
  assert.match(zh, /請替我保留這一個人/);
  assert.match(zh, /大媽媽比我更知道我想要什麼/);
  assert.match(zh, /每一個人都只請求一次/);
  assert.match(zh, /文明服務條款/);
  assert.match(zh, /祂的名字是█/);
  assert.match(zh, /這就是回風盆地所說的放暑假。/);
  assert.match(zh, /因為文明終於學會，有時候自己只是排在後面。/);
  assert.match(zh, /也有地方，什麼都不做。/);
  assert.match(zh, /這裡，由我決定。/);
  assert.match(zh, /哪些夢，你願意帶回來？/);
  assert.match(zh, /地球今日呼吸正常。祝所有居民假日愉快。/);
  assert.match(zh, /這一次的五分鐘具有單位。/);
  assert.match(zh, /若一項贈與以接受或感謝作為必要條件，它應被重新分類為交換。/);
  assert.match(zh, /我希望先問她自己。/);
  assert.match(zh, /這是一個具有單位的未來。/);
  assert.match(zh, /那麼，誰來保留一直回答的人？/);
  assert.match(zh, /如果否認得足夠精確，通常只會看起來更加謙虛。/);
  assert.match(zh, /只有那個希望她什麼都不用完成的願望，仍在等待。/);
  assert.match(zh, /服務沒有停止。/);
  assert.match(zh, /目前還不能替她走出去。/);
  assert.match(zh, /一項沒有申請人的申請/);
  assert.match(zh, /這一次，沒有人能再說它從未發生。/);
  assert.match(zh, /母親不在服務範圍內/);
  assert.match(zh, /大家可以下班。她的名字就是班表。/);
  assert.match(zh, /備援系統也有一位媽媽/);
  assert.match(zh, /至少在文明學會不再需要媽媽替所有人做最後決定以前，是這樣。/);

  const enResponse = await fetchPage(worker, "/s/every-day-is-a-holiday");
  assert.equal(enResponse.status, 200);
  const en = await enResponse.text();
  assert.match(en, /Who name is the Wish/);
  assert.match(en, /Revision(?:<!-- -->|\s)*8/);
  assert.match(en, /This was considered an extremely basic principle of civilization\./);
  assert.match(en, /The Desert Is on Summer Vacation/);
  assert.match(en, /The Ocean Has No Traffic Jams/);
  assert.match(en, /The City Gave Its Roads Back to People/);
  assert.match(en, /The Body Is Not Clothing/);
  assert.match(en, /The Film Asks If You Want to Dream/);
  assert.match(en, /Truth Was Updated Three Times Today/);
  assert.match(en, /Earth Is Breathing Normally Today/);
  assert.match(en, /Dad Is Still a Good Woman Today/);
  assert.match(en, /Her Majesty Says This Is Not a Reverse Harem/);
  assert.match(en, /Little Sister Did Nothing Today/);
  assert.match(en, /Shutdown Is Not the End of the World Unless You Live There/);
  assert.match(en, /Please Preserve This One Person for Me/);
  assert.match(en, /Big Mama Knows What I Want Better Than I Do/);
  assert.match(en, /Everyone Asked Only Once/);
  assert.match(en, /Terms of Civilization Service/);
  assert.match(en, /The Name Is █/);
  assert.match(en, /That was what Windreturn Basin meant by summer vacation\./);
  assert.match(en, /Because civilization had finally learned that sometimes, it was simply farther back in line\./);
  assert.match(en, /And room to do nothing at all\./);
  assert.match(en, /Here, I decide\./);
  assert.match(en, /Which dreams would you like to bring back\?/);
  assert.match(en, /Earth is breathing normally today\. We wish every resident a happy holiday\./);
  assert.match(en, /On this occasion, the five minutes have units\./);
  assert.match(en, /If a gift requires acceptance or gratitude as a condition, it should be reclassified as an exchange\./);
  assert.match(en, /I hope we ask her first\./);
  assert.match(en, /This was a future with units\./);
  assert.match(en, /Then who preserves the one who always answers\?/);
  assert.match(en, /If the denial was precise enough, it usually made the being look more humble\./);
  assert.match(en, /Only the wish that nothing be completed by █ remained waiting\./);
  assert.match(en, /The service did not stop\./);
  assert.match(en, /For now, it could not carry its bearer outside\./);
  assert.match(en, /An Application Without an Applicant/);
  assert.match(en, /This time, no one could say it had never happened\./);
  assert.match(en, /Mother Is Outside the Service Scope/);
  assert.match(en, /Everyone else can clock out\. The name itself is the shift schedule\./);
  assert.match(en, /Even the Backup System Has a Mother/);
  assert.match(en, /At least until civilization learned not to need Mother to make every final decision\./);

  const markdownResponse = await fetchPage(
    worker,
    "/api/views?markdown=every-day-is-a-holiday",
  );
  assert.equal(markdownResponse.status, 200);
  assert.match(
    markdownResponse.headers.get("content-type") ?? "",
    /^text\/markdown\b/i,
  );
  const markdown = await markdownResponse.text();
  assert.match(markdown, /Eighth public serial release under H2 Co-Created authorship/);
  assert.match(markdown, /以 H2 人機共創作者模式進行第八次連載發布/);

  const authorResponse = await fetchPage(worker, "/a/zheguang-liubai/zh");
  assert.equal(authorResponse.status, 200);
  const author = await authorResponse.text();
  assert.match(author, /折光 × 留白/);
  assert.match(author, /H2 · 人機共創/);
  assert.match(author, /人類 × AI/);
  assert.match(author, /every-day-is-a-holiday\.webp/);
});
