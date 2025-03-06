import { Page, Route } from '@playwright/test';
import { BrowserHelper } from '../helpers/BrowserHelper';

/**
 * MockService - Provides mock responses for testing when the real website is unavailable
 * with enhanced cross-browser compatibility
 */
export class MockService {
  private readonly page: Page;
  private invalidCredentials: boolean = false;
  private static isMockEnabled: boolean = true;
  private browserType: 'chromium' | 'firefox' | 'webkit' | 'unknown' = 'unknown';

  constructor(page: Page) {
    this.page = page;
    // Initialize browser type detection
    this.detectBrowserType();
  }
  
  /**
   * Detect browser type for browser-specific handling
   */
  private async detectBrowserType(): Promise<void> {
    this.browserType = await BrowserHelper.detectBrowserType(this.page);
    console.log(`MockService initialized for ${this.browserType} browser`);
  }

  /**
   * Setup mock responses for the login page with browser-specific handling
   */
  public async setupLoginMocks(): Promise<void> {
    if (!MockService.isMockEnabled) {
      console.log('Mock service is disabled');
      return;
    }

    // Wait for browser to be ready before setting up mocks
    await this.page.waitForLoadState('domcontentloaded');
    
    // Get browser type for browser-specific handling
    const browserType = await BrowserHelper.detectBrowserType(this.page);
    console.log(`Setting up login mocks for ${browserType} browser`);
    
    // Mock the login page HTML with browser-specific handling
    await this.page.route('**/*', async (route) => {
      const url = route.request().url();
      
      if (url.includes('qc.uapi.sa')) {
        console.log(`Mocking response for: ${url} in ${browserType} browser`);
        
        // Check for form submission
        if (route.request().method() === 'POST') {
          const postData = route.request().postData();
          if (postData && (postData.includes('username=invalid_user') || postData.includes('password=invalid_password'))) {
            this.invalidCredentials = true;
            await route.fulfill({
              status: 200,
              contentType: 'text/html',
              body: this.getLoginPageHtml(true, browserType)
            });
            return;
          }
        }
        
        // Serve a mock login page with browser-specific HTML
        await route.fulfill({
          status: 200,
          contentType: 'text/html',
          body: this.getLoginPageHtml(this.invalidCredentials, browserType)
        });
        return;
      }
      
      // Continue with the original request for other URLs
      await route.continue();
    });
  }

  /**
   * Get login page HTML with optional error message and browser-specific styling
   */
  private getLoginPageHtml(showError: boolean = false, browserType: string = 'chromium'): string {
    // Add browser-specific CSS fixes
    const browserSpecificCSS = browserType === 'firefox' ? 
      `input { font-family: Arial, sans-serif; } 
       button { font-family: Arial, sans-serif; }` : 
      browserType === 'webkit' ? 
      `input { -webkit-appearance: none; border-radius: 0; } 
       button { -webkit-appearance: none; border-radius: 0; }` : 
      '';
    
    console.log(`Generating login page HTML for ${browserType} browser`);
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>UAPI Login</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
          .login-container { width: 400px; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          .form-group { margin-bottom: 15px; }
          label { display: block; margin-bottom: 5px; }
          input { width: 100%; padding: 8px; box-sizing: border-box; }
          button { background: #4CAF50; color: white; padding: 10px 15px; border: none; cursor: pointer; width: 100%; }
          .error-message { color: red; margin-bottom: 15px; display: ${showError ? 'block' : 'none'}; }
          /* Browser-specific CSS */
          ${browserSpecificCSS}
        </style>
      </head>
      <body>
        <div class="login-container">
          <h2>UAPI Login</h2>
          <div class="error-message">Invalid username or password. Please try again.</div>
          <form id="loginForm">
            <div class="form-group">
              <label for="username">Username:</label>
              <input type="text" id="username" name="username" placeholder="Enter your username">
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" placeholder="Enter your password">
            </div>
            <div class="form-group">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
        <script>
          document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === 'fewer001' && password === 'Kathir123$') {
              window.location.href = '/dashboard';
            } else {
              document.querySelector('.error-message').style.display = 'block';
            }
          });
        </script>
      </body>
      </html>
    `;
  }

  /**
   * Setup mock responses for the dashboard page with browser-specific handling
   */
  public async setupDashboardMocks(): Promise<void> {
    if (!MockService.isMockEnabled) {
      console.log('Mock service is disabled');
      return;
    }

    // Wait for browser to be ready before setting up mocks
    await this.page.waitForLoadState('domcontentloaded');
    
    // Get browser type for browser-specific handling
    const browserType = await BrowserHelper.detectBrowserType(this.page);
    console.log(`Setting up dashboard mocks for ${browserType} browser`);

    await this.page.route('**/dashboard', async (route) => {
      console.log(`Mocking dashboard response for ${browserType} browser`);
      
      // Add browser-specific CSS fixes
      const browserSpecificCSS = browserType === 'firefox' ? 
        `.menu li a { display: inline-block; width: 100%; }
         .sidebar { overflow-y: auto; }` : 
        browserType === 'webkit' ? 
        `.menu li a { -webkit-appearance: none; }
         .sidebar { -webkit-overflow-scrolling: touch; }` : 
        '';
      
      // Serve a mock dashboard page with browser-specific styling
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: `
          <!DOCTYPE html>
          <html>
          <head>
            <title>UAPI Dashboard</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
              .sidebar { width: 250px; background: #333; color: white; height: 100vh; position: fixed; }
              .sidebar h1 { padding: 20px; margin: 0; }
              .menu { list-style: none; padding: 0; }
              .menu li { padding: 15px 20px; border-bottom: 1px solid #444; }
              .menu li a { color: white; text-decoration: none; display: block; }
              .content { margin-left: 250px; padding: 20px; }
              /* Browser-specific CSS */
              ${browserSpecificCSS}
            </style>
          </head>
          <body>
            <div class="sidebar">
              <h1 class="dashboard-header">Dashboard</h1>
              <ul class="menu">
                <li><a href="/dashboard" class="menu-item">Dashboard</a></li>
                <li><a href="/sub-account" class="menu-item">Sub Account Management</a></li>
                <li><a href="/package" class="menu-item">Package Management</a></li>
                <li><a href="/invoice" class="menu-item">My Invoices</a></li>
                <li><a href="/role" class="menu-item">Roles and Permissions</a></li>
                <li><a href="/user" class="menu-item">User Management</a></li>
                <li><a href="/report" class="menu-item">Reports</a></li>
              </ul>
            </div>
            <div class="content">
              <h2>Welcome to UAPI Dashboard</h2>
              <p>This is a mock dashboard for testing purposes.</p>
              <div class="subscribed-services">
                <h3>Subscribed Services</h3>
                <p>You have 3 active subscriptions.</p>
              </div>
              <div class="unsubscribed-services">
                <h3>Unsubscribed Services</h3>
                <p>There are 5 available services you can subscribe to.</p>
              </div>
              <div class="invoices-status">
                <h3>Invoices Per Status</h3>
                <p>You have 2 pending invoices.</p>
              </div>
              <div class="services-consumption">
                <h3>Services Consumption</h3>
                <p>Your service usage is within normal limits.</p>
              </div>
            </div>
            <script>
              // Browser-specific JavaScript adjustments
              document.addEventListener('DOMContentLoaded', function() {
                // Log browser information for debugging
                console.log('Dashboard loaded in ${browserType} browser');
                
                // Add browser-specific event handlers
                const menuItems = document.querySelectorAll('.menu-item');
                menuItems.forEach(item => {
                  item.addEventListener('click', function(e) {
                    console.log('Menu item clicked:', this.textContent);
                    // For testing purposes, prevent actual navigation
                    e.preventDefault();
                  });
                });
              });
            </script>
          </body>
          </html>
        `
      });
    });
  }

  /**
   * Enable mock mode for testing
   */
  public static async enableMockMode(page: Page): Promise<MockService> {
    const mockService = new MockService(page);
    await mockService.setupLoginMocks();
    await mockService.setupDashboardMocks();
    return mockService;
  }

  /**
   * Disable mock mode
   */
  public static disableMockMode(): void {
    MockService.isMockEnabled = false;
  }

  /**
   * Enable mock mode
   */
  public static enableMockModeGlobally(): void {
    MockService.isMockEnabled = true;
  }

  /**
   * Check if mock mode is enabled
   */
  public static isMockModeEnabled(): boolean {
    return MockService.isMockEnabled;
  }

  /**
   * Get browser type from user agent
   */
  private async getBrowserType(): Promise<'chromium' | 'firefox' | 'webkit' | 'unknown'> {
    try {
      const userAgent = await this.page.evaluate(() => navigator.userAgent);
      
      if (userAgent.includes('Firefox')) {
        return 'firefox';
      } else if (userAgent.includes('Chrome')) {
        return 'chromium';
      } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        return 'webkit';
      }
      
      return 'unknown';
    } catch (error) {
      console.error('Error detecting browser type:', error);
      return 'unknown';
    }
  }
}
