const where = require("./Where.js")
const InvalidWhereError = require("../error/InvalidWhereError.js")
const mock = require("mock-fs")

describe("#parse", () => {
    beforeEach(() => {
        mock({ data: { "table.json": JSON.stringify({a: 1})}})
    })
    describe("If the input does not have WHERE", () => {
        test("It will return null", () => {
            
            const input = "SELECT * FROM table"
            expect(where.parse(input) === undefined).toBeTruthy()
        })

    })

    describe("If the input have WHERE", () => {
        describe("If the values after WHERE are { 'a' : 1 }", () => {
            test("It returns the correct data", () => {
                const input = `SELECT * FROM w WHERE { "a" : 1 }`
                expect(where.parse(input).conditions).toEqual({ "a" : 1 })
            })
        })
        
        describe("If the values after WHERE are 'a = 1' ", () => {
            test("It returns InvalidWhereError", () => {
                const input = "SELECT * FROM w WHERE { a : 1 }"
                const error = new InvalidWhereError(input)
                try {
                    where.parse(input)
                } catch (e) {
                    expect(`${e.name}: ${e.message}`).toThrow(`${error.name}: ${error.message}`)
                }
            })
        })
        
     
    })
})