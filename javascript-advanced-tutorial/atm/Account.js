//allow users to view balance
//allow users to deposit
//ask user how much to deposit
//able to modify the bank balance
//allow users to withdraw
//ask user how much to withdraw
//able to modify the bank balance
//edge cases

const FileSystem = require("./FileSystem.js")
const fs = require("fs")

module.exports = class Account {
  constructor(name) {
    this.#name = name
  }

  #name
  get name() {
    return this.name
  }

  #balance
  get balance() {
    return this.#balance
  }

  set balance(value) {
    this.#balance = value
  }

  get filePath() {
    return `accounts/${this.#name}.txt`
  }

  //view balance
  async balance() {
    //read the file
    //return the number in the file
    const balance = await FileSystem.read(this.filePath)
    return balance
  }

  async depositMoney(account, amount) {
    let balance = await FileSystem.read(account.filePath)
    balance = parseInt(balance)
    balance += parseInt(amount)
    await FileSystem.write(account.filePath, balance)
    return
  }

  async withdrawMoney(account, amount) {
    let balance = await FileSystem.read(this.filePath)
    balance -= amount
    await FileSystem.write(account.filePath, balance)
    return
  }

  static async createAccount(name) {
    try {
      const account = new Account(name)
      await FileSystem.write(account.filePath, 0)
      account.#balance = 0
      return account
    } catch (ex) {
      console.log("Something went wrong")
    }
  }

  async #load() {
    this.#balance = parseFloat(await FileSystem.read(this.filePath))
  }

  static async find(accountName) {
    const account = new Account(accountName, 0)
    try {
      await account.#load()
      account.#name = accountName
      return account
    } catch (err) {
      return
    }
  }

  view() {
    return this.name
  }

  withdraw(amount) {
    this.balance - amount
  }

  deposit(amount) {
    this.balance + amount
  }
}
