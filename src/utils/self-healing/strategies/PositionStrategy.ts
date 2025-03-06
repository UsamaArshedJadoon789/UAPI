import { Page } from '@playwright/test';
import { LocatorStrategy } from './LocatorStrategy';

export class PositionStrategy implements LocatorStrategy {
  name = 'position';
  priority = 5;

  isApplicable(originalSelector: string): boolean {
    return true; // Position strategy can be applied to any selector
  }

  async getAlternativeSelector(originalSelector: string, page: Page): Promise<string | null> {
    try {
      // Try to find elements by their position
      if (originalSelector.includes('nth-child')) {
        return originalSelector; // Already using position, return as is
      }
    } catch (error) {
      // Ignore errors and return null
    }
    return null;
  }
}
