const DeleteParser = require("./Delete.js")

describe("#parse", () => {
    describe(`When parse without DELETE`, () => {
        const input = "FROM test"
        test("It will return undefined", () => {
            expect(DeleteParser.parse(input)).toBeUndefined()
        })
    })

    describe(`When parse without FROM`, () => {
        const input = "DELETE test"
        test("It will return undefined", () => {
            expect(DeleteParser.parse(input)).toBeUndefined()
        })
    })
    
    describe(`When parse with table name`, () => {
        const input = "DELETE FROM test"
        test("It will return the table name", () => {
            expect(DeleteParser.parse(input).table.tableName).toBe("test")
        })
    })
    
    describe(`When parse without table name`, () => {
        const input = "DELETE FROM"
        test("It will return error", () => {
            expect(DeleteParser.parse(input)).toBeUndefined()
        })
    })
})