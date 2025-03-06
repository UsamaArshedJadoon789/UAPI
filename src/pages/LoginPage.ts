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
    await this.navigate('/login');
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
    
    // Fill in credentials with retry mechanism
    await TestHelper.retry(async () => {
      await this.fill(this.usernameInput, username);
      await this.fill(this.passwordInput, password);
    });
    
    // Click login button and wait for navigation
    await this.click(this.loginButton);
    
    // Wait for navigation to dashboard
    await TestHelper.retry(async () => {
      await this.page.waitForURL('**/dashboard', { timeout: config.timeout.long });
    }, {
      maxRetries: 5,
      initialDelay: 2000,
      backoffFactor: 1.5,
      onRetry: (error, attempt) => {
        console.log(`Waiting for dashboard navigation (attempt ${attempt}): ${error.message}`);
      }
    });
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
