const puppeteer = require("puppeteer");
const fs = require("fs");
const URL = process.env.URL || 'https://test-trudhesahcp.pantheonsite.io/';
(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
    const url = await page.$eval("a", (el) => el.href);
    console.log(url);
    await browser.close();
})();