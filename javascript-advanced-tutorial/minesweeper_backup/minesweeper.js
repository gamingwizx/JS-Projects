const TILE_STATUSES = {
  HIDDEN: "hidden",
  NUMBER: "number",
  MINE: "mine",
  MARKED: "marked"
}

export const BOARD_SIZE = 10
export const NUMBER_OF_MINES = 10

const title = document.querySelector(".subtext")

export function createBoard() {
  /* 
  1) generate the div, the x and y position based on the board_size
  2) generate mine position from it, and append the mine position in the board_size
  */

  const minePositions = generateMinePosition()

  const boardList = []
  for (let x = 0; x < BOARD_SIZE; x++) {
    const row = []
    for (let y = 0; y < BOARD_SIZE; y++) {
      const minePosition = minePositions.some(
        checkPosition.bind(null, { x: x, y: y })
      )

      const tile = document.createElement("div")
      tile.dataset.status = TILE_STATUSES.HIDDEN
      const tileElement = {
        element: tile,
        x: x,
        y: y,
        minePosition: minePosition
      }
      row.push(tileElement)
    }
    boardList.push(row)
  }

  return boardList
}

export function markTile(tile) {
  if (tile.dataset.status !== TILE_STATUSES.MARKED) {
    tile.dataset.status = TILE_STATUSES.MARKED
  } else {
    tile.dataset.status = TILE_STATUSES.HIDDEN
  }
}

export function revealTiles(board, tile) {
  /* 
    1) check surrounding tiles
    2) if there are mines, then set number
    3) if no, recurse through the function again
  */

  if (tile.element.dataset.status !== TILE_STATUSES.HIDDEN) return

  if (tile.minePosition) {
    tile.element.dataset.status = TILE_STATUSES.MINE
    return
  }

  const adjacentTiles = getAdjacentTiles(board, tile)
  const numberOfMines = adjacentTiles.filter(
    (element) => element.minePosition
  ).length

  tile.element.dataset.status = TILE_STATUSES.NUMBER

  if (numberOfMines > 0) {
    tile.element.innerHTML = numberOfMines
  } else {
    //where can i get the tile?
    //how to loop through the function
    adjacentTiles.forEach(revealTiles.bind(null, board))
  }
}

export function checkWin(board) {
  return board.every((row) => {
    return row.every((tile) => {
      return (
        tile.element.dataset.status === TILE_STATUSES.NUMBER ||
        (tile.minePosition &&
          (tile.element.dataset.status === TILE_STATUSES.HIDDEN ||
            tile.element.dataset.status === TILE_STATUSES.MARKED))
      )
    })
  })
}

export function checkLost(board) {
  return board.some((row) => {
    return row.some((tile) => {
      return tile.element.dataset.status === TILE_STATUSES.MINE
    })
  })
}

export function revealMines(board) {
  board.forEach((row) => {
    row.forEach((element) => {
      if (element.minePosition) {
        element.element.dataset.status = TILE_STATUSES.MINE
      }
    })
  })
}

function getAdjacentTiles(board, tile) {
  const adjacentTiles = []
  for (let offsetX = -1; offsetX <= 1; offsetX++) {
    for (let offsetY = -1; offsetY <= 1; offsetY++) {
      //How to get the position using x and y, and push the position into the adjacentTiles

      const positionExist = board[tile.x + offsetX]?.[tile.y + offsetY]

      if (positionExist) adjacentTiles.push(positionExist)
    }
  }
  return adjacentTiles
}

export function generateMinePosition() {
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

function checkPosition(existingPosition, newPosition) {
  return (
    existingPosition.x === newPosition.x && existingPosition.y === newPosition.y
  )
}

function randomNumber(number) {
  return Math.floor(Math.random() * number)
}
