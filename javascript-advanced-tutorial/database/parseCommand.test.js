const {InvalidCommandError} = require("./error/InvalidCommandError")
const {parseCommand} = require("./parseCommand.js")
const mock = require("mock-fs")

describe("#parseCommand", () => {
    describe("When enter invalid command", () => {
        const input = "invalid command test"
        test("Returns InvalidCommandError", async () => {
            await expect(parseCommand(input)).rejects.toThrow(new InvalidCommandError(input))
        })
    })

    describe("When enter a command", () => {
        beforeEach(() => {
            mock( {data: {} } )
        })
        afterEach(mock.restore)
        describe(`When enter 'INSERT {"a":1} INTO testTable'`, () => {
            const data = {"a":1}
            const input = `INSERT {"a":1} INTO testTable`
            test("Returns the record", async () => {
                const [{_id, ...recordInserted}] = await parseCommand(input)
                expect(_id).toBeDefined()
                expect(recordInserted).toStrictEqual(data)

            })
        })
        describe("When enter 'INSERT {a:1} INTO testTable", () => {
            test("Returns InvalidCommandError", async () => {
                const input = `INSERT {a:1} INTO testTable`
                await expect(parseCommand(input)).rejects.toThrow(new InvalidCommandError(input))
                //run the command
                //expect and toBe the result
            })
        })
        describe("When enter '{'a':1} INTO testTable", () => {
            test("Returns InvalidCommandError", async () => {
                const input = `INSERT {'a':1} INTO testTable`
                await expect(parseCommand(input)).rejects.toThrow(new InvalidCommandError(input))
                //run the command
                //expect and toBe the result
            })
        })
        describe("When enter 'INSERT {'a':1} INTO", () => {
            test("Returns InvalidCommandError", async () => {
                const input = `INSERT {a:1} INTO`
                await expect(parseCommand(input)).rejects.toThrow(new InvalidCommandError(input))
                //run the command
                //expect and toBe the result
            })
        })
        describe("When enter 'INSERT {'a':1} testTable", () => {
            test("Returns InvalidCommandError", async () => {
                const input = `INSERT {a:1} testTable`
                await expect(parseCommand(input)).rejects.toThrow(new InvalidCommandError(input))
                //run the command
                //expect and toBe the result
            })
        })
    })
})