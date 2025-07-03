import { test, expect } from '@playwright/test';
import { getLatestEmailLink } from '../utils/email';

test.describe('Email link flow', () => {
  test.skip(!process.env.TEST_INBOX_ID, 'No test inbox configured');

  test('open link from email and complete flow', async ({ page }) => {
    // Example: admin triggers email here (implementation specific)
    const emailLink = await getLatestEmailLink(process.env.TEST_INBOX_ID!);

    await page.goto(emailLink);
    await expect(page).toHaveURL(/welcome/);
  });
});
