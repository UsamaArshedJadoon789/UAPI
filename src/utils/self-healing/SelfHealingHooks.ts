import { test as base } from '@playwright/test';
import { SelfHealingLocator } from './SelfHealingLocator';
import { SelfHealingReporter } from './SelfHealingReporter';

// Extend the base test fixture with self-healing capabilities
export const test = base.extend({
  selfHealing: async ({ page }, use) => {
    const selfHealing = new SelfHealingLocator(page);
    const reporter = new SelfHealingReporter();
    
    // Set up event listeners for self-healing events
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('Self-healing successful:')) {
        const match = text.match(/Original selector "([^"]+)" replaced with "([^"]+)" using ([^ ]+) strategy/);
        if (match) {
          reporter.recordHealingEvent({
            originalSelector: match[1],
            healedSelector: match[2],
            strategy: match[3],
            success: true,
            page: page.url()
          });
        }
      } else if (text.includes('Self-healing failed:')) {
        const match = text.match(/Using original selector "([^"]+)"/);
        if (match) {
          reporter.recordHealingEvent({
            originalSelector: match[1],
            healedSelector: match[1],
            strategy: 'none',
            success: false,
            page: page.url()
          });
        }
      }
    });
    
    // Make the self-healing locator available to the test
    await use({ locator: selfHealing, reporter });
    
    // Generate report after test
    reporter.generateReport();
  }
});

export { expect } from '@playwright/test';
