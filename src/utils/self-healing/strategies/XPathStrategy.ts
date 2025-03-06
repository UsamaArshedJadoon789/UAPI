import { Page } from '@playwright/test';
import { LocatorStrategy } from './LocatorStrategy';

export class XPathStrategy implements LocatorStrategy {
  name = 'xpath';
  priority = 3;

  isApplicable(originalSelector: string): boolean {
    return !originalSelector.startsWith('//') && !originalSelector.startsWith('xpath=');
  }

  async getAlternativeSelector(originalSelector: string, page: Page): Promise<string | null> {
    // Convert CSS to XPath
    if (originalSelector.startsWith('#')) {
      return `//*[@id="${originalSelector.substring(1)}"]`;
    } else if (originalSelector.startsWith('.')) {
      return `//*[contains(@class, "${originalSelector.substring(1)}")]`;
    }
    return null;
  }
}
