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
  revealTile,
  revealMines,
  checkWin,
  checkLost,
  markTile,
  revealAllMines
} from "./minesweeper.js"

export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked"
}

document.addEventListener("DOMContentLoaded", function () {
  let testBoard
  if (process.env.NODE_ENV !== "production" && window.testBoard) {
    testBoard = window.testBoard
  }

  const board = document.querySelector(".board")
  const mineCount = document.querySelector("[data-mine-count]")
  const title = document.querySelector(".subtext")

  const NUMBER_OF_MINES =
    testBoard?.flat().filter((e) => e.minePosition).length ?? 2
  const BOARD_SIZE = testBoard?.length ?? 5

  let boardElements =
    testBoard ??
    createBoard(BOARD_SIZE, generateMinePosition(BOARD_SIZE, NUMBER_OF_MINES))

  function render() {
    board.innerHTML = ""
    getTileElements().forEach((element) => {
      board.appendChild(element)
    })

    board.style.setProperty("--size", BOARD_SIZE)
  }
  render()
  board.addEventListener("click", (event) => {
    if (!event.target.matches("[data-status]")) return
    boardElements = revealTile(boardElements, event.target.dataset)

    checkWinLose()
    render()
  })

  board.addEventListener("contextmenu", (event) => {
    if (!event.target.matches("[data-status]")) return
    const markedTile =
      boardElements[event.target.dataset.x][event.target.dataset.y]

    event.preventDefault()
    if (markedTile.status == TILE_STATUSES.MARKED) {
      boardElements = markTile(boardElements, event.target.dataset, {
        ...markedTile,
        status: TILE_STATUSES.HIDDEN
      })
    } else {
      boardElements = markTile(boardElements, event.target.dataset, {
        ...markedTile,
        status: TILE_STATUSES.MARKED
      })
    }
    render()
  })

  function getTileElements() {
    return boardElements.flatMap((row) => {
      return row.map(getTileElement)
    })
  }

  function getTileElement(row) {
    const element = document.createElement("div")
    element.dataset.x = row.x
    element.dataset.y = row.y
    element.dataset.status = row.status
    element.textContent = row.adjacentMinesCount || ""
    return element
  }

  mineCount.innerHTML = NUMBER_OF_MINES

  function stopInteraction() {
    board.addEventListener("click", stopProp, {
      capture: true
    })
  }

  function checkWinLose() {
    const win = checkWin(boardElements)
    const lose = checkLost(boardElements)
    if (win || lose) {
      //addeventlistener to prevent clicking
      stopInteraction()
    }

    if (win) {
      title.innerHTML = "You win!"
    }

    if (lose) {
      title.innerHTML = "You lose!"
      boardElements = revealAllMines(boardElements)
    }
  }

  function stopProp(e) {
    e.stopImmediatePropagation()
  }

  function generateMinePosition(BOARD_SIZE, NUMBER_OF_MINES) {
    const minePositionList = []

    let i = 0

    while (minePositionList.length < NUMBER_OF_MINES) {
      const minePosition = {
        x: randomNumber(BOARD_SIZE),
        y: randomNumber(BOARD_SIZE)
      }

      const checkPositionExist = minePositionList.some(
        checkPosition.bind(null, minePosition)
      )

      if (!checkPositionExist) minePositionList.push(minePosition)
    }

    return minePositionList
  }

  function randomNumber(number) {
    return Math.floor(Math.random() * number)
  }

  function checkPosition(existingPosition, newPosition) {
    return (
      existingPosition.x === newPosition.x &&
      existingPosition.y === newPosition.y
    )
  }
})
