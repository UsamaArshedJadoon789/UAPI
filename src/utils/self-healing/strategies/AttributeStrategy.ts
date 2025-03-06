import { Page } from '@playwright/test';
import { LocatorStrategy } from './LocatorStrategy';

export class AttributeStrategy implements LocatorStrategy {
  name = 'attribute';
  priority = 1;

  isApplicable(originalSelector: string): boolean {
    return !originalSelector.startsWith('//') && !originalSelector.startsWith('xpath=');
  }

  async getAlternativeSelector(originalSelector: string, page: Page): Promise<string | null> {
    // Convert CSS to attribute-based selector
    if (originalSelector.includes('#')) {
      const idValue = originalSelector.split('#')[1].split(' ')[0].split(']')[0].split(':')[0];
      return `[id="${idValue}"]`;
    } else if (originalSelector.includes('.')) {
      const classValue = originalSelector.split('.')[1].split(' ')[0].split(']')[0].split(':')[0];
      return `[class*="${classValue}"]`;
    }
    return null;
  }
}
