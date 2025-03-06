import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { config } from '../../config/config';
import { TestHelper } from '../../helpers/TestHelper';

test.describe('Dashboard Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    const loginPage = new LoginPage(page);
    await loginPage.login(config.credentials.username, config.credentials.password);
  });

  test('should display all dashboard components correctly', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    
    // Validate dashboard components
    await dashboardPage.validateDashboardLoaded();
    
    // Take screenshot for visual verification
    await TestHelper.takeScreenshot(page, 'dashboard-components');
  });

  test('should validate all menu items are present and clickable', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    
    // Validate all menu items
    await dashboardPage.validateAllMenuItems();
    
    // Verify each menu item is clickable
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
      // Hover over menu item to verify it's interactive
      const selector = dashboardPage['menuItems'][menuItem.toLowerCase()];
      await page.hover(selector);
      
      // Verify the menu item is clickable
      const isClickable = await page.isEnabled(selector);
      expect(isClickable).toBeTruthy();
    }
  });

  test('should toggle menu visibility with hide/show menu button', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    
    // Click hide menu button
    await dashboardPage.clickMenuItem('Hide Menu');
    
    // Verify menu is hidden
    const isMenuHidden = await page.isHidden('a:has-text("Sub Account Management")');
    expect(isMenuHidden).toBeTruthy();
    
    // Click show menu button (which appears after hiding)
    await page.click('button:has-text("Show Menu"), .show-menu-button');
    
    // Verify menu is visible again
    const isMenuVisible = await page.isVisible('a:has-text("Sub Account Management")');
    expect(isMenuVisible).toBeTruthy();
  });
});
