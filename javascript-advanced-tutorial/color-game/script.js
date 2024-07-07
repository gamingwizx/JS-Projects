/*user interactions:
1) Select Difficulty (easy - hard) will change the colour on the screen. 
    - easy is more differences, and hard will be more similar. (make it more distinct and similar) /
    - the color code on the screen changes too /
2) selecting Format will 
    - change the color in the title 
    - changing the color on the screen 
3) when click on colour on the screen:
    - it will check if the color code and the color represented in the tile matches. 
       - if right, then say correct and displays next Color,  /
       - if wrong, then write try again /
*/

import {times} from 'lodash/fp'
import Rgb from './rgb.js'
import Hex from './Hex.js'
import Hsl from './Hsl.js'

import { globalEventListener, shuffle } from './helper.js'

const colorTitle = document.querySelector("[color-result]");
const colorString = document.querySelector(".color-string");
const colorGrid = document.querySelector(".color-grid");


const MIN_CUTOFF = 0
const MAX_CUTOFF = 255
const NUMBER_RGB_TILES = 6
const colorFormat = {
    "rgb": Rgb,
    "hex": Hex,
    "hsl": Hsl
}

globalEventListener("click", "input[name='format']", (e) => {

    renderColorTiles()
})

globalEventListener("click", "input[name='difficulty']", (e) => {
    renderColorTiles()
})

globalEventListener("click", "[data-color-tile]", (e) => {
    const colorTiles = Array.from(colorGrid.children)
    const wrongTiles = colorTiles.filter((element) => element.dataset.correct === 'false')
    if (e.target.dataset.correct === 'true') {
        
        colorTitle.textContent = "Correct"
    } else {
        colorTitle.textContent = "Wrong"
    }

    updateColorTiles(colorTiles)
})

globalEventListener("click", "[next-color]", (e) => {
    colorTitle.textContent = ""
    renderColorTiles()

})

renderColorTiles()

function renderColorTiles() {
    colorGrid.innerHTML = ""
    const colorTile = generateColorDetails()
    colorTile.forEach((color) => {
        const element = generateColorTile(color)
        colorGrid.append(element)
    })
}

function generateColorDetails() {
    const format = document.querySelector("input[name='format']:checked").value
    const difficulty = document.querySelector("input[name='difficulty']:checked").value
    const colorClass = colorFormat[format]
    const color = colorClass.generateCorrectTile()
    colorString.textContent = color.css();
    let colorTile = [color]
    
    times(x => {
        colorTile.push(color.generateRandomColor(NUMBER_RGB_TILES, difficulty))
    }, NUMBER_RGB_TILES - 1)

    colorTile = shuffle(colorTile)
    return colorTile;

}

function generateColorTile(color) {
    const button = document.createElement("button");
    button.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`
    button.dataset.colorTile = ""
    button.dataset.correct = color.correctTile
    return button
}

function updateColorTiles(colorTiles) {
    colorTiles.forEach((element) => {
        if (element.dataset.correct === 'false') element.classList.toggle("wrong")
        element.setAttribute("disabled", true)
    })
}