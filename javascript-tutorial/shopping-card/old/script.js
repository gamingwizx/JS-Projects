/* 
1) user able to add to cart
    1) add to cart button
    2) append into list
2) hover cart icon, show list of items added
    1) hover, show the ui
    2) append the list into the ui
2) able to add new items with items.json /
3) able to remove items in cart
4) able to show subtotal of each item in the cart
5) able to increase amount of items added, and also total price of each items
*/

import { test } from "./store.js"
import {
  addNewItemsInStore,
  addEventListenerToEachAddToCart
} from "./addNewItems.js"

const CART_KEY = "ECOMMERCE_SHOPPINGCART_KEY"
const cartList = sessionStorage.getItem(CART_KEY) || []

document.addEventListener("click", (e) => {
  if (!e.target.matches("[data-add-to-cart-button]")) return
})

//adding items itno webpage from items.json
/* 
  
*/

addNewItemsInStore()

addEventListenerToEachAddToCart()
