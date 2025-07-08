package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import java.util.Random;

public class OptimizedPackageConfigurationPage extends BasePage {
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/div/div[2]/div[2]/div/a[2]")
    private WebElement configurationButton;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-package/div/div/div[2]/div/div/label[1]")
    private WebElement discoverOption;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-package/div/div/div[2]/div/div[3]/div/div[2]/div[1]/div[1]/label/div[1]")
    private WebElement packageOption;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-package/div/div/div[2]/div/div[3]/div/div[2]/div[1]/div[2]/button")
    private WebElement nextButton;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-package/div/div/div[2]/div/div[3]/div/div[2]/div[2]/div[1]/label[1]/div[1]")
    private WebElement dataOption;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-package/div/div/div[2]/div/div[3]/div/div[2]/div[2]/div[2]/button")
    private WebElement nextButton2;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-preview-your-package/div/div/div[2]/div/div[3]/div/div[3]/div[4]/div[2]/button[1]")
    private WebElement confirmButton;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[1]/div/input")
    private WebElement firstNameField;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[2]/div/input")
    private WebElement lastNameField;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[3]/div/input")
    private WebElement nidaField;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[4]/div/input")
    private WebElement occupationField;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[5]/div/input")
    private WebElement emailField;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[6]/div/input")
    private WebElement telephoneField;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[7]/div/div[1]/input")
    private WebElement createPasswordField;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[8]/div/div[1]/input")
    private WebElement confirmPasswordField;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[3]/button")
    private WebElement nextButton3;

    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[1]/div/input")
    private WebElement companyField;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[2]/div/input")
    private WebElement typeField;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[3]/div/input")
    private WebElement addressField;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[4]/div/input")
    private WebElement cityField;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[5]/div/input")
    private WebElement postalField;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[6]/div/input")
    private WebElement installationField;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[7]/div/input")
    private WebElement city1Field;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[8]/div/input")
    private WebElement postal1Field;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[9]/div/input")
    private WebElement registrationField;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[10]/div/input")
    private WebElement tinField;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[2]/button")
    private WebElement proceedButton;

    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-payment-method/div/div/div[2]/div/div[3]/div/div[1]/div/div/div/label[2]")
    private WebElement paymentMethodOption;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-payment-method/div/div/div[2]/div/div[3]/div/div[1]/div/div/p-tabview/div/div[2]/p-tabview/div/div[2]/p-tabpanel[1]/div/div[1]/div[3]/div/div[1]/input")
    private WebElement paymentFirstNameField;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-payment-method/div/div/div[2]/div/div[3]/div/div[1]/div/div/p-tabview/div/div[2]/p-tabview/div/div[2]/p-tabpanel[1]/div/div[1]/div[3]/div/div[2]/input")
    private WebElement paymentLastNameField;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-payment-method/div/div/div[2]/div/div[3]/div/div[1]/div/div/p-tabview/div/div[2]/p-tabview/div/div[2]/p-tabpanel[1]/div/div[1]/div[3]/div/div[3]/input")
    private WebElement paymentPhoneField;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-payment-method/div/div/div[2]/div/div[3]/div/div[1]/div/div/p-tabview/div/div[2]/p-tabview/div/div[2]/p-tabpanel[1]/div/div[1]/div[3]/div/div[4]/input")
    private WebElement paymentEmailField;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-payment-method/div/div/div[2]/div/div[3]/div/div[1]/div/div/p-tabview/div/div[2]/p-tabview/div/div[2]/p-tabpanel[1]/div/div[2]/button")
    private WebElement selectButton;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-payment-method/div/div/div[2]/div/div[3]/div/div[1]/div/div/p-dialog/div/div/div[2]/div[2]/button")
    private WebElement okButton;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/div/div[3]/button")
    private WebElement proceedButton1;

    @FindBy(xpath = "//input[@type='file']")
    private WebElement fileUpload1;
    
    @FindBy(xpath = "(//input[@type='file'])[2]")
    private WebElement fileUpload2;
    
    @FindBy(xpath = "(//input[@type='file'])[3]")
    private WebElement fileUpload3;
    
    @FindBy(xpath = "(//input[@type='file'])[4]")
    private WebElement fileUpload4;
    
    @FindBy(xpath = "(//input[@type='file'])[5]")
    private WebElement fileUpload5;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[3]/app-payment-receipt/div[4]/div[2]/button")
    private WebElement finalOkButton;
    
    @FindBy(xpath = "/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-congratulations/div/div/div/div/div[3]/div/div/div[2]/div/button")
    private WebElement selfCareButton;

    public OptimizedPackageConfigurationPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Complete the entire package configuration workflow in one session with highlighting
     * This method runs all steps sequentially without browser restarts
     */
    public void completePackageConfigurationWorkflow() throws InterruptedException {
        System.out.println("Starting complete package configuration workflow in single browser session");
        
        navigateToPackageConfiguration();
        
        clickConfigurationWithHighlight();
        
        selectDiscoverOptionWithHighlight();
        
        selectPackageAndProceed();
        
        selectDataOptionAndProceed();
        
        confirmPackageSelection();
        
        fillUserDetailsWithHighlight();
        
        fillCompanyDetailsWithHighlight();
        
        configurePaymentMethodWithHighlight();
        
        uploadRequiredFilesWithHighlight();
        
        completeProcessWithHighlight();
        
        System.out.println("Package configuration workflow completed successfully in single browser session!");
    }

    private void navigateToPackageConfiguration() throws InterruptedException {
        System.out.println("Navigating to package configuration page");
        driver.get("https://sme-web-portal-qa.tigo.co.tz/#/sales");
        Thread.sleep(8000);
    }

    private void clickConfigurationWithHighlight() throws InterruptedException {
        System.out.println("Clicking Configuration button with highlighting");
        webDriverUtils.highlightElement(configurationButton);
        webDriverUtils.scrollToElement(configurationButton);
        webDriverUtils.clickUsingJavaScript(configurationButton);
    }

    private void selectDiscoverOptionWithHighlight() throws InterruptedException {
        System.out.println("Selecting IDiscover option with highlighting");
        webDriverUtils.highlightElement(discoverOption);
        webDriverUtils.scrollToElement(discoverOption);
        webDriverUtils.clickUsingJavaScript(discoverOption);
    }

    private void selectPackageAndProceed() throws InterruptedException {
        System.out.println("Selecting package option and proceeding");
        webDriverUtils.scrollToBottom();
        Thread.sleep(1000);
        
        webDriverUtils.highlightElement(packageOption);
        webDriverUtils.scrollToElement(packageOption);
        webDriverUtils.clickUsingJavaScript(packageOption);
        
        webDriverUtils.highlightElement(nextButton);
        webDriverUtils.scrollToElement(nextButton);
        Thread.sleep(1000);
        webDriverUtils.clickElement(nextButton);
    }

    private void selectDataOptionAndProceed() throws InterruptedException {
        System.out.println("Selecting data option and proceeding");
        webDriverUtils.scrollToElement(nextButton);
        webDriverUtils.scrollBy(0, 400);
        
        webDriverUtils.highlightElement(dataOption);
        webDriverUtils.scrollToElement(dataOption);
        webDriverUtils.clickUsingJavaScript(dataOption);
        
        webDriverUtils.highlightElement(nextButton2);
        webDriverUtils.clickUsingJavaScript(nextButton2);
    }

    private void confirmPackageSelection() throws InterruptedException {
        System.out.println("Confirming package selection");
        webDriverUtils.scrollToBottom();
        
        webDriverUtils.highlightElement(confirmButton);
        webDriverUtils.clickElement(confirmButton);
    }

    private void fillUserDetailsWithHighlight() throws InterruptedException {
        System.out.println("Filling user details with highlighting");
        webDriverUtils.scrollTo(0, 0.3);
        Thread.sleep(2000);

        webDriverUtils.highlightElement(firstNameField);
        webDriverUtils.sendKeys(firstNameField, "Sundas");

        webDriverUtils.highlightElement(lastNameField);
        webDriverUtils.sendKeys(lastNameField, "Maqbool");
        
        webDriverUtils.highlightElement(nidaField);
        webDriverUtils.sendKeys(nidaField, "556677896664");

        webDriverUtils.highlightElement(occupationField);
        webDriverUtils.sendKeys(occupationField, "QA");
        
        String uniqueEmail = generateRandomEmail();
        webDriverUtils.highlightElement(emailField);
        webDriverUtils.sendKeys(emailField, uniqueEmail);
        System.out.println("Generated Email: " + uniqueEmail);

        webDriverUtils.highlightElement(telephoneField);
        webDriverUtils.sendKeys(telephoneField, "255655116414");
        
        webDriverUtils.scrollTo(0, 0.5);
        
        webDriverUtils.highlightElement(createPasswordField);
        webDriverUtils.sendKeys(createPasswordField, "Cinderella@123456");

        webDriverUtils.highlightElement(confirmPasswordField);
        webDriverUtils.sendKeys(confirmPasswordField, "Cinderella@123456");
        Thread.sleep(3000);
        
        webDriverUtils.highlightElement(nextButton3);
        webDriverUtils.clickElement(nextButton3);
    }

    private void fillCompanyDetailsWithHighlight() throws InterruptedException {
        System.out.println("Filling company details with highlighting");
        webDriverUtils.scrollToTop();
        webDriverUtils.scrollTo(0, 0.3);
        Thread.sleep(2000);

        webDriverUtils.highlightElement(companyField);
        webDriverUtils.sendKeys(companyField, "Axian");
      
        webDriverUtils.highlightElement(typeField);
        webDriverUtils.sendKeys(typeField, "Software Hub");
       
        webDriverUtils.highlightElement(addressField);
        webDriverUtils.sendKeys(addressField, "Gulberg");
        
        webDriverUtils.highlightElement(cityField);
        webDriverUtils.sendKeys(cityField, "Islamabad");
        
        webDriverUtils.highlightElement(postalField);
        webDriverUtils.sendKeys(postalField, "3301");
        
        webDriverUtils.highlightElement(installationField);
        webDriverUtils.sendKeys(installationField, "Islamabad");
        
        webDriverUtils.highlightElement(city1Field);
        webDriverUtils.sendKeys(city1Field, "Islamabad");
       
        webDriverUtils.highlightElement(postal1Field);
        webDriverUtils.sendKeys(postal1Field, "3301");

        webDriverUtils.highlightElement(registrationField);
        webDriverUtils.sendKeys(registrationField, "777789");
        
        webDriverUtils.highlightElement(tinField);
        webDriverUtils.sendKeys(tinField, "4327");
        
        webDriverUtils.highlightElement(proceedButton);
        webDriverUtils.clickElement(proceedButton);
    }

    private void configurePaymentMethodWithHighlight() throws InterruptedException {
        System.out.println("Configuring payment method with highlighting");
        Thread.sleep(2000);
        
        try {
            webDriverUtils.waitForElementToBeInvisible("preloader", 20);
        } catch (Exception e) {
            System.out.println("Preloader still visible or not found, continuing anyway...");
        }

        Thread.sleep(1000);

        webDriverUtils.highlightElement(paymentMethodOption);
        webDriverUtils.scrollToElement(paymentMethodOption);
        webDriverUtils.clickUsingJavaScript(paymentMethodOption);

        Thread.sleep(2000);
        webDriverUtils.scrollTo(0, 0.3);
       
        webDriverUtils.highlightElement(paymentFirstNameField);
        webDriverUtils.sendKeys(paymentFirstNameField, "Sundas");
        
        webDriverUtils.highlightElement(paymentLastNameField);
        webDriverUtils.sendKeys(paymentLastNameField, "Maqbool");
        
        webDriverUtils.highlightElement(paymentPhoneField);
        webDriverUtils.sendKeys(paymentPhoneField, "25569556414");
       
        webDriverUtils.highlightElement(paymentEmailField);
        webDriverUtils.sendKeys(paymentEmailField, "sundasmaqbool123@gmail.com");
        Thread.sleep(2000);
        
        webDriverUtils.highlightElement(selectButton);
        webDriverUtils.clickElement(selectButton);
        Thread.sleep(1000);
        
        webDriverUtils.highlightElement(okButton);
        webDriverUtils.clickElement(okButton);
        
        Thread.sleep(2000);
        webDriverUtils.scrollToBottom();
        Thread.sleep(2000);
  
        webDriverUtils.highlightElement(proceedButton1);
        webDriverUtils.clickElement(proceedButton1);
    }

    private void uploadRequiredFilesWithHighlight() throws InterruptedException {
        System.out.println("Uploading required files with highlighting");
        webDriverUtils.scrollToTop();
        Thread.sleep(1000);
        webDriverUtils.scrollTo(0, 0.3);
        
        String filePath = "C:\\Users\\Sundas\\Downloads\\Contract SME-638749384224951980.pdf";
        
        webDriverUtils.highlightElement(fileUpload1);
        webDriverUtils.sendKeys(fileUpload1, filePath);

        webDriverUtils.highlightElement(fileUpload2);
        webDriverUtils.sendKeys(fileUpload2, filePath);

        webDriverUtils.highlightElement(fileUpload3);
        webDriverUtils.sendKeys(fileUpload3, filePath);

        webDriverUtils.highlightElement(fileUpload4);
        webDriverUtils.sendKeys(fileUpload4, filePath);

        webDriverUtils.highlightElement(fileUpload5);
        webDriverUtils.sendKeys(fileUpload5, filePath);
        
        webDriverUtils.scrollToBottom();
        Thread.sleep(1000);
        
        webDriverUtils.highlightElement(finalOkButton);
        webDriverUtils.clickElement(finalOkButton);
    }

    private void completeProcessWithHighlight() throws InterruptedException {
        System.out.println("Completing the process with highlighting");
        webDriverUtils.highlightElement(selfCareButton);
        webDriverUtils.clickElement(selfCareButton);
        
        System.out.println("Package configuration completed successfully!");
    }

    private String generateRandomEmail() {
        Random random = new Random();
        int randomNumber = random.nextInt(9000) + 1000;
        return "ismatmaqbool" + randomNumber + "@gmail.com";
    }

    public boolean isConfigurationButtonDisplayed() {
        return webDriverUtils.isElementDisplayed(configurationButton);
    }

    public boolean isDiscoverOptionDisplayed() {
        return webDriverUtils.isElementDisplayed(discoverOption);
    }

    public boolean isPackageOptionDisplayed() {
        return webDriverUtils.isElementDisplayed(packageOption);
    }

    public boolean isFirstNameFieldDisplayed() {
        return webDriverUtils.isElementDisplayed(firstNameField);
    }
}
