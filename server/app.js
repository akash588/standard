const express = require("express");
const app = express();
const schedule = require("node-schedule");
var osu = require("node-os-utils");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const loginemail = require("./loginonly");
const inboxonly = require("./inboxonly");
// const filter = require('./filter');
// const changePwd = require('./changePwd')
app.use(cors());

app.use(express.json({ limit: "125mb" }));

const CONNECTION_URL =
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
const port = 7008;

mongoose.connect(
  CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => console.log("Connected to Database")
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});








app.post("/create", async (req, res) => {
  // console.log(req.body)
  const globaldata = req.body;
  // loginemail.gmailProcess(globaldata);
  inboxonly.gmailProcess(globaldata);
  // filter.filterProcess(globaldata)
  // gmailAuto.gmailProcess(globaldata)
  // gmailAutomation.gmailProcess(globaldata)
  // changePwd.gmailProcess(globaldata)
});

app.post("/login", async (req, res) => {
  console.log(req.body);
});

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
  

  
  // const create = require("./router/create.js");
  // app.post("/create", create);
  // require('./yahoo')();

  //initTask();
  // require('./gmail-automation')();s
  // require('./gmail')();
  // require('./yahoo')();
});

process.env.DEBUG = "pw:browser*";

schedule.scheduleJob("20 * * * *", function () {
  //initTask();
});

// const initTask = async function () {
//   for (let bkCount = 0; bkCount < config.backlinks.length; bkCount++) {
//     const proxyUrlArr = config.proxyList[bkCount].split(":");
//     proxyUrl = `http://${proxyUrlArr[2]}:${proxyUrlArr[3]}@${proxyUrlArr[0]}:${proxyUrlArr[1]}`;
//     console.log("--proxyUrlArr--", proxyUrlArr, proxyUrl)
//     performTask({
//       backLinkUrl: config.backlinks[bkCount],
//       proxyUrl
//     })
//     await delay(1000 * 10);
//     await checkCpuAndDelay();
//   }
// }

process.on("unhandledRejection", (error) => {
  // Will print "unhandledRejection err is not defined"
  console.log("unhandledRejection", error.message);
});

process.on("uncaughtException", (error) => {
  // Will print "unhandledRejection err is not defined"
  console.log("uncaughtException", error.message);
});

process.on("exit", (code) => {
  console.log(`About to exit with code: ${code}`);
});

process.on("SIGKILL", function (code) {
  console.log("SIGKILL received...", code);
});

process.once("SIGINT", function (code) {
  console.log("SIGINT received...", code);
});

// vs.

process.once("SIGTERM", function (code) {
  console.log("SIGTERM received...", code);
});

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

module.exports = app;
