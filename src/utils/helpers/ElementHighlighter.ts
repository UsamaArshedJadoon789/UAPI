import { Page } from '@playwright/test';

/**
 * ElementHighlighter - Provides element highlighting functionality similar to Selenium's highlightElement
 */
export class ElementHighlighter {
    /**
     * Highlight an element with a red border and yellow background
     * @param page Playwright page instance
     * @param selector CSS selector for the element to highlight
     * @param duration Duration in milliseconds to keep the highlight (default: 1000ms)
     */
    public static async highlightElement(
        page: Page, 
        selector: string, 
        duration: number = 1000
    ): Promise<void> {
        try {
            await page.evaluate(
                ({ selector, duration }) => {
                    const element = document.querySelector(selector);
                    if (element && element instanceof HTMLElement) {
                        const originalBorder = element.style.border;
                        const originalBackground = element.style.backgroundColor;
                        const originalBoxShadow = element.style.boxShadow;
                        
                        element.style.border = '3px solid red';
                        element.style.backgroundColor = 'yellow';
                        element.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.8)';
                        element.style.transition = 'all 0.3s ease';
                        
                        element.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center', 
                            inline: 'center' 
                        });
                        
                        setTimeout(() => {
                            element.style.border = originalBorder;
                            element.style.backgroundColor = originalBackground;
                            element.style.boxShadow = originalBoxShadow;
                        }, duration);
                    }
                },
                { selector, duration }
            );
            
            await page.waitForTimeout(300);
        } catch (error) {
            console.warn(`Failed to highlight element with selector "${selector}":`, error);
        }
    }

    /**
     * Highlight multiple elements sequentially
     * @param page Playwright page instance
     * @param selectors Array of CSS selectors to highlight
     * @param duration Duration for each highlight
     * @param delay Delay between highlights
     */
    public static async highlightElements(
        page: Page,
        selectors: string[],
        duration: number = 1000,
        delay: number = 500
    ): Promise<void> {
        for (const selector of selectors) {
            await this.highlightElement(page, selector, duration);
            await page.waitForTimeout(delay);
        }
    }

    /**
     * Scroll element into view with smooth animation
     * @param page Playwright page instance
     * @param selector CSS selector for the element
     */
    public static async scrollIntoView(page: Page, selector: string): Promise<void> {
        try {
            await page.evaluate((selector) => {
                const element = document.querySelector(selector);
                if (element) {
                    element.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center', 
                        inline: 'center' 
                    });
                }
            }, selector);
            
            await page.waitForTimeout(500);
        } catch (error) {
            console.warn(`Failed to scroll element into view with selector "${selector}":`, error);
        }
    }

    /**
     * Scroll page by specified amount
     * @param page Playwright page instance
     * @param x Horizontal scroll amount
     * @param y Vertical scroll amount
     */
    public static async scrollBy(page: Page, x: number = 0, y: number = 600): Promise<void> {
        await page.evaluate(({ x, y }) => {
            window.scrollBy(x, y);
        }, { x, y });
        
        await page.waitForTimeout(300);
    }

    /**
     * Scroll to specific position on page
     * @param page Playwright page instance
     * @param x Horizontal position
     * @param y Vertical position (can be percentage like 0.3 for 30% of page height)
     */
    public static async scrollTo(page: Page, x: number = 0, y: number | string = 0): Promise<void> {
        await page.evaluate(({ x, y }) => {
            if (typeof y === 'string' && y.includes('%')) {
                const percentage = parseFloat(y.replace('%', '')) / 100;
                y = document.body.scrollHeight * percentage;
            } else if (typeof y === 'number' && y > 0 && y < 1) {
                y = document.body.scrollHeight * y;
            }
            window.scrollTo(x, y as number);
        }, { x, y });
        
        await page.waitForTimeout(300);
    }
}
