const insert = require('./parse/Insert.js')
const readline = require("readline")
const {parseCommand} = require("./parseCommand.js")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function main() {
    while(true) {
        try {
            const answer = await AskInput()
            console.log(await parseCommand(answer))
        } catch (e) {
            console.error(`${e.name}: ${e.message}`)
        }
    }
}

main()

function AskInput() {
    return new Promise((resolve) => {
        rl.question("> ", resolve)
    })
}