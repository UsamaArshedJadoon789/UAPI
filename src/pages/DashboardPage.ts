import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { TestHelper } from '../helpers/TestHelper';

export class DashboardPage extends BasePage {
  // Selectors for menu items with multiple strategies for self-healing
  private readonly dashboardMenu = 'a:has-text("Dashboard"), a[href*="dashboard"], .dashboard-link';
  private readonly subAccountManagementMenu = 'a:has-text("Sub Account Management"), a[href*="sub-account"], .sub-account-link';
  private readonly packageManagementMenu = 'a:has-text("Package Management"), a[href*="package"], .package-link';
  private readonly myInvoicesMenu = 'a:has-text("My Invoices"), a[href*="invoice"], .invoice-link';
  private readonly rolesAndPermissionsMenu = 'a:has-text("Roles and Permissions"), a[href*="role"], .role-link';
  private readonly userManagementMenu = 'a:has-text("User Management"), a[href*="user"], .user-link';
  private readonly reportsMenu = 'a:has-text("Reports"), a[href*="report"], .report-link';
  private readonly hideMenuButton = 'button:has-text("Hide Menu"), .hide-menu-button';
  
  // Dashboard content selectors
  private readonly subscribedServicesCard = 'text=Subscribed Services, .subscribed-services';
  private readonly unsubscribedServicesCard = 'text=Unsubscribed Services, .unsubscribed-services';
  private readonly invoicesPerStatusCard = 'text=Invoices Per Status, .invoices-status';
  private readonly servicesConsumptionSection = 'text=Services Consumption, .services-consumption';

  // Menu items mapping for validation
  private readonly menuItems = {
    'dashboard': this.dashboardMenu,
    'sub account management': this.subAccountManagementMenu,
    'package management': this.packageManagementMenu,
    'my invoices': this.myInvoicesMenu,
    'roles and permissions': this.rolesAndPermissionsMenu,
    'user management': this.userManagementMenu,
    'reports': this.reportsMenu,
    'hide menu': this.hideMenuButton
  };

  constructor(page: Page) {
    super(page);
  }

  async waitForDashboardLoad(): Promise<void> {
    await TestHelper.retry(async () => {
      await this.waitForElement(this.dashboardMenu);
      await this.waitForElement(this.subscribedServicesCard);
    }, {
      maxRetries: 3,
      initialDelay: 1000,
      onRetry: (error, attempt) => {
        console.log(`Waiting for dashboard to load (attempt ${attempt}): ${error.message}`);
      }
    });
  }

  async validateDashboardLoaded(): Promise<void> {
    await this.waitForDashboardLoad();
    await this.expectToBeVisible(this.dashboardMenu);
    await this.expectToBeVisible(this.subscribedServicesCard);
    await this.expectToBeVisible(this.unsubscribedServicesCard);
    await this.expectToBeVisible(this.invoicesPerStatusCard);
    await this.expectToBeVisible(this.servicesConsumptionSection);
  }

  async validateAllMenuItems(): Promise<void> {
    // Validate all menu items are visible
    for (const [name, selector] of Object.entries(this.menuItems)) {
      console.log(`Validating menu item: ${name}`);
      await this.expectToBeVisible(selector);
    }
  }

  async clickMenuItem(menuItem: string): Promise<void> {
    const lowerMenuItem = menuItem.toLowerCase();
    if (this.menuItems[lowerMenuItem]) {
      await this.click(this.menuItems[lowerMenuItem]);
      await TestHelper.waitForPageLoad(this.page);
    } else {
      throw new Error(`Menu item "${menuItem}" not found`);
    }
  }

  async getMenuItemCount(): Promise<number> {
    return Object.keys(this.menuItems).length;
  }

  async getMenuItemText(menuItem: string): Promise<string> {
    const lowerMenuItem = menuItem.toLowerCase();
    if (this.menuItems[lowerMenuItem]) {
      return await this.getText(this.menuItems[lowerMenuItem]);
    }
    throw new Error(`Menu item "${menuItem}" not found`);
  }
}
