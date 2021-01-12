const puppeteer = require('puppeteer');

let browser, page;

const Translator = {
    async initialize() {
        browser = await puppeteer.launch({
            headless: true,
        });
        page = await browser.newPage();
    },
    async translateText(language, text) {
        await page.goto('https://translate.google.com/');

        await page.click('button[aria-label="More target languages"]');

        await page.waitForSelector('input[aria-label="Search languages"]');

        setTimeout(() => {}, 500);

        await page.type('input[aria-label="Search languages"]', language, { delay: 100 });
        await page.keyboard.press('Enter');

        await page.click('textarea[aria-label="Source text"]');
        await page.type('textarea[aria-label="Source text"]', text, { delay: 100 });

        await page.waitForSelector('span[data-language-to-translate-into] > span');
        const translatedText = await page.$eval('span[data-language-to-translate-into] > span', e => e.innerHTML);
        
        return translatedText;
    }
}

module.exports = Translator;