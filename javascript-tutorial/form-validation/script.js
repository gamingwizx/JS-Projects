// TODO: Select all elements needed
//    Use the HTML to figure out what classes/ids will work best for selecting each element

// TODO: Create an event listener for when the form is submitted and do the following inside of it.
//    TODO: Create an array to store all error messages and clear any old error messages
//    TODO: Define the following validation checks with appropriate error messages
//      1. Ensure the username is at least 6 characters long
//      2. Ensure the password is at least 10 characters long
//      3. Ensure the password and confirmation password match
//      4. Ensure the terms checkbox is checked
//    TODO: If there are any errors then prevent the form from submitting and show the error messages

/* 
1) When submit form, add the submit form
  1) get the element by the id
  2) using the element, add an addEventListener
  3) within the addEventLisner, get the element of the input
  4) using the element of the input, get the value of input
  5) using the value, compare if the validation is correct or not
  6) if the validation doesn't go through, add new li elements into errors-list  
  7) then, prevent the linking to another page
2) 
*/

// const VALIDATION_OBJECT = [
//   {
//     name: "username",
//     isValidated: false
//   },
//   {
//     name: "password",
//     isValidated: false
//   },
//   {
//     name: "password-confirmation",
//     isValidated: false
//   },
//   {
//     name: "terms",
//     isValidated: false
//   }
// ]

const formElement = document.querySelector("#form")
const formGroupElement = document.querySelectorAll(".form-group")
const errorContainer = document.querySelector(".errors")
const errorList = document.querySelector(".errors-list")

const username = document.querySelector("#username")
const password = document.querySelector("#password")
const passwordConfirmation = document.querySelector("#password-confirmation")
const terms = document.querySelector("#terms")

formElement.addEventListener("submit", (e) => {
  const errorMessage = []

  clearErrors()

  //the problem right now is that, when submitted, it just wont get reedirected, because it returns an objecet, its length is still not 0

  if (username.value.length < 6) {
    errorMessage.push("Username must be at least 6 characters")
  }

  if (password.value.length < 10) {
    errorMessage.push("Password must be at least 10 characters")
  }

  if (passwordConfirmation.value !== password.value) {
    errorMessage.push("Password does not match")
  }

  if (!terms.checked) {
    errorMessage.push("Please check the terms and conditions")
  }

  if (errorMessage.length > 0) {
    errorContainer.classList.add("show")
    showErrors(errorMessage)
    e.preventDefault()
  }
})

// function validateInput(element) {
//   const username = element.name == "username" && element.value.length < 6
//   const passwords = element.name == "password" && element.value.length < 10
//   const passwordMatches =
//     passwordConfirmation.value != password.value &&
//     element.name == "password-confirmation"
//   const terms = element.name == "terms" && !element.checked

//   if (username) {
//     return "Username must be longer than 6 characters"
//   }

//   if (passwords) {
//     return "Password must be longer than 10 characters"
//   }

//   if (passwordMatches) {
//     return "Password does not match"
//   }

//   if (terms) {
//     return "Terms and conditions must be checked"
//   }
// }

function clearErrors() {
  // Array.from(errorList.children).forEach((element) => {
  //   errorList.removeChild(element)
  // })
  errorList.innerHTML = ""
}

function showErrors(errorMessage) {
  errorMessage.forEach((message) => {
    if (message == "") return
    const errorMessageElement = document.createElement("li")
    errorMessageElement.innerText = message
    errorList.appendChild(errorMessageElement)
  })
}
