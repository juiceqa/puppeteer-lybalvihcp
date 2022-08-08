const puppeteer = require("puppeteer");
const fs = require("fs");
const URL = process.env.URL || 'https://stagelybhcp_auth:P6%260erUu@stage.lybalvihcp.com/';

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
    const content = await page.evaluate(() => {
        let data = [];
        let elements = document.querySelectorAll(":any-link");
        elements.forEach((element) => {
            let href = element.href;
            data.push("a[href=" + "\'" + href + "\'" + "]");
        })
        let buttons = document.querySelectorAll(":enabled")
        buttons.forEach((button) => {
            let id = "#" + button.id;
            data.push(id);
        })
        uniq = [...new Set(data)];
        return uniq;
    })
    const jsonData = JSON.stringify(content);
    fs.writeFileSync("hrefs.json", jsonData);

    await browser.close();
})();