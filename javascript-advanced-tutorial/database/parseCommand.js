const InsertParser = require("./parse/Insert.js")
const SelectParser = require("./parse/Select.js")
const WhereParser = require("./parse/Where.js")
const DeleteParser = require("./parse/Delete.js")
const UpdateParser = require("./parse/Update.js")
const {InvalidCommandError} = require("./error/InvalidCommandError.js")
const InvalidWhereError = require("./error/InvalidWhereError.js")

const parserList = [InsertParser, SelectParser, UpdateParser, DeleteParser]

async function parseCommand(input) {
    //get input, and see if returns any object or not
    //if it doesnt, just return error
    //if it does, then just run the perform function()

    const command = parserList.map(parser => parser.parse(input)).find(command => command !== undefined);
    if (command == null) throw new InvalidCommandError(input)
    
    let whereCommand = WhereParser.parse(input)
    
    if (whereCommand && whereCommand instanceof InvalidWhereError) throw new InvalidWhereError(input)

    return await command.perform(whereCommand);
}

module.exports = {
    parseCommand
}