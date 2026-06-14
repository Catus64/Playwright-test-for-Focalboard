// tests/search.spec.js
const { test, expect } = require('@playwright/test');

test.describe('F006 - Search & Filtering', () => {

  // ─────────────────────────────────────────
  // TC-F006-01: Search for existing card
  // ─────────────────────────────────────────
  test('TC-F006-01: Search for existing card', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 2' }).click();

    // 🔍 FIND WITH CODEGEN: click search icon
    await page.getByRole('textbox', { name: 'Search cards' }).click();
    await page.getByRole('textbox', { name: 'Search cards' }).fill('feed');


    // Type card title
    // 🔍 FIND WITH CODEGEN: find search input field
    await page.waitForTimeout(500);

    // Verify result appears
    await expect(page.getByText(/feed/)).toBeVisible();
  });

  // ─────────────────────────────────────────
  // TC-F006-02: Search with no matching result
  // ─────────────────────────────────────────
  test('TC-F006-02: Search with no matching result', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 2' }).click();

    // 🔍 FIND WITH CODEGEN: click search icon

    // Type random string
    await page.getByRole('textbox', { name: 'Search cards' }).click();
    await page.getByRole('textbox', { name: 'Search cards' }).fill('xasyduasdy');
    await page.waitForTimeout(500);

    // Verify empty state shown
    // 🔍 FIND WITH CODEGEN: find the no results element
  });

  // ─────────────────────────────────────────
  // TC-F006-03: Filter cards by assignee
  // ─────────────────────────────────────────
  test('TC-F006-03: Filter cards by assignee', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 2' }).click();


    // 🔍 FIND WITH CODEGEN: click filter button
    await page.getByRole('button', { name: 'Filter' }).click();
    await page.getByText('Search...').click();
    await page.getByText('something', { exact: true }).click();

    // 🔍 FIND WITH CODEGEN: select Person/assignee filter
    // 🔍 FIND WITH CODEGEN: select testuser from dropdown

    await page.waitForTimeout(500);

    // Verify only assigned cards shown
    // 🔍 FIND WITH CODEGEN: check filtered results
  });

  // ─────────────────────────────────────────
  // TC-F006-04: Test cards property show
  // ─────────────────────────────────────────
  test('TC-F006-04: Filter cards by property/label', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 2' }).click();


    // 🔍 FIND WITH CODEGEN: click filter button
    await page.getByRole('button', { name: 'Properties', exact: true }).click();
    await page.getByRole('button', { name: 'Person' }).click();

    // 🔍 FIND WITH CODEGEN: select a property filter e.g. Status
    // 🔍 FIND WITH CODEGEN: select a value e.g. Done

    await page.waitForTimeout(500);

    // Verify only matching cards shown
    // 🔍 FIND WITH CODEGEN: check filtered results
    await expect(page.locator('.KanbanCard').first()).toBeVisible();
  });




  // ─────────────────────────────────────────
  // TC-F006-05: Clear active filter
  // ─────────────────────────────────────────
  test('TC-F006-05: Clear active filter', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 2' }).click();


    // Apply a filter first
    await page.getByRole('button', { name: 'Filter' }).click();


    // 🔍 FIND WITH CODEGEN: select any filter

    await page.waitForTimeout(500);

    // 🔍 FIND WITH CODEGEN: click clear/reset filters button
    await page.getByRole('button', { name: 'Remove [object Object]' }).click();

  });

});