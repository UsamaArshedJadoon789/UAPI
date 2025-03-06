import { defineConfig, devices } from '@playwright/test';
import { config as testConfig } from './src/config/config';

export default defineConfig({
  testDir: './src/tests',
  timeout: 60000,
  expect: {
    timeout: testConfig.timeout.medium,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'src/reports/html-report' }],
    ['json', { outputFile: 'src/reports/json-report/test-results.json' }]
  ],
  use: {
    baseURL: testConfig.baseUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'smoke',
      testMatch: /.*smoke.*/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'regression',
      testMatch: /.*regression.*/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
