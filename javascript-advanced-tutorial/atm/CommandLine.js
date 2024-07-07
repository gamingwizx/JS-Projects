const readline = require("readline")
const account = require("./Account.js")

const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout
})

module.exports = {
  async ask(question) {
    return new Promise((resolve, reject) => {
      rl.question(question, (answer) => {
        resolve(answer)
      })
    })
  }
}
