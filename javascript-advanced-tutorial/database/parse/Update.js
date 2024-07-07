const safeParseJSON = require("../utils/safeParseJSON.js")
const UpdateCommand = require("../command/UpdateCommand.js")

const UPDATE_COMMAND = "UPDATE"
const UPDATE_REGEX = new RegExp(`${UPDATE_COMMAND}\\s+(?<columns>{.*})\\s+IN\\s+(?<tableName>\\S+)`)

function parse(input) {
    const updateMatches = input.match(UPDATE_REGEX)

    if (updateMatches == null) return
    
    const columns = safeParseJSON(updateMatches.groups.columns)
    const tableName = updateMatches.groups.tableName
    if (columns == null) return

    return new UpdateCommand({columns, tableName})

    
}

module.exports = {parse}