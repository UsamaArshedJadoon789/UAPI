import { expect, Page } from '@playwright/test';
import BasePage from '../BasePage';

export default class ModulePage extends BasePage {
  private readonly identifier: string;

  constructor(page: Page, identifier: string) {
    super(page);
    this.identifier = identifier;
  }

  async isLoaded() {
    await expect(this.page.locator(this.identifier)).toBeVisible();
  }
}
