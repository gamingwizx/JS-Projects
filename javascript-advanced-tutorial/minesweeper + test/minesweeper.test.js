import {
  createBoard,
  revealTile,
  revealMines,
  checkWin,
  checkLost,
  markTile,
  TILE_STATUSES
} from "./minesweeper.js"

describe("#createBoard", () => {
  test("generates the rows and columns of tiles correctly, together with mine position", () => {
    const board = [
      [
        { x: 0, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 0, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 0, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ],
      [
        { x: 1, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ],
      [
        { x: 2, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 2, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 2, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ]
    ]
    const expectedBoard = [
      [
        { x: 0, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 0, y: 1, minePosition: true, status: TILE_STATUSES.HIDDEN },
        { x: 0, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ],
      [
        { x: 1, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ],
      [
        { x: 2, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 2, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 2, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ]
    ]
    const minePosition = [{ x: 0, y: 1 }]

    expect(createBoard(3, minePosition)).toStrictEqual(expectedBoard)
  })
})

describe("#markTile", () => {
  test("able to unmark tile", () => {
    const board = [
      [
        { x: 0, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 0, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 0, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ],
      [
        { x: 1, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ],
      [
        { x: 2, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 2, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 2, y: 2, minePosition: false, status: TILE_STATUSES.MARKED }
      ]
    ]
    const expectedBoard = [
      [
        { x: 0, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 0, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 0, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ],
      [
        { x: 1, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ],
      [
        { x: 2, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 2, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 2, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ]
    ]
    const markedTile = {
      x: 2,
      y: 2,
      minePosition: false,
      status: TILE_STATUSES.HIDDEN
    }
    expect(markTile(board, markedTile, markedTile)).toStrictEqual(expectedBoard)
  })

  test("able to mark tile", () => {
    const board = [
      [
        { x: 0, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 0, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ],
      [
        { x: 1, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ]
    ]
    const expectedBoard = [
      [
        { x: 0, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 0, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ],
      [
        { x: 1, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 1, minePosition: false, status: TILE_STATUSES.NUMBER }
      ]
    ]
    const replaceTile = {
      x: 1,
      y: 1,
      minePosition: false,
      status: TILE_STATUSES.NUMBER
    }
    expect(markTile(board, replaceTile, replaceTile)).toStrictEqual(
      expectedBoard
    )
  })
})

describe("#revealTile", () => {
  describe("with hidden tile", () => {
    test("when the tile clicked is a mine, it reveals the mine", () => {
      const board = [
        [
          { x: 0, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
        ],
        [
          { x: 1, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
        ],
        [
          { x: 2, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 2, minePosition: true, status: TILE_STATUSES.HIDDEN }
        ]
      ]
      const expectedBoard = [
        [
          {
            x: 0,
            y: 0,
            minePosition: false,
            status: TILE_STATUSES.HIDDEN
          },
          {
            x: 0,
            y: 1,
            minePosition: false,
            status: TILE_STATUSES.HIDDEN
          },
          {
            x: 0,
            y: 2,
            minePosition: false,
            status: TILE_STATUSES.HIDDEN
          }
        ],
        [
          {
            x: 1,
            y: 0,
            minePosition: false,
            status: TILE_STATUSES.HIDDEN
          },
          {
            x: 1,
            y: 1,
            minePosition: false,
            status: TILE_STATUSES.HIDDEN
          },
          {
            x: 1,
            y: 2,
            minePosition: false,
            status: TILE_STATUSES.HIDDEN
          }
        ],
        [
          {
            x: 2,
            y: 0,
            minePosition: false,
            status: TILE_STATUSES.HIDDEN
          },
          {
            x: 2,
            y: 1,
            minePosition: false,
            status: TILE_STATUSES.HIDDEN
          },
          { x: 2, y: 2, minePosition: true, status: TILE_STATUSES.MINE }
        ]
      ]
      const replaceTile = {
        x: 2,
        y: 2,
        minePosition: false,
        status: TILE_STATUSES.NUMBER
      }
      expect(revealTile(board, replaceTile, replaceTile)).toStrictEqual(
        expectedBoard
      )
    })
    test("when the tile clicked is not a mine, but nearby has mine, it reveals the number", () => {
      const board = [
        [
          { x: 0, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
        ],
        [
          { x: 1, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 1, minePosition: true, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
        ],
        [
          { x: 2, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
        ]
      ]
      const expectedBoard = [
        [
          { x: 0, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          {
            x: 0,
            y: 1,
            minePosition: false,
            status: TILE_STATUSES.NUMBER,
            adjacentMinesCount: 1
          },
          { x: 0, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
        ],
        [
          { x: 1, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 1, minePosition: true, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
        ],
        [
          { x: 2, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
        ]
      ]
      const newTile = {
        x: 0,
        y: 1,
        minePosition: false,
        status: TILE_STATUSES.NUMBER
      }

      expect(revealTile(board, newTile)).toStrictEqual(expectedBoard)
      //create your initial board, with tiles are hidden
      //create expected board, with tiles are hidden, and the specified position is status = number
      //pass the board, numbered tile with (x,y,minePosition:false and status:number) into revealTile, and the expectedResult is the expected board
    })
    test("when the tile clicked is not a mine, but nearby has no mine, it reveals more tiles", () => {
      const board = [
        [
          { x: 0, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
        ],
        [
          { x: 1, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
        ],
        [
          { x: 2, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 2, minePosition: true, status: TILE_STATUSES.HIDDEN }
        ]
      ]
      const expectedBoard = [
        [
          {
            x: 0,
            y: 0,
            minePosition: false,
            status: TILE_STATUSES.NUMBER,
            adjacentMinesCount: 0
          },
          {
            x: 0,
            y: 1,
            minePosition: false,
            status: TILE_STATUSES.NUMBER,
            adjacentMinesCount: 0
          },
          {
            x: 0,
            y: 2,
            minePosition: false,
            status: TILE_STATUSES.NUMBER,
            adjacentMinesCount: 0
          }
        ],
        [
          {
            x: 1,
            y: 0,
            minePosition: false,
            status: TILE_STATUSES.NUMBER,
            adjacentMinesCount: 0
          },
          {
            x: 1,
            y: 1,
            minePosition: false,
            status: TILE_STATUSES.NUMBER,
            adjacentMinesCount: 1
          },
          {
            x: 1,
            y: 2,
            minePosition: false,
            status: TILE_STATUSES.NUMBER,
            adjacentMinesCount: 1
          }
        ],
        [
          {
            x: 2,
            y: 0,
            minePosition: false,
            status: TILE_STATUSES.NUMBER,
            adjacentMinesCount: 0
          },
          {
            x: 2,
            y: 1,
            minePosition: false,
            status: TILE_STATUSES.NUMBER,
            adjacentMinesCount: 1
          },
          { x: 2, y: 2, minePosition: true, status: TILE_STATUSES.HIDDEN }
        ]
      ]
      const replaceTile = {
        x: 0,
        y: 0,
        minePosition: false,
        status: TILE_STATUSES.NUMBER
      }
      expect(revealTile(board, replaceTile, replaceTile)).toStrictEqual(
        expectedBoard
      )
    })
  })

  test("with marked tiles, it does nothing when clicked again", () => {
    const board = [
      [
        { x: 0, y: 0, minePosition: false, status: TILE_STATUSES.MARKED },
        { x: 0, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 0, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ],
      [
        { x: 1, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ],
      [
        { x: 2, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 2, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 2, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ]
    ]
    const newTile = {
      x: 0,
      y: 0,
      minePosition: false,
      status: TILE_STATUSES.MARKED
    }

    expect(revealTile(board, newTile)).toStrictEqual(board)
  })
  test("with number tiles, it does nothing when clicked again", () => {
    //create a board with the list of tiles (x,y,minePosition and status)
    //set the status to number
    //pass the board and the position to revealTile, expected result would be the board as well
    const board = [
      [
        { x: 0, y: 0, minePosition: false, status: TILE_STATUSES.NUMBER },
        { x: 0, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 0, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ],
      [
        { x: 1, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ],
      [
        { x: 2, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 2, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 2, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ]
    ]
    const newTile = {
      x: 0,
      y: 0,
      minePosition: false,
      status: TILE_STATUSES.NUMBER
    }

    expect(revealTile(board, newTile)).toStrictEqual(board)
  })
  test("with mines tiles, it does nothing when clicked again", () => {
    const board = [
      [
        { x: 0, y: 0, minePosition: false, status: TILE_STATUSES.MINE },
        { x: 0, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 0, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ],
      [
        { x: 1, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ],
      [
        { x: 2, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 2, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 2, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ]
    ]
    const newTile = {
      x: 0,
      y: 0,
      minePosition: true,
      status: TILE_STATUSES.MINE
    }

    expect(revealTile(board, newTile)).toStrictEqual(board)
  })
})

describe("#checkWin", () => {
  test("when there are no more hidden tiles, except mines, will return true", () => {
    const board = [
      [
        {
          x: 0,
          y: 0,
          minePosition: false,
          status: TILE_STATUSES.NUMBER,
          adjacentMinesCount: 0
        },
        {
          x: 0,
          y: 1,
          minePosition: false,
          status: TILE_STATUSES.NUMBER,
          adjacentMinesCount: 0
        },
        {
          x: 0,
          y: 2,
          minePosition: false,
          status: TILE_STATUSES.NUMBER,
          adjacentMinesCount: 0
        }
      ],
      [
        {
          x: 1,
          y: 0,
          minePosition: false,
          status: TILE_STATUSES.NUMBER,
          adjacentMinesCount: 0
        },
        {
          x: 1,
          y: 1,
          minePosition: false,
          status: TILE_STATUSES.NUMBER,
          adjacentMinesCount: 1
        },
        {
          x: 1,
          y: 2,
          minePosition: false,
          status: TILE_STATUSES.NUMBER,
          adjacentMinesCount: 1
        }
      ],
      [
        {
          x: 2,
          y: 0,
          minePosition: false,
          status: TILE_STATUSES.NUMBER,
          adjacentMinesCount: 0
        },
        {
          x: 2,
          y: 1,
          minePosition: false,
          status: TILE_STATUSES.NUMBER,
          adjacentMinesCount: 1
        },
        { x: 2, y: 2, minePosition: true, status: TILE_STATUSES.HIDDEN }
      ]
    ]
    const replaceTile = {
      x: 0,
      y: 0,
      minePosition: false,
      status: TILE_STATUSES.NUMBER
    }
    expect(checkWin(board)).toBe(true)
  })

  test("when there are hidden tiles, which are not mines, will return false", () => {
    //declare board with hidden tiles (with minePosition = false) and numbers
    //pass the board into checkWin(board), expect the result to be false toBeFalsy
    const board = [
      [
        { x: 0, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 0, y: 1, minePosition: false, status: TILE_STATUSES.NUMBER },
        { x: 0, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ],
      [
        { x: 1, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ],
      [
        { x: 2, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 2, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 2, y: 2, minePosition: true, status: TILE_STATUSES.HIDDEN }
      ]
    ]

    expect(checkWin(board)).toBeFalsy()
  })

  test("when there are no more hidden tiles, and the mines are marked, will return true", () => {})
})

describe("#checkLose", () => {
  test("when the mines are revealed on the board", () => {
    const board = [
      [
        {
          x: 0,
          y: 0,
          minePosition: false,
          status: TILE_STATUSES.HIDDEN
        },
        {
          x: 0,
          y: 1,
          minePosition: false,
          status: TILE_STATUSES.HIDDEN
        },
        {
          x: 0,
          y: 2,
          minePosition: false,
          status: TILE_STATUSES.HIDDEN
        }
      ],
      [
        {
          x: 1,
          y: 0,
          minePosition: false,
          status: TILE_STATUSES.HIDDEN
        },
        {
          x: 1,
          y: 1,
          minePosition: false,
          status: TILE_STATUSES.HIDDEN
        },
        {
          x: 1,
          y: 2,
          minePosition: false,
          status: TILE_STATUSES.HIDDEN
        }
      ],
      [
        {
          x: 2,
          y: 0,
          minePosition: false,
          status: TILE_STATUSES.HIDDEN
        },
        {
          x: 2,
          y: 1,
          minePosition: false,
          status: TILE_STATUSES.HIDDEN
        },
        { x: 2, y: 2, minePosition: true, status: TILE_STATUSES.MINE }
      ]
    ]
    const replaceTile = {
      x: 0,
      y: 0,
      minePosition: false,
      status: TILE_STATUSES.NUMBER
    }
    expect(checkLost(board)).toBe(true)
  })

  test("when the mines are not revealed on the board", () => {
    const board = [
      [
        { x: 0, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 0, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 0, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ],
      [
        { x: 1, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN }
      ],
      [
        { x: 2, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 2, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
        { x: 2, y: 2, minePosition: true, status: TILE_STATUSES.HIDDEN }
      ]
    ]

    expect(checkLost(board)).toBeFalsy()
  })
})
