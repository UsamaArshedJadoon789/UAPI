import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

/** Basic logout test after a successful login. */

test('user can log out', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.UAPI_USERNAME!, process.env.UAPI_PASSWORD!);
  const dashboard = new DashboardPage(page);
  await dashboard.logout();
});
