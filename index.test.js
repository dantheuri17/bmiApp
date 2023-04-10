const {calcBMI} = require('./index')
const puppeteer = require("puppeteer");
const {server} = require('./index')

afterAll(() => {
    server.close()
})

test("1.7 weight, 70 height", () => {
    expect(calcBMI(1.7, 70)).toBe(24.221453287197235)
})

test("100 weight, 1 height", () => {
    expect(calcBMI(1, 100)).toBe(100)
})


jest.setTimeout(90000);

describe("BMI Calculator", () => {
	let browser;
	let page;

	beforeAll(async () => {
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.goto("http://localhost:3000/");
	});

	afterAll(async () => {
		await browser.close();
	});

	test("Calculates BMI correctly", async () => {
		await page.waitForSelector("#height");
		await page.type("#height", "1.8");
		await page.type("#weight", "75");
		await page.click('#submitBtn');
		await page.waitForSelector("#bmiResult");
		const bmi = await page.$eval("#bmiResult", (el) => el.innerText);
		expect(bmi).toBeCloseTo("23.15");
	});

	test("Displays BMI status correctly", async () => {
		await page.waitForSelector("#height");
		await page.type("#height", "1.7");
		await page.type("#weight", "90");
		await page.click('#submitBtn');
		await page.waitForSelector("#bmiStatus");
		const status = await page.$eval("#bmiStatus", (el) => el.innerText);
		expect(status).toBe("Obese");
	});

	test("Displays BMI report correctly", async () => {
		await page.goto("http://localhost:3000/reports");
		await page.waitForSelector("table");
		const rows = await page.$$eval("table tr", (trs) => trs.length);
		expect(rows).toBe(3); // header row + 2 records
	});
});
