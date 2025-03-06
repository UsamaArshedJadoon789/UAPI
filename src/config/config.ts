import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL || 'https://qc.uapi.sa',
  credentials: {
    username: process.env.USERNAME || 'fewer001',
    password: process.env.PASSWORD || 'Kathir123$'
  },
  timeout: {
    short: parseInt(process.env.TIMEOUT_SHORT || '5000'),
    medium: parseInt(process.env.TIMEOUT_MEDIUM || '15000'),
    long: parseInt(process.env.TIMEOUT_LONG || '30000')
  },
  retries: parseInt(process.env.MAX_RETRIES || '3'),
  selfHealing: {
    enabled: process.env.SELF_HEALING_ENABLED !== 'false',
    maxAttempts: parseInt(process.env.SELF_HEALING_MAX_ATTEMPTS || '3'),
    strategies: ['attribute', 'css', 'xpath', 'text', 'position']
  },
  browser: {
    defaultBrowser: process.env.DEFAULT_BROWSER || 'chromium',
    headless: process.env.HEADLESS !== 'false'
  },
  environment: process.env.TEST_ENV || 'qa'
};
