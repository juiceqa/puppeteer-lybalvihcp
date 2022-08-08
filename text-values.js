const puppeteer = require("puppeteer");
const fs = require("fs");
var stringify = require('csv-stringify');

const URL = process.env.URL || 'https://stagelybhcp_auth:P6%260erUu@stage.lybalvihcp.com/';

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
    const categories = await page.$$eval('head > meta', (nodes) =>
        nodes.push((n) => [n.getAttribute('property') || n.getAttribute('name'), n.getAttribute('content')])
    );
    console.log(categories);
    await browser.close();
})();