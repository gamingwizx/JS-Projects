const UpdateParser = require("./Update.js")

describe("#parse", () => {
    const record = [{"a": 1, "b": 2}, {"c": 3, "d": 4}, {"a": 2, "b": 4}]
    const updatedRecordWhere = [{"a": 1, "b": 4}]
    describe(`When parse without UPDATE`, () => {
        const input = "IN test"
        test("It will return undefined", () => {
            expect(UpdateParser.parse(input)).toBeUndefined()
        })
    })

    describe(`When parse without IN`, () => {
        const input = "UPDATE test"
        test("It will return undefined", () => {
            expect(UpdateParser.parse(input)).toBeUndefined()
        })
    })
    
    describe(`When parse UPDATE and IN, but without conditions`, () => {
        const input = "UPDATE IN test"
        test("It will return undefined", () => {
            expect(UpdateParser.parse(input)).toBeUndefined()
        })
    })
    
    describe(`When parse UPDATE and IN, and with conditions`, () => {
        const input = `UPDATE {"a":1} IN e`
        test("It will add the record with a:1 in all data", () => {
            expect(UpdateParser.parse(input).columns).toStrictEqual({"a": 1})
            expect(UpdateParser.parse(input).table.tableName).toBe("e")
        })
    })
})