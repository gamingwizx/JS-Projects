import json from "./items.json"
import { globalEventListener } from "./utility"
import { addToCart } from "./cart.js"
const IMAGE_URL = "https://dummyimage.com/210x130"

export default function renderItemsInStore() {
  globalEventListener("click", "[data-add-to-cart-button]", (e) => {
    const id = e.target.closest("[data-item-id]").dataset.itemId
    const item = json.find((item) => item.id === parseInt(id))
    addToCart(item)
  })

  const dataContainer = document.querySelector("[data-store-container]")

  json.forEach((item) => {
    const template = document.querySelector("#new-item-template")
    const node = template.content.cloneNode(true)

    const id = node.querySelector("[data-item-id]")
    id.dataset.itemId = item.id

    const image = node.querySelector("[data-image]")
    image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`

    const category = node.querySelector("[data-category]")
    category.innerHTML = item.category

    const name = node.querySelector("[data-name]")
    name.innerHTML = item.name

    const price = node.querySelector("[data-price]")
    price.innerHTML = item.priceCents / 100

    dataContainer.appendChild(node)
  })
}
