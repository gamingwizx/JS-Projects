const select = require("./Select.js")
const safeParseJSON = require("../utils/safeParseJSON.js")
const {whereCommand} = require("../command/whereCommand.js")
const InvalidWhereError = require("../error/InvalidWhereError.js")

const REGEX = new RegExp(`\\s+WHERE\\s+(?<condition>.*)`)


function parse(input) {
        const whereMatches = input.match(REGEX);
        if (!whereMatches) return

        const groupColumns = safeParseJSON(whereMatches.groups.condition)
        
        if (groupColumns == undefined) return new InvalidWhereError(input)


        return new whereCommand(groupColumns)
    }

module.exports = {
    parse
}