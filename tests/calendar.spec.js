// tests/calendar.spec.js
const { test, expect } = require('@playwright/test');

function getRandomJuneDate() {
  const day = Math.floor(Math.random() * 30) + 1;
  const dayFormatted = day.toString().padStart(2, '0');
  return `06/${dayFormatted}/2026`;
}

test.describe('F005 - Calendar View & Scheduling', () => {

  // ─────────────────────────────────────────
  // TC-F005-01: Switch to Calendar view
  // ─────────────────────────────────────────
  test('TC-F005-01: Switch to Calendar view', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navigate to test board
    await page.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 2' }).click();

    // 🔍 FIND WITH CODEGEN: click the Calendar view tab
    await page.getByLabel('View menu').getByRole('button').filter({ hasText: /^$/ }).click();
    await page.getByRole('button', { name: 'Calendar view' }).click();

    // Verify calendar rendered
    await expect(page.getByRole('textbox', { name: 'Calendar view' })).toBeVisible();
  });

  // ─────────────────────────────────────────
  // TC-F005-02: Add card with due date 
  // ─────────────────────────────────────────
  test('TC-F005-02: Add card with due date ', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 2' }).click();
    await page.getByLabel('View menu').getByRole('button').filter({ hasText: /^$/ }).click();
    await page.getByRole('button', { name: 'Calendar view' }).click();

    // Open the test card
    await page.locator('div').filter({ hasText: /^Test Card$/ }).first().click();

    // 🔍 FIND WITH CODEGEN: click the date property field
    // 🔍 FIND WITH CODEGEN: pick a date from the datepicker
    await page.keyboard.press('Escape');

    // Switch to calendar view and verify card appears on correct date
    await page.getByLabel('View menu').getByRole('button').filter({ hasText: /^$/ }).click();
    await page.getByRole('button', { name: 'Calendar view' }).click();

    // 🔍 FIND WITH CODEGEN: check card appears on the correct date cell
    await expect(page.getByRole('textbox', { name: 'Calendar view' })).toBeVisible();
  });

  // ─────────────────────────────────────────
  // TC-F005-03: Change due date on card
  // ─────────────────────────────────────────
  test('TC-F005-03: Change due date on card', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 3' }).click();
    await page.getByText('Due Date Calendar').click();

    // Open the test card
    // await page.locator('div').filter({ hasText: /^Test Card$/ }).first().click();

    // 🔍 FIND WITH CODEGEN: click existing date property
    // 🔍 FIND WITH CODEGEN: change to a different date
    await page.locator('a').filter({ hasText: 'Test Calendar' }).click();

    // Verify card moved to new date in calendar
    await page.getByRole('button', { name: 'June' }).click();
    const date = getRandomJuneDate();
    await page.getByRole('textbox', { name: 'June' }).click();
    await page.getByRole('textbox', { name: /\/2026/ }).fill(date);
    console.log('Date used:', date);
    await page.keyboard.press('Enter');

    // 🔍 FIND WITH CODEGEN: verify card on new date cell
  });

  // ─────────────────────────────────────────
  // TC-F005-04: Open card from calendar view
  // ─────────────────────────────────────────
  test('TC-F005-04: Open card from calendar view', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 3' }).click();
    await page.getByText('Due Date Calendar').click();

    // Switch to calendar view
    await page.locator('a').filter({ hasText: 'Test Calendar' }).click();


    // 🔍 FIND WITH CODEGEN: click a card visible in the calendar
    // 🔍 FIND WITH CODEGEN: verify card detail modal opens

    // Verify card modal is visible
    // 🔍 FIND WITH CODEGEN: find a unique element inside the card modal
    await expect(page.getByText('StatusDraftTypeFeature')).toBeVisible();
  });

});