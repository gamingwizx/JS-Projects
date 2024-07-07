export function parseEquation(equation) {
  const REGEX_MULTIPLIER =
    /(?<operand1>\S+)\s*(?<operator>(?<!e)[\/\*])\s*(?<operand2>\S+)/

  const REGEX_ADD =
    /(?<operand1>\S+)\s*(?<operator>(?<!e)[\+\-])\s*(?<operand2>\S+)/

  const REGEX_EXPONENT =
    /(?<operand1>\S+)\s*(?<operator>(?<!e)[\^])\s*(?<operand2>\S+)/

  const REGEX_BRACKET1 = /\((?<equation>[^\(\)]*)\)/

  if (equation.match(REGEX_BRACKET1)) {
    const result = parseEquation(equation.match(REGEX_BRACKET1).groups.equation)
    const newEquation = equation.replace(REGEX_BRACKET1, result)
    return parseEquation(newEquation)
  } else if (equation.match(REGEX_MULTIPLIER)) {
    const result = calculate(equation.match(REGEX_MULTIPLIER).groups)
    const newEquation = equation.replace(REGEX_MULTIPLIER, result)
    return parseEquation(newEquation)
  } else if (equation.match(REGEX_ADD)) {
    const result = calculate(equation.match(REGEX_ADD).groups)
    const newEquation = equation.replace(REGEX_ADD, result)
    return parseEquation(newEquation)
  } else if (equation.match(REGEX_EXPONENT)) {
    const result = calculate(equation.match(REGEX_EXPONENT).groups)
    const newEquation = equation.replace(REGEX_EXPONENT, result)
    return parseEquation(newEquation)
  } else {
    return parseFloat(equation)
  }
}
function calculate({ operand1, operand2, operator }) {
  operand1 = parseFloat(operand1)
  operand2 = parseFloat(operand2)
  switch (operator) {
    case "-":
      return operand1 - operand2
    case "+":
      return operand1 + operand2
    case "*":
      return operand1 * operand2
    case "/":
      return operand1 / operand2
    case "^":
      return operand1 ** operand2
  }
}
