// playwright.config.js
module.exports = {
  testDir: "./tests",
  retries: process.env.CI ? 2 : 0, // set to 2 when running on CI
  use: {
    headless: false,
    trace: process.env.CI ? "retain-on-failure" : "on",
    video: process.env.CI ? "off" : "on", // disabled on ci for performance reasons, use trace viewer instead
    screenshot: process.env.CI ? "off" : "on", //
  },
};
