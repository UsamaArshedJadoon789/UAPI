import { test } from '../../utils/self-healing/SelfHealingHooks';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { config } from '../../config/config';

test.describe('Self-Healing Demonstration', () => {
  test('should login and validate dashboard with intentionally broken selectors', async ({ page, selfHealing }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    
    // Login with correct credentials
    await loginPage.navigateToLoginPage();
    
    // Intentionally use broken selectors that will trigger self-healing
    await page.fill('#non-existent-username', config.credentials.username);
    await page.fill('#non-existent-password', config.credentials.password);
    await page.click('button.non-existent-login-button');
    
    // Verify dashboard is loaded
    await dashboardPage.validateDashboardLoaded();
    
    // Get self-healing stats
    const stats = selfHealing.locator.getStats();
    console.log(`Self-healing stats: ${JSON.stringify(stats)}`);
  });
});
