import { Page, Locator, expect } from '@playwright/test';
import { SelfHealingLocator } from '../utils/self-healing/SelfHealingLocator';
import { config } from '../config/config';

export class BasePage {
  readonly page: Page;
  readonly selfHealing: SelfHealingLocator;

  constructor(page: Page) {
    this.page = page;
    this.selfHealing = new SelfHealingLocator(page);
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getElement(selector: string): Promise<Locator> {
    return this.selfHealing.findElement(selector);
  }

  async click(selector: string, options?: { force?: boolean, timeout?: number }): Promise<void> {
    const element = await this.getElement(selector);
    await element.click({ 
      force: options?.force, 
      timeout: options?.timeout || config.timeout.medium 
    });
  }

  async fill(selector: string, text: string, options?: { timeout?: number }): Promise<void> {
    const element = await this.getElement(selector);
    await element.fill(text, { 
      timeout: options?.timeout || config.timeout.medium 
    });
  }

  async getText(selector: string): Promise<string> {
    const element = await this.getElement(selector);
    return await element.innerText();
  }

  async isVisible(selector: string, options?: { timeout?: number }): Promise<boolean> {
    const element = await this.getElement(selector);
    try {
      await element.waitFor({ 
        state: 'visible', 
        timeout: options?.timeout || config.timeout.short 
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async waitForElement(selector: string, options?: { state?: 'attached' | 'detached' | 'visible' | 'hidden', timeout?: number }): Promise<void> {
    const element = await this.getElement(selector);
    await element.waitFor({ 
      state: options?.state || 'visible', 
      timeout: options?.timeout || config.timeout.medium 
    });
  }

  async expectToBeVisible(selector: string, options?: { timeout?: number }): Promise<void> {
    const element = await this.getElement(selector);
    await expect(element).toBeVisible({ 
      timeout: options?.timeout || config.timeout.medium 
    });
  }
}
