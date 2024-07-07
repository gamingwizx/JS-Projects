/* 
1) user can hit expand and collapse, and the card would expand and collapse
    1) get the button by getting the list
    2) loop through the list
    3) find matching button, and add eventlistener to them
        1) within the eventlistener, make the card body appear and disappear depending on whether the name of the button is expand or collapse
        2) change the text of button to expand and collapse
2) user can dynamically add new cards into the list dynamically
    1) add button
    2) within the button, add a function that create new cards into the list
    3) 
3) the user can also interact with the new cards like any other previous card
    1) make it so that the event listener is listening to the document, and check if the element clicked is from the card or not, then find the 
    nearest button in the clicked element

1) collapse and expand /
2) add new elements
    1) add new button
    2) create new element
    3) create template
    4) duplicate the element, and append it into the list
    
3) perform same collapse and expand
    */

const addNewCardButton = document.querySelector("[data-button-add-new-card]")
const cardTemplate = document.querySelector("#card-template")
const cardBody = document.querySelector(".card-container")

document.addEventListener("click", (e) => {
  if (!e.target.matches(".expand-button")) return

  const parent = e.target.closest(".card")
  const cardBody = parent.querySelector(".card-body")
  const cardBodyClassList = Array.from(cardBody.classList)
  cardBody.classList.toggle("show")

  e.target.innerText = e.target.innerText == "Expand" ? "Collapse" : "Expand"
  //show the text in the card
})

addNewCardButton.addEventListener("click", (e) => {
  const cardList = cardBody.querySelectorAll(".card")
  const card = cardTemplate.content.cloneNode(true)
  //get the list of elements in the card body
  const cardSpan = card.querySelector("[card-span]")
  cardSpan.innerText = `Title ${cardList.length + 1}`

  cardBody.appendChild(card)
})
