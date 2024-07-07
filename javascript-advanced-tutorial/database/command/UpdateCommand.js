const {Table} = require("../Table.js")

module.exports = class UpdateCommand {
    constructor({columns, tableName}) {
        this.columns = columns
        this.table = new Table(tableName)
    }

    async perform(whereCommand) {
        const originalData = await this.table.readFile()
        let filteredData = originalData
        if (whereCommand) filteredData = whereCommand.perform(originalData)
        const updatedRecords = []
        originalData.map(record => {
            if (filteredData.includes(record)) {
                const newRecord = { ...record, ...this.columns }
                updatedRecords.push(newRecord)
                return newRecord
            }
        })
        
        await this.table.writeFile(updatedRecords)
        return updatedRecords
    }
}