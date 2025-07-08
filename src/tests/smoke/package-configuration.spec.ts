import { test, expect } from '@playwright/test';
import { PackageConfigurationPage } from '../../pages/PackageConfigurationPage';
import { TestHelper } from '../../helpers/TestHelper';

test.describe('Package Configuration - Single Browser Session', () => {
  test('should complete entire package configuration workflow in one session', async ({ page }) => {
    const packageConfigPage = new PackageConfigurationPage(page);
    
    await page.setViewportSize({ width: 1280, height: 720 });
    
    await TestHelper.retry(async () => {
      await packageConfigPage.completePackageConfiguration();
    }, {
      maxRetries: 2,
      initialDelay: 2000,
      onRetry: (error, attempt) => {
        console.log(`Retrying package configuration workflow (attempt ${attempt}): ${error.message}`);
      }
    });
    
    await TestHelper.takeScreenshot(page, 'package-configuration-completed');
    
    const currentUrl = page.url();
    expect(currentUrl).toContain('congratulations');
    
    console.log('Package configuration workflow completed successfully in single browser session');
  });

  test('should validate package configuration page elements', async ({ page }) => {
    const packageConfigPage = new PackageConfigurationPage(page);
    
    await packageConfigPage.navigateToPackageConfiguration();
    
    await expect(async () => {
      const isConfigButtonDisplayed = await packageConfigPage.isConfigurationButtonDisplayed();
      expect(isConfigButtonDisplayed).toBeTruthy();
    }).toPass({ timeout: 10000 });
    
    await packageConfigPage['clickConfigurationWithHighlight']();
    
    await expect(async () => {
      const isDiscoverDisplayed = await packageConfigPage.isDiscoverOptionDisplayed();
      expect(isDiscoverDisplayed).toBeTruthy();
    }).toPass({ timeout: 10000 });
    
    await TestHelper.takeScreenshot(page, 'package-configuration-elements-validated');
  });

  test('should handle package selection workflow', async ({ page }) => {
    const packageConfigPage = new PackageConfigurationPage(page);
    
    await packageConfigPage.navigateToPackageConfiguration();
    await packageConfigPage['clickConfigurationWithHighlight']();
    await packageConfigPage['selectDiscoverOptionWithHighlight']();
    await packageConfigPage['selectPackageAndProceed']();
    await packageConfigPage['selectDataOptionAndProceed']();
    await packageConfigPage['confirmPackageSelection']();
    
    await expect(async () => {
      const isFirstNameDisplayed = await packageConfigPage.isFirstNameFieldDisplayed();
      expect(isFirstNameDisplayed).toBeTruthy();
    }).toPass({ timeout: 15000 });
    
    await TestHelper.takeScreenshot(page, 'package-selection-completed');
  });
});
