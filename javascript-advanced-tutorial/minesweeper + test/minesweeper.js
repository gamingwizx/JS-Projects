import { times, range } from "lodash/fp"

export const TILE_STATUSES = {
  HIDDEN: "hidden",
  NUMBER: "number",
  MINE: "mine",
  MARKED: "marked"
}

const title = document.querySelector(".subtext")

export function createBoard(BOARD_SIZE, minePosition) {
  return times((x) => {
    return times((y) => {
      return {
        x,
        y,
        minePosition: minePosition.some(
          (object) => object.x === x && object.y === y
        ),
        status: TILE_STATUSES.HIDDEN
      }
    }, BOARD_SIZE)
  }, BOARD_SIZE)
}

export function markTile(board, { x, y }, newTile) {
  return board.map((row) => {
    return row.map((tile) => {
      if (tile.x === parseInt(x) && tile.y === parseInt(y)) {
        return newTile
      }
      return tile
    })
  })
}

function replaceTiles(board, { x, y }, newTile) {
  return board.map((row) => {
    return row.map((tile) => {
      if (tile.x == x && tile.y == y) {
        return newTile
      }
      return tile
    })
  })
}

export function revealTile(board, { x, y }) {
  const tile = board[x][y]
  if (tile.status !== TILE_STATUSES.HIDDEN) return board

  if (tile.minePosition) {
    return replaceTiles(
      board,
      { x, y },
      { ...tile, status: TILE_STATUSES.MINE }
    )
  }

  const adjacentTiles = nearbyTiles(board, tile)
  const mines = adjacentTiles.filter((t) => t.minePosition)
  const newBoard = replaceTiles(
    board,
    { x, y },
    { ...tile, status: TILE_STATUSES.NUMBER, adjacentMinesCount: mines.length }
  )
  if (mines.length === 0) {
    return adjacentTiles.reduce((b, t) => {
      return revealTile(b, t)
    }, newBoard)
  }
  return newBoard
}

export function revealAllMines(board) {
  return board.map((row) => {
    return row.map((tile) => {
      if (tile.minePosition) {
        return { ...tile, status: TILE_STATUSES.MINE }
      }
      return tile
    })
  })
}

export function checkWin(board) {
  return board.every((row) => {
    return row.every((tile) => {
      return (
        tile.status === TILE_STATUSES.NUMBER ||
        (tile.minePosition &&
          (tile.status === TILE_STATUSES.HIDDEN ||
            tile.status === TILE_STATUSES.MARKED))
      )
    })
  })
}

export function checkLost(board) {
  return board.some((row) => {
    return row.some((tile) => {
      return tile.status === TILE_STATUSES.MINE
    })
  })
}

function nearbyTiles(board, { x, y }) {
  const offsets = range(-1, 2)

  return offsets
    .flatMap((xOffset) => {
      return offsets.map((yOffset) => {
        return board[x + xOffset]?.[y + yOffset]
      })
    })
    .filter((tile) => tile != null)
}
