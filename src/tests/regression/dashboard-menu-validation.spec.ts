import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { config } from '../../config/config';
import { TestHelper } from '../../helpers/TestHelper';

test.describe('Dashboard Menu Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    const loginPage = new LoginPage(page);
    await loginPage.login(config.credentials.username, config.credentials.password);
  });

  test('should validate all menu items are present and functional', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    
    // Validate all menu items are present
    await dashboardPage.validateAllMenuItems();
    
    // Get all menu items
    const menuItems = [
      'Dashboard',
      'Sub Account Management',
      'Package Management',
      'My Invoices',
      'Roles and Permissions',
      'User Management',
      'Reports'
    ];
    
    // Click on each menu item and verify navigation
    for (const menuItem of menuItems) {
      await TestHelper.retry(async () => {
        console.log(`Clicking on menu item: ${menuItem}`);
        await dashboardPage.clickMenuItem(menuItem);
        
        // Wait for page to load after navigation
        await TestHelper.waitForPageLoad(page);
        
        // Verify the page URL contains the menu item name or a related keyword
        const currentUrl = page.url().toLowerCase();
        const menuKeyword = menuItem.toLowerCase().replace(/\s+/g, '-');
        const isCorrectPage = currentUrl.includes(menuKeyword) || 
                             currentUrl.includes(menuItem.toLowerCase().replace(/\s+/g, ''));
        
        if (!isCorrectPage) {
          console.log(`URL validation for ${menuItem}: Expected URL to contain ${menuKeyword}, but got ${currentUrl}`);
        }
        
        expect(isCorrectPage).toBeTruthy();
        
        // Take screenshot for verification
        await TestHelper.takeScreenshot(page, `menu-validation-${menuItem.toLowerCase().replace(/\s+/g, '-')}`);
      }, {
        maxRetries: 2,
        initialDelay: 1000,
        onRetry: (error, attempt) => {
          console.log(`Retrying navigation to ${menuItem} (attempt ${attempt}): ${error.message}`);
        }
      });
    }
  });

  test('should verify menu item text matches expected values', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    
    // Define expected menu item text
    const expectedMenuItems = [
      'Dashboard',
      'Sub Account Management',
      'Package Management',
      'My Invoices',
      'Roles and Permissions',
      'User Management',
      'Reports'
    ];
    
    // Verify each menu item text
    for (const menuItem of expectedMenuItems) {
      try {
        const actualText = await dashboardPage.getMenuItemText(menuItem);
        const normalizedExpectedText = menuItem.toLowerCase();
        const normalizedActualText = actualText.toLowerCase();
        
        // Check if the actual text contains the expected text (case insensitive)
        expect(normalizedActualText).toContain(normalizedExpectedText);
      } catch (error) {
        console.error(`Error verifying menu item text for ${menuItem}: ${error.message}`);
        throw error;
      }
    }
  });
});
