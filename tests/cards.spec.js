// tests/cards.spec.js
const { test, expect } = require('@playwright/test');

test.describe('F003 - Card CRUD', () => {

  // ─────────────────────────────────────────
  // TC-F003-01: Create card with valid title
  // ─────────────────────────────────────────
  test('TC-F003-01: Create card with valid title', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navigate to test board
    await page.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 1' }).click();

    // 🔍 FIND WITH CODEGEN: click new card button
    await page.getByRole('button', { name: '+ New' }).click();

    // Verify card appears on board
    // 🔍 FIND WITH CODEGEN: find the new card element
    await expect(page.locator('div').filter({ hasText: /^Untitled$/ }).first()).toBeVisible();
  });

  // ─────────────────────────────────────────
  // TC-F003-03: Edit card title
  // ─────────────────────────────────────────
  test('TC-F003-03: Edit card title', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navigate to test board
    await page.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 1' }).click();

    // 🔍 FIND WITH CODEGEN: click on the card to open it
    await page.locator('div').filter({ hasText: /^Untitled$/ }).first().click();
    await page.getByRole('textbox', { name: 'Untitled' }).fill('Edited Card');
    await page.keyboard.press('Escape');

    // Verify card shows new title on board
    await expect(page.locator('div').filter({ hasText: /^Edited Card$/ }).first()).toBeVisible();
  });

  // ─────────────────────────────────────────
  // TC-F003-04: Add description to card
  // ─────────────────────────────────────────
  test('TC-F003-04: Add description to card', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navigate to test board
    await page.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 1' }).click();

    // Open the card
    await page.locator('div').filter({ hasText: /^Edited Card$/ }).first().click();

    // 🔍 FIND WITH CODEGEN: find description/content area and click it
    await page.getByText('Add a description...').click();
    await page.getByRole('combobox').fill('This is a test description');
    await page.keyboard.press('Escape');
    await page.keyboard.press('Escape');

    // Reopen card and verify description saved
    await page.locator('div').filter({ hasText: /^Edited Card$/ }).first().click();
    await expect(page.getByText('This is a test description')).toBeVisible();
  });
  // ─────────────────────────────────────────
  // TC-F003-05: Move card between columns
  // ─────────────────────────────────────────
//   test('TC-F003-05: Move card between columns', async ({ page }) => {
//     await page.goto('/');
//     await page.waitForLoadState('networkidle');

//     // Navigate to test board
//     await page.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 1' }).click();

//     // Open card and change status property to move it
//     await page.locator('div').filter({ hasText: /^Edited Card$/ }).first(). click();

//     // 🔍 FIND WITH CODEGEN: find the status property dropdown
//     // 🔍 FIND WITH CODEGEN: select a different status value
//     await page.keyboard.press('Escape');

//     // 🔍 FIND WITH CODEGEN: verify card appears in new column
//   });

  // ─────────────────────────────────────────
  // TC-F003-07: Add custom property to card
  // ─────────────────────────────────────────
  test('TC-F003-07: Add custom property to card', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navigate to test board
    await page.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 1' }).click();

    // Open the card
    await page.locator('div').filter({ hasText: /^Edited Card$/ }).first().click();
    await page.getByRole('button', { name: '+ Add a property' }).click();
    await page.getByRole('button', { name: 'Text' }).click();
    await page.getByRole('textbox', { name: 'Text' }).fill('Custom');
    await page.keyboard.press('Enter');
    await page.getByRole('button', { name: 'Custom' }).click();

    // 🔍 FIND WITH CODEGEN: find property field e.g. Status
    // 🔍 FIND WITH CODEGEN: set property value to Done
    await page.keyboard.press('Escape');

    // Verify property shows on card
    // 🔍 FIND WITH CODEGEN: check property badge visible on card
  });

    test('TC-F003-xx: delete property from card', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navigate to test board
    await page.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 1' }).click();



    await page.locator('div').filter({ hasText: /^Edited Card$/ }).first().click();
    await page.getByRole('button', { name: '+ Add a property' }).click();
    await page.getByRole('button', { name: 'Custom' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();

    // 🔍 FIND WITH CODEGEN: find property field e.g. Status
    // 🔍 FIND WITH CODEGEN: set property value to Done
    await page.keyboard.press('Escape');

    // Verify property shows on card
    // 🔍 FIND WITH CODEGEN: check property badge visible on card
  });

  // ─────────────────────────────────────────
  // TC-F003-06: Delete a card
  // ─────────────────────────────────────────
  test('TC-F003-06: Delete a card', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navigate to test board
    await page.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 1' }).click();
    
    await page.locator('div').filter({ hasText: /^Edited Card$/ }).first().hover();

    await page.locator('.octo-board-column > div:nth-child(2) > .MenuWrapper > .IconButton').click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();

    // Verify card no longer visible on board
    await expect(page.locator('.KanbanCard').filter({ hasText: 'Edited Card' })).not.toBeVisible();
  });

});