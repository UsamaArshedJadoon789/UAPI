import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { config } from '../config/config';
import { TestHelper } from '../helpers/TestHelper';

export class LoginPage extends BasePage {
  // Selectors with multiple strategies for self-healing
  private readonly usernameInput = 'input[placeholder="Enter Username"], input#username, input[name="username"], input[type="text"]';
  private readonly passwordInput = 'input[placeholder="Enter Password"], input#password, input[name="password"], input[type="password"]';
  private readonly loginButton = 'button:has-text("Login"), button[type="submit"], button.login-button';
  private readonly rememberMeCheckbox = 'input[type="checkbox"], .remember-me input';
  private readonly forgotPasswordLink = 'a:has-text("Forgot Password?"), a.forgot-password';
  private readonly signUpStatusButton = 'button:has-text("Sign Up Status"), a.sign-up-status';
  private readonly createAccountLink = 'a:has-text("Create Account"), a.create-account';
  private readonly errorMessage = '.error-message, .alert-danger, [role="alert"]';

  constructor(page: Page) {
    super(page);
  }

  async navigateToLoginPage(): Promise<void> {
    console.log('Navigating to login page');
    await this.navigate('/login');
    
    // Wait for page to be fully loaded across all browsers
    await Promise.all([
      this.page.waitForLoadState('domcontentloaded'),
      this.page.waitForLoadState('networkidle'),
      this.page.waitForTimeout(1000) // Additional wait for stability across browsers
    ]).catch(error => {
      console.log('Warning: Page load state wait failed, continuing anyway:', error.message);
    });
    
    console.log('Navigated to', this.page.url());
    await this.waitForLoginPageLoad();
  }

  async waitForLoginPageLoad(): Promise<void> {
    await TestHelper.retry(async () => {
      await this.waitForElement(this.usernameInput);
      await this.waitForElement(this.passwordInput);
      await this.waitForElement(this.loginButton);
    }, {
      maxRetries: 3,
      initialDelay: 1000,
      onRetry: (error, attempt) => {
        console.log(`Waiting for login page to load (attempt ${attempt}): ${error.message}`);
      }
    });
  }

  async login(username: string = config.credentials.username, password: string = config.credentials.password): Promise<void> {
    await this.navigateToLoginPage();
    
    console.log(`Attempting login with username: ${username}`);
    
    // Fill in credentials with retry mechanism and cross-browser handling
    await TestHelper.retry(async () => {
      // Clear fields first to ensure clean input across browsers
      await this.fill(this.usernameInput, '');
      await this.fill(this.passwordInput, '');
      
      // Fill in credentials with explicit focus and blur events for cross-browser compatibility
      await this.page.focus(this.usernameInput);
      await this.fill(this.usernameInput, username);
      await this.page.waitForTimeout(100); // Small delay for stability
      
      await this.page.focus(this.passwordInput);
      await this.fill(this.passwordInput, password);
      await this.page.waitForTimeout(100); // Small delay for stability
    }, {
      maxRetries: 3,
      initialDelay: 1000,
      onRetry: (error, attempt) => {
        console.log(`Retrying credential input (attempt ${attempt}): ${error.message}`);
      }
    });
    
    // Click login button and wait for navigation with cross-browser handling
    console.log('Clicking login button');
    await Promise.all([
      // Set up navigation promise before click
      this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 30000 }).catch(e => {
        console.log('Navigation promise rejected, but continuing:', e.message);
      }),
      this.click(this.loginButton)
    ]).catch(e => {
      console.log('Promise.all for navigation failed, but continuing:', e.message);
    });
    
    // Wait for navigation to dashboard with enhanced retry for cross-browser compatibility
    await TestHelper.retry(async () => {
      // Check URL first
      const currentUrl = this.page.url();
      if (currentUrl.includes('dashboard')) {
        console.log('Successfully navigated to dashboard URL');
        return;
      }
      
      // If URL check fails, wait for dashboard URL or element
      await Promise.race([
        this.page.waitForURL('**/dashboard', { timeout: 10000 }),
        this.page.waitForSelector('h1:has-text("Dashboard"), .dashboard-header', { timeout: 10000 })
      ]);
      
      console.log('Dashboard detected via element or URL');
    }, {
      maxRetries: 5,
      initialDelay: 2000,
      backoffFactor: 1.5,
      onRetry: (error, attempt) => {
        console.log(`Waiting for dashboard navigation (attempt ${attempt}): ${error.message}`);
      }
    });
    
    console.log('Login successful');
  }

  async getErrorMessage(): Promise<string | null> {
    if (await this.isVisible(this.errorMessage)) {
      return await this.getText(this.errorMessage);
    }
    return null;
  }

  async clickForgotPassword(): Promise<void> {
    await this.click(this.forgotPasswordLink);
  }

  async clickSignUpStatus(): Promise<void> {
    await this.click(this.signUpStatusButton);
  }

  async clickCreateAccount(): Promise<void> {
    await this.click(this.createAccountLink);
  }

  async toggleRememberMe(): Promise<void> {
    await this.click(this.rememberMeCheckbox);
  }
}
