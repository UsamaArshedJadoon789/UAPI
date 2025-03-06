import { Page } from '@playwright/test';
import { LocatorStrategy } from './LocatorStrategy';

export class CssStrategy implements LocatorStrategy {
  name = 'css';
  priority = 2;

  isApplicable(originalSelector: string): boolean {
    return true; // CSS strategy can be applied to any selector
  }

  async getAlternativeSelector(originalSelector: string, page: Page): Promise<string | null> {
    // Try different CSS combinations
    if (originalSelector.startsWith('//') || originalSelector.startsWith('xpath=')) {
      // Convert XPath to CSS if possible
      if (originalSelector.includes('@id')) {
        const idMatch = originalSelector.match(/@id=['"]([^'"]+)['"]/);
        if (idMatch) {
          return `#${idMatch[1]}`;
        }
      } else if (originalSelector.includes('@class')) {
        const classMatch = originalSelector.match(/@class=['"]([^'"]+)['"]/);
        if (classMatch) {
          return `.${classMatch[1].replace(/\s+/g, '.')}`;
        }
      }
    }
    return null;
  }
}
