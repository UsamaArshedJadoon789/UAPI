import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

test.describe('UAPI Login', () => {
  test('should login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.UAPI_USERNAME!, process.env.UAPI_PASSWORD!);
    await expect(page).toHaveURL(/dashboard/);
  });
});
