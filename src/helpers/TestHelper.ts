import { Page } from '@playwright/test';
import { config } from '../config/config';

export class TestHelper {
  static async takeScreenshot(page: Page, name: string): Promise<void> {
    await page.screenshot({ path: `./src/reports/screenshots/${name}-${Date.now()}.png` });
  }

  static async waitForNetworkIdle(page: Page, timeout: number = config.timeout.medium): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  static async waitForPageLoad(page: Page, timeout: number = config.timeout.medium): Promise<void> {
    await page.waitForLoadState('load', { timeout });
  }

  static generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Enhanced retry mechanism with exponential backoff and detailed logging
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
   * Retry a function with a specific error type
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
   * Retry a function until it returns a truthy value
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
}
