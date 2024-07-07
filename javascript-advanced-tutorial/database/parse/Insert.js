/* 
1) Get input
2) Create table
3) Insert new data
*/
const insertCommand = require("../command/InsertCommand.js")

const INSERT_REGEX = new RegExp(`INSERT\\s+(?<record>{.*})\\s+INTO\\s+(?<table>\\S+)`)

function parse(input) {

    const insertMatches = input.match(INSERT_REGEX)

    if (!insertMatches) return 
    const record = parseJSON(insertMatches.groups.record)
    if (record == null) return
    
    const tableName = insertMatches.groups.table
    return new insertCommand.InsertCommand({record, tableName})
}

function parseJSON(input) {
    try {
        return JSON.parse(input)
    } catch (Exception) {
        return
    }
}

module.exports = {
    parse
}