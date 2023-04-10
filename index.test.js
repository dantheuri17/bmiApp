const {calcBMI} = require('./index')
const puppeteer = require("puppeteer");
const {server} = require('./index')

afterAll(() => {
    server.close()
})

test("1.7 weight, 70 height", () => {
    expect(calcBMI(1.7, 70)).toBe(24.22)
})

test("100 weight, 1 height", () => {
    expect(calcBMI(1, 100)).toBe(100)
})

