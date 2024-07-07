const { defineConfig } = require("cypress")

module.exports = defineConfig({
  viewportWidth: 450,
  viewportHeight: 500,
  e2e: {
    setupNodeEvents(on, config) {},
    baseURL: "http://localhost:5500"
  }
})
