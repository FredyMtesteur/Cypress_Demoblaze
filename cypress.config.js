const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    testIsolation: false, //Permet de ne pas sortir du site après chaque scénario
  },
});
