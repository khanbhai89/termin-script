const { test, expect } = require('@playwright/test');

test('test for Munich Termin @munich', async ({ page }) => {
  // Navigate to the URL
  await page.goto('https://www22.muenchen.de/kvr/termin/index.php?cts=');

  await page.click('text=Meldeangelegenheiten ');
  await page.selectOption(`[name='CASETYPES[An- oder Ummeldung - Einzelperson]']`, '1');
  await page.click('input.WEB_APPOINT_FORWARDBUTTON');
  await page.waitForTimeout(1000);
  const maskedElement = await page.locator('.navButton'); 
  await expect(page).toHaveScreenshot({ path: './pageImages/screenshot1.png', fullPage: true, mask: [maskedElement] });
  await page.locator('.navButton').nth(1).click();
  await page.waitForTimeout(1000);
  await expect(page).toHaveScreenshot({path:'./pageImages/screenshot2.png', fullPage: true, mask: [maskedElement]} );
  await page.locator('.navButton').nth(3).click();
  await page.waitForTimeout(1000);
  await expect(page).toHaveScreenshot({path: './pageImages/screenshot3.png', fullPage: true, mask: [maskedElement]});
});

test('test for ingolstadt termin @ingolstadt', async ({ page }) => {

  await page.goto('https://www.ingolstadt.de/tevisweb/?rs');

  await page.click('#buttonfunktionseinheit-5');
  await page.click('#header_concerns_accordion-7202');
  await page.click('#button-plus-1043');
  await page.waitForSelector('#WeiterButton');
  await page.locator('#WeiterButton').scrollIntoViewIfNeeded();
  await page.click('#WeiterButton');
  await page.waitForSelector('#OKButton');
  await page.click('#OKButton');
  await page.waitForSelector('#suggest_location_summary');

  const timeSlot = await page.locator('#suggest_location_summary').innerText();
  const regex = /(\d{2})\.(\d{2})\.(\d{4}), (\d{2}):(\d{2})/;
  const match = timeSlot.match(regex);
  if (match) {
    const day = match[1];
    const month = match[2];
    const year = match[3];
    const hour = match[4];
    const minute = match[5];
  
    const extractedDate = new Date(year, month - 1, day, hour, minute);
  
    const comparisonDate = new Date(2024, 7, 9); 
  
    if (extractedDate < comparisonDate) {
      console.log("The date available is", extractedDate);
      throw new Error("The extracted date and time are before May 9th, 2024.");
    } else {
      console.log("The date available is", extractedDate);
      console.log("The date is on or after May 9th, 2024.");
    }
  } else {
    console.log("No date and time found in the string.");
  }
});
