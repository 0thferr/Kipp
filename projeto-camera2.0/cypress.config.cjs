const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:5173',
    specPattern: 'tests/e2e/**/*.spec.js',
    supportFile: false
  },
  screenshotOnRunFailure: false
})
