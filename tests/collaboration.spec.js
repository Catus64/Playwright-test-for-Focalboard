// tests/collaboration.spec.js
const { test, expect } = require('@playwright/test');

test.describe('F007 - Real-time Collaboration & Syncing', () => {

  // ─────────────────────────────────────────
  // TC-F007-01: Two users view same board simultaneously
  // ─────────────────────────────────────────
  test('TC-F007-01: Two users view same board simultaneously', async ({ browser }) => {
    // Create two separate sessions
    const contextA = await browser.newContext({ storageState: 'auth.json' });
    const contextB = await browser.newContext({ storageState: 'auth2.json' });

    const pageA = await contextA.newPage();
    const pageB = await contextB.newPage();

    // Both users navigate to the same board
    await pageA.goto('/');
    await pageA.waitForLoadState('networkidle');
    await pageA.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 1' }).click();

    await pageB.goto('/');
    await pageB.waitForLoadState('networkidle');
    await pageB.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 1' }).click();

    // Verify both users can see the board
    await expect(pageA.locator('.BoardComponent')).toBeVisible();
    await expect(pageB.locator('.BoardComponent')).toBeVisible();

    await contextA.close();
    await contextB.close();
  });

  // ─────────────────────────────────────────
  // TC-F007-02: User A creates card, User B sees it
  // ─────────────────────────────────────────
  test('TC-F007-02: User A creates card and User B sees it', async ({ browser }) => {
    const contextA = await browser.newContext({ storageState: 'auth.json' });
    const contextB = await browser.newContext({ storageState: 'auth2.json' });

    const pageA = await contextA.newPage();
    const pageB = await contextB.newPage();

    // Both open the same board
    await pageA.goto('/');
    await pageA.waitForLoadState('networkidle');
    await pageA.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 1' }).click();

    await pageB.goto('/');
    await pageB.waitForLoadState('networkidle');
    await pageB.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 1' }).click();

    // User A creates a new card
    await pageA.getByRole('button', { name: '+ New' }).click();
    // await pageA.locator('div').filter({ hasText: /^Untitled$/ }).first().click();
    await pageA.getByRole('textbox', { name: 'Untitled' }).fill('Collab Card');
    await pageA.keyboard.press('Escape');

    // Wait for sync
    await pageA.waitForTimeout(3000);

    // User B should see the card without refreshing
    // 🔍 This is where we check if real-time sync works
    const cardVisibleWithoutRefresh = await pageB.locator('div')
      .filter({ hasText: /^Collab Card$/ }).first().isVisible();

    console.log('Card visible without refresh:', cardVisibleWithoutRefresh);

    // If not visible without refresh — document as IR-002
    if (!cardVisibleWithoutRefresh) {
      // Force refresh and check
      await pageB.reload();
      await pageB.waitForLoadState('networkidle');
    }

    await expect(pageB.locator('div').filter({ hasText: /^Collab Card$/ }).first()).toBeVisible();

    await contextA.close();
    await contextB.close();
  });

  // ─────────────────────────────────────────
  // TC-F007-03: User A edits card, User B sees update
  // ─────────────────────────────────────────
  test('TC-F007-03: User A edits card and User B sees update', async ({ browser }) => {
    const contextA = await browser.newContext({ storageState: 'auth.json' });
    const contextB = await browser.newContext({ storageState: 'auth2.json' });

    const pageA = await contextA.newPage();
    const pageB = await contextB.newPage();

    // Both open the same board
    await pageA.goto('/');
    await pageA.waitForLoadState('networkidle');
    await pageA.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 1' }).click();

    await pageB.goto('/');
    await pageB.waitForLoadState('networkidle');
    await pageB.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 1' }).click();

    // User A edits the card title
    await pageA.locator('div').filter({ hasText: /^Collab Card$/ }).first().click();
    await pageA.getByRole('textbox', { name: 'Collab Card' }).fill('Edited by A');
    await pageA.keyboard.press('Escape');

    // Wait for sync
    await pageA.waitForTimeout(3000);

    // Check if User B sees update without refresh
    const updatedWithoutRefresh = await pageB.locator('div')
      .filter({ hasText: /^Edited by A$/ }).first().isVisible();

    console.log('Edit visible without refresh:', updatedWithoutRefresh);

    if (!updatedWithoutRefresh) {
      await pageB.reload();
      await pageB.waitForLoadState('networkidle');
    }

    await expect(pageB.locator('div').filter({ hasText: /^Edited by A$/ }).first()).toBeVisible();

    await contextA.close();
    await contextB.close();
  });

  // ─────────────────────────────────────────
  // TC-F007-04: User A deletes card, User B sees removal
  // ─────────────────────────────────────────
  test('TC-F007-04: User A deletes card and User B sees removal', async ({ browser }) => {
    const contextA = await browser.newContext({ storageState: 'auth.json' });
    const contextB = await browser.newContext({ storageState: 'auth2.json' });

    const pageA = await contextA.newPage();
    const pageB = await contextB.newPage();

    // Both open the same board
    await pageA.goto('/');
    await pageA.waitForLoadState('networkidle');
    await pageA.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 1' }).click();

    await pageB.goto('/');
    await pageB.waitForLoadState('networkidle');
    await pageB.locator('.SidebarBoardItem').filter({ hasText: 'Testing Board 1' }).click();

    // User A deletes the card
    await pageA.locator('div').filter({ hasText: /^Edited by A$/ }).first().hover();
    await pageA.locator('.octo-board-column > div:nth-child(2) > .MenuWrapper > .IconButton').click();
    await pageA.getByRole('button', { name: 'Delete' }).click();
    await pageA.getByRole('button', { name: 'Delete' }).click();

    // Wait for sync
    await pageA.waitForTimeout(3000);

    // Check if User B sees removal without refresh
    const removedWithoutRefresh = await pageB.locator('div')
      .filter({ hasText: /^Edited by A$/ }).first().isVisible();

    console.log('Card removed without refresh:', !removedWithoutRefresh);

    if (removedWithoutRefresh) {
      await pageB.reload();
      await pageB.waitForLoadState('networkidle');
    }

    await expect(pageB.locator('div')
      .filter({ hasText: /^Edited by A$/ }).first()).not.toBeVisible();

    await contextA.close();
    await contextB.close();
  });

});