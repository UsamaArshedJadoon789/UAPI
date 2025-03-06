import { Page } from '@playwright/test';
import { LocatorStrategy } from './LocatorStrategy';

export class TextContentStrategy implements LocatorStrategy {
  name = 'text';
  priority = 4;

  isApplicable(originalSelector: string): boolean {
    return true; // Text strategy can be applied to any selector
  }

  async getAlternativeSelector(originalSelector: string, page: Page): Promise<string | null> {
    try {
      // Try to find elements by text content
      if (originalSelector.includes(':has-text(')) {
        const textMatch = originalSelector.match(/:has-text\(['"]([^'"]+)['"]\)/);
        if (textMatch) {
          return `:text("${textMatch[1]}")`;
        }
      } else if (originalSelector.includes('text=')) {
        const text = originalSelector.split('text=')[1];
        return `:text("${text}")`;
      }
    } catch (error) {
      // Ignore errors and return null
    }
    return null;
  }
}
