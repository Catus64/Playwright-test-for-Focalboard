import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8000/login');
  await page.getByRole('textbox', { name: 'Enter username' }).click();
  await page.getByRole('textbox', { name: 'Enter username' }).fill('dogdogdog');
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('dogdogdog');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('button', { name: ' Create an empty board' }).click();
  await page.getByRole('button', { name: '+ New' }).click();
  await page.getByRole('textbox', { name: 'Untitled', exact: true }).fill('test');
  await page.getByRole('button', { name: 'Close dialog' }).click();
  await page.locator('div').filter({ hasText: /^🏚test$/ }).first().click();
  await page.getByRole('button', { name: 'Close dialog' }).click();
  await page.getByRole('button', { name: '+ New' }).click();
  await page.getByRole('textbox', { name: 'Untitled', exact: true }).fill('t');
  await page.getByRole('textbox', { name: 'Untitled', exact: true }).click();
  await page.getByRole('textbox', { name: 'Untitled', exact: true }).fill('test2');
});
