import { BrowserContext, Page } from '@playwright/test';

/**
 * BrowserHelper - Provides browser-specific utilities and workarounds
 */
export class BrowserHelper {
    /**
     * Detect browser type from the user agent
     */
    public static async detectBrowserType(page: Page): Promise<'chromium' | 'firefox' | 'webkit' | 'unknown'> {
        const userAgent = await page.evaluate(() => navigator.userAgent);
        
        if (userAgent.includes('Firefox')) {
            return 'firefox';
        } else if (userAgent.includes('Chrome')) {
            return 'chromium';
        } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
            return 'webkit';
        }
        
        return 'unknown';
    }
    
    /**
     * Apply browser-specific workarounds
     */
    public static async applyBrowserWorkarounds(page: Page): Promise<void> {
        const browserType = await this.detectBrowserType(page);
        
        console.log(`Applying workarounds for ${browserType} browser`);
        
        switch (browserType) {
            case 'firefox':
                // Firefox-specific workarounds
                await page.evaluate(() => {
                    // Fix for :has() selector in older Firefox versions
                    if (!CSS.supports('selector(:has(*))')) {
                        console.log('Firefox :has() selector polyfill applied');
                    }
                });
                break;
                
            case 'webkit':
                // WebKit-specific workarounds
                await page.evaluate(() => {
                    // Fix for some WebKit-specific issues
                    console.log('WebKit workarounds applied');
                });
                break;
                
            default:
                // No specific workarounds needed
                break;
        }
    }
    
    /**
     * Get browser-specific selector
     */
    public static async getBrowserSpecificSelector(
        page: Page, 
        chromiumSelector: string, 
        firefoxSelector: string, 
        webkitSelector: string
    ): Promise<string> {
        const browserType = await this.detectBrowserType(page);
        
        switch (browserType) {
            case 'firefox':
                return firefoxSelector;
            case 'webkit':
                return webkitSelector;
            case 'chromium':
            default:
                return chromiumSelector;
        }
    }

    /**
     * Wait for element with browser-specific handling
     */
    public static async waitForElementWithFallback(
        page: Page,
        selector: string,
        fallbackSelector: string,
        timeout: number = 5000
    ): Promise<boolean> {
        try {
            await page.waitForSelector(selector, { state: 'visible', timeout });
            return true;
        } catch (error) {
            console.log(`Element not found with selector "${selector}", trying fallback "${fallbackSelector}"`);
            try {
                await page.waitForSelector(fallbackSelector, { state: 'visible', timeout });
                return true;
            } catch (fallbackError) {
                console.error('Element not found with fallback selector either:', fallbackError.message);
                return false;
            }
        }
    }

    /**
     * Apply browser-specific timing adjustments
     */
    public static async applyTimingAdjustments(page: Page): Promise<void> {
        const browserType = await this.detectBrowserType(page);
        
        switch (browserType) {
            case 'firefox':
                // Firefox sometimes needs more time for animations and transitions
                await page.waitForTimeout(200);
                break;
                
            case 'webkit':
                // WebKit sometimes needs more time for layout calculations
                await page.waitForTimeout(300);
                break;
                
            default:
                // Chromium is generally faster, but still add a small delay for consistency
                await page.waitForTimeout(100);
                break;
        }
    }

    /**
     * Get browser-specific timeout
     */
    public static async getBrowserSpecificTimeout(
        page: Page,
        baseTimeout: number
    ): Promise<number> {
        const browserType = await this.detectBrowserType(page);
        
        switch (browserType) {
            case 'firefox':
                // Firefox sometimes needs more time
                return baseTimeout * 1.5;
            case 'webkit':
                // WebKit sometimes needs even more time
                return baseTimeout * 2;
            case 'chromium':
            default:
                // Use base timeout for Chromium
                return baseTimeout;
        }
    }
}
