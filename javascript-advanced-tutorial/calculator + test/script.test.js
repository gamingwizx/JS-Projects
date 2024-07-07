import { parseEquation } from "./parse.js"

describe("#parseEquation", () => {
  describe("with adding", () => {
    test("it returns no problem", () => {
      expect(parseEquation("1 - 1")).toBe(0)
    })
  })
  test("adding no problem", () => {
    expect(parseEquation("1 + 1")).toBe(2)
  })
  test("division no problem", () => {
    expect(parseEquation("2 / 1")).toBe(2)
  })
  test("multiplication no problem", () => {
    expect(parseEquation("1 * 8")).toBe(8)
  })
  test("bracket prioritization no problem", () => {
    expect(parseEquation("1 * 8 + (9 + 9)")).toBe(26)
  })
  test("bracket equation no problem", () => {
    expect(parseEquation("(9 + (9 * 2)) + 9")).toBe(36)
  })
  test("power no problem", () => {
    expect(parseEquation("8 ^ 2")).toBe(64)
  })
  test("figure equation no problem ", () => {
    expect(
      parseEquation(
        "821763871263721673671826378267 * 81782178739817397183721 * 774274872847284234"
      )
    ).toBe(5.203563821201505e70)
  })
})
