// tests/boards.spec.js
const { test, expect } = require('@playwright/test');

// No login needed here — session already loaded
test.describe('F002 - Board CRUD', () => {

  test('TC-F002-01: Create board with valid title', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.getByText('+ Add board').click();
    await page.getByRole('button', { name: ' Create an empty board' }).click();
    await page.locator('.SidebarBoardItem').filter({ hasText: '(Untitled Board)' }).click();
    //await page.getByRole('button', { name: /(Untitled Board).*menuwrapper/ }).click();
    // await expect(page.getByRole('button', { name: ' (Untitled Board) menuwrapper' })).toBeVisible();
  });

  test('TC-F002-03: Edit board title', async ({ page }) => {
    await page.goto('/');

    // Click the board we created
    await page.locator('.SidebarBoardItem').filter({ hasText: '(Untitled Board)' }).click();

    // 🔍 FIND WITH CODEGEN: right click the board name in sidebar to get rename option
    await page.getByRole('textbox', { name: 'Untitled board' }).click();

    // 🔍 FIND WITH CODEGEN: click the rename/edit option from context menu
    await page.getByRole('textbox', { name: 'Untitled board' }).fill('Edited Board');

    await page.keyboard.press('Enter');
  });


  test('TC-F002-05: Duplicate a board', async ({ page }) => {
    await page.goto('/');

    // 🔍 FIND WITH CODEGEN: right click board to get duplicate option
    await page.getByRole('button', { name: /Testing Board 1/ }).hover();

    // Wait for the button to become visible
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: /Testing Board 1/ }).locator('button').click();
    await page.getByRole('button', { name: 'Duplicate board' }).click();

    // 🔍 FIND WITH CODEGEN: click duplicate from context menu

    // Verify duplicate appears — Focalboard usually names it "Copy of X"
    // 🔍 FIND WITH CODEGEN: check what name Focalboard gives the duplicate
    await expect(page.getByRole('button', { name: /Board 1 copy/ })).toBeVisible({ timeout: 10000 });

    //delete the duplicate to clean up
    await page.getByRole('button', { name: /Testing Board 1 copy/ }).hover();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: /Testing Board 1 copy/ }).locator('button').click();
    await page.getByRole('button', { name: 'Delete board' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
  });

  test('TC-F002-04: Delete a board', async ({ page }) => {
    await page.goto('/');


    //delete the duplicate to clean up
    await page.getByRole('button', { name: /Edited Board/ }).hover();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: /Edited Board/ }).locator('button').click();
    await page.getByRole('button', { name: 'Delete board' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
  });
});