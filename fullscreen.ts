import { ElementHandle } from "puppeteer";
const puppeteer = require('puppeteer');
const url = "https://www.contentsquare.com/";
let browser = await puppeteer.launch({ headless: true });
let page = await browser.newPage();
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
async function getFixedElements(frame: ElementHandle): Promise < FixedElement[] > {
    return frame.evaluate(() => {
        const fixedElements: FixedElement[] = [];
        const allElements = document.querySelectorAll('*');
        for (let i = 0; i < allElements.length; i++) {
            const elementStyle = getComputedStyle(allElements[i]);
            if (elementStyle.position === 'fixed' || elementStyle.position === 'sticky') {
                const {
                    top
                } = allElements[i].getBoundingClientRect();
                fixedElements.push({
                    elementIndex: i,
                    defaultDisplay: elementStyle.display,
                    topPosition: top,
                });
            }
        }
        return fixedElements;
    });
}
const fixedElements = await getFixedElements(frame);
const footerFixedElements = fixedElements.filter(element => element.topPosition >= viewport.height * 0.7);
async function toggleFixedElementsDisplay(
    frame: ElementHandle,
    fixedElements: FixedElement[],
    showFixedElements: boolean,
): Promise < void > {
    return frame.evaluate(
        (_, {
            fixedElements,
            showFixedElements
        }) => {
            const allElements = document.querySelectorAll('*');
            fixedElements.forEach((fixedElement: FixedElement) => {
                (allElements[fixedElement.elementIndex] as HTMLElement).setAttribute(
                    'style',
                    `display: ${showFixedElements ? fixedElement.defaultDisplay : 'none !important'}`,
                );
            });
            return;
        },
        ({
            fixedElements,
            showFixedElements
        })
    );
}
await toggleFixedElementsDisplay(frame, footerFixedElements, false);