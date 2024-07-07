describe("$parseEquation", () => {
  it("add no problem", () => {
    cy.visit("")
    cy.get("#equation").type("4 + 4{enter}")
    cy.get("#results").contains("8")
  })
  it("subtract no problem", () => {
    cy.visit("")
    cy.get("#equation").type("9 - 5{enter}")
    cy.get("#results").contains("4")
  })
  it("multiplication no problem", () => {
    cy.visit("")
    cy.get("#equation").type("9* 5{enter}")
    cy.get("#results").contains("45")
  })
  it("add no problem", () => {
    cy.visit("")
    cy.get("#equation").type("4/4{enter}")
    cy.get("#results").contains("1")
  })
  it("long spaces no problem", () => {
    cy.visit("")
    cy.get("#equation").type("4             /4{enter}")
    cy.get("#results").contains("1")
  })
})
