const { chromium } = require('@playwright/test');

module.exports = async function globalSetup() {
  const browser = await chromium.launch();

  // ─────────────────────────────────────────
  // Login User A — dogdogdog
  // ─────────────────────────────────────────
  const pageA = await browser.newPage();
  await pageA.goto('http://localhost:8000');
  await pageA.getByRole('textbox', { name: 'Enter username' }).fill('dogdogdog');
  await pageA.getByRole('textbox', { name: 'Enter password' }).fill('dogdogdog');
  await pageA.getByRole('button', { name: 'Log in' }).click();
  await pageA.waitForSelector('.Sidebar');
  await pageA.context().storageState({ path: 'auth.json' });
  console.log('User A session saved');
  await pageA.close();

  // ─────────────────────────────────────────
  // Login User B — testuser2
  // ─────────────────────────────────────────
  const pageB = await browser.newPage();
  await pageB.goto('http://localhost:8000');
  await pageB.getByRole('textbox', { name: 'Enter username' }).fill('something');
  await pageB.getByRole('textbox', { name: 'Enter password' }).fill('something');
  await pageB.getByRole('button', { name: 'Log in' }).click();
  await pageB.waitForSelector('.Sidebar');
  await pageB.context().storageState({ path: 'auth2.json' });
  console.log('User B session saved');
  await pageB.close();

  await browser.close();
};