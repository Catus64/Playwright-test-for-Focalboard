// tests/auth.spec.js
const { test, expect } = require('@playwright/test');

// Override storageState for auth tests only — start fresh with no session
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('F001 - Login Authentication', () => {

  test('TC-F001-04: Access protected route without login', async ({ browser }) => {
  // Create a fresh context with no session
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate directly to boards without logging in
  await page.goto('http://localhost:8000');
  await page.waitForLoadState('networkidle');

  // Verify redirected to login page
  await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();

  await context.close();
});

// ─────────────────────────────────────────
// TC-F001-05: Session persistence after tab close
// ─────────────────────────────────────────
test('TC-F001-05: Session persistence after tab close', async ({ browser }) => {
  // Create context with saved session
  const context = await browser.newContext({ storageState: 'auth.json' });
  const page = await context.newPage();

  // Open the site
  await page.goto('http://localhost:8000');
  await page.waitForLoadState('networkidle');

  // Simulate tab close by closing the page
  await page.close();

  // Open a new page in the same context (same session)
  const newPage = await context.newPage();
  await newPage.goto('http://localhost:8000');
  await newPage.waitForLoadState('networkidle');

  // Verify still logged in — sidebar visible, no login page
  await expect(newPage.locator('.Sidebar')).toBeVisible();
  await expect(newPage.getByRole('button', { name: 'Log in' })).not.toBeVisible();

  await context.close();
});

// ─────────────────────────────────────────
// TC-F001-06: Logout clears session
// ─────────────────────────────────────────
test('TC-F001-06: Logout clears session', async ({ browser }) => {
  // Start with logged in session
  const context = await browser.newContext({ storageState: 'auth.json' });
  const page = await context.newPage();

  await page.goto('http://localhost:8000');
  await page.waitForLoadState('networkidle');

  // 🔍 FIND WITH CODEGEN: click profile/avatar icon
  // 🔍 FIND WITH CODEGEN: click logout button
  await page.getByRole('button', { name: 'menuwrapper' }).first().click();
  await page.getByRole('button', { name: 'Log out' }).click();
  await page.waitForLoadState('networkidle');

  // Verify redirected to login page
  await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();

  // Try navigating to boards — should redirect to login
  await page.goto('http://localhost:8000');
  await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();

  await context.close();
});

  test('TC-F001-01: Login with valid credentials', async ({ page }) => {
    // Go to the login page
    await page.goto('/');

    // Fill in the form (same idea as send_keys in Selenium)
    await page.getByRole('textbox', { name: 'Enter username' }).fill('dogdogdog');
    await page.getByRole('textbox', { name: 'Enter password' }).fill('dogdogdog');

    // Click login button
    await page.getByRole('button', { name: 'Log in' }).click();

    // Wait and assert we're on the dashboard
    await expect(page.locator('.Sidebar')).toBeVisible();
  });

  test('TC-F001-02: Login with wrong password shows error', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('textbox', { name: 'Enter username' }).fill('dogdogdog');
    await page.getByRole('textbox', { name: 'Enter password' }).fill('wrongpassword');
    await page.getByRole('button', { name: 'Log in' }).click();

    // Check error message appears
    await expect(page.locator('text=Login failed')).toBeVisible();
  });

  test('TC-F001-03: Login with empty fields shows error', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Log in' }).click();

    // Form should not submit
    await expect(page.locator('.Sidebar')).not.toBeVisible();
  });

});
