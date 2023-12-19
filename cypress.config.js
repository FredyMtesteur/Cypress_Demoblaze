const { defineConfig } = require("cypress");
projectId: "wmpjkh";

module.exports = defineConfig({
  e2e: {
    projectId: "wmpjkh",
    testIsolation: false, //Permet de ne pas sortir du site après chaque scénario
  },
});
