const Table = require("../Table.js")

class DeleteCommand {
    constructor(tableName) {
        this.table = new Table.Table(tableName)
    }

    async perform(whereCommand) {
        const originalData = await this.table.readFile()
        let filteredData = originalData
        if (whereCommand) filteredData = whereCommand.perform(originalData)
        const updatedRecords = []
        const newData = originalData.filter(record => {
            return !filteredData.includes(record)
        })

        await this.table.writeFile(newData)
        return newData
    }
}

module.exports = {
    DeleteCommand
}