import { NUMBER_FORMATTER } from "./utility.js"

export default class Calculator {
  get primaryOperandData() {
    return this.primaryOperandDisplay.dataset.number
  }

  set primaryOperandData(value) {
    this.primaryOperandDisplay.dataset.number = value
  }

  get secondaryOperandData() {
    return this.secondaryOperandDisplay.dataset
  }

  set secondaryOperandData(value) {
    this.secondaryOperandDisplay.dataset.number = value
  }

  constructor(primaryOperandDisplay, secondaryOperandDisplay) {
    this.primaryOperandDisplay = primaryOperandDisplay
    this.secondaryOperandDisplay = secondaryOperandDisplay
  }

  checkCommas(number) {
    if (number.includes(".")) {
      const [integer, decimals] = number.split(".")
      const completeNumber = `${integer}.${decimals}`
      return completeNumber
    }
    return false
  }

  display(number) {
    const formattedNumber = NUMBER_FORMATTER.format(number)
    this.primaryOperandDisplay.textContent = formattedNumber
  }

  displayNumber(number) {
    //when hit 0, make sure the dataset does not contain 0 /
    if (this.primaryOperandData === "0") {
      this.primaryOperandData = ""
    }
    if (!this.primaryOperandData) {
      this.primaryOperandData = number
    } else {
      const isDecimalNumber = this.checkCommas(this.primaryOperandData)
      if (!isDecimalNumber) {
        this.primaryOperandData = this.primaryOperandData + number
        this.display(this.primaryOperandData + number)
      } else {
        if (number !== ".") {
          this.primaryOperandData = this.primaryOperandData + number
          this.display(isDecimalNumber + number)
          return
        }
      }
    }

    const formattedNumber = NUMBER_FORMATTER.format(this.primaryOperandData)
    this.primaryOperandDisplay.textContent = formattedNumber
  }

  performOperation(operation = "=") {
    //add the operation in the number
    //add the operation in the second display
    //checks if secondary display has any numbers, if yes, then get the current number and perform operation with the number in the
    //second display
    //when clicking other operations, it will become 0
    //how do i check if the operations is clicked twice, without the number is clicked
    if (operation === "=") {
      const number = eval(
        this.secondaryOperandData.number +
          this.secondaryOperandData.operation +
          this.primaryOperandData
      )
      const formattedNumber = NUMBER_FORMATTER.format(number)
      this.primaryOperandDisplay.textContent = formattedNumber
      this.secondaryOperandData = 0
      this.primaryOperandData = number
      this.secondaryOperandDisplay.textContent = null
    } else if (this.secondaryOperandDisplay.textContent != "") {
      const number = eval(
        this.secondaryOperandData.number +
          this.secondaryOperandData.operation +
          this.primaryOperandData
      )
      const formattedNumber = NUMBER_FORMATTER.format(number)
      this.secondaryOperandData.number = number
      this.secondaryOperandData.operation = operation
      this.secondaryOperandDisplay.textContent = `${formattedNumber} ${operation}`
      this.primaryOperandData = 0
    } else {
      const formattedNumber = NUMBER_FORMATTER.format(this.primaryOperandData)
      this.secondaryOperandDisplay.dataset.number = this.primaryOperandData
      this.secondaryOperandDisplay.dataset.operation = operation
      this.secondaryOperandDisplay.textContent = `${formattedNumber} ${operation}`
      this.primaryOperandData = 0
      this.display(0)
    }
  }

  allClear() {
    this.primaryOperandData = 0
    this.displayNumber(0)
  }

  deleteNumber() {
    this.primaryOperandData = this.primaryOperandData.substring(
      0,
      this.primaryOperandData.length - 1
    )
    this.display(this.primaryOperandData)
  }
}
