const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  defaultCommandTimeout: 8000,
  e2e: {
    baseUrl: 'https://itle.buzz/kazan',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
