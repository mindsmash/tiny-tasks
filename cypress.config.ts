import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "sgxb9c",
  videosFolder: "src/main/cypress/videos",
  screenshotsFolder: "src/main/cypress/screenshots",
  fixturesFolder: "src/main/cypress/fixtures",

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./src/main/cypress/plugins/index.ts")(on, config);
    },
    specPattern: "src/main/cypress/integration/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "src/main/cypress/support/index.ts",
    baseUrl: "http://localhost:4200",
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
});
