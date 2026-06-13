// tests/auth.spec.js
const { test, expect } = require('@playwright/test');

// Override storageState for auth tests only — start fresh with no session
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('F001 - Login Authentication', () => {

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
