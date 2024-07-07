import { parseEquation } from "./parse.js"
document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector("#equation")
  const form = document.querySelector("#equation-form")
  const result = document.querySelector("#results")

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const number = parseEquation(input.value)

    result.innerHTML = number
  })
})
