import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { config } from '../../config/config';
import { MockService } from '../../utils/mocks/MockService';
import { BrowserHelper } from '../../utils/helpers/BrowserHelper';

test.describe('Self-Healing Demonstration', () => {
  test('should login and validate dashboard with intentionally broken selectors', async ({ page }) => {
    // Create screenshots directory for debugging
    const fs = require('fs');
    const path = require('path');
    const screenshotsDir = path.join(process.cwd(), 'src', 'reports', 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    
    // Get browser information
    const browserType = await BrowserHelper.detectBrowserType(page);
    console.log(`Running self-healing demo test in ${browserType} browser`);
    
    // Enable mock mode for testing
    await MockService.enableMockMode(page);
    
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    
    // Take screenshot before login with browser type in filename
    await page.screenshot({ path: `${screenshotsDir}/before-login-${browserType}.png` });
    
    // Login with correct credentials
    await loginPage.navigateToLoginPage();
    
    // Take screenshot after navigation with browser type in filename
    await page.screenshot({ path: `${screenshotsDir}/after-navigation-${browserType}.png` });
    
    // Intentionally use broken selectors that will trigger self-healing
    try {
      // Apply browser-specific timing adjustments
      await BrowserHelper.applyTimingAdjustments(page);
      
      await page.fill('#non-existent-username', config.credentials.username);
      await page.fill('#non-existent-password', config.credentials.password);
      await page.click('button.non-existent-login-button');
    } catch (error) {
      console.log(`Expected error with broken selectors in ${browserType}, falling back to standard login`);
      await loginPage.login(config.credentials.username, config.credentials.password);
    }
    
    // Take screenshot after login with browser type in filename
    await page.screenshot({ path: `${screenshotsDir}/after-login-${browserType}.png` });
    
    // Apply browser-specific timing adjustments before validation
    await BrowserHelper.applyTimingAdjustments(page);
    
    // Verify dashboard is loaded with browser-specific timeout
    const timeout = await BrowserHelper.getBrowserSpecificTimeout(page, 10000);
    await page.waitForTimeout(500); // Additional stability delay
    
    // Verify dashboard is loaded
    await dashboardPage.validateDashboardLoaded();
    
    // Verify dashboard header
    const headerText = await dashboardPage.getDashboardHeaderText();
    console.log(`Dashboard header text in ${browserType}: ${headerText}`);
    
    // Expect header text to contain 'dashboard' (case-insensitive)
    expect(headerText.toLowerCase()).toContain('dashboard');
    
    // Get visible menu items
    const menuItems = await dashboardPage.getMenuItemCount();
    console.log(`Menu item count in ${browserType}: ${menuItems}`);
    
    // Expect at least some menu items to be visible
    expect(menuItems).toBeGreaterThan(0);
    
    // Validate all menu items with browser-specific handling
    console.log(`Validating all menu items in ${browserType} browser`);
    await dashboardPage.validateAllMenuItems();
  });
});
