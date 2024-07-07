// function nameToFirstAndLast(fullname) {
//   const [firstName, lastName] = fullname.split(" ")
//   return { firstName: firstName, lastName: lastName }
// }

// function calculateTotal(...numbers) {
//   return numbers.reduce((sum, number) => sum + number, 0)
// }

// const calc = calculateTotal(1, 2, 3, 4, 5)
// console.log(calc)

// const testNumber = [1, 2, 3, 5]
// const clonedTestNumber = [...testNumber]

// const array1 = [1, 2, 3]
// const array2 = [4, 5, 6]
// const array3 = [...array1, ...array2, 7, 8]

// console.log(array3)

// clonedTestNumber.push(111)

// console.log(clonedTestNumber)

// const { firstName = "John", lastName } = nameToFirstAndLast("Pheng Loong")

// console.log(firstName, lastName)

// const fullName = ["Pheng", "Loong", "Haha", "123"]

// const [aa, ...rest] = fullName

// console.log(aa)

// printName(...fullName)

// function printName(firstName, lastName) {
//   console.log("print Name")
//   console.log(firstName, lastName)
// }

// const name = "Hello"
// const number = 1
// function hello() {
//   console.log("Hello!")
// }

// const object = {
//   [name]: "HAHA",
//   number,
//   hello,
//   testfunction: function() {
//     console.log("Lmao")
//   }
// }

// console.log(object)

// function printName(
//   firstName = "Pheng",
//   lastName = "Loong",
//   { suffix = "Hello", salutation = "Mr" } = {}
// ) {
//   console.log(firstName, lastName, suffix, salutation)
// }

// printName("Pheng", "Wei", { salutation: "Mrs", suffix: "Fuck you" })

// console.log((undefined ?? false) && (true || false))

// const personObj = {
//   name: "Hello",
//   address: {
//     street: "Street 12"
//   },
//   test() {
//     console.log("W")
//   },
//   arrayTest: ["aaa"]
// }

// function person(personObj) {
//   console.log(personObj?.name)
//   console.log(personObj?.test?.())
//   console.log(personObj?.arrayTest?.[0])
// }

// person(personObj)

// const map = new Map([
//   [1, { id: 1, name: "Test", description: "Desc" }],
//   [2, { id: 2, name: "Test 2", description: "Desc 2" }],
//   [3, { id: 3, name: "Test 3", description: "Desc 3" }]
// ])

// function getItem(id) {
//   return map.get(id)
// }

// console.log(getItem(1))

// const test = {
//   a: 1,
//   b: 2,
//   c: 3,
//   d: 4
// }
// let i = 0
// Object.entries(test).forEach(([key, value]) => {
//   i += 1
//   console.log(i)
// })

// console.log(map.size)

// function removeDups(...array) {
//   const array1 = [...new Set(array)]
//   console.log(array1)
// }

// removeDups(1, 2, 3, 1, 2, 5, 6, 2, 3)

// function* idGenerator() {
//   let id = 0

//   while (true) {
//     let iterator = yield id++
//     if (iterator != null) {
//       id += iterator
//     } else {
//       iterator++
//     }
//   }
// }
// const generator = idGenerator()
//     console.log(generator.next())
//     console.log(generator.next(10))
//     console.log(generator.return())
//     console.log(generator.next())

// const person = {
//   name: "Hello",
//   age: 25,
//   _birthday: 1995,
//   //     console.log(generator.next())
//   get birthday() {
//     return this._birthday + 1
//   },
//   set birthday(value) {
//     if (value > 2000) {
//       this._birthday = value
//     }
//   }
// }

// console.log(person.birthday)

// person.birthday = 2001

// console.log(person.birthday)

// window.a = 1
// window.b = 2

// const sumObj = {
//   a: 1,
//   b: 4
// }

// function sum() {
//   return this.a + this.b
// }
// const returnedBind = sum.bind(sumObj)

// console.log(returnedBind())
// console.log("sum(sumObj)")

// function sumElements(...numbers) {
//   return numbers.reduce((sum, number) => sum + number)
// }

// const numberToAdd = [1, 2, 3, 4, 5]
// const boundFunction = sumElements.bind(null, 2)
// const applyFunction = sumElements.apply(null, numberToAdd)
// const callFunction = sumElements.call(null, 1, 2, 3)
// // const callFunction = sumElements.call(2, 6)

// console.log(boundFunction())
// console.log(callFunction)
// console.log(applyFunction)
// console.log(callFunction())

// const array = [1, 2, 3, 4, 5]

// const mappedTotal = array.map(sumElements.bind(null))

// console.log(mappedTotal)

// class User {
//   constructor(email, password, language) {
//     this.email = email
//     this.password = password
//     this.language = language
//   }

//   static printPassword() {
//     console.log(this.password)
//   }

//   printName() {
//     console.log(this.email)
//   }
// }

// const user = new User("nic3568@gmail.com", "password", "English")

// console.log(user)
// User.printPassword()
// user.printName()

// class Person {
//   constructor(name, age) {
//     this._name = name // Use a different name for the property
//     this.age = age
//   }

//   get name() {
//     return this._name // Use the different name here as well
//   }

//   set name(value) {
//     this._name = value // Use the different name here as well
//   }

//   printName() {
//     return this._name // Use the different name here as well
//   }
// }

// const person = new Person("Nameee", 28)
// console.log(person.name) // Outputs: Name

// class Animal {
//   constructor(name) {
//     this.name = name
//   }

//   speak() {
//     console.log(`I am ${this.name}`)
//   }
// }

// class dog extends Animal {
//   constructor(name, owner, noise) {
//     super(name)
//     this.owner = owner
//     this.noise = noise
//   }

//   speak() {
//     console.log(`Hello, my name is ${this.name}, and my owner is ${this.owner}`)
//   }
// }

// class cat extends Animal {
//   speak() {
//     console.log(
//       `Hello, my name is ${this.name}, and my owner is ${this.owner}, ${this.noise}!`
//     )
//   }
// }

// const doggo = new dog("Fluffy", "Pheng Loong", "woof")
// const catto = new cat("catto")
// catto.speak()

// class Person {
//   constructor(name) {
//     this.name = name
//   }
// }

// class Janitor extends Person {
//   constructor(name, numberOfMops) {
//     super(name)
//     this.numberOfMops = numberOfMops
//   }

//   #id = "hello"
//   _protectedVariable = "Variable"

//   #printSecret() {
//     console.log(`${this.#id} is a big dumb dumb`)
//   }

//   printMessage() {
//     this.#printSecret()
//     console.log(
//       `Hello! my name is ${this.name}, and I have ${this.numberOfMops} of mops`
//     )
//   }
// }

// const janitor = new Janitor("John", 3)
// janitor.printMessage()

//1) create an array
//2) create a function
//3) within the function, add new elements by passing in the declared array, and printing the result of the resulting array
// const array = ["Hello1", "Hello2"]
// const array2 = {
//   friendName: "Hello2",
//   friends: ["kelly", "john"]
// }
// function addItem(array, value) {
//   return { ...array, friends: createElements(array.friends, value) }
// }

// function createElements(array, value) {
//   return [...array, value, "Hello6"]
// }

// const test = addItem(array2, "Hello3")
// console.log(test)

// const person = Object.freeze({
//   name: "Kyle",
//   friends: ["Hello1", "Hello2"]
// })

// function deepFreeze(object) {
//   Object.values(object).forEach((value) => {
//     if (value && typeof value == "object") {
//       deepFreeze(value)
//     }
//   })

//   return Object.freeze(object)
// }

// const test = deepFreeze({
//   test: "Hello1",
//   address: { street: "Hello1", zipcode: "Hello2" }
// })
// test.test = "Helllo3"
// test.address.street = "Hello4"
// console.log(test)

// person.name = "Haha"
// console.log(person)

// const people = [
//   {
//     name: "Pheng Loong",
//     friends: ["John"]
//   },
//   {
//     name: "Pheng Wei",
//     friends: ["John", "Kelly"]
//   },
//   {
//     name: "Poh Ting",
//     friends: ["John", "Kellly"]
//   },
//   {
//     name: "Kell",
//     friends: ["Joah"]
//   }
// ]

//to curry the function
//create a function that accept 2 parameters
//creatimport the function groupby and sortby from the loadash/fp
//call the function, and pass in the implementation sortby and groupby

// const compose =
//   (...fns) =>
//   (initialVal) => {
//     //the function needs to be called after being called
//     functions.reduceRight((val, fn) => {
//       fn(val)
//     }, initialVal)
//   }

// function sortBy(array, func) {
//   return array.sort((currentElement, prevElement) => {
//     return func(currentElement, prevElement)
//   })
//   //loop through array, return the element based on the shortest to longest length of name
// }

// const test = sortBy(people, (currentElement, prevElement) => {
//   const currentElementLength = currentElement.name.length
//   const prevElementLength = prevElement.name.length
//   if (currentElementLength > prevElementLength) {
//     return 1
//   } else if (prevElementLength > currentElementLength) {
//     return -1
//   }
//   return 0
// })

// console.log(test)
//EEE

// function sort(array) {
//   return array.sort(function (a, b) {
//     if (a.name.length > b.name.length) {
//       return 1
//     } else if (b.name.length > a.name.length) {
//       return -1
//     }
//     return 0
//   })
// }

// function groupBy(array, func) {
//   return array.reduce((grouping, element) => {
//     const key = func(element)
//     if (grouping[key] == null) grouping[key] = []
//     grouping[key].push(element)
//     return grouping
//   }, {})
// }

// const result = groupBy(people, (people) => people.friends.length)

// console.log(result)

// const numbers = [1, 2, 3, 4, 5]
// const newNumbers = []
// for (let i = 0; i < numbers.length; i++) {
//   newNumbers.push(numbers[i] * 2)
// }

// const newNumber1 = numbers.map((number) => number * 2)

// console.log(newNumber1)

// function multiply(array, func) {
//   return array.map((number) => func(number))
// }

// const multipliedNumbers = multiply(numbers, (number) => number * 2)
// console.log(multipliedNumbers)

// const insraunce = [
//   {
//     id: 1,
//     name: "Hello",
//     insurance: true,
//     insuranceVehicle: true,
//     insuranceHealth: false
//   },
//   {
//     id: 2,
//     name: "Hello1",
//     insurance: true,
//     insuranceVehicle: false,
//     insuranceHealth: true
//   },
//   {
//     id: 3,
//     name: "Hello2",
//     insurance: false,
//     insuranceVehicle: true,
//     insuranceHealth: false
//   }
// ]

// function guardClause(object) {
//   if (!object.insurance) return
//   if (object.insuranceVehicle) return 500
//   if (object.insuranceHealth) return 1000
// }

// function badFUnction(object) {
//   let value = 0
//   if (object.insurance) {
//     if (object.insuranceVehicle) {
//       value = 500
//     } else if (object.insuranceHealth) {
//       value = 1000
//     }
//     return value
//   }
// }

// console.log(guardClause(insraunce[0]))
// console.log(guardClause(insraunce[1]))
// console.log(guardClause(insraunce[2]))

// function curry(f) {
//   // curry(f) does the currying transform
//   return function (a) {
//     return function (b) {
//       return f(a, b)
//     }
//   }
// }

// // usage
// function sum(a, b) {
//   return a + b
// }

// let curriedSum = curry(sum)

// console.log(curriedSum(1)(2)) // 3

// import { walkClass, swimmerClass, flierClass, attackerClass } from "./mixin.js"

// class Animal {
//   constructor(name) {
//     this.name = name
//   }

//   walk() {
//     console.log(`My name is ${this.name}, and I walk`)
//   }

//   fly() {
//     console.log(`My name is ${this.name}, and I fly`)
//   }
// }

// class Bear extends swimmerClass(
//   attackerClass(swimmerClass(walkClass(Animal)))
// ) {}

// const bear = new Bear("Bear")
// bear.walk()
// bear.attack()
// bear.swim()
// bear.fly()

// class Shark extends Animal {
//   swim() {
//     console.log(`My name is ${this.name}, and I swim with fins`)
//   }
//   attack() {
//     console.log(`My name is ${this.name}, and I attack`)
//   }
// }

// class Human extends Animal {
//   walk() {
//     console.log(`My name is ${this.name}, and I swim with legs`)
//   }
// }

// class Bird extends Animal {
//   walk() {
//     console.log(`My name is ${this.name}, and I fly with wings`)
//   }
// }

// class Bear extends Animal {
//   walk() {
//     console.log(`My name is ${this.name}, and I can walk`)
//   }
// }

// const walker = ({ name }) => ({
//   walk() {
//     console.log(`My name is ${this.name}, and I can walk`)
//   }
// })

// const swimmer = ({ name }) => ({
//   swim() {
//     console.log(`My name is ${this.name}, and I can swim`)
//   }
// })

// const flier = ({ name }) => ({
//   fly() {
//     console.log(`My name is ${this.name}, and I can fly`)
//   }
// })

// const attacker = ({ name }) => ({
//   attack() {
//     console.log(`My name is ${this.name}, and I can attack`)
//   }
// })

// function createBear(name) {
//   const bear = { name }
//   return { ...bear, ...walker(name), ...attacker(name) }
// }

// function createShark(name) {
//   const shark = { name }
//   return { ...name, ...flier(name), ...swimmer(name) }
// }

// const bear = createBear("Bear")
// bear.walk()
// bear.attack()

// const human = new Human("Pheng Loong")
// human.walk()
// human.fly()


// const q = { a: '1', b:'2'}
// const q2 = { w: ["w"], c: '1', b:'222'}
// const q1 = [ '1', '2']

// function test1(...test) {
//   console.log(test)
// }

// function test2({ b, ...a}) {
//   console.log(a, b)
// }

// test1(q)
// test1(q1)

// test2(q)
// test2(q2)

const lodash = require("lodash")

const test = ['a']
const test1 = ['a', 'b']
const test2 = "a"

console.log(lodash.isMatch(test, undefined))