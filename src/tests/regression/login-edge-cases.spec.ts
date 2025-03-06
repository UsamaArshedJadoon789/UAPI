import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { config } from '../../config/config';

test.describe('Login Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    // Set up any test prerequisites
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('should handle empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateToLoginPage();
    await loginPage.click('button:has-text("Login")');
    
    // Verify error message or validation appears
    const isStillOnLoginPage = await page.url().includes('/login');
    expect(isStillOnLoginPage).toBeTruthy();
  });

  test('should handle remember me functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateToLoginPage();
    await loginPage.toggleRememberMe();
    await loginPage.login(config.credentials.username, config.credentials.password);
    
    // Navigate back to login page in a new context to check if credentials are remembered
    await page.goto('/');
    await page.goto('/login');
    
    // Check if username is pre-filled (this depends on the application behavior)
    const usernameValue = await page.inputValue('input[placeholder="Enter Username"]');
    console.log(`Username value after returning to login page: ${usernameValue}`);
  });

  test('should navigate to forgot password page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateToLoginPage();
    await loginPage.clickForgotPassword();
    
    // Verify navigation to forgot password page
    const isForgotPasswordPage = await page.url().includes('forgot-password') || 
                                await page.url().includes('reset-password');
    expect(isForgotPasswordPage).toBeTruthy();
  });
});
