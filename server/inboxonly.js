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
const gmailProcess = async (emailJson) => {
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
  try {
    for (let index = 0; index <= browsersArr.length; index++) {
      const params = { seedNo: index + 1, browserNumber: browserNo };
      // await utils.checkCpuAndDelay(params);
      if (browsersArr.length == index) {
        index = 0;
      }
      const item = browsersArr[index];

      const sessionData = `${browserNo}`;

      const args = [
        `--proxy-server=http://${item.proxyIP.trim()}:${item.proxyPort.trim()}`,
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
      //  const page = await browser.newPage();
      const page = (await browser.pages())[0];
      page.setDefaultNavigationTimeout(90000);
      // await utils.checkCpuAndDelay(params);

      // try {
      //   await page.setDefaultNavigationTimeout(1000 * 60 * 3);
      // } catch (ex) {
      //   console.error(ex);
      //   //    await browser.close()
      // }
      await page.bringToFront();
      await page.authenticate({
        username: item.proxyUsername,
        password: item.proxyPassword,
      });
      await page.bringToFront();

      for (let i = 0; i <= 11; i++) {
        await sleep(1000);
        if (i == 11) {
          i = 0;
        }
        https://mail.google.com/mail/u/1/#search/in%3Ainbox+welcome+OR+liberty/FMfcgzGmthmXxmntkRPvnCnWBNrlpkTn
        await page.bringToFront();
        await Promise.all([page.keyboard.press("Enter")]);
        await Promise.all([page.keyboard.press("Enter")]);
        try {
          
          // await page.goto(
          //   `https://mail.google.com/mail/u/${i}/#inbox`,
          //     pressenter(page,i),
          //   // https://mail.google.com/mail/u/${i}/h/1skwmxqy8dsdn/?&
          //   {
              
          //     waitUntil:"domcontentloaded",
              
          //     timeout: 1* 1000* 60,
          //   },
            
          // );
          await sleep(9000)

          await page.goto(`https://mail.google.com/mail/u/${i}/#inbox`, {waituntil: "domcontentloaded"});

          // //Find the iFrame with the URL http://www.allwebco-templates.com/support/
          // const frame = await page.frames().find(f => f.url() === `https://mail.google.com/mail/u/${i-1}/#search/in%3Ainbox+welcome+OR+liberty/FMfcgzGmthmXxmntkRPvnCnWBNrlpkTn`);
          // if(!frame){
          //   console.log("iFrame not found with the specified url");
            
          // }
          // await Promise.all([page.keyboard.press("Enter")]);
          // await Promise.all([page.keyboard.press("Enter")]);
          
        } catch (ex) {
         
          console.error(ex);

          // await browser.close()
        }

        await page.bringToFront();
        if ((await page.$("#main-message > h1 > span")) !== null) {
          let proxyreconnect = await eval(
            page,
            `() => document.querySelector('#main-message > h1 > span').innerText == 'No internet'`
          );
          if (proxyreconnect == true) {
            await page.reload({
              waitUntil: ["networkidle0", "domcontentloaded"],
            });
          }
        }
        await Promise.all([page.keyboard.press("Enter")]);
        await Promise.all([page.keyboard.press("Enter")]);
        await page.bringToFront();

        // if(i == 0){
        //   let pages3 = await browser.pages();
        // await pages3[0].close();
        // }
        // for (let j = 0; i <= 2; j++) {
        if ((await page.$("#maia-main > form > p > input")) !== null) {
          await page.click("#maia-main > form > p > input");
        }
        await Promise.all([page.keyboard.press("Enter")]);
        await page.bringToFront();
        await Promise.all([page.keyboard.press("Enter")]);
        await Promise.all([page.keyboard.press("Enter")]);
        const searchmail = '[aria-label="Search mail"]';
        await page.waitForSelector(searchmail);
        await page.click(searchmail);
        await page.bringToFront();
        let pages13 = await browser.pages();
        if (pages13[1]) {
          await pages13[1].close();
        }
        if (pages13[2]) {
          await pages13[2].close();
        }
        if (pages13[3]) {
          await pages13[3].close();
        }
        await Promise.all([page.keyboard.press("Enter")]);
        await Promise.all([page.keyboard.press("Enter")]);
        // await searchmail.click({ clickCount: 3 });
        await page.type(searchmail, `in:spam `);
        await Promise.all([page.keyboard.press("Enter")]);
        await page.bringToFront();
        await sleep(20000);

        const checkPrice = await page.$x(
          "//td[contains(text(), 'Hooray, no spam here!')]"
        );
        console.log(checkPrice.length);
        
        if (checkPrice.length == 0) {
          const click1 = await page.$x(
            "/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div[2]/div[4]/div[2]/div/table/tbody/tr[1]/td[2]"
          );
          await page.bringToFront();
          // "/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div[3]/div[5]/div[2]/div/table/tbody/tr[1]/td[2]"
          if (click1.length) {
            await click1[0].click();
          }
          const click2 = await page.$x(
            "/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div[2]/div[4]/div[2]/div/table/tbody/tr[2]/td[2]"
          );
          if (click2.length) {
            await click2[0].click();
          }
          const click3 = await page.$x(
            "/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div[2]/div[4]/div[2]/div/table/tbody/tr[3]/td[2]"
          );
          if (click3.length) {
            await click3[0].click();
          }
          const click4 = await page.$x(
            "/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div[2]/div[4]/div[2]/div/table/tbody/tr[4]/td[2]"
          );
          if (click4.length) {
            await click4[0].click();
          }
          const click5 = await page.$x(
            "/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div[2]/div[4]/div[2]/div/table/tbody/tr[5]/td[2]"
          );
          if (click5.length) {
            await click5[0].click();
          }
          const click6 = await page.$x(
            "/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div[2]/div[4]/div[2]/div/table/tbody/tr[6]/td[2]"
          );
          // "/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div[3]/div[5]/div[2]/div/table/tbody/tr[1]/td[2]"
          if (click6.length) {
            await click6[0].click();
          }
          const click7 = await page.$x(
            "/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div[2]/div[4]/div[2]/div/table/tbody/tr[7]/td[2]"
          );
          if (click7.length) {
            await click7[0].click();
          }
          const click8 = await page.$x(
            "/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div[2]/div[4]/div[2]/div/table/tbody/tr[8]/td[2]"
          );
          if (click8.length) {
            await click8[0].click();
          }
          const click9 = await page.$x(
            "/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div[2]/div[4]/div[2]/div/table/tbody/tr[9]/td[2]"
          );
          if (click9.length) {
            await click9[0].click();
          }
          const click10 = await page.$x(
            "/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div[2]/div[4]/div[2]/div/table/tbody/tr[10]/td[2]"
          );
          if (click10.length) {
            await click10[0].click();
          }
          await page.bringToFront();
          await sleep(2000);
          let notspamcheck = await eval(
            page,
            `() => document.getElementsByClassName('Bn')[1].innerText == 'Not spam'`
          );
          await page.bringToFront();
          await sleep(3000);
          // let notspamclick = await eval(page, `() => document.getElementsByClassName('Bn')[1]`);
          if (notspamcheck == true) {
            await page.click(
              "div.D.E.G-atb.PY > div.nH.aqK > div.Cq.aqL > div > div > div:nth-child(3) > div > div"
            );
          }
          await page.bringToFront();
          await sleep(15000)
        }
        await page.bringToFront();
        await page.goto(
          `https://mail.google.com/mail/u/${i}/#inbox`,
          // https://mail.google.com/mail/u/${i}/h/1skwmxqy8dsdn/?&
          {
            waitUntil: "domcontentloaded",
            timeout: 1000 * 60 * 5,
          }
        );
        await page.bringToFront();
        for (let i = 0; i < 20; i++) {
          await sleep(5000);
          await page.waitForSelector('[aria-label="Search mail"]');

          await page.bringToFront();
          await page.click('[aria-label="Search mail"]');
          await page.bringToFront();
          if (i == 0) {
            await page.type(
              '[aria-label="Search mail"]',
              `in:inbox welcome OR liberty `
            );
          }
          await page.bringToFront();
          // is:unread in:inbox welcome OR liberty

          await Promise.all([page.keyboard.press("Enter")]);
          await page.bringToFront();
          logger.log("mailsync:", i);
          // document.getElementsByClassName('v1')[0].innerText == 'Loading...'
          if (i == 0) {
            await sleep(15000);
            await page.bringToFront();
          } else {
            await sleep(5000);
          }

          await page.bringToFront();
          await eval(
            page,
            `() => document.getElementsByClassName('xY a4W')[10].click()`
          );
          await page.bringToFront();
          // const firstmail = await page.$x(
          //   "/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div[3]/div[5]/div[2]/div/table/tbody/tr[1]"
          // );

          // if (firstmail[0] == undefined) {
          //   const firstmailoptional = await page.$x(
          //     "/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div[2]/div[5]/div[2]/div/table/tbody/tr[1]"
          //   );
          //   await sleep(2000);
          //   await firstmailoptional[0].click();
          // } else {
          //   await firstmail[0].click();
          // }

          await page.bringToFront();
          let pages13 = await browser.pages();
          if (pages13[1]) {
            await pages13[1].close();
          }
          await page.bringToFront();

          await sleep(3000);
          let pages14 = await browser.pages();
          if (pages14[1]) {
            await pages14[1].close();
          }
          await page.bringToFront();
          const aElementsWithHi = await page.$x("//a[contains(string(),'Hi ')]");
          if (aElementsWithHi.length) {                
            if (aElementsWithHi[0] >= 1) {
              aElementsWithHi[0].click();
            } else {
              await sleep(2000)
              await page.bringToFront();
              const headerWithHi = await page.$x("//a[contains(string(),'Hi')]");
              headerWithHi[0].click();
            }
            await page.bringToFront();
            await sleep(7000);
            await page.bringToFront();

            let pages2 = await browser.pages();
            if (pages2[1]) {
              await pages2[1].close();
            }
            if (pages2[2]) {
              await pages2[2].close();
            }
            if (pages2[3]) {
              await pages2[3].close();
            }

            await page.bringToFront();
            const starclick = await page.$x(
              "//div[contains(@aria-label, 'Not starred')]"
            );
            await sleep(2000);
            await page.bringToFront();
            if (starclick.length >= 1) {
              await starclick[0].click();
            }
            await sleep(8000);
            await page.bringToFront();
            let impcheck = await eval(
              page,
              `() => document.getElementsByClassName('pG')[20].ariaLabel`
            );
            await sleep(1000);
            // console.log(impcheck)
            await page.bringToFront();

            if (impcheck == "Not important") {
              const tryagain = await page.$x(
                "/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div[4]/div/table/tr/td[1]/div[2]/div[1]/div[2]/div[1]/span/div[1]"
              );
              
              
              if(tryagain[0] == undefined){
                const tryagain1 = await page.$x(
                  "/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div[3]/div/table/tr/td[1]/div[2]/div[1]/div[2]/div[1]/span/div[1]"
                );
                await tryagain1[0].click();
              }else{
              await tryagain[0].click();
              }
            }
            await page.bringToFront();

            // const  impclick = await page.$x(
            //   "/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div[4]/div/table/tr/td[1]/div[2]/div[1]/div[2]/div[1]/span"
            // );
            // // await sleep(1000);

            // if (impclick.length >= 1) {
            //   await impclick[0].click();
            // }

            // await sleep(2000)
            // document.getElementsByClassName('bAq')[0].innerText == 'Conversation marked as not important.'

            // try{

            //         let impcheck = await eval(
            //           page,
            //           `() => document.getElementsByClassName('bAq')`
            //         );
            //         console.log(impcheck)
            //         if (impcheck == true) {
            //           const  confirmimpclick = await page.$x(
            //             "/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div[4]/div/table/tr/td[1]/div[2]/div[1]/div[2]/div[1]/span"
            //           );

            //           if (confirmimpclick.length >= 1) {
            //             await confirmimpclick[0].click();
            //           }

            //         }
            //       }catch(ex)
            // {
            //   console.log(ex)
            // }

            await page.bringToFront();
          }
          await sleep(3000);
          await page.bringToFront();
          const Archive = await page.$x(
            "/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[1]/div[4]/div[1]/div/div[2]/div[1]"
          );

          if (Archive[0]) {
            await Archive[0].click();
          } else {
            const Archive1 = await page.$x(
              "/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[1]/div[3]/div[1]/div/div[2]/div[1]"
            );
            await Archive1[0].click();
          }
          await page.bringToFront();
          await Promise.all([page.keyboard.press("Enter")]);
        await Promise.all([page.keyboard.press("Enter")]);
        }
      }
    }

    //   await browser.close();
    // processBrowsers(browser,page)
    return "DONE";
  } catch (ex) {
    console.log(ex);
  }
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
const pressenter = async (page,i) =>{
  if(i == 0){
    await sleep(1000)
  }
  else{
  await Promise.all([page.keyboard.press("Enter")]);
  await Promise.all([page.keyboard.press("Enter")]);
  }
}

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
