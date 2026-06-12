# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: board.spec.js >> F002 - Board CRUD >> TC-F002-03: Edit board title
- Location: tests/board.spec.js:17:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('div').filter({ hasText: /^Test Board$/ }).first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('div').filter({ hasText: /^Test Board$/ }).first()

```

```yaml
- button "menuwrapper":
  - img
  - text: Focalboard v7.8.9
- button:
  - img
- text: 󰍉 Find boards
- button "󰅂 Boards"
- button " (Untitled Board)"
- img
- text: Board view + Add board
- button "menuwrapper": Settings
- link "Give feedback":
  - /url: https://www.focalboard.com/fwlink/feedback-focalboard.html?v=7.8.9
- link "󰘥":
  - /url: https://www.focalboard.com/guide/user?utm_source=webapp
- textbox "Test Board":
  - /placeholder: Untitled board
- button "󰍁 Share"
- textbox "Board view":
  - /placeholder: Untitled View
- button "View menu":
  - button "󰅀"
- button "Properties menu":
  - button "Properties"
- button "menuwrapper":
  - 'button "Group by: Status"'
- button "Filter"
- button "menuwrapper":
  - button "Sort"
- text: 󰍉
- textbox "Search cards"
- button "View header menu":
  - button "󰇘"
- text: New
- button "menuwrapper": 󰅀
- text: No Status
- button "0"
- button "menuwrapper":
  - button "󰇘"
- button "󰐕"
- button "+ Add a group"
- button "+ New"
```

# Test source

```ts
  1  | // tests/boards.spec.js
  2  | const { test, expect } = require('@playwright/test');
  3  | 
  4  | // No login needed here — session already loaded
  5  | test.describe('F002 - Board CRUD', () => {
  6  | 
  7  |   test('TC-F002-01: Create board with valid title', async ({ page }) => {
  8  |     await page.goto('/');
  9  |     await page.waitForLoadState('networkidle');
  10 |     await page.getByText('+ Add board').click();
  11 |     await page.getByRole('button', { name: ' Create an empty board' }).click();
  12 |     await page.locator('.SidebarBoardItem').filter({ hasText: '(Untitled Board)' }).click();
  13 |     //await page.getByRole('button', { name: /(Untitled Board).*menuwrapper/ }).click();
  14 |     // await expect(page.getByRole('button', { name: ' (Untitled Board) menuwrapper' })).toBeVisible();
  15 |   });
  16 | 
  17 |   test('TC-F002-03: Edit board title', async ({ page }) => {
  18 |     await page.goto('/');
  19 | 
  20 |     // Click the board we created
  21 |     await page.locator('.SidebarBoardItem').filter({ hasText: '(Untitled Board)' }).click();
  22 | 
  23 |     // 🔍 FIND WITH CODEGEN: right click the board name in sidebar to get rename option
  24 |     await page.getByRole('textbox', { name: 'Untitled board' }).click();
  25 | 
  26 |     // 🔍 FIND WITH CODEGEN: click the rename/edit option from context menu
  27 |     await page.getByRole('textbox', { name: 'Untitled board' }).fill('Test Board');
  28 | 
  29 |     // Verify new title appears
> 30 |     await expect(page.locator('div').filter({ hasText: /^Test Board$/ }).first()).toBeVisible();
     |                                                                                   ^ Error: expect(locator).toBeVisible() failed
  31 |   });
  32 | 
  33 |   // test('TC-F002-04: Delete a board', async ({ page }) => {
  34 |   //   await page.goto('/');
  35 | 
  36 |   //   // 🔍 FIND WITH CODEGEN: right click board in sidebar to get delete option
  37 |   //   await page.locator('div').filter({ hasText: /^Renamed Board$/ }).first().click({ button: 'right' });
  38 | 
  39 |   //   // 🔍 FIND WITH CODEGEN: click delete from context menu
  40 |   //   await page.getByRole('button', { name: 'Delete board' }).click();
  41 | 
  42 |   //   // 🔍 FIND WITH CODEGEN: confirm delete if a confirmation dialog appears
  43 |   //   await page.getByRole('button', { name: 'Delete' }).click();
  44 | 
  45 |   //   // Verify board no longer in sidebar
  46 |   //   await expect(page.locator('div').filter({ hasText: /^Renamed Board$/ }).first()).not.toBeVisible();
  47 |   // });
  48 | 
  49 |   // test('TC-F002-05: Duplicate a board', async ({ page }) => {
  50 |   //   await page.goto('/');
  51 | 
  52 |   //   // First create a board to duplicate
  53 |   //   await page.getByRole('button', { name: '+ New' }).click();
  54 |   //   await page.getByRole('textbox', { name: 'Untitled', exact: true }).fill('Board To Duplicate');
  55 |   //   await page.getByRole('button', { name: 'Close dialog' }).click();
  56 | 
  57 |   //   // 🔍 FIND WITH CODEGEN: right click board to get duplicate option
  58 |   //   await page.locator('div').filter({ hasText: /^Board To Duplicate$/ }).first().click({ button: 'right' });
  59 | 
  60 |   //   // 🔍 FIND WITH CODEGEN: click duplicate from context menu
  61 |   //   await page.getByRole('button', { name: 'Duplicate' }).click();
  62 | 
  63 |   //   // Verify duplicate appears — Focalboard usually names it "Copy of X"
  64 |   //   // 🔍 FIND WITH CODEGEN: check what name Focalboard gives the duplicate
  65 |   //   await expect(page.locator('div').filter({ hasText: /^Copy of Board To Duplicate$/ }).first()).toBeVisible();
  66 |   // });
  67 | 
  68 | });
```