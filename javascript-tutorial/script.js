const button1 = document.querySelector("#button")

document.addEventListener(
  "click",
  (e) => {
    console.log("Clicked document")
  },
  { capture: true }
)

document.body.addEventListener(
  "click",
  (e) => {
    console.log("Clicked body")
  },
  { capture: true }
)

button1.addEventListener(
  "click",
  (e) => {
    console.log("Clicked button")
  },
  { capture: true }
)

// function test() {
//   console.log("Hello1")
//   console.log("Hello2")
//   new Promise((resolve, reject) => {
//     resolve("Hello8")
//   }).then((message) => {
//     console.log(message)
//   })
//   setTimeout(() => {
//     console.log("Hello5")
//   }, 250)
//   setTimeout(() => {
//     console.log("Hello6")
//   }, 0)
//   console.log("Hello3")
// }

// test()
// console.log("Hello4")

/* 
Goal: To fetch the data from an API, specifically the list of names
1) Get the API URL
2) fetch it, and use then to handle he resolving of API result
3) get the response data by using response.json()
4) with the response json data, which is a promise object, handle the resolv ewith another then
5) loop through the list of list, by using a recursion, and then console.log the name
*/

const GET_API_URL = "https://jsonplaceholder.typicode.com/users"
const POST_API_URL = "https://jsonplaceholder.typicode.com/posts"
const GET_COMMENT_URL =
  "https://jsonplaceholder.typicode.com//comments?postId=1"

const button = document.querySelector("button")

async function getComment() {
  /* 
    1) get the POST_URL
    2) fetch the POST_URL (remember to await it)
    3) get the result using await and response.json
    4) print the result
    */

  try {
    const response = await fetch(GET_COMMENT_URL)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
    } else {
      console.log("failed")
    }
  } catch (ex) {
    console.error(ex)
  }
}

getComment()

async function postNewUser() {
  const POST_API_URL = "https://jsonplaceholder.typicode.com/posts"
  const response = await fetch(POST_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: JSON.stringify({
      title: "Hello"
    })
  })

  const body = await response.json()
  console.log(body)
}

button.addEventListener("click", (e) => {
  postNewUser()
})

// fetch(API_URL)
//   .then((response) => {
//     return response.json()
//   })
//   .then((response) => {
//     response.map((user) => console.log(user.name))
//   })

// async function getNames() {
//   const fetchAPI = await fetch(API_URL)

//   const users = await fetchAPI.json()
//   console.log(users.map((user) => user.name))
// }

// getNames()

// async function awaitText() {
//   await setTimeout(() => {
//     console.log("Print first message")
//   }, 250)
//   await setTimeout(() => {
//     console.log("Print second message")
//   }, 250)
// }

// function promiseResolve(value, delay) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(value)
//     }, delay)
//   })
// }

// function promiseReject(value, delay) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject("Error!")
//     }, delay)
//   })
// }

// async function hello() {
//   try {
//     const message = await promiseResolve("Message 1", 250)
//     console.log(message)
//     const message1 = await promiseResolve("Message 2", 250)
//     console.log(message1)
//     const message2 = await promiseResolve("Message 3", 250)
//     console.log(message2)
//     await promiseReject("Error", 250)
//   } catch (exception) {
//     console.error(exception)
//   }
// }

// awaitText()

/* 
Goal: to creae an async function that logs message twice using promises, and catch the error in case any problem
1) Create the promise function that returns promise, handles resolve, takes in  the delay, and resolve it using the delay and value passed in
2) Create a promise function that returns promise, handle error, and reject promise once it fails
3) Create the async function
4) await the promise for resolve, call it twice
5) Wrap the code implementation within the function to catch the error 
*/

// function promiseResolve(value) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve()
//     }, value)
//   })
// }

// function promiseReject(value) {
//   return new Promise((resolve, reject) => {
//     reject("Hello", value)
//   })
// }

// async function callPromise() {
//   console.log("A")
//   await promiseResolve(250)
//   console.log("Called after 250ms")
//   await promiseResolve(250)
//   console.log("Called after 250ms")
// }
// callPromise()
// function callPromise(delay) {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, delay)
//   })
// }

// callPromise(250).then(() => {
//   console.log("After 250 ms")
//   callPromise(250).then(() => {
//     console.log("After 250 ms")
//     return callPromise(250).then(() => {
//       console.log("After 250 ms")
//     })
//   })
// })

/* 
1) create a button in the HTML
2) create an eventListener that listens to the button
    1) declare the element button in the HTML
    2) add an eventListener to the element button in the HTML
3) add a promise within the addeventLisntener
4) create a function for the addEventListener, as callback
5) within the addEVentListener, add the promise
6) make the addEventListener console log a message
*/

// setTimeout(() => {
//   console.log("This will be called in the near future 1")
//   setTimeout(() => {
//     console.log("This will be called in the near future 2")
//   }, 250)
// }, 250)

// const button = document.querySelector("button")

// function promise() {
//   return new Promise((resolve, reject) => {
//     button.dataset.click = parseInt(button.dataset.click) + 1
//     if (button.dataset.click > 5) {
//       resolve("After checking, you have clicked for more than 5 times!", 1000)
//     } else {
//       reject("Not enough...", 1000)
//     }
//   })
// }

// addEventListener(button, (e) => {
//   promise()
//     .then((message, duration) => {
//       console.log("First resolved promise")
//       return new Promise((resolve, reject) => {
//         resolve("Second resolved promise")
//       }).then((message) => {
//         console.log(message)
//       })
//     })
//     .catch((message, duration) => {
//       console.log(message)
//     })
// })

// function addEventListener(element, callback) {
//   element.addEventListener("click", callback)
// }

// const grandParent = document.querySelector("#grand-parent")
// const children = grandParent.children[0]

// const traverseUp = children.closest("#grand-parent")

// traverseUp.style.color = "green"
// const traverseUp = children.parentElement

// traverseUp.style.color = "green"

// const grandParent = document.querySelector("#grand-parent")
// const children = grandParent.children

// const child1 = children[0].nextElementSibling
// console.log(children[0])
// child1.style.color = "orange"

// const childrenFirstChild = document.querySelector("#child-one")
// const parentOne = childrenFirstChild.parentElement
// const closest = childrenFirstChild.closest("#child-one")
// closest.style.color = "orange"

// //the next thing to do is to get the element of parent from grandparent
// //then, loop through the element in the parent
// //then, and set each element with a color

// const a = document.querySelector("#grand-parent")
// const b = a.querySelector(".parent")

// const c = Array.from(b.children)
// const d = document.querySelectorAll("#child-one")

// Array.from(children).forEach((element) => {
//   element.style.color = "green"
// })

// const buttons1 = document.querySelectorAll("button")

// const buttons = document.querySelector("[data-clicks-lmao]")
// console.log(buttons)
// buttons1.forEach((button) => {
//   button.addEventListener("click", () => {
//     const clicked = parseInt(button.dataset.clicksLmao)
//     button.dataset.clicksLmao = clicked + 1
//   })
// })

//const anchor = document.querySelector("[anchor]")
// const anchor = document.querySelector("body > a")
// const anchor = document.querySelector("a")

// anchor.addEventListener("click", (e) => {
//   e.preventDefault()
//   console.log("Logged this")
// })

// const test = document.querySelector("#id-element")
// const test1 = document.querySelector(".id-element")
// const test2 = document.querySelectorAll(".classList")
// const test4 = document.querySelector("body > input[type='text']")
// const test5 = document.querySelector("[test]")

// const test3 = Array.from(test2)

// test3.forEach((div) => {
//   div.style.color = "red"
// })

// test5.style.color = "red"
// test4.style.backgroundColor = "red"
// test.style.color = "red"
// test1.style.color = "red"

// const classlist = document.getElementsByClassName("classList")
// console.log(classlist)

// const test1 = Array.from(classlist)

// test1.forEach((div) => {
//   div.style.color = "red"
// })

// const test = document.getElementById("id-element")
// test.style.color = "red"

// function test() {
//   return { name: "Test", age: 123 }
// }

// function testParams(name, age) {
//   return { name: name, age: age }
// }

// class testClass {
//   constructor(name, age) {
//     this.name = name
//     this.age = age
//   }
// }

// const test1 = test()
// const test2 = new testParams("Pheng Loong", 23)
// const test3 = new testClass("Ng", 123)

// console.log(test1)
// console.log(test2)
// console.log(test3)

//Create two variables, first name and last name, combine together
/*
1) declare variables
2) assign value
3) console log
4) using backticks, add the variables into the backticks
*/

// const a = "Ng"
// const b = "Pheng Loong"

// console.log(`${a} ${b}`)

//Build an object that takes in a function, process its logic and come out with its individual functionality (add up all elements, multiply the elements in the array)
//1) create object
//2) create function that takes in callback
//3) using the value returned by the callback
//4) implement the functionality (add up all elements)
//5) return the result of the functionality
//the problem now is that, i dont even know how the array is able to get the individual value in the callback

// let price = [
//   {
//     price: 10
//   },
//   {
//     price: 20
//   },
//   {
//     price: 14
//   },
//   {
//     price: 4
//   },
//   {
//     price: 30
//   }
// ]
// //1) declare the list of prices
// //2) declare a constant variable to hold to total prices
// //3) use reduce function to add up the total price of each items
// //4) print the total price
// const totalPrice = price.reduce((sum, item) => {
//   return sum + item.price
// }, 0)

// console.log(totalPrice)
// const array1 = [1, 2, 3] //0x01
// array1.push(4) //Can work
// array1 = [3, 4, 5] //Prints error

//array1, array2 values are [1,2,3,4]

//Create an object, book
//1. Title - string
//2. Author - object with properties name and age

// const book = {
//   Title: "100 ways to survive",
//   Author: {
//     name: "Ng Pheng Loong",
//     age: 23
//   }
// }

// console.log(book.Author.name)

// //Create an object called car with properties
// //1. Make
// //2. Model
// //3. isUsed

// const Car = {
//   Make: "Germany",
//   Modal: "Toyota",
//   isUsed() {
//     console.log("Yes it is used")
//   }
// }

// Car.isUsed()
// console.log(Car.Make)

//Create array, store 5 elements, print the middle element
// const alphabet = ["A", "B", "C", "D", "E"]
// const test = [1, 2, 3, 4, 5]

// console.log(alphabet[(alphabet.length - 1) / 2])

// let a = 1
// a = 2
// let b = "1"
// a = b
// console.log(a == b)

// function print(variable) {
//   let c = 3
//   return function func(variable2) {
//     console.log(variable)
//     console.log(variable2)
//     console.log(c)
//   }
// }

// const c = print("C")
// c("Hello")

// function test() {
//   console.log(a)
// }

// test()
// let a = 1
// { }
/*Create an arrow function that passes name
1) Create variable
2) Create the arrow function
3) Print the name in the arrow function

Create an arrow function that prints the "Hello {name}" 
1) Create variable
2) Create the arrow function
3) print the name in the arrow function
*/
// function doStuff() {
//   const c = 3
//   console.log(c)
//   sum(1, 2)
// }

// function sum(a, b) {
//   console.log(a + b)
// }

// doStuff()

// const sayHi = (name) => console.log(name)
// const sayHii = (name) => name
// const printName = (name) => {
//   console.log("Hello " + name)
// }

// console.log(sayHii("Ng Pheng Loong"))

// printName("Ng Pheng Loong")

// function printVariable(variable) {
//   console.log(variable)
// }

// function printName(name, callback) {
//   callback("Hello " + name)
// }

// printName("Ng Pheng Loong", printVariable)
// printName("Test Name", function (variable) {
//   console.log(variable)
// })
// printName("Test Name 2", (variable) => {
//   console.log(variable)
// })
// function printName(name, callback) {
//   callback(name)
// }

// function helloName(name) {
//   console.log(`Hello ${name}`)
// }

// function byeName(name) {
//   console.log(`Bye ${name}`)
// }

// printName("Ng Pheng Loong", helloName)
// printName("Ng Pheng Wei", byeName)

// function printName(name) {
//   return `Hello ${name}`
// }

// const stringName = printName("Ng Pheng Loong")
// const stringName2 = printName(stringName + " Ng Poh Ting")

// let test = "W"
// let name = 'Ng "Lonng"'
// let nameString = "Ng 'Loong'"
// console.log(typeof test)
// console.log(nameString)

// function callName(name) {
//   console.log(name)
// }

// callName("Ng Pheng Loong")
