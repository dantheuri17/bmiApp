const {calcBMI, getStatus} = require('./index')

test("100 weight, 1 height", () => {
    expect(calcBMI(1, 100).toBe(100))
})

