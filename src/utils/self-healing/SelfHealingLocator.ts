import { Page, Locator } from '@playwright/test';
import { config } from '../../config/config';
import { LocatorStrategy } from './strategies/LocatorStrategy';
import { AttributeStrategy } from './strategies/AttributeStrategy';
import { CssStrategy } from './strategies/CssStrategy';
import { XPathStrategy } from './strategies/XPathStrategy';
import { TextContentStrategy } from './strategies/TextContentStrategy';
import { PositionStrategy } from './strategies/PositionStrategy';

export class SelfHealingLocator {
  private readonly page: Page;
  private readonly strategies: LocatorStrategy[];
  private readonly maxAttempts: number;
  private readonly selectorCache: Map<string, string> = new Map();

  constructor(page: Page) {
    this.page = page;
    this.maxAttempts = config.selfHealing.maxAttempts;
    this.strategies = [];
    
    // Initialize strategies based on config
    if (config.selfHealing.strategies.includes('attribute')) {
      this.strategies.push(new AttributeStrategy());
    }
    if (config.selfHealing.strategies.includes('css')) {
      this.strategies.push(new CssStrategy());
    }
    if (config.selfHealing.strategies.includes('xpath')) {
      this.strategies.push(new XPathStrategy());
    }
    if (config.selfHealing.strategies.includes('text')) {
      this.strategies.push(new TextContentStrategy());
    }
    if (config.selfHealing.strategies.includes('position')) {
      this.strategies.push(new PositionStrategy());
    }
    
    // Sort strategies by priority
    this.strategies.sort((a, b) => a.priority - b.priority);
  }

  async findElement(selector: string): Promise<Locator> {
    // Check if we have a cached alternative selector
    if (this.selectorCache.has(selector)) {
      const cachedSelector = this.selectorCache.get(selector)!;
      try {
        const element = this.page.locator(cachedSelector);
        const count = await element.count();
        if (count > 0) {
          return element;
        }
      } catch (error) {
        // Cache miss, continue with self-healing
        this.selectorCache.delete(selector);
      }
    }

    // First try with the original selector
    try {
      const element = this.page.locator(selector);
      // Check if element exists
      const count = await element.count();
      if (count > 0) {
        return element;
      }
    } catch (error) {
      // Continue to self-healing strategies
    }

    // If original selector fails, try self-healing strategies
    if (config.selfHealing.enabled) {
      for (let attempt = 0; attempt < this.maxAttempts; attempt++) {
        for (const strategy of this.strategies) {
          if (!strategy.isApplicable(selector)) {
            continue;
          }
          
          try {
            const alternativeSelector = await strategy.getAlternativeSelector(selector, this.page);
            if (alternativeSelector) {
              const element = this.page.locator(alternativeSelector);
              const count = await element.count();
              if (count > 0) {
                console.log(`Self-healing successful: Original selector "${selector}" replaced with "${alternativeSelector}" using ${strategy.name} strategy`);
                // Cache the successful alternative selector
                this.selectorCache.set(selector, alternativeSelector);
                return element;
              }
            }
          } catch (error) {
            // Try next strategy
          }
        }
      }
    }

    // If all strategies fail, return the original selector
    console.log(`Self-healing failed: Using original selector "${selector}"`);
    return this.page.locator(selector);
  }
  
  // Method to clear the selector cache
  clearCache(): void {
    this.selectorCache.clear();
  }
  
  // Method to get statistics about self-healing
  getStats(): { totalAttempts: number, successfulHeals: number } {
    return {
      totalAttempts: this.selectorCache.size,
      successfulHeals: this.selectorCache.size
    };
  }
}
