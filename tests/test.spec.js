const { test, expect } = require('@playwright/test');

test('page screenshot comparison', async ({ page }) => {
  // Navigate to the URL
  await page.goto('https://www22.muenchen.de/kvr/termin/index.php?cts=');

  await page.click('text=Meldeangelegenheiten ');
  await page.selectOption(`[name='CASETYPES[An- oder Ummeldung - Einzelperson]']`, '1');
  await page.click('input.WEB_APPOINT_FORWARDBUTTON');
  await expect(page).toHaveScreenshot('./pageImages/screenshot1.png');
  await page.locator('.navButton').nth(1).click();
  await expect(page).toHaveScreenshot('./pageImages/screenshot2.png');
  await page.locator('.navButton').nth(3).click();
  await expect(page).toHaveScreenshot('./pageImages/screenshot3.png');
});
