/* 
1) Get input
2) Create table
3) Insert new data
*/
const {SelectCommand} = require("../command/SelectCommand.js")

const SELECT_EVERYTHING = "*"
const SELECT_REGEX = new RegExp(`SELECT\\s+(?<record>.*)\\s+FROM\\s+(?<table>\\S+)`)

function parse(input) {

    const insertMatches = input.match(SELECT_REGEX)
    
    if (!insertMatches) return 
    const record = insertMatches.groups.record
    const tableName = insertMatches.groups.table
    if (tableName == null) return 

    const column = record.replace(/\s/, "").split(",").filter(column => column !== "")

    if (column.length == 0) return
    const selectCommand = new SelectCommand({column, allColumn: column.includes(SELECT_EVERYTHING), tableName})
    
    return selectCommand
}

module.exports = {
    parse
}