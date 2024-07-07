/* 
1) show number when click on numbers
2) able to perform operations
3) able to all clear
4) able to delete the numbers
5) able to calculations
*/

import globalEventListener from "./utility.js"
import Calculator from "./Calculator.js"

const secondaryOperand = document.querySelector(".secondary-operand")
const primaryOperand = document.querySelector(".primary-operand")

const calculator = new Calculator(primaryOperand, secondaryOperand)
globalEventListener("click", "[data-number]", function (e) {
  //show the number on the calculator text
  //if the number is greater than 3 digits, add comma in front everytime

  calculator.displayNumber(e.target.innerHTML)
})

globalEventListener("click", "[data-all-clear]", function (e) {
  calculator.allClear()
})

globalEventListener("click", "[data-delete]", function (e) {
  calculator.deleteNumber()
})

globalEventListener("click", "[data-operation]", function (e) {
  const operation = e.target.textContent
  calculator.performOperation(operation)
})

globalEventListener("click", "[data-equals]", function (e) {
  calculator.performOperation()
})
