const Insert = require("./Insert.js")

describe("#parse", () => {
    describe("With incorrect input regex", () => {
        describe("Without INSERT", () => {
            test("it will return null", () => {
                const input = `{ "a": 1 } FROM w`
                expect(Insert.parse(input)).toBeUndefined()
            })

        })
        describe("Without FROM", () => {
            test("it will return null", () => {
                const input = `SELECT { "a": 1 } w`
                expect(Insert.parse(input)).toBeUndefined()
            })

        })

    })

    describe("With correct record", () => {
        test("it will return the correct data", () => {
            const input = `INSERT { "a": 1 } INTO w`
            const result = Insert.parse(input)
            const expectedRecord = { "a" : 1 }
            expect(result.record).toStrictEqual(expectedRecord)
        })
    })
    
    describe("With correct table", () => {
        test("it will return the correct table", () => {
            const input = `INSERT { "a": 1 } INTO w`
            const result = Insert.parse(input)
            const expectedTable = "w"
            expect(result.table.tableName).toStrictEqual(expectedTable)
        })
    })
    
    describe("With incorrect record", () => {
        test("it will return null", () => {
            const input = `INSERT { a: 1 } INTO w`
            expect(Insert.parse(input)).toBeUndefined()

        })
    })
    
    describe("With no table name", () => {
        test("it will return null", () => {
            const input = `INSERT { a: 1 } INTO`
            expect(Insert.parse(input)).toBeUndefined()

        })
    })
})