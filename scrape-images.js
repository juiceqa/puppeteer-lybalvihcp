const puppeteer = require('puppeteer')
const axios = require('axios')
const fs = require('fs')

;
(async() => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://stagelybhcp_auth:P6%260erUu@stage.lybalvihcp.com/')
    const url = await page.$eval('img', (el) => el.src)

    const response = await axios.get(url)
    fs.writeFileSync('scraped-image.svg', response.data)

    await browser.close()
})()