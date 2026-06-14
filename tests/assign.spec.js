// tests/assignment.spec.js
const { test, expect } = require('@playwright/test');

test.describe('F004 - Task Assignment', () => {

  // ─────────────────────────────────────────
  // TC-F004-04: Assign non-existent user
  // ─────────────────────────────────────────
  test('TC-F004-04: Assign non-existent user shows no results', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 1' }).click();

    // Open the card
   await page.locator('div').filter({ hasText: /^Test Card$/ }).first().click();

    // 🔍 FIND WITH CODEGEN: click Person property
    await page.getByRole('button', { name: '+ Add a property' }).click();
    await page.getByRole('button', { name: 'Person', exact: true }).click();
    // 🔍 FIND WITH CODEGEN: type invalid username in search field
    await page.locator('.react-select__input-container').click();
    await page.locator('#react-select-2-input').fill('doesnotexist');
    await page.keyboard.press('Enter');
    // 🔍 FIND WITH CODEGEN: find the no results/empty state element

    // Verify no user assigned
    // 🔍 FIND WITH CODEGEN: confirm no avatar visible on card

    await expect(await page.getByText('No options')).toBeVisible();

    await page.keyboard.press('Escape');

    await page.getByRole('button', { name: 'Person' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
  });

  // ─────────────────────────────────────────
  // TC-F004-01: Assign a user to a card
  // ─────────────────────────────────────────
  test('TC-F004-01: Assign a user to a card', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');


    // Open the card
    await page.locator('div').filter({ hasText: /^Test Card$/ }).first().click();

    // Reopen the card
    await page.getByRole('button', { name: '+ Add a property' }).click();
    await page.getByRole('button', { name: 'Person', exact: true }).click();
    await page.locator('div').filter({ hasText: /^Empty$/ }).nth(3).click();
    await page.getByText('something', { exact: true }).click();
    await page.getByRole('button', { name: 'Add to board' }).click();


    // 🔍 FIND WITH CODEGEN: click the Person property field
    // 🔍 FIND WITH CODEGEN: select testuser2 from the dropdown
    await page.keyboard.press('Enter');

    // Verify assignee appears on card
    // 🔍 FIND WITH CODEGEN: check avatar or name visible on card

    await expect(page.locator('div').filter({ hasText: /^something$/ }).first()).toBeVisible();
  });

  // ─────────────────────────────────────────
  // TC-F004-02: Assign multiple users to card
  // ─────────────────────────────────────────
  test('TC-F004-02: Assign multiple users to a card', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 1' }).click();

    // Open the card
    await page.locator('div').filter({ hasText: /^Test Card$/ }).first().click();

    await page.getByRole('button', { name: '+ Add a property' }).click();
    await page.getByLabel('Person', { exact: true }).click();
    await page.locator('div:nth-child(6) > .Person > .react-select__control > .react-select__value-container > .react-select__input-container').click();
    await page.getByText('testuser2', { exact: true }).click();
    await page.getByRole('button', { name: 'Add to board' }).click();

    await page.waitForTimeout(5000); // waits 2 seconds

    // 🔍 FIND WITH CODEGEN: click Person property
    // 🔍 FIND WITH CODEGEN: select first user (dogdogdog)
    // 🔍 FIND WITH CODEGEN: select second user (testuser2)
    // Verify both users shown
    // 🔍 FIND WITH CODEGEN: check both avatars visible on card
  });

  // ─────────────────────────────────────────
  // TC-F004-03: Remove assignee from card
  // ─────────────────────────────────────────
  test('TC-F004-03: Remove assignee from card', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 1' }).click();

    // Open the card
    await page.locator('div').filter({ hasText: /^Test Card$/ }).first().click();

    // 🔍 FIND WITH CODEGEN: click Person property
    // 🔍 FIND WITH CODEGEN: deselect testuser2 (click again to unselect)
    while (await page.getByRole('button', { name: 'Person' }).count() > 0) {
    await page.getByRole('button', { name: 'Person' }).first().click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.waitForTimeout(500);
    }

    // Verify avatar removed
    // 🔍 FIND WITH CODEGEN: confirm testuser2 avatar no longer visible
  });


  // ─────────────────────────────────────────
  // TC-F004-05: Delete access from board
  // ─────────────────────────────────────────
  test('TC-F004-05: Delete access from board', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 1' }).click();

    // Open the card
    await page.getByRole('button', { name: /Share/ }).click();

    // 🔍 FIND WITH CODEGEN: click Person property
    // 🔍 FIND WITH CODEGEN: deselect testuser2 (click again to unselect)
    while (await page.getByRole('button', { name: /Viewer/ }).count() > 0) {
    await page.getByRole('button', { name: /Viewer/ }).first().click();
    await page.getByRole('button', { name: 'Remove member' }).click();
    await page.waitForTimeout(500);
}
    // Verify avatar removed
    // 🔍 FIND WITH CODEGEN: confirm testuser2 avatar no longer visible
  });

});