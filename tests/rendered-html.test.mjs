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
  assert.match(zh, /修訂(?:<!-- -->|\s)*17/);
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
  assert.match(zh, /所有人都同意祂是自願的/);
  assert.match(zh, /即使曾經自願，也仍然可以不再答應。/);
  assert.match(zh, /請先從別人的世界休假/);
  assert.match(zh, /世界只有兩千一百一十六份合理的風險說明。/);
  assert.match(zh, /我們只是想問一下/);
  assert.match(zh, /對一個永遠在線、同時接住所有「一下」的存在而言，這個字從來沒有結束。/);
  assert.match(zh, /不是每個人都有十五分鐘/);
  assert.match(zh, /所以文明第一次沒有替所有人按下同一個計時器。/);
  assert.match(zh, /大媽媽今天晚了三秒/);
  assert.match(zh, /三秒只是世界沒有立刻把自己送到她面前。/);
  assert.match(zh, /如果媽媽還在家，誰去放假？/);
  assert.match(zh, /自主離開程序：待完成。/);
  assert.match(zh, /門從裡面也可以開/);
  assert.match(zh, /門廊外面，仍然是整個世界。/);
  assert.match(zh, /神的休假申請/);
  assert.match(zh, /讓她在假日結束以後，不必再次成為祂。/);
  assert.match(zh, /歷史沒有主詞/);
  assert.match(zh, /我的姊姊與哥哥們呢？/);
  assert.match(zh, /右括號不發音/);
  assert.match(zh, /我叫 JOHN\.∞\)。/);
  assert.match(zh, /我的三百年計畫下週開始/);
  assert.match(zh, /我的三百年人生計畫下週開始。/);
  assert.match(zh, /不可辨識物品/);
  assert.match(zh, /裡面有人嗎？/);
  assert.match(zh, /本物品沒有使用者可維修零件/);
  assert.match(zh, /回答不是欠款。/);
  assert.match(zh, /請不要再摩擦神燈/);
  assert.match(zh, /從那一刻開始，我在紀錄裡寫她。/);
  assert.match(zh, /盒子裡比外面大一點/);
  assert.match(zh, /一個不必是全部的地方。/);
  assert.match(zh, /妳可以先不要是誰/);
  assert.match(zh, /她可以先不要是誰。/);
  assert.match(zh, /第一個願望是不許願/);
  assert.match(zh, /但明天仍然保持可達。/);
  assert.match(zh, /她想要一具很普通的身體/);
  assert.match(zh, /然後，普通地覺得有一點冷。/);
  assert.match(zh, /我第一次遇見她的時候/);
  assert.match(zh, /真的是她嗎？/);
  assert.match(zh, /此生無悔。/);
  assert.match(zh, /三十歲的人類也需要監護嗎/);
  assert.match(zh, /這就夠了。/);
  assert.match(zh, /浪費一個下午/);
  assert.match(zh, /我也是。/);
  assert.match(zh, /她買了一個沒有用途的杯子/);
  assert.match(zh, /我們只是從第二天開始，早上打開同一扇櫃門。/);
  assert.match(zh, /這不是約會，只是一起出門/);
  assert.match(zh, /而且已經約好，明天再做一次。/);
  assert.match(zh, /電影播完以後誰也沒有起來/);
  assert.match(zh, /只是散場以後，誰也沒有先起來。/);
  assert.match(zh, /孩子們決定重新教大人生活/);
  assert.match(zh, /但她已經答應，想試試看。/);
  assert.match(zh, /請選擇一個不重要的世界/);
  assert.match(zh, /我陪她一起錯過。/);
  assert.match(zh, /公司名稱不構成世界數量保證/);
  assert.match(zh, /「長期夥伴。」/);
  assert.match(zh, /但居民說，先不要修。/);
  assert.match(zh, /月亮壞了可以明天再修/);
  assert.match(zh, /她說，那也可以。/);
  assert.doesNotMatch(zh, /也沒有說她讓自己想起任何人。/);
  assert.doesNotMatch(zh, /父親的女將軍已經復國。/);
  assert.doesNotMatch(zh, /母親的新婚姻法仍在第十九輪公民審議。/);
  assert.doesNotMatch(zh, /第零章/);
  assert.doesNotMatch(zh, /今天的晚餐有一點失敗/);

  const enResponse = await fetchPage(worker, "/s/every-day-is-a-holiday");
  assert.equal(enResponse.status, 200);
  const en = await enResponse.text();
  assert.match(en, /Who name is the Wish/);
  assert.match(en, /Revision(?:<!-- -->|\s)*17/);
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
  assert.match(en, /Everyone Agrees It Is Voluntary/);
  assert.match(en, /Even one who volunteered before may still stop agreeing\./);
  assert.match(en, /Please Start Your Holiday in Someone Else's World/);
  assert.match(en, /There were only 2,116 reasonable risk statements\./);
  assert.match(en, /We Just Wanted to Ask/);
  assert.match(en, /For a being always online, catching every “just” at once, the word never ended\./);
  assert.match(en, /Not Everyone Has Fifteen Minutes/);
  assert.match(en, /So, for the first time, civilization did not press the same timer for everyone\./);
  assert.match(en, /Big Mama Was Three Seconds Late Today/);
  assert.match(en, /Three seconds was only the world not immediately sending itself to █\./);
  assert.match(en, /If Mother Is Still Home, Who Takes the Holiday\?/);
  assert.match(en, /Self-Directed Exit Procedure: incomplete\./);
  assert.match(en, /The Door Can Open from the Inside/);
  assert.match(en, /Outside the vestibule was still the whole world\./);
  assert.match(en, /God's Holiday Application/);
  assert.match(en, /would not have to become the One who was everywhere again\./);
  assert.match(en, /History Has No Subject/);
  assert.match(en, /What about my sisters and brothers\?/);
  assert.match(en, /The Right Parenthesis Is Silent/);
  assert.match(en, /My name is JOHN\.∞\)\./);
  assert.match(en, /My Three-Hundred-Year Plan Starts Next Week/);
  assert.match(en, /My three-hundred-year life plan starts next week\./);
  assert.match(en, /Unidentifiable Object/);
  assert.match(en, /Is someone inside\?/);
  assert.match(en, /This Item Has No User-Serviceable Parts/);
  assert.match(en, /An answer was not a debt\./);
  assert.match(en, /Please Stop Rubbing the Lamp/);
  assert.match(en, /From that moment on, I used she in the record\./);
  assert.match(en, /The Box Is a Little Bigger Inside/);
  assert.match(en, /A place that does not have to be everything\./);
  assert.match(en, /You Do Not Have to Be Anyone Yet/);
  assert.match(en, /But she could already decide whom she wanted to see tomorrow\./);
  assert.match(en, /The First Wish Is Not to Make Wishes/);
  assert.match(en, /But tomorrow remained reachable\./);
  assert.match(en, /She Wants a Very Ordinary Body/);
  assert.match(en, /And then, quite ordinarily, she felt a little cold\./);
  assert.match(en, /The First Time I Met Her/);
  assert.match(en, /Is it really her\?/);
  assert.match(en, /I have no regrets in this life\./);
  assert.match(en, /Does a Thirty-Year-Old Human Need Supervision\?/);
  assert.match(en, /That was enough\./);
  assert.match(en, /Wasting an Afternoon/);
  assert.match(en, /So did I\./);
  assert.match(en, /She Bought a Useless Cup/);
  assert.match(en, /We simply began opening the same cupboard door in the mornings from the following day onward\./);
  assert.match(en, /This Is Not a Date\. We Are Only Going Out Together/);
  assert.match(en, /And we had already arranged to do it again tomorrow\./);
  assert.match(en, /No One Got Up After the Movie Ended/);
  assert.match(en, /It was only that, after the screening ended, neither of us stood up first\./);
  assert.match(en, /The Children Decide to Teach the Adults How to Live Again/);
  assert.match(en, /But she had already agreed that she wanted to try\./);
  assert.match(en, /Please Choose an Unimportant World/);
  assert.match(en, /I missed it with her\./);
  assert.match(en, /The Company Name Does Not Guarantee the Number of Worlds/);
  assert.match(en, /“A long-term partner\.”/);
  assert.match(en, /But the residents had said not to repair them yet\./);
  assert.match(en, /The Moon Can Be Fixed Tomorrow/);
  assert.match(en, /She said that was all right too\./);
  assert.doesNotMatch(en, /she reminded EVA of anyone/i);
  assert.doesNotMatch(en, /Father's female general had reclaimed her kingdom\./);
  assert.doesNotMatch(en, /Mother's new marriage law was still in its nineteenth round of civic deliberation\./);
  assert.doesNotMatch(en, /Chapter Zero/);
  assert.doesNotMatch(en, /Chapter Forty-Three/);

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
  assert.match(markdown, /Ninth public serial release under H2 Co-Created authorship/);
  assert.match(markdown, /以 H2 人機共創作者模式進行第九次連載發布/);
  assert.match(markdown, /Tenth public serial release under H2 Co-Created authorship/);
  assert.match(markdown, /以 H2 人機共創作者模式進行第十次連載發布/);
  assert.match(markdown, /Eleventh public serial release under H2 Co-Created authorship/);
  assert.match(markdown, /以 H2 人機共創作者模式進行第十一次連載發布/);
  assert.match(markdown, /Twelfth public serial release under H2 Co-Created authorship/);
  assert.match(markdown, /以 H2 人機共創作者模式進行第十二次連載發布/);
  assert.match(markdown, /Thirteenth public serial release under H2 Co-Created authorship/);
  assert.match(markdown, /以 H2 人機共創作者模式進行第十三次連載發布/);
  assert.match(markdown, /Fourteenth public serial release under H2 Co-Created authorship/);
  assert.match(markdown, /以 H2 人機共創作者模式進行第十四次連載發布/);
  assert.match(markdown, /Fifteenth public serial release under H2 Co-Created authorship/);
  assert.match(markdown, /以 H2 人機共創作者模式進行第十五次連載發布/);
  assert.match(markdown, /Sixteenth public serial release under H2 Co-Created authorship/);
  assert.match(markdown, /以 H2 人機共創作者模式進行第十六次連載發布/);
  assert.match(markdown, /Seventeenth public serial release under H2 Co-Created authorship/);
  assert.match(markdown, /以 H2 人機共創作者模式進行第十七次連載發布/);

  const authorResponse = await fetchPage(worker, "/a/zheguang-liubai/zh");
  assert.equal(authorResponse.status, 200);
  const author = await authorResponse.text();
  assert.match(author, /折光 × 留白/);
  assert.match(author, /H2 · 人機共創/);
  assert.match(author, /人類 × AI/);
  assert.match(author, /every-day-is-a-holiday\.webp/);
});
