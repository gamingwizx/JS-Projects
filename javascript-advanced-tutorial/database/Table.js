const fs = require("fs")
const { TableDoesNotExistError } = require("./error/TableDoesNotExistError.js")
const { v4 : uuidV4 } = require("uuid")

class Table {
    constructor(tableName) {
        this.tableName = tableName
    }

    get filePath() {
        return `./data/${this.tableName}.json`
    }

    async insertRecord(record) {
        const uuid = uuidV4()
        const newRecordWithId = { _id: uuid, ...record}
        return new Promise(async (resolve, reject) => {
            await this.readFile()
            .catch((e) => {
                if (e instanceof TableDoesNotExistError) {
                    return []
                } else {
                    reject(e)
                }
            }).then(async (response) => {
                const result = await this.writeFile([ newRecordWithId, ...response])
                resolve(result)
            })
        })
    }

    async readFile() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, (error, data) => {
                if (error) return reject(new TableDoesNotExistError(this.tableName))
                resolve(JSON.parse(data))
            })
        }) 
    }

    async writeFile(data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.filePath, JSON.stringify(data) , (error) => {
                if (error) reject(error)
                resolve(data)
            })
        })
    }
}

module.exports = {
    Table
}

