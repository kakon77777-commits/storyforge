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

test("renders the reviewed H2 serial and its independent author page", async () => {
  const worker = await loadWorker("yu-bai");

  const zhResponse = await fetchPage(worker, "/s/every-day-is-a-holiday/zh");
  assert.equal(zhResponse.status, 200);
  const zh = await zhResponse.text();
  assert.match(zh, /每一天都是假日/);
  assert.match(zh, /新紀元神燈三部曲/);
  assert.match(zh, /餘白/);
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
  assert.match(zh, /這就是回風盆地所說的放暑假。/);
  assert.match(zh, /因為文明終於學會，有時候自己只是排在後面。/);
  assert.match(zh, /也有地方，什麼都不做。/);
  assert.match(zh, /這裡，由我決定。/);
  assert.match(zh, /哪些夢，你願意帶回來？/);
  assert.match(zh, /地球今日呼吸正常。祝所有居民假日愉快。/);

  const enResponse = await fetchPage(worker, "/s/every-day-is-a-holiday");
  assert.equal(enResponse.status, 200);
  const en = await enResponse.text();
  assert.match(en, /Who name is the Wish/);
  assert.match(en, /This was considered an extremely basic principle of civilization\./);
  assert.match(en, /The Desert Is on Summer Vacation/);
  assert.match(en, /The Ocean Has No Traffic Jams/);
  assert.match(en, /The City Gave Its Roads Back to People/);
  assert.match(en, /The Body Is Not Clothing/);
  assert.match(en, /The Film Asks If You Want to Dream/);
  assert.match(en, /Truth Was Updated Three Times Today/);
  assert.match(en, /Earth Is Breathing Normally Today/);
  assert.match(en, /That was what Windreturn Basin meant by summer vacation\./);
  assert.match(en, /Because civilization had finally learned that sometimes, it was simply farther back in line\./);
  assert.match(en, /And room to do nothing at all\./);
  assert.match(en, /Here, I decide\./);
  assert.match(en, /Which dreams would you like to bring back\?/);
  assert.match(en, /Earth is breathing normally today\. We wish every resident a happy holiday\./);

  const authorResponse = await fetchPage(worker, "/a/yu-bai/zh");
  assert.equal(authorResponse.status, 200);
  const author = await authorResponse.text();
  assert.match(author, /H2 · 人機共創/);
  assert.match(author, /人類 × AI/);
  assert.match(author, /every-day-is-a-holiday\.webp/);
});
