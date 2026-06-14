// tests/settings.spec.js
const { test, expect } = require('@playwright/test');

test.describe('F009 - System Settings & Data Export', () => {

  // ─────────────────────────────────────────
  // TC-F009-01: Access system settings page
  // ─────────────────────────────────────────
  test('TC-F009-01: Access system settings page', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'menuwrapper' }).nth(1).click();

    await expect(page.getByText('Export')).toBeVisible();
  });

  // ─────────────────────────────────────────
  // TC-F009-02: Export board data
  // ─────────────────────────────────────────
  test('TC-F009-02: Export board data', async ({ page }) => {
  await page.goto('/');

  //  FIND WITH CODEGEN: navigate to your test board and find export button
  await page.getByRole('button', { name: 'menuwrapper' }).nth(1).click();
  await page.getByRole('button', { name: 'Export archive' }).click();

  const downloadPromise = page.waitForEvent('download');

  //  FIND WITH CODEGEN: click export button


  const download = await downloadPromise;

  // Save to your specific path with custom filename
  await download.saveAs('/home/rahman/Desktop/Software Verification/focalboard/playwright-tests/test.boardarchive');

  // Verify download happened
  expect(download.suggestedFilename()).not.toBe('');
  console.log('Original filename:', download.suggestedFilename());

  // Verify file exists on disk
  const fs = require('fs');
  const fileExists = fs.existsSync('/home/rahman/Desktop/Software Verification/focalboard/playwright-tests/test.boardarchive');
  expect(fileExists).toBe(true);
  console.log('File saved successfully');
});

  // ─────────────────────────────────────────
  // TC-F009-03: Change display/language settings
  // ─────────────────────────────────────────
  test('TC-F009-03: Change display settings persists after refresh', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'menuwrapper' }).nth(1).click();

    const element = page.getByText('Set theme');
    const box = await element.boundingBox();

    // Move mouse to center of element and STAY there
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });

    // Wait for dropdown to appear
    //await page.waitForTimeout(1000);

    // Now click dark theme WITHOUT moving mouse away
    await page.getByRole('button', { name: 'Dark theme' }).click();

    await page.reload();

    // 🔍 FIND WITH CODEGEN: verify the setting is still changed after reload
    // FILL IN STEP: assert setting persisted
  });

});