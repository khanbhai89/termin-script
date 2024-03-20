// playwright.config.js
module.exports = {
  testDir: './tests',
  use: {
    headless: true,
  },
  reporter: [
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
};
