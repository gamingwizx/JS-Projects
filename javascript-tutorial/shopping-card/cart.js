/* 
1) Click add to cart, able to add into cart
2) remove items
3) calculate subtotal and total price, and quantity
*/

/* 
1) where should the add to cart functionality be placed in? 
*/

import json from "./items.json"
import { globalEventListener } from "./utility.js"

const CART_KEY = "ECOMMERCE_CART_KEY"
let cartList = JSON.parse(sessionStorage.getItem(CART_KEY)) || []
const IMAGE_URL = "https://dummyimage.com/210x130"

const cartButton = document.querySelector("[data-cart-button]")

export default function setupCart() {
  globalEventListener("click", "[data-remove-from-cart-button]", (e) => {
    const itemParent = e.target.closest("[data-cart-item]")
    const id = e.target.closest("[data-cart-item-id]").dataset.cartItemId
    const item = cartList.find((item) => item.id === parseInt(id))
    console.log(cartList)
    itemParent.remove()
    removeFromCart(item)
    loadCart()
  })
}

function removeFromCart(item) {
  cartList = cartList.filter((cartItem) => cartItem.id !== item.id)
}

export function addToCart(item) {
  const cartItem = cartList.find((cartItem) => cartItem.id === item.id)
  if (!cartItem) {
    item.quantity = 1
    item.price = item.priceCents / 100
    cartList.push(item)
    loadCart()
  } else {
    cartItem.quantity++
    cartItem.price = (item.priceCents / 100) * cartItem.quantity
    loadCart()
  }
}

function loadCart() {
  const cart = document.querySelector("[data-cart-display]")
  const calculateSubTotal = document.querySelector("[data-cart-total]")
  cart.innerHTML = ""
  console.log(cartList)
  cartList.forEach((item) => {
    renderCart(item)
  })
  const totalPrice = cartList.reduce((accumulatePrice, item) => {
    accumulatePrice + item.price
  })
  console.log(totalPrice)
  calculateSubTotal.innerHTML = totalPrice
}

function renderCart(item) {
  const cart = document.querySelector("[data-cart-display]")
  const template = document.querySelector("#card-item-template")
  const node = template.content.cloneNode(true)

  const id = node.querySelector("[data-cart-item-id]")
  id.dataset.cartItemId = item.id

  const name = node.querySelector("[data-cart-item-name]")
  name.innerHTML = item.name

  const image = node.querySelector("[data-cart-item-image]")
  image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`

  const price = node.querySelector("[data-cart-item-price]")
  price.innerHTML = item.price

  const quantity = node.querySelector("[data-cart-item-quantity]")
  quantity.innerHTML = item.quantity

  console.log(node)

  cart.appendChild(node)
}

cartButton.addEventListener("click", (e) => {
  const cartDisplay = document.querySelector("[data-cart-display]")
  cartDisplay.classList.toggle("open")
})
