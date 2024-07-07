const safeParseJSON = require("../utils/safeParseJSON.js")
const {DeleteCommand} = require("../command/DeleteCommand.js")

const REGEX_DELETE = new RegExp(`DELETE\\s+FROM\\s+(?<tableName>\\S+)`)

function parse(input) {
    const deleteMatches = input.match(REGEX_DELETE)

    if (deleteMatches == null) return
    
    const tableName = deleteMatches.groups.tableName

    return new DeleteCommand(tableName)

    
}

module.exports = {
    parse
}