const puppeteer = require("puppeteer");
const fs = require("fs");
const URL = process.env.URL || "https://stagelybhcp_auth:P6%260erUu@stage.lybalvihcp.com/";

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
    const content = await page.evaluate(() => {
        let data = [];
        let elements = document.querySelectorAll(":any-link");
        elements.forEach((element) => {
            data.push("#" + element.id || "." + element.className);
        })
        uniq = [...new Set(data)];
        return uniq;
    })
    const jsonData = JSON.stringify(content);
    fs.writeFileSync("elements.json", jsonData);
    await browser.close();
})();