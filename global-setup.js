const { chromium } = require('@playwright/test');

module.exports = async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Login once
  await page.goto('http://localhost:8000');
  await page.getByRole('textbox', { name: 'Enter username' }).fill('dogdogdog');
  await page.getByRole('textbox', { name: 'Enter password' }).fill('dogdogdog');
  await page.getByRole('button', { name: 'Log in' }).click();

  // Wait until sidebar is visible (confirms login worked)
  await page.waitForSelector('.Sidebar');

  // Save the session (cookies + localStorage) to a file
  await page.context().storageState({ path: 'auth.json' });

  await browser.close();
};