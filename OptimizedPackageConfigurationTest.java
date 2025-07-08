package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.OptimizedPackageConfigurationPage;

public class OptimizedPackageConfigurationTest extends BaseTest {

    /**
     * Single comprehensive test that runs the entire package configuration workflow
     * in one browser session with element highlighting - NO BROWSER RESTARTS
     */
    @Test(priority = 1, description = "Complete package configuration workflow in single browser session")
    public void testCompletePackageConfigurationWorkflow() throws InterruptedException {
        System.out.println("Starting complete package configuration workflow test");
        
        OptimizedPackageConfigurationPage packagePage = new OptimizedPackageConfigurationPage(this.driver);
        
        packagePage.completePackageConfigurationWorkflow();
        
        Assert.assertTrue(this.driver.getCurrentUrl().contains("congratulations") || 
                         this.driver.getPageSource().contains("congratulations"), 
                         "Package configuration workflow should complete successfully");
        
        System.out.println("Complete package configuration workflow test completed successfully!");
    }

    /**
     * Optional validation test - can be run separately if needed
     * This test validates individual elements without running the full workflow
     */
    @Test(priority = 2, description = "Validate package configuration page elements", enabled = false)
    public void testPackageConfigurationElementsValidation() throws InterruptedException {
        System.out.println("Starting package configuration elements validation test");
        
        OptimizedPackageConfigurationPage packagePage = new OptimizedPackageConfigurationPage(this.driver);
        
        packagePage.navigateToPackageConfiguration();
        this.waitForPageLoad();
        
        Assert.assertTrue(packagePage.isConfigurationButtonDisplayed(), 
                         "Configuration button should be displayed");
        
        packagePage.clickConfigurationWithHighlight();
        this.waitForPageLoad();
        
        Assert.assertTrue(packagePage.isDiscoverOptionDisplayed(), 
                         "Discover option should be displayed");
        
        packagePage.selectDiscoverOptionWithHighlight();
        packagePage.scrollDown();
        this.waitForPageLoad();
        
        Assert.assertTrue(packagePage.isPackageOptionDisplayed(), 
                         "Package option should be displayed");
        
        System.out.println("Package configuration elements validation completed successfully!");
    }

    /**
     * Lightweight smoke test - just validates navigation and first few steps
     */
    @Test(priority = 3, description = "Package configuration smoke test", enabled = false)
    public void testPackageConfigurationSmokeTest() throws InterruptedException {
        System.out.println("Starting package configuration smoke test");
        
        OptimizedPackageConfigurationPage packagePage = new OptimizedPackageConfigurationPage(this.driver);
        
        packagePage.navigateToPackageConfiguration();
        this.waitForPageLoad();
        
        Assert.assertTrue(packagePage.isConfigurationButtonDisplayed(), 
                         "Configuration button should be visible");
        Assert.assertTrue(this.driver.getCurrentUrl().contains("sales"), 
                         "Should be on sales page");
        
        packagePage.clickConfigurationWithHighlight();
        this.waitForPageLoad();
        
        Assert.assertTrue(packagePage.isDiscoverOptionDisplayed(), 
                         "Discover option should be visible after clicking configuration");
        
        System.out.println("Package configuration smoke test completed successfully!");
    }
}
