const {InsertCommand} = require('./InsertCommand.js')
const {whereCommand} = require("./whereCommand.js")
const {SelectCommand} = require("./SelectCommand.js")
const UpdateCommand = require("./UpdateCommand.js")
const {DeleteCommand} = require("./DeleteCommand.js")
const { v4: uuidv4 } = require("uuid")
const mock = require("mock-fs")

describe("#SelectCommand", () => {
    const dataset = [
        { a: 1, b: 2},
        { a: 3, b: 4}
    ]

    describe("When parse 'SELECT * FROM testTable", () => {
        const _SelectCommand = new SelectCommand({
            allColumn: true
        })

        
        test("It will return all data", async () => {
            
            const spy = jest.spyOn(_SelectCommand.table, "readFile").mockResolvedValue(dataset)
            expect(await _SelectCommand.perform()).toIncludeSameMembers(dataset)
            expect(spy).toHaveBeenCalled()  

            spy.mockRestore()
        })
    })

    describe("When parse 'SELECT a FROM testTable", () => {
        const _SelectCommand = new SelectCommand({
            
            column: ["a"]
        })

        test("It will return data", async () => {
            const spy = jest.spyOn(_SelectCommand.table, "readFile").mockResolvedValue(dataset)
            expect(await _SelectCommand.perform()).toIncludeSameMembers([{ a: 1}, {a: 3}])
            expect(spy).toHaveBeenCalled()

            spy.mockRestore()
        })
    })

    describe(`When parse 'SELECT a FROM testTable WHERE { "a" : 1 }'`, () => {
        
        const _SelectCommand = new SelectCommand({
            
            column: ["a"]
        })

        const _whereCommand = { perform: data => [data[0], data[1]]}

        test("It will return data", async () => {
            const spy = jest.spyOn(_SelectCommand.table, "readFile").mockResolvedValue(dataset)
            expect(await _SelectCommand.perform(_whereCommand)).toIncludeSameMembers([{ a: 1}, {a: 3}])
            expect(spy).toHaveBeenCalled()

            spy.mockRestore()
        })
    })
    
})

describe("#InsertCommand", () => {
    describe(`When parse 'INSERT {"a": 1} INTO testTable'`, () => {
        const insertedRecord = { "a": 1 }
        const command = new InsertCommand({record: insertedRecord})
        test("It will return the inserted record", async () => {
            const spy = jest.spyOn(command.table, "insertRecord").mockResolvedValue()
            await command.perform()
            expect(spy).toHaveBeenCalledWith(command.record)
            spy.mockRestore()
        })
    })
})

describe("#UpdateCommand", () => {
    const originalRecords = [{ "a": 1, "b": 2 }, {"a": 2, "c": 4}, {"b": 5, "e": 10}]
    const updatedRecords = [{ "a": 10, "b": 2 }, {"a": 10, "c": 4}, {"a": 10, "b": 5, "e": 10}]
    const updatedRecordsWithWhere = [{ "a": 10, "b": 2 }]

    const _UpdateCommand = new UpdateCommand({
        columns: {"a": 10}
    })
    const _WhereCommand = new whereCommand({"a": 1}) 
    describe(`When parse 'UPDATE {"a": 1} IN testTable`, () => {
        test("It will return updated record", async () => {
            const spy = jest.spyOn(_UpdateCommand.table, "readFile").mockResolvedValue(originalRecords)
            expect(await _UpdateCommand.perform()).toIncludeSameMembers(updatedRecords)
            expect(spy).toHaveBeenCalled()
            spy.mockRestore()
        })
    })
    
    describe(`When parse 'UPDATE {"a": 2} IN testTable WHERE { "a": 1 }`, () => {
        test("It will return updated record", async () => {
            const spy = jest.spyOn(_UpdateCommand.table, "readFile").mockResolvedValue(originalRecords)
            expect(await _UpdateCommand.perform(_WhereCommand)).toIncludeSameMembers(updatedRecordsWithWhere)
            expect(spy).toHaveBeenCalled()
            spy.mockRestore()
        })
    })
})

describe("#DeleteCommand", () => {
    const originalRecords = [{ "a": 1, "b": 2 }, {"a": 2, "c": 4}, {"b": 5, "e": 10}]
    const deletedRecords = []
    const deletedRecordsWithWhere = [{"a": 2, "c": 4}, {"b": 5, "e": 10}]
    const _deleteCommand = new DeleteCommand()
    const _whereCommand = new whereCommand({"a": 1})
    describe(`When parse "DELETE FROM testTable"`, () => {
        test("It will delete the entire record in testTable", async () => {
            const spy = jest.spyOn(_deleteCommand.table, "readFile").mockResolvedValue(originalRecords)
            expect(await _deleteCommand.perform()).toIncludeSameMembers(deletedRecords)
            expect(spy).toHaveBeenCalled()
            spy.mockRestore()
        })
    })

    describe(`When parse "DELETE FROM testTable WHERE {"a": 1}`, () => {
        test(`It will delete the specific data with the key {"a": 1}`, async () => {
            const spy = jest.spyOn(_deleteCommand.table, "readFile").mockResolvedValue(originalRecords)
            expect(await _deleteCommand.perform(_whereCommand)).toIncludeSameMembers(deletedRecordsWithWhere)
            expect(spy).toHaveBeenCalled()
            spy.mockRestore()
        })
    })
})