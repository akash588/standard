const puppeteer = require("puppeteer-extra");
const EventEmitter = require("events");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// const utils = require('./utils.js');
var fs = require("fs");

var logger = require("tracer").console({
  transport: function (data) {
    console.log(data.output);
    fs.appendFile("./PwdChange.log", data.rawoutput + "\n", (err) => {
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

const gmailProcess = async (credentials) => {
  const args = [
    `--proxy-server=http://${credentials[0].proxyIP.trim()}:${credentials[0].proxyPort.trim()}`,
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
    // userDataDir: sessionData,
    headless: false,
    devtools: false,
    ignoreHTTPSErrors: true,
  };

  const browser = await puppeteer.launch(lauchoptions);
  const page = (await browser.pages())[0];

  try {
    await page.setDefaultNavigationTimeout(1000 * 60 * 5);
  } catch (ex) {
    console.error(ex);
    await browser.close();
  }
  await page.bringToFront();
  await sleep(5000);
  await page.authenticate({
    username: credentials[0].proxyUsername,
    password: credentials[0].proxyPassword,
  });
  await page.bringToFront();
  await sleep(3000);
  if ((await page.$("#reload-button")) !== null) {
    await page.click("#reload-button");
  }
  for (let i = 0; i <= credentials.length; i++) {
    await page.goto("https://accounts.google.com/ServiceLogin/signinchooser?service=accountsettings&passive=1209600&osid=1&continue=https%3A%2F%2Fmyaccount.google.com%2Fsigninoptions%2Fpassword%3Frapt%3DAEjHL4MnYDToQ-upu5dg5Y7V0ukS6k_pVm1FCTdLvSjCEsintIDt9gjosso92h0B0xCGvsNka3K1YsvgEY3sFKYbq5R49LZXVg&followup=https%3A%2F%2Fmyaccount.google.com%2Fsigninoptions%2Fpassword%3Frapt%3DAEjHL4MnYDToQ-upu5dg5Y7V0ukS6k_pVm1FCTdLvSjCEsintIDt9gjosso92h0B0xCGvsNka3K1YsvgEY3sFKYbq5R49LZXVg&emr=1&mrp=security&rart=ANgoxcdkJYoE1EYocTJUc7hg8chhNCgxkvsLUP169d0tRoDbsh82Shkavv4eSDlkcvSgyqkwEqzoJSZHcMj1PLHB9snQwnPadg&flowName=GlifWebSignIn&flowEntry=ServiceLogin ", {
      waitUntil: "domcontentloaded",
      timeout: 0,
    });

    // await sleep(3000);
    if ((await page.$("#reload-button")) !== null) {
      await page.click("#reload-button");
    }

    if ((await page.$('div[class="BHzsHc"]')) !== null) {
      await page.click('div[class="BHzsHc"]');
    }
    if ((await page.$('input[type="email"]')) !== null) {
      await sleep(3000);
      await page.waitForSelector('input[type="email"]');
      await page.type('input[type="email"]', credentials[i].email);
      await page.bringToFront();
      await Promise.all([page.keyboard.press("Enter")]);
      await sleep(5000);

      await page.waitForSelector('input[type="password"]');
      await page.bringToFront();
      await sleep(3000);
      await page.type('input[type="password"]', credentials[i].pwd),
        await sleep(6000);
      await Promise.all([page.keyboard.press("Enter")]);
    }
    await sleep(10000);
    if (
      (await page.$(
        "#yDmH0d > c-wiz.yip5uc.SSPGKf > c-wiz > div > div.p9lFnc > div > div > div > div.ZRg0lb.Kn8Efe > div:nth-child(3) > div > div.yKBrKe > div > span > span"
      )) !== null
    ) {
      await page.click(
        "#yDmH0d > c-wiz.yip5uc.SSPGKf > c-wiz > div > div.p9lFnc > div > div > div > div.ZRg0lb.Kn8Efe > div:nth-child(3) > div > div.yKBrKe > div > span > span"
      );
    }


    if ((await page.$('div[class="lCoei YZVTmd SmR8"]')) !== null) {
      const doesntHave = await page.$x("//*[@class='vxx8jf']");
      if(doesntHave[2]){
      await doesntHave[2].click();
      await sleep(3000);
      await page.waitForSelector('input[type="email"]');
      await sleep(3000);
      await page.type('input[type="email"]', credentials[i].recovery);
      await page.bringToFront();
      await Promise.all([page.keyboard.press("Enter")]);
      // await sleep(6000)
    }else{
      await page.waitForSelector('div[class="lCoei YZVTmd SmR8"]');
      await sleep(3000);
      await page.click('div[class="lCoei YZVTmd SmR8"]');
      // await page.click('div[class="vxx8jf"]');
      await sleep(3000);
      await page.waitForSelector('input[type="email"]');
      await sleep(3000);
      await page.type('input[type="email"]', credentials[i].recovery);
      await page.bringToFront();
      await Promise.all([page.keyboard.press("Enter")]);
    }
    }

    // if ((await page.$x("//div[@class='vxx8jf'][contains(., 'Confirm your recovery email')]")) !== null) {
    //   await sleep(3000);
    //   // await page.click('div[class="vxx8jf"]');
    //   const clickprimary = await page.$x(
    //     "//div[@class='vxx8jf'][contains(., 'Confirm your recovery email')]"
    //   );
    //   if(clickprimary[0]){
    //   await clickprimary[0].click();
    //   await sleep(3000);
    //   await page.type('input[type="email"]', credentials[i].recovery);
    //   await page.bringToFront();
    //   await Promise.all([page.keyboard.press("Enter")]);
    //    }
    //   }




    //not now click

    if ((await page.$('div[class="VfPpkd-RLmnJb"]')) !== null) {
      await sleep(3000);
      await page.click('div[class="VfPpkd-RLmnJb"]');
    }
    if (
      (await page.$(
        "#yDmH0d > c-wiz > div > div > div > div.L5MEH.Bokche.ypEC4c > div.lq3Znf > div:nth-child(1) > button > div.VfPpkd-RLmnJb"
      )) !== null
    ) {
      await sleep(3000);
      await page.click(
        "#yDmH0d > c-wiz > div > div > div > div.L5MEH.Bokche.ypEC4c > div.lq3Znf > div:nth-child(1) > button > div.VfPpkd-RLmnJb"
      );
    }
    if (
      (await page.$(
        "#yDmH0d > c-wiz > div > div > div > div.L5MEH.Bokche.ypEC4c > div.lq3Znf > div:nth-child(1) > button > span"
      )) !== null
    ) {
      await sleep(3000);
      await page.click(
        "#yDmH0d > c-wiz > div > div > div > div.L5MEH.Bokche.ypEC4c > div.lq3Znf > div:nth-child(1) > button > span"
      );
    }

    await page.bringToFront();
    //confirm click
    if (
      (await page.$(
        "#yDmH0d > c-wiz.yip5uc.SSPGKf > c-wiz > div > div.p9lFnc > div > div > div > div.ZRg0lb.Kn8Efe > div:nth-child(3) > div > div.yKBrKe > div > span > span"
      )) !== null
    ) {
      await sleep(3000);
      await page.click(
        "#yDmH0d > c-wiz.yip5uc.SSPGKf > c-wiz > div > div.p9lFnc > div > div > div > div.ZRg0lb.Kn8Efe > div:nth-child(3) > div > div.yKBrKe > div > span > span"
      );
      await page.bringToFront();
    }
    if (
      (await page.$(
        "#yDmH0d > c-wiz.yip5uc.SSPGKf > c-wiz > div > div.p9lFnc > div > div > div > div.ZRg0lb.Kn8Efe > div:nth-child(3) > div > div.yKBrKe > div > div.ZFr60d.CeoRYc"
      )) !== null
    ) {
      await sleep(3000);
      await page.click(
        "#yDmH0d > c-wiz.yip5uc.SSPGKf > c-wiz > div > div.p9lFnc > div > div > div > div.ZRg0lb.Kn8Efe > div:nth-child(3) > div > div.yKBrKe > div > div.ZFr60d.CeoRYc"
      );
    }

    if ((await page.$('div[class="ZFr60d"]')) !== null) {
      await sleep(3000);
      await page.click('div[class="ZFr60d"]');
    }
    if (
      (await page.$(
        "#yDmH0d > c-wiz.yip5uc.SSPGKf > c-wiz > div > div.p9lFnc > div > div > div > div.ZRg0lb.Kn8Efe > div:nth-child(3) > div > div.yKBrKe > div > span > span"
      )) !== null
    ) {
      await sleep(3000);
      await page.click(
        "#yDmH0d > c-wiz.yip5uc.SSPGKf > c-wiz > div > div.p9lFnc > div > div > div > div.ZRg0lb.Kn8Efe > div:nth-child(3) > div > div.yKBrKe > div > span > span"
      );
    }
    if ((await page.$('div[class="VfPpkd"]')) !== null) {
      await sleep(3000);
      await page.click('div[class="VfPpkd"]');
    }

    // await sleep(90000);

    // await sleep(90000);
    //  change pwd
    //myaccount.google.com/signinoptions/password?pli=1&rapt=AEjHL4P5KXzj1gOM0s-18BSV-jf_E3eAl0pnziiw_lrwckdrnkDGhP0ImYVDis3P-7AHoSWvSvUnPbCrNJo-ckxIe841KjD-tg
     await sleep(5000)
    await page.goto(
      "https://myaccount.google.com/recovery/email?continue=https://myaccount.google.com/email&pli=1&rapt=AEjHL4M1RKXdY3qsq3YK4qE4pPQ5zrP8ukBdGG4q2GM04X8Yx87-gwMooTcwXQ7qx6wyasDy265jRLLKEpn3bL_-EZddrdQ3HA",
      {
        waitUntil: "domcontentloaded",
        timeout: 0,
      }
    );

    await page.waitForSelector('input[type="password"]');
    await page.bringToFront();
    await sleep(3000);
    await page.type('input[type="password"]', credentials[i].pwd),
      await sleep(6000);
    await Promise.all([page.keyboard.press("Enter")]);

    await sleep(13000);

    const input = await page.$x(
      "/html/body/c-wiz/div/div[2]/div[2]/c-wiz/div/div[4]/form/div[2]/div[1]/div/div/label/input"
    );

    await input[0].click({ clickCount: 3 });
    await page.keyboard.press("Backspace");
    await sleep(4000);
    await input[0].type(credentials[i].browserNo);
    await sleep(6000);
    logger.log(
      `email:${credentials[i].email} change recovery mail to ${credentials[i].browserNo}`
    );

    const Next = await page.$x("//span[contains(., 'Next')]");
    await sleep(2000);
    await Next[0].click();

    await sleep(8000);
    const Cancel = await page.$x("//span[contains(., 'Cancel')]");
    await sleep(2000);
    await Cancel[0].click();

    await sleep(7000);

    await page.goto(
      "https://myaccount.google.com/signinoptions/password?pli=1&rapt=AEjHL4P5KXzj1gOM0s-18BSV-jf_E3eAl0pnziiw_lrwckdrnkDGhP0ImYVDis3P-7AHoSWvSvUnPbCrNJo-ckxIe841KjD-tg",
      {
        waitUntil: "domcontentloaded",
        timeout: 0,
      }
    );

    await sleep(5000);
    await page.waitForSelector('input[type="password"]');
    await page.bringToFront();
    await sleep(3000);
    await page.type('input[type="password"]', credentials[i].pwd),
      await sleep(6000);
    await Promise.all([page.keyboard.press("Enter")]);
    await sleep(11000);

    const newpwd = await page.$x("//input[@type='password'] ");
    await sleep(5000);

    await newpwd[0].type(credentials[i].seedNo);
    await sleep(3000);
    await newpwd[1].type(credentials[i].seedNo);
    await sleep(4000);
    await Promise.all([page.keyboard.press("Enter")]);

    await sleep(10000);
    logger.log(
      `email:${credentials[i].email} change password to ${credentials[i].seedNo}`
    );
    await page.goto("https://accounts.google.com/Logout?ec=GAdAwAE", {
      waitUntil: "domcontentloaded",
      timeout: 0,
    });
    await sleep(8000);

    // const remove = await page.$x(
    //   "//div[@class='BHzsHc'][contains(., 'Remove an account')]"
    // );
    // const remove  = await page.$x("//*[@class='lCoei YZVTmd SmR8']");

    // await remove[0].click();
    // await sleep(5000);
    // await page.bringToFront();

    // const minusclick = await page.$x("//*[@class='stUf5b']");

    // await minusclick[0].click();

    // await sleep(7000);
    // await Promise.all([page.keyboard.press("Enter")]);

    // await sleep(9000);

    await page.bringToFront();
  }
  return "DONE";
};

module.exports = {
  gmailProcess,
};

const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
