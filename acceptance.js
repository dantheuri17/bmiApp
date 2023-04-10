const puppeteer = require("puppeteer");
const assert = require ("assert");

try {
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://bmiapp.onrender.com");
        await page.waitForSelector("#height");
        await page.type("#height", "1.8");
        await page.type("#weight", "75");
        await page.click('#submitBtn');
        await page.waitForSelector("#bmiResult");
        const bmi = await page.$eval("#bmiResult", (el) => el.innerText);
        assert.equal(bmi, "Based on your height and weight, your BMI is 23.15");

        await page.waitForSelector("#bmiStatus");
        const status = await page.$eval("#bmiStatus", (el) => el.innerText);
        assert.equal(status, "This BMI suggests that your weight is within the Normal range for your height.");

        console.log('Test passed')
        await browser.close();

})();
} catch (error) {
    console.log(error);
}
