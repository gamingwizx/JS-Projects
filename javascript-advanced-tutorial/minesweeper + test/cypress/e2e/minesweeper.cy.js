import { TILE_STATUSES } from "../../script.js"
import { times } from "lodash/fp"

describe("user left clicks tile", () => {
  describe("when the tile is a mine", () => {
    it("reveals all mines, displays 'you lose'", () => {
      cy.visitBoard([
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
          { x: 2, y: 1, minePosition: true, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 2, minePosition: true, status: TILE_STATUSES.HIDDEN }
        ]
      ])

      cy.get("[data-x='2'][data-y='2']").click()
      cy.get("[data-x='2'][data-y='1']").should(
        "have.attr",
        "data-status",
        TILE_STATUSES.MINE
      )
      cy.get("[data-x='2'][data-y='2']").should(
        "have.attr",
        "data-status",
        TILE_STATUSES.MINE
      )
      cy.get(".subtext").should("have.text", "You lose!")
    })
  })

  describe("when the tile is not a mine", () => {
    it("when tile nearby has mine, displays number of mines on tile", () => {
      cy.visitBoard([
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
      ])

      //click tile
      //show number
      //if got number, then correct

      //get tile
      cy.get("[data-x='1'][data-y='1']").click()
      cy.get('[data-status="number"]').should("have.text", "1")
    })

    it("when tile nearby has no mine, reveal tiles until tiles with number is revealed", () => {
      cy.visitBoard([
        [
          { x: 0, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 3, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 4, minePosition: false, status: TILE_STATUSES.HIDDEN }
        ],
        [
          { x: 1, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 3, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 4, minePosition: false, status: TILE_STATUSES.HIDDEN }
        ],
        [
          { x: 2, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 3, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 4, minePosition: false, status: TILE_STATUSES.HIDDEN }
        ],
        [
          { x: 3, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 3, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 3, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 3, y: 3, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 3, y: 4, minePosition: false, status: TILE_STATUSES.HIDDEN }
        ],
        [
          { x: 4, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 4, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 4, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 4, y: 3, minePosition: true, status: TILE_STATUSES.HIDDEN },
          { x: 4, y: 4, minePosition: true, status: TILE_STATUSES.HIDDEN }
        ]
      ])

      cy.get("[data-x='4'][data-y='0']").click()

      //Reveal all tiles without number
      times((x) => {
        times((y) => {
          if (
            (x === 0 || x === 1 || x === 2 || x === 3 || x === 4) &&
            (y == 0 || y == 1)
          ) {
            cy.get(`[data-x="${x}"][data-y="${y}"]`)
              .should("have.attr", "data-status", TILE_STATUSES.NUMBER)
              .and("have.text", "")
          }
        }, 5)
      }, 5)

      times((x) => {
        times((y) => {
          if ((x === 0 || x == 1 || x === 2) && (y == 2 || y == 3 || y == 4)) {
            cy.get(`[data-x="${x}"][data-y="${y}"]`)
              .should("have.attr", "data-status", TILE_STATUSES.NUMBER)
              .and("have.text", "")
          }
        }, 5)
      }, 5)

      times((x) => {
        times((y) => {
          if (
            (x === 3 && (y === 2 || y === 3 || y === 4)) ||
            (x == 4 && y == 2)
          ) {
            cy.get(`[data-x="${x}"][data-y="${y}"]`).should(
              "have.attr",
              "data-status",
              TILE_STATUSES.NUMBER
            )
          }
        }, 5)
      }, 5)

      times((x) => {
        times((y) => {
          if (x === 4 && (y === 3 || y === 4)) {
            cy.get(`[data-x="${x}"][data-y="${y}"]`).should(
              "have.attr",
              "data-status",
              TILE_STATUSES.HIDDEN
            )
          }
        }, 5)
      }, 5)

      cy.get(".subtext").should("have.text", "You win!")
    })
  })
})

describe("user right clicks tile", () => {
  describe("when tile is unmarked", () => {
    it("it marks the tile", () => {
      cy.visitBoard([
        [
          { x: 0, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 3, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 4, minePosition: false, status: TILE_STATUSES.HIDDEN }
        ],
        [
          { x: 1, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 3, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 4, minePosition: false, status: TILE_STATUSES.HIDDEN }
        ],
        [
          { x: 2, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 3, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 4, minePosition: false, status: TILE_STATUSES.HIDDEN }
        ],
        [
          { x: 3, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 3, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 3, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 3, y: 3, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 3, y: 4, minePosition: false, status: TILE_STATUSES.HIDDEN }
        ],
        [
          { x: 4, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 4, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 4, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 4, y: 3, minePosition: true, status: TILE_STATUSES.HIDDEN },
          { x: 4, y: 4, minePosition: true, status: TILE_STATUSES.HIDDEN }
        ]
      ])

      cy.get('[data-x="0"][data-y="0"]').rightclick()
      cy.get('[data-x="0"][data-y="0"]').should(
        "have.attr",
        "data-status",
        TILE_STATUSES.MARKED
      )
    })
  })

  describe("when tile is marked", () => {
    it("it unmarks the tile", () => {
      cy.visitBoard([
        [
          { x: 0, y: 0, minePosition: false, status: TILE_STATUSES.MARKED },
          { x: 0, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 3, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 0, y: 4, minePosition: false, status: TILE_STATUSES.HIDDEN }
        ],
        [
          { x: 1, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 3, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 1, y: 4, minePosition: false, status: TILE_STATUSES.HIDDEN }
        ],
        [
          { x: 2, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 3, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 2, y: 4, minePosition: false, status: TILE_STATUSES.HIDDEN }
        ],
        [
          { x: 3, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 3, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 3, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 3, y: 3, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 3, y: 4, minePosition: false, status: TILE_STATUSES.HIDDEN }
        ],
        [
          { x: 4, y: 0, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 4, y: 1, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 4, y: 2, minePosition: false, status: TILE_STATUSES.HIDDEN },
          { x: 4, y: 3, minePosition: true, status: TILE_STATUSES.HIDDEN },
          { x: 4, y: 4, minePosition: true, status: TILE_STATUSES.HIDDEN }
        ]
      ])

      cy.get('[data-x="0"][data-y="0"]').rightclick()
      cy.get('[data-x="0"][data-y="0"]').should(
        "have.attr",
        "data-status",
        TILE_STATUSES.HIDDEN
      )
    })
  })
})

it("test", () => {
  cy.visitBoard([
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
  ])
})
