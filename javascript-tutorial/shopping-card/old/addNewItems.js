import json from "../items.json"

const CART_KEY = "ECOMMERCE_SHOPPINGCART_KEY"
const cartList = sessionStorage.getItem(CART_KEY) || []

const cartListElement = document.querySelector("[data-cart-list]")
const cartButton = document.querySelector("[data-cart]")

export function addNewItemsInStore() {
  const storeList = document.querySelector(".items")

  json.forEach((item) => {
    const node = cloneItemTemplate(item)
    storeList.appendChild(node)
    node.addEventListener("click", (e) => {
      if (!e.target.matches("[data-add-to-cart-button]")) return

      const item = e.target.closest("[data-item-id]")
      const itemId = item.dataset.itemId

      const itemAdded = json.find((item) => {
        return item.id === parseInt(itemId)
      })

      addToCart(itemAdded)
      updateCartOnDisplay(itemAdded)
    })
  })
}

export function addEventListenerToEachAddToCart() {
  document.addEventListener("click", (e) => {
    if (!e.target.matches("[data-add-to-cart-button]")) return

    const item = e.target.closest("[data-item-id]")
    const itemId = item.dataset.itemId

    const itemAdded = json.find((item) => {
      return item.id === parseInt(itemId)
    })

    addToCart(itemAdded)
    updateCartOnDisplay(itemAdded)
  })
}

function addToCart(itemAdded) {
  const item = cartList.find((item) => item.id === itemAdded.id)
  const storeItem = json.find((item) => item.id === itemAdded.id)

  if (!item) {
    itemAdded.quantity = 1
    cartList.push(itemAdded)
  } else {
    itemAdded.quantity += 1
    itemAdded.price = itemAdded.quantity * (storeItem.priceCents / 100)
  }
}

function updateCartOnDisplay(itemAdded) {
  const cartListElement = document.querySelector("[data-cart-list]")
  const item = cartList.find((item) => item.id === itemAdded.id)
  const cartLabel = document.querySelector("[data-cart-list-label]")
  if (item.quantity <= 1) {
    cartLabel.innerHTML = ""
    const test = cloneCartItemTemplate(itemAdded)
    cartListElement.appendChild(test)

    test.addEventListener("click", (e) => {
      if (!e.target.matches("data-remove-from-cart-button")) return

      const cartItem = document.querySelector("[data-cart-item]")
      cartItem.remove()
    })
  } else {
    updateItemsInCart(item)
  }
}

function updateItemsInCart(item) {
  const elementNodes = document.querySelector("[data-cart-list]").children
  const totalPriceNode = document.querySelector("[data-cart-total]")

  Array.from(elementNodes).forEach((element) => {
    const elementNode = element.querySelector("[data-cart-item-id]")
    const itemExist = parseInt(elementNode.dataset.cartItemId) === item.id

    if (itemExist) {
      const priceNode = element.querySelector("[data-cart-item-price]")
      const quantityNode = element.querySelector("[data-cart-item-quantity]")

      priceNode.innerHTML = item.price
      quantityNode.innerHTML = item.quantity
      totalPriceNode.innerHTML = cartList.reduce(
        (accumulatedPrice, item) =>
          accumulatedPrice + item.price * item.quantity,
        0
      )
    }
  })
}

function cloneCartItemTemplate(itemAdded) {
  const item = cartList.find((item) => item.id === itemAdded.id)

  const cartItemTemplate = document.querySelector("#card-item-template")
  const node = cartItemTemplate.content.cloneNode(true)

  const nodeId = node.querySelector("[data-cart-item-id]")
  const nodeImage = node.querySelector("[data-cart-item-image]")
  const nodeColor = node.querySelector("[data-cart-item-color]")
  const nodeQuantity = node.querySelector("[data-cart-item-quantity]")
  const nodePrice = node.querySelector("[data-cart-item-price]")

  nodeId.dataset.cartItemId = itemAdded.id
  nodeImage.src = `https://dummyimage.com/420x260/${item.imageColor}/${item.imageColor}`
  nodeColor.innerHTML = itemAdded.imageColor
  //Getting the quantity of item
  nodeQuantity.innerHTML = item.quantity
  nodePrice.innerHTML = itemAdded.price * item.quantity

  console.log(node)

  return node
}

export function cloneItemTemplate(item) {
  const template = document.querySelector("#new-item-template")
  const node = template.content.cloneNode(true)
  const nodeId = node.querySelector("[data-item-id]")
  const nodeCategory = node.querySelector("[data-category]")
  const nodePrice = node.querySelector("[data-price]")
  const nodeName = node.querySelector("[data-name]")
  const nodeImage = node.querySelector("[data-image]")

  nodeId.dataset.itemId = item.id
  nodeCategory.innerHTML = item.category
  nodePrice.innerHTML = `$${item.priceCents / 100}.00`
  nodeName.innerHTML = item.name
  nodeImage.src = `https://dummyimage.com/420x260/${item.imageColor}/${item.imageColor}`

  return node
}

cartButton.addEventListener("click", (e) => {
  const cart = document.querySelector("[data-cart-display]")
  const cartItems = document.querySelector("[data-cart-list]").children[1]
  const cartLabel = document.querySelector("[data-cart-list-label]")
  console.log(cartItems)
  if (cartItems === undefined) {
    cartLabel.innerHTML = "No items here!"
  }

  if (Array.from(cart.classList).includes("open")) {
    cart.classList.remove("open")
    cart.classList.add("close")
  } else {
    cart.classList.add("open")
    cart.classList.remove("close")
  }
})
