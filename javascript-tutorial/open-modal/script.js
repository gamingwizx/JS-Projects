const country = {
  city: {
    street: "street st"
  }
}

const person = {
  name: "Kyle",
  friend: {
    name: "John",
    friend: {
      name: "Sally"
    }
  }
}

if (country && country.city && country.city.street) {
  return true
}

const checkValue = country && country.city && country.city.street
console.log(checkValue)

// function loopPerson(currentPerson) {
//   if (typeof currentPerson === "undefined") return
//   console.log(currentPerson.name)
//   currentPerson = currentPerson.friend
//   loopPerson(currentPerson)
// }

function loopPerson(currentPerson) {
  if (currentPerson == null) return
  console.log(currentPerson.name)
  loopPerson(currentPerson.friend)
}

loopPerson(person)

// let currentPerson = person
// while (currentPerson != null) {
//   console.log(currentPerson.name)
//   currentPerson = currentPerson.friend
// }

// do {
//   console.log(currentPerson.name)
//   currentPerson = currentPerson.friend
// } while (currentPerson.friend != null)

// for (i = 0; i < 10; i++) {
//   console.log(i)
// }

// for (i = 0; i < 10; i++) {
//   if (i == 5) continue
//   console.log("Frmo another loop " + i)
// }

// const number = 4

// if (number === 0) {
//   console.log("It is zero")
// } else if (number <= 2) {
//   console.log("It is small")
// } else if (number <= 4) {
//   console.log("It is medium")
// } else if (number === 5) {
//   console.log("It is large")
// }

// switch (number) {
//   case 0:
//     console.log("It is zero")
//     break
//   case 1:
//   case 2:
//     console.log("It is small")
//     break
//   case 3:
//   case 4:
//     console.log("It is medium")
//     break
//   case 5:
//     console.log("It is large")
//     break
//   default:
//     console.log("Try again")
// }

// const isUserLoggedIn = true
// const userType = isUserLoggedIn ? "User" : "Admin"
// const falseVar = false

// if (falseVar === false) {
//   console.log("true")
// } else {
//   console.log("false")
// }

// if (1) {
//   console.log("true")
// } else {
//   console.log("false")
// }

// if (0) {
//   console.log("true")
// } else {
//   console.log("false")
// }

// if (undefined) {
//   console.log("true")
// } else {
//   console.log("false")
// }

// if ("") {
//   console.log("true")
// } else {
//   console.log("false")
// }

// if ("test") {
//   console.log("true")
// } else {
//   console.log("false")
// }

// if (null) {
//   console.log("true")
// } else {
//   console.log("false")
// }

//When click button, it will pop up window
/* 
1) Create the form with the button
2) Create the script that pops up the modal window when button is clicked
    1) create an element to append the modal
    2) declare the pop up element declared in HTML
    3) add event listener in the button, and create an element that shows the modal
        1) create a white box, centralize it
        2) the black background around the pop up
        3) the button in the pop up
    4) append the pop up into the modal window
3) Create the script thta closes the window when clicked button
    1) closes the modal by clearing it
    2) 
*/

//)1) the elements should be put in the middle
//2) background black

const form = document.querySelector("#form")
const popupWindowContainer = document.querySelector("#popup")
const popupButton = document.querySelector("#popup-button")

popupButton.addEventListener("click", (e) => {
  popupWindowContainer.style.visibility = "visible"
  const window = document.createElement("div")
  const textElement = document.createElement("span")
  const buttonElement = document.createElement("button")

  window.id = "popup-content"

  buttonElement.innerText = "Close"
  textElement.innerText = "This is a modal window"

  window.appendChild(buttonElement)
  window.appendChild(textElement)

  buttonElement.addEventListener("click", (e) => {
    popupWindowContainer.style.visibility = "hidden"
    window.remove()
  })

  popupWindowContainer.appendChild(window)
})
