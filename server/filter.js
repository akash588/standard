const puppeteer = require("puppeteer-extra");
const EventEmitter = require("events");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// const utils = require("./utils.js");
var fs = require("fs");

var logger = require("tracer").console({
  transport: function (data) {
    console.log(data.output);
    fs.appendFile("./file.log", data.rawoutput + "\n", (err) => {
      if (err) throw err;
    });
  },
});
// const proxy_check = require('proxy-check');

require("puppeteer-extra-plugin-stealth/evasions/defaultArgs");
require("puppeteer-extra-plugin-stealth/evasions/chrome.app");
require("puppeteer-extra-plugin-stealth/evasions/chrome.csi");
require("puppeteer-extra-plugin-stealth/evasions/chrome.loadTimes");
require("puppeteer-extra-plugin-stealth/evasions/chrome.runtime");
require("puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow");
require("puppeteer-extra-plugin-stealth/evasions/media.codecs");
require("puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency");
require("puppeteer-extra-plugin-stealth/evasions/navigator.languages");
require("puppeteer-extra-plugin-stealth/evasions/navigator.permissions");
require("puppeteer-extra-plugin-stealth/evasions/navigator.plugins");
require("puppeteer-extra-plugin-stealth/evasions/navigator.vendor");
require("puppeteer-extra-plugin-stealth/evasions/navigator.webdriver");
require("puppeteer-extra-plugin-stealth/evasions/sourceurl");
require("puppeteer-extra-plugin-stealth/evasions/user-agent-override");
require("puppeteer-extra-plugin-stealth/evasions/webgl.vendor");
require("puppeteer-extra-plugin-stealth/evasions/window.outerdimensions");
require("dotenv").config();
puppeteer.use(StealthPlugin());
const emitter = new EventEmitter();

emitter.setMaxListeners(1000);

var categorizeSeed = {};
const filterProcess = async (emailJson) => {
  for (let i = 0; i < emailJson.length; i++) {
    // `email_of_${i.seedNo}_${i.browserNo}`
    if (!categorizeSeed[emailJson[i].seedNo]) {
      categorizeSeed[emailJson[i].seedNo] = [];
    }
    categorizeSeed[emailJson[i].seedNo].push(emailJson[i]);
  }
  // console.log("categorizeSeed >>>>>>>>>>", categorizeSeed);
  if (!Object.keys(categorizeSeed).length) return;

  let seedLen = Object.keys(categorizeSeed).length;
  for (let index = 1; index <= seedLen; index++) {
    if (categorizeSeed[index]) {
      const params = { seedNo: "above seed", browserNumber: index + 1 };
      // await utils.checkCpuAndDelay(params);
      Mainflow(categorizeSeed[index], index);
    }
  }
};

async function Mainflow(browsersArr, browserNo) {
  for (let index = 0; index <= browsersArr.length; index++) {
    const params = { seedNo: index + 1, browserNumber: browserNo };
    // await utils.checkCpuAndDelay(params);
    if (browsersArr.length == index) {
      index = 0;
    }
    const item = browsersArr[index];

    const sessionData = `${browserNo}`;

    const args = [
      // `--proxy-server=http://${item.proxyIP.trim()}:${item.proxyPort.trim()}`,
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-infobars",
      "--window-position=0,0",
      "--ignore-certifcate-errors",
      "--ignore-certifcate-errors-spki-list",
      "--use-gl=egl",
      "--disable-background-timer-throttling",
      "--enable-automation",
      "--disable-renderer-backgrounding",
      "--disable-backgrounding-occluded-windows",
      "--disable-ipc-flooding-protection",
    ];

    const lauchoptions = {
      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      args,
      userDataDir: sessionData,
      headless: false,
      devtools: false,
      ignoreHTTPSErrors: true,
      // slowMo: 100
    };

    const width = 1024;
    const height = 1600;

    const browser = await puppeteer.launch(lauchoptions, {
      defaultViewport: { width: width, height: height },
    });

    const page = (await browser.pages())[0];
    page.setDefaultNavigationTimeout(90000);

    // await page.authenticate({
    //   username: item.proxyUsername,
    //   password: item.proxyPassword,
    // });

    for (let i = 0; i <= 11; i++) {
      await sleep(1000);
      if (i == 11) {
        i = 0;
      }
      await page.bringToFront();

      try {
        await page.goto(
          `https://mail.google.com/mail/u/${i}/#settings/filters`,

          // https://mail.google.com/mail/u/${i}/h/1skwmxqy8dsdn/?&
          {
            waitUntil: "domcontentloaded",
            timeout: 1000 * 60 * 5,
          }
        );
      } catch (ex) {
        console.error(ex);

        // await browser.close()
      }

      await sleep(40000);

      await page.bringToFront();
      if (item.from == "delete") {
        const deleteFilter = await page.$x("//span[contains(., 'delete')]");
        if (deleteFilter[0]) {
          await deleteFilter[0].click();
          await page.bringToFront();
          await sleep(3000);
          const confirm = await page.$x("//button[contains(., 'OK')]");
          await confirm[0].click();
          await page.bringToFront();
          await sleep(3000);
        }
      } else {
        const createFilter = await page.$x(
          "//span[contains(., 'Create a new filter')]"
        );
        await createFilter[0].click();
        await page.bringToFront();

        await sleep(3000);
        // const from = await page.$x("//*[@class='ZH nr aQa']");
        // await from[0].type(item.from);
        // await sleep(1000)
        // const to = await page.$x("//*[@class='ZH nr aQf']");
        // await to[0].type(item.to);
        // await sleep(1000)
        // const subject = await page.$x("//*[@class='ZH nr aQd']");
        // await subject[0].type(item.subject);
        // await sleep(1000)
        // const hasWord = await page.$x("//*[@class='ZH nr aQb']");
        // await hasWord[0].type(item.hasword);
        // await sleep(1000)
        const doesntHave = await page.$x("//*[@class='ZH nr aP9']");
        await doesntHave[0].type("qwerty");
        await page.bringToFront();
        await sleep(1000);
        const clickcreateFilter = await page.$x("//*[@class='acM']");
        await clickcreateFilter[0].click();
        await page.bringToFront();
        await sleep(7000);

        const starcheck = await page.$x("//label[contains(., 'Star it')]");
        await starcheck[0].click();
        await page.bringToFront();
        await sleep(1000);
        const alwaymarkimp = await page.$x(
          "//label[contains(., 'Always mark it as important')]"
        );
        await alwaymarkimp[0].click();
        await page.bringToFront();
        await sleep(1000);
        const neverspam = await page.$x(
          "//label[contains(., 'Never send it to Spam')]"
        );
        await neverspam[0].click();
        await page.bringToFront();
        await sleep(1000);
        const categoryas = await page.$x(
          "//label[contains(., 'Categorize as:')]"
        );
        await categoryas[0].click();
        await page.bringToFront();
        await sleep(3000);
        // const categorycheck = await page.$x(
        //   "//div[contains(., 'Choose category...')]"
        // );//*[@id=":82"]
        // if (categorycheck.length > 0) {
        //   await categorycheck[0].click();
        // } else {
        //   throw new Error(" Link not found");
        // }
        const categorycheck = await page.$x(
          "//*[@class='J-J5-Ji J-JN-M-I-JG']"
        );

        await categorycheck[2].click();
        await page.bringToFront();
        await sleep(2000);

        const clickprimary = await page.$x(
          "//div[@class='J-N'][contains(., 'Primary')]"
        );
        // const clickprimary = await page.$x(
        // );
        await clickprimary[0].click();
        await page.bringToFront();

        // const selectCategory = await page.$x("//div[contains(., 'Choose category...')]");
        // await selectCategory[0].click();

        //  const selectCategory = await page.$x("//div[contains(@class, 'J-J5-Ji J-JN-M-I-Jm')]");
        //  await selectCategory[0].click();

        // const primary = await page.$x("//div[contains(@aria-activedescendant, ':8q')]");
        // await primary[0].click();

        await sleep(1000);

        const finalclickcreateFilter = await page.$x(
          "//*[@class='T-I J-J5-Ji Zx acL T-I-atl L3']"
        );
        await page.bringToFront();
        await finalclickcreateFilter[0].click();
        await page.bringToFront();
      }
    }
  }

  return "DONE";
}

module.exports = {
  filterProcess,
};

const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const eval = async (page, pageFunction, ...args) => {
  var context = await page._frameManager.mainFrame().executionContext(),
    suffix = `//# sourceURL=VM30`;
  var res = await context._client.send("Runtime.callFunctionOn", {
    functionDeclaration: pageFunction.toString() + "\n" + suffix + "\n",
    executionContextId: context._contextId,
    arguments: args.map((arg) => ({ value: arg })),
    returnByValue: true,
    awaitPromise: true,
    userGesture: true,
  });
  if (res.exceptionDetails)
    throw new Error(res.exceptionDetails.exception.description);
  else if (res.result.value) return res.result.value;
};
