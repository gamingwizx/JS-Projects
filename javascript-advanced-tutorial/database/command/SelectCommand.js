const {Table} = require("../Table.js")
const pick = require("lodash/pick")

class SelectCommand {
    constructor({column, allColumn, tableName}) {
        this.column = column
        this.allColumn = allColumn
        this.table = new Table(tableName)
    }

    async perform(whereCommand) {
        let data = await this.table.readFile();
        if (whereCommand) data = await whereCommand.perform(data)

        if (this.allColumn) return data

        return data.map(object => {
            return pick(object, this.column)
        })


    }
}

module.exports = {
    SelectCommand
}