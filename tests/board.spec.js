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
    await page.getByRole('textbox', { name: 'Untitled board' }).fill('Test Board');
  });

  // test('TC-F002-04: Delete a board', async ({ page }) => {
  //   await page.goto('/');

  //   // 🔍 FIND WITH CODEGEN: right click board in sidebar to get delete option
  //   await page.locator('div').filter({ hasText: /^Renamed Board$/ }).first().click({ button: 'right' });

  //   // 🔍 FIND WITH CODEGEN: click delete from context menu
  //   await page.getByRole('button', { name: 'Delete board' }).click();

  //   // 🔍 FIND WITH CODEGEN: confirm delete if a confirmation dialog appears
  //   await page.getByRole('button', { name: 'Delete' }).click();

  //   // Verify board no longer in sidebar
  //   await expect(page.locator('div').filter({ hasText: /^Renamed Board$/ }).first()).not.toBeVisible();
  // });

  // test('TC-F002-05: Duplicate a board', async ({ page }) => {
  //   await page.goto('/');

  //   // First create a board to duplicate
  //   await page.getByRole('button', { name: '+ New' }).click();
  //   await page.getByRole('textbox', { name: 'Untitled', exact: true }).fill('Board To Duplicate');
  //   await page.getByRole('button', { name: 'Close dialog' }).click();

  //   // 🔍 FIND WITH CODEGEN: right click board to get duplicate option
  //   await page.locator('div').filter({ hasText: /^Board To Duplicate$/ }).first().click({ button: 'right' });

  //   // 🔍 FIND WITH CODEGEN: click duplicate from context menu
  //   await page.getByRole('button', { name: 'Duplicate' }).click();

  //   // Verify duplicate appears — Focalboard usually names it "Copy of X"
  //   // 🔍 FIND WITH CODEGEN: check what name Focalboard gives the duplicate
  //   await expect(page.locator('div').filter({ hasText: /^Copy of Board To Duplicate$/ }).first()).toBeVisible();
  // });

});