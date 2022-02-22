const puppeteer = require("puppeteer-extra");
const EventEmitter = require("events");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// const utils = require('./utils.js');
var fs = require('fs')

var logger = require('tracer').console({
  transport: function(data) {
    console.log(data.output)
    fs.appendFile('./loginStatus.log', data.rawoutput + '\n', err => {
      if (err) throw err
    })
  }
})
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

const gmailProcess = async(emailJson) => {
 
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
       params = { seedNo: "above seed", browserNumber: index + 1 }
    //   await utils.checkCpuAndDelay(params);
      processBrowsers(categorizeSeed[index], index);
    }
  }

};
 
const processBrowsers = async (browsersArr, browserNo) => {
 
  
  for (let index = 0; index <= browsersArr.length; index++) {
    // const params = { seedNo: index + 1, browserNumber: browserNo }
    // await utils.checkCpuAndDelay(params);
    if(browsersArr.length == index){
      index = 0
    }
    const item = browsersArr[index];
    const browserArr = browsersArr
    // try{
    //   const proxy = `${item.proxyUsername}:${item.proxyPassword}@${item.proxyIP}:${item.proxyPort}`; 
    //   proxy_check(proxy)
    const sessionData = `${browserNo}`;
   
      const args = [
      // `--proxy-server=http://${item.proxyIP.trim()}:${item.proxyPort.trim()}`,
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--window-position=0,0',
      '--ignore-certifcate-errors',
      '--ignore-certifcate-errors-spki-list',
      '--use-gl=egl',
      '--disable-background-timer-throttling',
      '--enable-automation',
      '--disable-renderer-backgrounding',
      '--disable-backgrounding-occluded-windows',
      '--disable-ipc-flooding-protection',
    ];
  
    

    const lauchoptions = {
      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      args,
      userDataDir: sessionData,
      headless: false,
      devtools: false,
      ignoreHTTPSErrors: true,
    };
    // let browser = null;
    // let page = null;
  // if (item.browserNo == 1) {
  const browser = await puppeteer.launch(lauchoptions);
  const page = (await browser.pages())[0];
  //  var page = (await browser.pages())[0];
  // }

//   await utils.checkCpuAndDelay(params);
    await Mainflow(
      browser,
      {
        proxyUsername: item.proxyUsername,
        proxyPassword: item.proxyPassword,
        recovery: item.recovery,
        email: item.email,
        pwd: item.pwd,
        seedno: item.seedNo,
        browserNumber: item.browserNo
      },
      page,
      browserArr
    );
  
  }
};

async function Mainflow(browser, currentItem, page, browserArr) {

  try {
    await page.setDefaultNavigationTimeout(1000 * 60 * 3);
  }
  catch(ex) {
    console.error(ex)
   await browser.close()
  }
  await page.bringToFront();
  await sleep(5000);
  // await page.authenticate({
  //   username: currentItem.proxyUsername,
  //   password: currentItem.proxyPassword,
  // });
  await page.bringToFront();
  await sleep(3000);
  if ((await page.$('#reload-button')) !== null) {
    await page.click('#reload-button');
  }
  if(currentItem.seedno == 1) {
    // try{
  await page.goto("http://accounts.google.com ", {
    waitUntil: "domcontentloaded",
    timeout: 0,
  });
// } catch(ex){
//   await browser.close()
// } 
  }

  await sleep(3000);
  if ((await page.$('#reload-button')) !== null) {
    await page.click('#reload-button');
  }
  // let pages1 = await browser.pages();
  // await pages1[0].close();
  if ((await page.$('div[class="BHzsHc"]')) !== null) {
    await page.click('div[class="BHzsHc"]');
  }
  if ((await page.$('input[type="email"]')) !== null) {
    await sleep(3000);
    // await page.waitForSelector('input[type="email"]');
    // await page.type('input[type="email"]', currentItem.email);
    const email = await page.$x("//input[@type='email'] ");
    await sleep(5000);

    await email[0].type(currentItem.email);
    await page.bringToFront();
    await Promise.all([page.keyboard.press("Enter")]);
    await sleep(5000);
    // await page.waitForSelector('input[type="password"]');
    await page.bringToFront();
    // await sleep(3000);
    // await page.type('input[type="password"]', currentItem.pwd),
    const pwd = await page.$x("//input[@type='password'] ");
    await sleep(5000);

    await pwd[0].type(currentItem.pwd);
      await sleep(6000);
    await Promise.all([page.keyboard.press("Enter")]);
  }
  await sleep(3000);
  if ((await page.$('#yDmH0d > c-wiz.yip5uc.SSPGKf > c-wiz > div > div.p9lFnc > div > div > div > div.ZRg0lb.Kn8Efe > div:nth-child(3) > div > div.yKBrKe > div > span > span')) !== null) {
    await page.click('#yDmH0d > c-wiz.yip5uc.SSPGKf > c-wiz > div > div.p9lFnc > div > div > div > div.ZRg0lb.Kn8Efe > div:nth-child(3) > div > div.yKBrKe > div > span > span');
  }
  await sleep(3000);
  // if ((await page.$('div[class="lCoei YZVTmd SmR8"]')) !== null) {
  //   await page.waitForSelector('div[class="lCoei YZVTmd SmR8"]');
  //   await sleep(3000);
  //   await page.click('div[class="lCoei YZVTmd SmR8"]');
  //   // await page.click('div[class="vxx8jf"]');
  //   await sleep(3000);
  //   await page.waitForSelector('input[type="email"]');
  //   await sleep(3000);
  //   await page.type('input[type="email"]', currentItem.recovery);
  //   await page.bringToFront();
  //   await Promise.all([page.keyboard.press("Enter")]);
  // }
  if ((await page.$('div[class="lCoei YZVTmd SmR8"]')) !== null) {
    const doesntHave = await page.$x("//*[@class='vxx8jf']");
    if (doesntHave[2]) {
      await doesntHave[2].click();
      await sleep(3000);
      await page.waitForSelector('input[type="email"]');
      await sleep(3000);
      await page.type('input[type="email"]', currentItem.recovery);
      await page.bringToFront();
      await Promise.all([page.keyboard.press("Enter")]);
      // await sleep(6000)
    } else {
      await page.waitForSelector('div[class="lCoei YZVTmd SmR8"]');
      await sleep(3000);
      await page.click('div[class="lCoei YZVTmd SmR8"]');
      // await page.click('div[class="vxx8jf"]');
      await sleep(3000);
      await page.waitForSelector('input[type="email"]');
      await sleep(3000);
      await page.type('input[type="email"]', currentItem.recovery);
      await page.bringToFront();
      await Promise.all([page.keyboard.press("Enter")]);
    }
  }
  //not now click
  await sleep(3000);
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
  logger.log(`email:${currentItem.email} login sucessfully`)
  
  
  // 1
  for (let i = 1; i <= 10; i++) {
    try{
    if (i == 10) {
      logger.log('all user login sucessfully');
      break;
    }
  await sleep(5000);
  await page.bringToFront();
  // await page.authenticate({
  //   username: browserArr[1].proxyUsername,
  //   password: browserArr[1].proxyPassword,
  // });
  let pages5 = await browser.pages();
  if(pages5[1]){
  await pages5[1].close();
  }
  await sleep(3000);
  if ((await page.$('#reload-button')) !== null) {
    await page.click('#reload-button');
  }
  await page.bringToFront();
  try{
  await page.goto("https://accounts.google.com/signin/v2/identifier?service=accountsettings&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Fpli%3D1&ec=GAlAwAE&flowName=GlifWebSignIn&flowEntry=AddSession", {
    waitUntil: "domcontentloaded",
    timeout: 0,
  });
} catch(ex){
  await browser.close()
} 
await page.bringToFront();
  
  

  await sleep(3000);
  if ((await page.$('#reload-button')) !== null) {
    await page.click('#reload-button');
  }
  await page.bringToFront();
  // let pages11 = await browser.pages();
  // await pages11[0].close();
  if ((await page.$('div[class="BHzsHc"]')) !== null) {
    await page.click('div[class="BHzsHc"]');
  }
  await page.bringToFront();
  await page.bringToFront();
  if ((await page.$('input[type="email"]')) !== null) {
    await sleep(3000);
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', browserArr[i].email);
    await Promise.all([page.keyboard.press("Enter")]);
    await sleep(5000);
    await page.waitForSelector('input[type="password"]');
    await sleep(3000);
    await page.type('input[type="password"]', browserArr[i].pwd),
      await sleep(6000);
    await Promise.all([page.keyboard.press("Enter")]);
  }
  
  await page.bringToFront();
  await sleep(3000);
  if ((await page.$('#yDmH0d > c-wiz.yip5uc.SSPGKf > c-wiz > div > div.p9lFnc > div > div > div > div.ZRg0lb.Kn8Efe > div:nth-child(3) > div > div.yKBrKe > div > span > span')) !== null) {
    await page.click('#yDmH0d > c-wiz.yip5uc.SSPGKf > c-wiz > div > div.p9lFnc > div > div > div > div.ZRg0lb.Kn8Efe > div:nth-child(3) > div > div.yKBrKe > div > span > span');
  }
  await sleep(3000);
  await page.bringToFront();
  if ((await page.$('div[class="lCoei YZVTmd SmR8"]')) !== null) {
    await page.waitForSelector('div[class="lCoei YZVTmd SmR8"]');
    await sleep(3000);
    await page.click('div[class="lCoei YZVTmd SmR8"]');
    // await page.click('div[class="vxx8jf"]');
    await sleep(3000);
    await page.bringToFront();
    await page.waitForSelector('input[type="email"]');
    await sleep(3000);
    await page.type('input[type="email"]', browserArr[i].recovery);
    await Promise.all([page.keyboard.press("Enter")]);
  }
  await page.bringToFront();
  //not now click
  await page.bringToFront();
  await sleep(3000);
  if ((await page.$('div[class="VfPpkd-RLmnJb"]')) !== null) {
    await sleep(3000);
    await page.click('div[class="VfPpkd-RLmnJb"]');
  }
  await page.bringToFront();
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
  await page.bringToFront();
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
  }
  await page.bringToFront();
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
  await page.bringToFront();

  if ((await page.$('div[class="ZFr60d"]')) !== null) {
    await sleep(3000);
    await page.click('div[class="ZFr60d"]');
  }
  await page.bringToFront();
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
  await page.bringToFront();
  if ((await page.$('div[class="VfPpkd"]')) !== null) {
    await sleep(3000);
    await page.click('div[class="VfPpkd"]');
  }
  await page.bringToFront();
  logger.log(`email:${browserArr[i].email} login sucessfully`)
}catch(err){
  logger.log(`email:${browserArr[i].email} NOT LOGIN`)
  continue;
}
}



await page.bringToFront();
  

    //  await browser.close();

 
     return "DONE";
}




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
