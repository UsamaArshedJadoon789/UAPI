import { test, expect } from '@playwright/test';
import fs from 'fs';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ModulePage from '../pages/modules/ModulePage';

/**
 * Example tests for several modules after login.
 * Replace selectors and menu text with real ones from the application.
 */

test.describe('UAPI Modules', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.UAPI_USERNAME!, process.env.UAPI_PASSWORD!);
    await expect(page).toHaveURL(/dashboard/);
  });

  const modules = process.env.UAPI_MODULES
    ? JSON.parse(process.env.UAPI_MODULES)
    : JSON.parse(fs.readFileSync('modules.json', 'utf-8'));

  for (const { name, selector } of modules) {
    test(`${name} module should load correctly`, async ({ page }) => {
      const dashboard = new DashboardPage(page);
      await dashboard.openModule(name);
      const modulePage = new ModulePage(page, selector);
      await modulePage.isLoaded();
    });
  }
});
