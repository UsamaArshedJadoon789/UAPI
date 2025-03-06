import { Page, Locator } from '@playwright/test';

export interface LocatorStrategy {
  name: string;
  priority: number;
  getAlternativeSelector(originalSelector: string, page: Page): Promise<string | null>;
  isApplicable(originalSelector: string): boolean;
}
