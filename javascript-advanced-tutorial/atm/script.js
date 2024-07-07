/* 
1. Ask for account
2. If account does not exist ask to create account
3. Ask what they want to do
4. Execute command
    a. View
    b. Withdraw
    c. Deposit
*/

const Account = require("./Account.js")
const readline = require("readline")
const CommandLine = require("./CommandLine.js")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

async function main() {
  try {
    const answer = await CommandLine.ask("What is your account number? ")
    let account = await Account.find(answer)

    if (account) {
      promptResponse(account)
    } else {
      account = await createAccount(answer)
      promptResponse(account)
    }
  } catch (Exception) {
    console.log(Exception)
  }
}

async function createAccount(account) {
  const answer = await CommandLine.ask("Do you want to create a new account?")
  if (answer === "yes") {
    return await Account.createAccount(account)
  }

  return
}

async function promptResponse(account) {
  const response = await CommandLine.ask(
    "What are your next action (view/deposit/withdraw): "
  )
  if (response === "view") {
    const balance = await account.balance()
    console.log("The balance amount is: " + balance)
    await promptResponse(account)
  }
  if (response === "deposit") {
    account = await deposit(account)
    await promptResponse(account)
  }
  if (response === "withdraw") {
    account = await withdraw(account)
    await promptResponse(account)
  }
}

async function withdraw(account) {
  try {
    const response = await CommandLine.ask(
      "How much do you want to withdraw?: "
    )
    await account.withdrawMoney(account, response)
    return account
  } catch (ex) {
    console.log(ex)
  }
}

async function deposit(account) {
  try {
    const response = await CommandLine.ask("How much do you want to deposit?: ")
    await account.depositMoney(account, response)
    return account
  } catch (ex) {
    console.log(ex)
  }
}

main()
