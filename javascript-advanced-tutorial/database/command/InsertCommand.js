const Table = require("../Table.js")

class InsertCommand {
    constructor({record, tableName}) {
        this.record = record
        this.table = new Table.Table(tableName)
    }

    async perform() {
        return await this.table.insertRecord(this.record)
    }
}

module.exports = {
    InsertCommand
}