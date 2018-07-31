const puppeteer = require("puppeteer");
const {tryOrDefaultAsync} = require("tryordefault");
const md5 = require("md5");

module.exports = async(urlToGet, loginInfo, options) => {
    const defaultOptions = {headless: true, args: ['--no-sandbox']};
    const runtimeOptions = options ? Object.assign(defaultOptions, options) :
                            defaultOptions;
    
    const browser = await puppeteer.launch(runtimeOptions);
    let directLink = "";
    try {
        const page = await browser.newPage();
        await page.setViewport({width: 1200, height: 600});
        await page.setCookie(
            {name: "user", value: encodeURIComponent(loginInfo.username), domain: "linksvip.net"},
            {name: "pass", value: md5(loginInfo.password), domain: "linksvip.net"},
        );
    
        let maxTry = 5;
    
        while (!directLink && maxTry > 0) {
            await page.goto('http://linksvip.net/?link=' + urlToGet);
            directLink = await tryOrDefaultAsync(
                async () => {
                    await page.waitForSelector("#a_down", {timeout: 20000, visible: true});
                    return await page.$eval("#a_down", el => el.href);
                },
                ""
            );
            if (!directLink) {
                console.log("retry ... " + maxTry);
                maxTry--;
            }
        }
    } catch (e) {
        console.log(e);
    }
    // whatever happen, browser should be closed
    await browser.close();
    return directLink;
};