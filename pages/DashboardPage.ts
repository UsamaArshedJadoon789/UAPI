import { expect, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openModule(menuText: string) {
    await this.page.click(`text=${menuText}`);
    await expect(this.page).toHaveURL(/.+/);
  }

  async logout() {
    await this.page.click('text=Logout');
    await expect(this.page).toHaveURL(/login/);
  }
}
