/* 
the flow technically
-- load up the mines by randomizing the position of mines on the board
1) find out the number of mines
2) find out the size of the board, the dimensions
3) randomize the position of mines in the board

1) load the blocks into the minesweeper

-- when click, it will reveal the state of the mine, mine, safe, number of nearby mines
1) each block has an eventlistener linked to it
2) when clicked, get the position of the block, using the position, check with the position of the mine
    1) if it matches, then return a game over = true, and check if game over with a function.
        1) if gameover, show all tiles, (including the mines and the blocks without mines)
    2) if it doesn't match, check for nearby mines, within the the 1 block area
        1) add up all the mines within the area, and display it onto the block
        2) find out nearby linking blocks that are not mines, then open them up as well

-- click all the safed blocks are cleared, display a message called you win
3) if there are no more unopened non-mine blocks, display, you win the game.
*/

import {
  createBoard,
  generateMinePosition,
  revealTiles,
  revealMines,
  checkWin,
  checkLost,
  markTile,
  NUMBER_OF_MINES,
  BOARD_SIZE
} from "./minesweeper.js"

const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked"
}

const board = document.querySelector(".board")
const mineCount = document.querySelector("[data-mine-count]")
const title = document.querySelector(".subtext")

//2) find out the size of the board, the dimensions

const boardElements = createBoard()
mineCount.innerHTML = NUMBER_OF_MINES

boardElements.forEach((row) => {
  row.forEach((element) => {
    board.appendChild(element.element)

    element.element.addEventListener("click", (e) => {
      revealTiles(boardElements, element)

      checkWinLose()
    })

    element.element.addEventListener("contextmenu", (e) => {
      e.preventDefault()
      markTile(element.element)
    })
  })
})

board.style.setProperty("--size", BOARD_SIZE)

function checkWinLose() {
  const win = checkWin(boardElements)
  const lose = checkLost(boardElements)

  if (win || lose) {
    //addeventlistener to prevent clicking
    boardElements.forEach((row) => {
      row.forEach((element) => {
        element.element.addEventListener("click", stopProp, {
          capture: true
        })

        element.element.addEventListener("contextmenu", stopProp, {
          capture: true
        })
      })
    })
  }

  if (win) {
    title.innerHTML = "You win!"
  }

  if (lose) {
    title.innerHTML = "You lose!"
    revealMines(boardElements)
  }
}

function stopProp(e) {
  e.stopImmediatePropagation()
}

/* 
1) get the board
2) loop through the board
3) append the elements into the board
4) set the size of the board
*/

//3) randomize the position of mines in the board
// const MINES_POSITION = []
// for (let i = 0; i < NUMBER_OF_MINES; i++) {
//   const x = Math.floor(Math.random() * 10 + 1)
//   const y = Math.floor(Math.random() * 10 + 1)
//   const positionExist = MINES_POSITION.find(
//     (element) => JSON.stringify(element) === JSON.stringify([x, y])
//   )

//   if (!positionExist) {
//     MINES_POSITION[i] = [x, y]
//   }
// }
// const BOARD_SIZE = 10
// const boardElement = document.querySelector(".board")

// const boardElements = []

// for (let x = 0; x < BOARD_SIZE; x++) {
//   const row = []
//   for (let y = 0; y < BOARD_SIZE; y++) {
//     const element = document.createElement("div")
//     element.dataset.status = "hidden"
//     const obj = {
//       element,
//       x,
//       y
//     }
//     row.push(obj)
//   }
//   boardElements.push(row)
// }

// boardElements.forEach((element) => {
//   element.forEach((tile) => {
//     boardElement.append(tile.element)
//   })
// })

// boardElement.style.setProperty("--size", BOARD_SIZE)

//1) load the blocks into the minesweeper
// const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)

// // Game logic

// export function createBoard(boardSize, numberOfMines) {
//   const board = []
//   const minePositions = getMinePositions(boardSize, numberOfMines)
//   for (let x = 0; x < boardSize; x++) {
//     const row = []
//     for (let y = 0; y < boardSize; y++) {
//       const element = document.createElement("div")
//       element.dataset.status = TILE_STATUSES.HIDDEN
//       const tile = {
//         element,
//         x,
//         y,
//         mine: minePositions.some(positionMatch.bind(null, { x, y })),
//         get status() {
//           return this.element.dataset.status
//         },
//         set status(value) {
//           this.element.dataset.status = value
//         }
//       }
//       row.push(tile)
//     }
//     board.push(row)
//   }
//   return board
// }

// function getMinePositions(boardSize, numberOfMines) {
//   const positions = []

//   while (positions.length < numberOfMines) {
//     const position = {
//       x: randomNumber(boardSize),
//       y: randomNumber(boardSize)
//     }

//     if (!positions.some(positionMatch.bind(null, position))) {
//       positions.push(position)
//     }
//   }

//   return positions
// }

// function positionMatch(a, b) {
//   return a.x === b.x && a.y === b.y
// }

// function randomNumber(size) {
//   return Math.floor(Math.random() * size)
// }

// function nearbyTiles(board, { x, y }) {
//   const tiles = []

//   for (let xOffset = -1; xOffset <= 1; xOffset++) {
//     for (let yOffset = -1; yOffset <= 1; yOffset++) {
//       const tile = board[x + xOffset]?.[y + yOffset]
//       if (tile) tiles.push(tile)
//     }
//   }

//   return tiles
// }

// board.forEach((row) => {
//   row.forEach((tile) => {
//     console.log(tile.element)
//     boardElement.append(tile.element)
//   })
// })
// boardElement.style.setProperty("--size", BOARD_SIZE)
// minesLeftText.textContent = NUMBER_OF_MINES
