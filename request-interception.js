const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setViewport({ width: 1200, height: 800 })

    await page.setRequestInterception(true)

    page.on('request', (request) => {
        console.log('>>', request.method(), request.url(), request.headers())
        request.continue()
    })

    page.on('response', (response) => {
        console.log('<<', response.status(), response.url(), response.headers())
    })

    await page.goto('https://stagelybhcp_auth:P6%260erUu@stage.lybalvihcp.com/')

    await page.screenshot({ path: 'lybalvihcpstaging.png' })

    await browser.close()
})()