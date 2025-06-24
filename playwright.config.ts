import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    baseURL: process.env.UAPI_BASE_URL || 'https://qc.uapi.sa',
    headless: true,
  },
  testDir: './tests',
  timeout: 60 * 1000,
};

export default config;
