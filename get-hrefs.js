const puppeteer = require("puppeteer");
const URL = process.env.URL || 'https://stagelybhcp_auth:P6%260erUu@stage.lybalvihcp.com/';

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
    const url = await page.$eval("a", (el) => el.href);
    console.log(url);
    await browser.close();
})();