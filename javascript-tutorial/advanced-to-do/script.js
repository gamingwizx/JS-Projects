const todoForm = document.querySelector("#new-todo-form")
const todoInput = document.querySelector("#todo-input")
const template = document.querySelector("#list-item-template")
const list = document.querySelector("#list")
const deleteButtonList = document.querySelectorAll("[data-button-delete]")
const LOCAL_STORAGE_PREFIX = "ADVANCED_TODO_LIST"
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`
let todoList = loadTodo()
todoList.forEach((todo) => renderTodo(todo))

list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-delete]")) return

  const parent = e.target.closest(".list-item")
  const dataElement = parent.querySelector("[data-list-item-text]")

  parent.remove()
  deleteTodo(dataElement)
  saveTodoIntoStorage()
})

list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-list-item-checkbox]")) return

  const text = e.target.closest(".list-item")
  const todoId = text.dataset.id

  const todo = todoList.find((todo) => todo.id == todoId)
  todo.isCompleted = e.target.checked
  saveTodoIntoStorage()
})

todoForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const todoName = todoInput.value
  const todoObject = {
    id: Date().valueOf().toString(),
    name: todoName,
    isCompleted: false
  }
  todoList.push(todoObject)
  renderTodo(todoObject)
  saveTodoIntoStorage()
})

function deleteTodo(element) {
  const getId = element.dataset.id
  todoList = todoList.filter((todo) => todo.id !== getId)
}

function loadTodo() {
  return JSON.parse(localStorage.getItem(TODOS_STORAGE_KEY)) || []
}

function saveTodoIntoStorage() {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todoList))
}

function generateTodo(todo) {
  const node = template.content.cloneNode(true)
  const textElement = node.querySelector("[data-list-item-text]")
  const parent = textElement.closest(".list-item")
  parent.dataset.id = todo.id
  textElement.innerText = todo.name
  return node
}

function renderTodo(todo) {
  const node = generateTodo(todo)
  const checkbox = node.querySelector("[data-list-item-checkbox]")

  if (todo.isCompleted) {
    checkbox.checked = true
  }

  list.appendChild(node)
}
