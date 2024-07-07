//1) declare the elements
//2) add eventlistener to the openmodal button
//3) add class called 'open' in modal
//4) in the button of modal close, remove the class
//5) in the button of modal close, remove the class
//
const openModalButton = document.querySelector("#open-modal")
const closeModalButton = document.querySelector("#close-modal")
const overlay = document.querySelector("#overlay")
const modal = document.querySelector("#modal")

openModalButton.addEventListener("click", openModal)

closeModalButton.addEventListener("click", closeModal)

function openModal() {
  modal.classList.add("open")
  overlay.classList.add("open")
}

function closeModal() {
  modal.classList.remove("open")
  overlay.classList.remove("open")
}
