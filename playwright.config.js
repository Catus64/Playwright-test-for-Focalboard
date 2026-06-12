const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  globalSetup: './global-setup.js',   // ← add this
  use: {
    baseURL: 'http://localhost:8000',
    storageState: 'auth.json',        // ← add this
    headless: false,
    screenshot: 'on',
    video: 'retain-on-failure',
  },
  reporter: [['html', { outputFolder: 'playwright-report' }]],
});
