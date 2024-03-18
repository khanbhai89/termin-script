const { test, expect } = require('@playwright/test');

test('page screenshot comparison', async ({ page }) => {
  // Navigate to the URL
  await page.goto('https://www22.muenchen.de/kvr/termin/index.php?cts=');

  // Take a screenshot of the current state of the page
  const currentScreenshot = await page.screenshot();

  // Compare the screenshot with an expected one
  // The expect API for screenshots allows you to specify comparison options.
  // You might need to have an expected screenshot already saved in your test directory.
  // The path to this screenshot is relative to the test file.
  await expect(currentScreenshot).toHaveScreenshot('expected-screenshot.png', {
    // Options for comparison (these are optional and can be adjusted based on your needs)
    threshold: 0.2, // Allow a small margin of error in the screenshot comparison
    // You can specify more options here based on your comparison needs
  });
});
