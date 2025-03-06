import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { config } from '../../config/config';
import { TestHelper } from '../../helpers/TestHelper';

test.describe('Login Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Set up any test prerequisites
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    
    // Login with valid credentials
    await loginPage.login(config.credentials.username, config.credentials.password);
    
    // Verify dashboard is loaded
    await dashboardPage.validateDashboardLoaded();
  });

  test('should validate all dashboard menu items after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    
    // Login with valid credentials
    await loginPage.login(config.credentials.username, config.credentials.password);
    
    // Validate all menu items are present
    await dashboardPage.validateAllMenuItems();
    
    // Verify the number of menu items
    const menuItemCount = await dashboardPage.getMenuItemCount();
    expect(menuItemCount).toBeGreaterThan(0);
  });

  test('should navigate through all menu items', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    
    // Login with valid credentials
    await loginPage.login(config.credentials.username, config.credentials.password);
    
    // Click on each menu item and verify navigation
    const menuItems = [
      'Dashboard',
      'Sub Account Management',
      'Package Management',
      'My Invoices',
      'Roles and Permissions',
      'User Management',
      'Reports'
    ];
    
    for (const menuItem of menuItems) {
      await TestHelper.retry(async () => {
        await dashboardPage.clickMenuItem(menuItem);
        // Wait for page to load after navigation
        await TestHelper.waitForPageLoad(page);
        // Take screenshot for verification
        await TestHelper.takeScreenshot(page, `navigation-${menuItem.toLowerCase().replace(/\s+/g, '-')}`);
      }, {
        maxRetries: 2,
        initialDelay: 1000,
        onRetry: (error, attempt) => {
          console.log(`Retrying navigation to ${menuItem} (attempt ${attempt}): ${error.message}`);
        }
      });
    }
  });
});
