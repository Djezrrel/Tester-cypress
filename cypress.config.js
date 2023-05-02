const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    
    cy:viewport('iphone-6', 'landscape')
    /*viewportHeight: 1000,
    viewportWidth: 400,
    tamanho da viewPort
    */

    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
});


