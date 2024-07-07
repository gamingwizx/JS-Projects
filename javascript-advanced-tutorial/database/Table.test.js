const fs = require("fs")
const mock = require("mock-fs")
const TableDoesNotExistError = require("./error/TableDoesNotExistError.js")
const Table = require("./Table.js")

const record = { response: {a: 1}}
const data = [{a:1, b:2}]
const tableName = "table"

describe("#readFile", () => {
  describe("When table does not exist", () => {
      beforeEach(() => mock({ data: {} }))
      afterEach(mock.restore)
      test("It throws TableDoesNotExistError", async () => {
        const table = new Table.Table(tableName)
        await expect(table.readFile()).rejects.toThrow(TableDoesNotExistError.TableDoesNotExistError)
      })
  })
  
  describe("When table exists", () => {
      const data = [{a: 1, b: 2}]
      beforeEach(() => mock({ data: { "table.json": JSON.stringify(data) } }))
      afterEach(mock.restore)

      test("It gets the data in the table", async () => {
        const table = new Table.Table(tableName)
        expect(await table.readFile()).toIncludeSameMembers(data)
      })
  })
})

describe("#insertRecord", () => {
  describe("When no existing table", () => {
    const data = {a:1, b: 2}
    beforeEach(() => mock({ data: {} }))
    afterEach(mock.restore)
    test("Creates new table, and inserts record into table", async () => {

      const table = new Table.Table(tableName)
      
      const [{ _id, ...newRecord }] = await table.insertRecord(data)
      
      expect(JSON.parse(fs.readFileSync("data/table.json"))).toIncludeSameMembers([{ _id, ...newRecord}])
      expect(_id).toBeDefined()
      expect(newRecord).toStrictEqual(data)
    })
  })
  
  describe("When readFile error", () => {
    const table = new Table.Table("test")
    const spy = jest.spyOn(table, "insertRecord").mockRejectedValueOnce(() => {
      throw new Error("Error")
    })
    test("It will throw error", async () => {
      await expect(table.insertRecord(record)).rejects.toThrow("Error")
    })
  })
  
})
