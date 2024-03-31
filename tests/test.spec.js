const { test, expect } = require("@playwright/test");
const ac = require("@antiadmin/anticaptchaofficial");

test.skip("Appointment available for @munich", async ({ page }) => {
  // Navigate to the URL
  await page.goto("https://www22.muenchen.de/kvr/termin/index.php?cts=");

  await page.click("text=Meldeangelegenheiten ");
  await page.selectOption(
    `[name='CASETYPES[An- oder Ummeldung - Einzelperson]']`,
    "1"
  );
  await page.click("input.WEB_APPOINT_FORWARDBUTTON");
  await page.waitForTimeout(1000);
  const maskedElement = await page.locator(".navButton");
  await expect(page).toHaveScreenshot({
    path: "./pageImages/screenshot1.png",
    fullPage: true,
    mask: [maskedElement],
  });
  await page.locator(".navButton").nth(1).click();
  await page.waitForTimeout(1000);
  await expect(page).toHaveScreenshot({
    path: "./pageImages/screenshot2.png",
    fullPage: true,
    mask: [maskedElement],
  });
  await page.locator(".navButton").nth(3).click();
  await page.waitForTimeout(1000);
  await expect(page).toHaveScreenshot({
    path: "./pageImages/screenshot3.png",
    fullPage: true,
    mask: [maskedElement],
  });
});

test.skip("Appointment available for @ingolstadt", async ({ page }) => {
  await page.goto("https://www.ingolstadt.de/tevisweb/?rs");

  await page.click("#buttonfunktionseinheit-5");
  await page.click("#header_concerns_accordion-7202");
  await page.click("#button-plus-1043");
  await page.waitForSelector("#WeiterButton");
  await page.locator("#WeiterButton").scrollIntoViewIfNeeded();
  await page.click("#WeiterButton");
  await page.waitForSelector("#OKButton");
  await page.click("#OKButton");
  await page.waitForSelector("#suggest_location_summary");

  const timeSlot = await page.locator("#suggest_location_summary").innerText();
  const regex = /(\d{2})\.(\d{2})\.(\d{4}), (\d{2}):(\d{2})/;
  const match = timeSlot.match(regex);
  if (match) {
    const day = match[1];
    const month = match[2];
    const year = match[3];
    const hour = match[4];
    const minute = match[5];

    const extractedDate = new Date(year, month - 1, day, hour, minute);

    const comparisonDate = new Date(2024, 4, 9);

    if (extractedDate < comparisonDate) {
      console.log("The date available is", extractedDate);
      throw new Error("The extracted date and time are before May 9th, 2024.");
    } else {
      console.log("The date available is", extractedDate);
    }
  } else {
    console.log("No date and time found in the string.");
  }
});

test.describe(() => {
  // All tests in this describe group will get 2 retry attempts.
  test.describe.configure({ retries: 2 });

  test(
    "Create Karachi Consulate Appointment @karachi",
    async ({ page }) => {
      await page.goto(
        "https://service2.diplo.de/rktermin/extern/appointment_showMonth.do?locationCode=kara&realmId=772&categoryId=1417"
      );

      let attempts = 0;
      const maxAttempts = 4;
      let success = false;

      while (attempts < maxAttempts && !success) {
        try {
          const captcha = await page.locator("captcha");
          const captchaLocator = await captcha
            .locator("div")
            .getAttribute("style");
          const regex = /data:image\/jpg;base64,(.*?)'\)/;
          const matches = captchaLocator.match(regex);

          const base64Data = matches[1];
          ac.setAPIKey(process.env.API_KEY);
          console.log(base64Data);
          const text = await ac.solveImage(base64Data, true);

          await page
            .locator("#appointment_captcha_month_captchaText")
            .fill(text);
          await page
            .locator("#appointment_captcha_month_appointment_showMonth")
            .click();

          await await page
            .locator(
              "#content > div.wrapper > h2:nth-child(3) > a:nth-child(2)"
            )
            .waitFor({ state: "visible" });
          // If the above line does not throw, we assume success
          success = true;
        } catch (error) {
          attempts++;
          console.log(`Attempt ${attempts} failed; retrying...`);
        }
      }
      await expect(page).toHaveScreenshot();

      await page
        .locator("#content > div.wrapper > h2:nth-child(3) > a:nth-child(2)")
        .click();
      await expect(page).toHaveScreenshot();
    },
    { retries: 3 }
  );
});
