const select = require("./Select.js")
const mock = require("mock-fs")
describe("#parse", () => {
    const data = { a: "1" }
    beforeEach(() => 
        mock({ data: {" testTable.json": data}})
    )
    afterEach(mock.restore)

    describe("When parse all columns into SELECT", () => {
        const tableName = "testTable"
        test("returns SelectCommand properly, with the right column, allColumn and tableName", () => {
            const selectQuery = `SELECT * FROM ${tableName}`
            const parse = select.parse(selectQuery)
            expect(parse.table.tableName).toBe(tableName)
            expect(parse.allColumn).toBeTruthy()
        })

        describe("When parse specific columns into SELECT", () => {
            test("Returns the SelectCommand, with the right column, allColumn and tableName", () => {
                const selectQuery = `SELECT a,b FROM ${tableName}`
                const parse = select.parse(selectQuery)
                expect(parse.table.tableName).toBe(tableName)
                expect(parse.allColumn).toBeFalsy()
                expect(parse.column).toIncludeSameMembers(["a", "b"])
            })
        })
        
    })

})