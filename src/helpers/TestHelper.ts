import { Page } from '@playwright/test';
import { config } from '../config/config';
import { BrowserHelper } from '../utils/helpers/BrowserHelper';

export class TestHelper {
  private page: Page;
  private testName: string;

  constructor(page: Page, testName: string) {
    this.page = page;
    this.testName = testName;
    
    // Apply browser-specific workarounds
    BrowserHelper.applyBrowserWorkarounds(page).catch(error => {
      console.warn('Failed to apply browser workarounds:', error.message);
    });
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `./src/reports/screenshots/${name}-${Date.now()}.png` });
  }

  async waitForNetworkIdle(timeout: number = config.timeout.medium): Promise<void> {
    // Get browser-specific timeout
    const adjustedTimeout = await BrowserHelper.getBrowserSpecificTimeout(this.page, timeout);
    await this.page.waitForLoadState('networkidle', { timeout: adjustedTimeout });
  }

  async waitForPageLoad(timeout: number = config.timeout.medium): Promise<void> {
    // Get browser-specific timeout
    const adjustedTimeout = await BrowserHelper.getBrowserSpecificTimeout(this.page, timeout);
    await this.page.waitForLoadState('load', { timeout: adjustedTimeout });
  }

  // Static methods for backward compatibility
  static async takeScreenshot(page: Page, name: string): Promise<void> {
    await page.screenshot({ path: `./src/reports/screenshots/${name}-${Date.now()}.png` });
  }

  static async waitForNetworkIdle(page: Page, timeout: number = config.timeout.medium): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  static async waitForPageLoad(page: Page, timeout: number = config.timeout.medium): Promise<void> {
    await page.waitForLoadState('load', { timeout });
  }

  // Instance method for generating random strings
  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  // Static method for backward compatibility
  static generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Enhanced retry mechanism with exponential backoff and detailed logging (instance method)
   * @param fn Function to retry
   * @param options Retry options
   * @returns Result of the function
   */
  async retry<T>(
    fn: () => Promise<T>,
    options: { 
      maxRetries?: number; 
      initialDelay?: number;
      maxDelay?: number;
      backoffFactor?: number;
      retryCondition?: (error: Error) => boolean;
      onRetry?: (error: Error, attempt: number) => void;
    } = {}
  ): Promise<T> {
    const maxRetries = options.maxRetries ?? config.retries;
    const initialDelay = options.initialDelay ?? 1000;
    const maxDelay = options.maxDelay ?? 10000;
    const backoffFactor = options.backoffFactor ?? 2;
    const retryCondition = options.retryCondition ?? (() => true);
    const onRetry = options.onRetry ?? ((error, attempt) => {
      console.log(`[${this.testName}] Retry attempt ${attempt}/${maxRetries} failed: ${error.message}`);
    });
    
    let lastError: Error | undefined;
    
    // Get browser-specific timeout adjustments
    const browserType = await BrowserHelper.detectBrowserType(this.page);
    console.log(`Detected browser type for retry: ${browserType}`);
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        
        // Check if we should retry based on the error
        if (!retryCondition(lastError)) {
          console.log(`[${this.testName}] Not retrying as condition not met: ${lastError.message}`);
          throw lastError;
        }
        
        // Call the onRetry callback
        onRetry(lastError, attempt + 1);
        
        if (attempt < maxRetries - 1) {
          // Calculate delay with exponential backoff and browser-specific adjustments
          let delay = Math.min(initialDelay * Math.pow(backoffFactor, attempt), maxDelay);
          
          // Apply browser-specific delay adjustments
          if (browserType === 'firefox') {
            delay *= 1.5; // Firefox sometimes needs more time
          } else if (browserType === 'webkit') {
            delay *= 2; // WebKit sometimes needs even more time
          }
          
          console.log(`[${this.testName}] Waiting ${delay}ms before next retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError;
  }
  
  /**
   * Enhanced retry mechanism with exponential backoff and detailed logging (static method)
   * @param fn Function to retry
   * @param options Retry options
   * @returns Result of the function
   */
  static async retry<T>(
    fn: () => Promise<T>,
    options: { 
      maxRetries?: number; 
      initialDelay?: number;
      maxDelay?: number;
      backoffFactor?: number;
      retryCondition?: (error: Error) => boolean;
      onRetry?: (error: Error, attempt: number) => void;
    } = {}
  ): Promise<T> {
    const maxRetries = options.maxRetries ?? config.retries;
    const initialDelay = options.initialDelay ?? 1000;
    const maxDelay = options.maxDelay ?? 10000;
    const backoffFactor = options.backoffFactor ?? 2;
    const retryCondition = options.retryCondition ?? (() => true);
    const onRetry = options.onRetry ?? ((error, attempt) => {
      console.log(`Retry attempt ${attempt}/${maxRetries} failed: ${error.message}`);
    });
    
    let lastError: Error | undefined;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        
        // Check if we should retry based on the error
        if (!retryCondition(lastError)) {
          console.log(`Not retrying as condition not met: ${lastError.message}`);
          throw lastError;
        }
        
        // Call the onRetry callback
        onRetry(lastError, attempt + 1);
        
        if (attempt < maxRetries - 1) {
          // Calculate delay with exponential backoff
          const delay = Math.min(initialDelay * Math.pow(backoffFactor, attempt), maxDelay);
          console.log(`Waiting ${delay}ms before next retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError;
  }
  
  /**
   * Retry a function with a specific error type (instance method)
   * @param fn Function to retry
   * @param errorType Error type to retry on
   * @param options Retry options
   * @returns Result of the function
   */
  async retryOnError<T, E extends Error>(
    fn: () => Promise<T>,
    errorType: new (...args: any[]) => E,
    options: { maxRetries?: number; delay?: number } = {}
  ): Promise<T> {
    return this.retry(fn, {
      ...options,
      retryCondition: (error) => error instanceof errorType
    });
  }
  
  /**
   * Retry a function with a specific error type (static method)
   * @param fn Function to retry
   * @param errorType Error type to retry on
   * @param options Retry options
   * @returns Result of the function
   */
  static async retryOnError<T, E extends Error>(
    fn: () => Promise<T>,
    errorType: new (...args: any[]) => E,
    options: { maxRetries?: number; delay?: number } = {}
  ): Promise<T> {
    return this.retry(fn, {
      ...options,
      retryCondition: (error) => error instanceof errorType
    });
  }
  
  /**
   * Retry a function until it returns a truthy value (instance method)
   * @param fn Function to retry
   * @param options Retry options
   * @returns Result of the function
   */
  async retryUntilTruthy<T>(
    fn: () => Promise<T>,
    options: { maxRetries?: number; delay?: number } = {}
  ): Promise<T> {
    let result: T;
    
    await this.retry(async () => {
      result = await fn();
      if (!result) {
        throw new Error(`[${this.testName}] Function returned a falsy value`);
      }
      return result;
    }, options);
    
    return result!;
  }
  
  /**
   * Retry a function until it returns a truthy value (static method)
   * @param fn Function to retry
   * @param options Retry options
   * @returns Result of the function
   */
  static async retryUntilTruthy<T>(
    fn: () => Promise<T>,
    options: { maxRetries?: number; delay?: number } = {}
  ): Promise<T> {
    let result: T;
    
    await this.retry(async () => {
      result = await fn();
      if (!result) {
        throw new Error('Function returned a falsy value');
      }
      return result;
    }, options);
    
    return result!;
  }
  
  /**
   * Wait for element with browser-specific handling
   */
  async waitForElementWithFallback(
    selector: string,
    fallbackSelector: string,
    timeout: number = 5000
  ): Promise<boolean> {
    return BrowserHelper.waitForElementWithFallback(this.page, selector, fallbackSelector, timeout);
  }
  
  /**
   * Apply browser-specific timing adjustments
   */
  async applyTimingAdjustments(): Promise<void> {
    await BrowserHelper.applyTimingAdjustments(this.page);
  }
  
  /**
   * Get browser-specific selector
   */
  async getBrowserSpecificSelector(
    chromiumSelector: string, 
    firefoxSelector: string, 
    webkitSelector: string
  ): Promise<string> {
    return BrowserHelper.getBrowserSpecificSelector(
      this.page, 
      chromiumSelector, 
      firefoxSelector, 
      webkitSelector
    );
  }
  
  /**
   * Get browser type
   */
  async getBrowserType(): Promise<'chromium' | 'firefox' | 'webkit' | 'unknown'> {
    return BrowserHelper.detectBrowserType(this.page);
  }
}
