import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { config } from '../config/config';
import { TestHelper } from '../helpers/TestHelper';
import { ElementHighlighter } from '../utils/helpers/ElementHighlighter';
import { BrowserHelper } from '../utils/helpers/BrowserHelper';

export class PackageConfigurationPage extends BasePage {
    private readonly configurationButton = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/div/div[2]/div[2]/div/a[2]';
    private readonly discoverOption = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-package/div/div/div[2]/div/div/label[1]';
    private readonly packageOption = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-package/div/div/div[2]/div/div[3]/div/div[2]/div[1]/div[1]/label/div[1]';
    private readonly nextButton = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-package/div/div/div[2]/div/div[3]/div/div[2]/div[1]/div[2]/button';
    private readonly dataOption = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-package/div/div/div[2]/div/div[3]/div/div[2]/div[2]/div[1]/label[1]/div[1]';
    private readonly nextButton2 = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-package/div/div/div[2]/div/div[3]/div/div[2]/div[2]/div[2]/button';
    private readonly confirmButton = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-preview-your-package/div/div/div[2]/div/div[3]/div/div[3]/div[4]/div[2]/button[1]';
    
    private readonly firstNameField = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[1]/div/input';
    private readonly lastNameField = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[2]/div/input';
    private readonly nidaField = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[3]/div/input';
    private readonly occupationField = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[4]/div/input';
    private readonly emailField = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[5]/div/input';
    private readonly telephoneField = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[6]/div/input';
    private readonly createPasswordField = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[7]/div/div[1]/input';
    private readonly confirmPasswordField = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[8]/div/div[1]/input';
    private readonly nextButton3 = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[3]/button';

    private readonly companyField = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[1]/div/input';
    private readonly typeField = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[2]/div/input';
    private readonly addressField = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[3]/div/input';
    private readonly cityField = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[4]/div/input';
    private readonly postalField = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[5]/div/input';
    private readonly installationField = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[6]/div/input';
    private readonly city1Field = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[7]/div/input';
    private readonly postal1Field = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[8]/div/input';
    private readonly registrationField = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[9]/div/input';
    private readonly tinField = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[1]/div[10]/div/input';
    private readonly proceedButton = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/form/div/div[2]/button';

    private readonly paymentMethodOption = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-payment-method/div/div/div[2]/div/div[3]/div/div[1]/div/div/div/label[2]';
    private readonly paymentFirstNameField = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-payment-method/div/div/div[2]/div/div[3]/div/div[1]/div/div/p-tabview/div/div[2]/p-tabview/div/div[2]/p-tabpanel[1]/div/div[1]/div[3]/div/div[1]/input';
    private readonly paymentLastNameField = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-payment-method/div/div/div[2]/div/div[3]/div/div[1]/div/div/p-tabview/div/div[2]/p-tabview/div/div[2]/p-tabpanel[1]/div/div[1]/div[3]/div/div[2]/input';
    private readonly paymentPhoneField = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-payment-method/div/div/div[2]/div/div[3]/div/div[1]/div/div/p-tabview/div/div[2]/p-tabview/div/div[2]/p-tabpanel[1]/div/div[1]/div[3]/div/div[3]/input';
    private readonly paymentEmailField = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-payment-method/div/div/div[2]/div/div[3]/div/div[1]/div/div/p-tabview/div/div[2]/p-tabview/div/div[2]/p-tabpanel[1]/div/div[1]/div[3]/div/div[4]/input';
    private readonly selectButton = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-payment-method/div/div/div[2]/div/div[3]/div/div[1]/div/div/p-tabview/div/div[2]/p-tabview/div/div[2]/p-tabpanel[1]/div/div[2]/button';
    private readonly okButton = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-payment-method/div/div/div[2]/div/div[3]/div/div[1]/div/div/p-dialog/div/div/div[2]/div[2]/button';
    private readonly proceedButton1 = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[2]/div/div[3]/button';

    private readonly fileUpload1 = '(//input[@type="file"])[1]';
    private readonly fileUpload2 = '(//input[@type="file"])[2]';
    private readonly fileUpload3 = '(//input[@type="file"])[3]';
    private readonly fileUpload4 = '(//input[@type="file"])[4]';
    private readonly fileUpload5 = '(//input[@type="file"])[5]';
    private readonly finalOkButton = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-configure-your-user/div/div/div[2]/div/div[3]/div/div[3]/app-payment-receipt/div[4]/div[2]/button';
    private readonly selfCareButton = '/html/body/app-root/app-landing-layout/div/div[2]/div[1]/app-congratulations/div/div/div/div/div[3]/div/div/div[2]/div/button';

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigate to the package configuration page
     */
    async navigateToPackageConfiguration(): Promise<void> {
        console.log('Navigating to package configuration page');
        await this.navigate('https://sme-web-portal-qa.tigo.co.tz/#/sales');
        await this.page.waitForTimeout(8000); // Wait for page to load
    }

    /**
     * Complete the entire package configuration workflow in one session
     */
    async completePackageConfiguration(): Promise<void> {
        console.log('Starting complete package configuration workflow');

        await this.navigateToPackageConfiguration();
        await this.clickConfigurationWithHighlight();

        await this.selectDiscoverOptionWithHighlight();

        await this.selectPackageAndProceed();

        await this.selectDataOptionAndProceed();

        await this.confirmPackageSelection();

        await this.fillUserDetailsWithHighlight();

        await this.fillCompanyDetailsWithHighlight();

        await this.configurePaymentMethodWithHighlight();

        await this.uploadRequiredFiles();

        await this.completeProcess();

        console.log('Package configuration workflow completed successfully');
    }

    private async clickConfigurationWithHighlight(): Promise<void> {
        console.log('Clicking Configuration button');
        await ElementHighlighter.highlightElement(this.page, this.configurationButton);
        await ElementHighlighter.scrollIntoView(this.page, this.configurationButton);
        await this.click(this.configurationButton);
    }

    private async selectDiscoverOptionWithHighlight(): Promise<void> {
        console.log('Selecting IDiscover option');
        await ElementHighlighter.highlightElement(this.page, this.discoverOption);
        await ElementHighlighter.scrollIntoView(this.page, this.discoverOption);
        await this.click(this.discoverOption);
    }

    private async selectPackageAndProceed(): Promise<void> {
        console.log('Selecting package option and proceeding');
        
        await ElementHighlighter.scrollBy(this.page, 0, 600);
        await this.page.waitForTimeout(1000);

        await ElementHighlighter.highlightElement(this.page, this.packageOption);
        await ElementHighlighter.scrollIntoView(this.page, this.packageOption);
        await this.click(this.packageOption);

        await ElementHighlighter.highlightElement(this.page, this.nextButton);
        await ElementHighlighter.scrollIntoView(this.page, this.nextButton);
        await this.page.waitForTimeout(1000);
        await this.click(this.nextButton);
    }

    private async selectDataOptionAndProceed(): Promise<void> {
        console.log('Selecting data option and proceeding');
        
        await ElementHighlighter.scrollBy(this.page, 0, 400);

        await ElementHighlighter.highlightElement(this.page, this.dataOption);
        await ElementHighlighter.scrollIntoView(this.page, this.dataOption);
        await this.click(this.dataOption);

        await ElementHighlighter.highlightElement(this.page, this.nextButton2);
        await this.click(this.nextButton2);
    }

    private async confirmPackageSelection(): Promise<void> {
        console.log('Confirming package selection');
        
        await this.page.keyboard.press('End');
        
        await ElementHighlighter.highlightElement(this.page, this.confirmButton);
        await this.click(this.confirmButton);
    }

    private async fillUserDetailsWithHighlight(): Promise<void> {
        console.log('Filling user details');
        
        await ElementHighlighter.scrollTo(this.page, 0, 0.3);
        await this.page.waitForTimeout(2000);

        await ElementHighlighter.highlightElement(this.page, this.firstNameField);
        await this.fill(this.firstNameField, process.env.TEST_FIRST_NAME || 'Test');

        await ElementHighlighter.highlightElement(this.page, this.lastNameField);
        await this.fill(this.lastNameField, process.env.TEST_LAST_NAME || 'User');

        await ElementHighlighter.highlightElement(this.page, this.nidaField);
        await this.fill(this.nidaField, process.env.TEST_NIDA || '556677896664');

        await ElementHighlighter.highlightElement(this.page, this.occupationField);
        await this.fill(this.occupationField, process.env.TEST_OCCUPATION || 'QA');

        const uniqueEmail = this.generateRandomEmail();
        await ElementHighlighter.highlightElement(this.page, this.emailField);
        await this.fill(this.emailField, uniqueEmail);
        console.log('Generated Email:', uniqueEmail);

        await ElementHighlighter.highlightElement(this.page, this.telephoneField);
        await this.fill(this.telephoneField, process.env.TEST_PHONE || '255655116414');

        await ElementHighlighter.scrollTo(this.page, 0, 0.5);

        const testPassword = process.env.TEST_PASSWORD || 'TestPassword@123';
        await ElementHighlighter.highlightElement(this.page, this.createPasswordField);
        await this.fill(this.createPasswordField, testPassword);

        await ElementHighlighter.highlightElement(this.page, this.confirmPasswordField);
        await this.fill(this.confirmPasswordField, testPassword);

        await this.page.waitForTimeout(3000);

        await ElementHighlighter.highlightElement(this.page, this.nextButton3);
        await this.click(this.nextButton3);
    }

    private async fillCompanyDetailsWithHighlight(): Promise<void> {
        console.log('Filling company details');
        
        await this.page.keyboard.press('Home');
        await ElementHighlighter.scrollTo(this.page, 0, 0.3);
        await this.page.waitForTimeout(2000);

        await ElementHighlighter.highlightElement(this.page, this.companyField);
        await this.fill(this.companyField, process.env.TEST_COMPANY || 'Test Company Ltd');

        await ElementHighlighter.highlightElement(this.page, this.typeField);
        await this.fill(this.typeField, process.env.TEST_COMPANY_TYPE || 'Software Development');

        await ElementHighlighter.highlightElement(this.page, this.addressField);
        await this.fill(this.addressField, process.env.TEST_ADDRESS || 'Test Address');

        await ElementHighlighter.highlightElement(this.page, this.cityField);
        await this.fill(this.cityField, process.env.TEST_CITY || 'Test City');

        await ElementHighlighter.highlightElement(this.page, this.postalField);
        await this.fill(this.postalField, process.env.TEST_POSTAL || '12345');

        await ElementHighlighter.highlightElement(this.page, this.installationField);
        await this.fill(this.installationField, process.env.TEST_INSTALLATION_CITY || 'Test City');

        await ElementHighlighter.highlightElement(this.page, this.city1Field);
        await this.fill(this.city1Field, process.env.TEST_CITY || 'Test City');

        await ElementHighlighter.highlightElement(this.page, this.postal1Field);
        await this.fill(this.postal1Field, process.env.TEST_POSTAL || '12345');

        await ElementHighlighter.highlightElement(this.page, this.registrationField);
        await this.fill(this.registrationField, process.env.TEST_REGISTRATION || '123456');

        await ElementHighlighter.highlightElement(this.page, this.tinField);
        await this.fill(this.tinField, process.env.TEST_TIN || '7890');

        await ElementHighlighter.highlightElement(this.page, this.proceedButton);
        await this.click(this.proceedButton);
    }

    private async configurePaymentMethodWithHighlight(): Promise<void> {
        console.log('Configuring payment method');
        
        await this.page.waitForTimeout(2000);

        try {
            await this.page.waitForSelector('#preloader', { state: 'hidden', timeout: 20000 });
        } catch (e) {
            console.log('Preloader still visible or not found, continuing anyway...');
        }

        await this.page.waitForTimeout(1000);

        await ElementHighlighter.scrollIntoView(this.page, this.paymentMethodOption);
        await ElementHighlighter.highlightElement(this.page, this.paymentMethodOption);
        await this.click(this.paymentMethodOption);

        await this.page.waitForTimeout(2000);
        await ElementHighlighter.scrollTo(this.page, 0, 0.3);

        await ElementHighlighter.highlightElement(this.page, this.paymentFirstNameField);
        await this.fill(this.paymentFirstNameField, process.env.TEST_FIRST_NAME || 'Test');

        await ElementHighlighter.highlightElement(this.page, this.paymentLastNameField);
        await this.fill(this.paymentLastNameField, process.env.TEST_LAST_NAME || 'User');

        await ElementHighlighter.highlightElement(this.page, this.paymentPhoneField);
        await this.fill(this.paymentPhoneField, process.env.TEST_PAYMENT_PHONE || '255123456789');

        await ElementHighlighter.highlightElement(this.page, this.paymentEmailField);
        await this.fill(this.paymentEmailField, process.env.TEST_PAYMENT_EMAIL || 'testuser@example.com');

        await this.page.waitForTimeout(2000);

        await ElementHighlighter.highlightElement(this.page, this.selectButton);
        await this.click(this.selectButton);

        await this.page.waitForTimeout(1000);

        await ElementHighlighter.highlightElement(this.page, this.okButton);
        await this.click(this.okButton);

        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('End');
        await this.page.waitForTimeout(2000);

        await ElementHighlighter.highlightElement(this.page, this.proceedButton1);
        await this.click(this.proceedButton1);
    }

    private async uploadRequiredFiles(): Promise<void> {
        console.log('Uploading required files');
        
        await this.page.keyboard.press('Home');
        await this.page.waitForTimeout(1000);
        await ElementHighlighter.scrollTo(this.page, 0, 0.3);

        const filePath = '/home/ubuntu/repos/UAPI-Automation/test-files/sample-document.pdf';

        const fileInputs = [
            this.fileUpload1,
            this.fileUpload2,
            this.fileUpload3,
            this.fileUpload4,
            this.fileUpload5
        ];

        for (const fileInput of fileInputs) {
            try {
                await this.page.setInputFiles(fileInput, filePath);
                console.log(`Uploaded file to ${fileInput}`);
            } catch (error) {
                console.warn(`Failed to upload file to ${fileInput}:`, error);
            }
        }

        await this.page.keyboard.press('End');
        await this.page.waitForTimeout(1000);

        await ElementHighlighter.highlightElement(this.page, this.finalOkButton);
        await this.click(this.finalOkButton);
    }

    private async completeProcess(): Promise<void> {
        console.log('Completing the process');
        
        await ElementHighlighter.highlightElement(this.page, this.selfCareButton);
        await this.click(this.selfCareButton);
        
        console.log('Package configuration completed successfully!');
    }

    private generateRandomEmail(): string {
        const randomNumber = Math.floor(Math.random() * 9000) + 1000;
        const emailPrefix = process.env.TEST_EMAIL_PREFIX || 'testuser';
        const emailDomain = process.env.TEST_EMAIL_DOMAIN || 'example.com';
        return `${emailPrefix}${randomNumber}@${emailDomain}`;
    }

    async isConfigurationButtonDisplayed(): Promise<boolean> {
        return await this.isVisible(this.configurationButton);
    }

    async isDiscoverOptionDisplayed(): Promise<boolean> {
        return await this.isVisible(this.discoverOption);
    }

    async isPackageOptionDisplayed(): Promise<boolean> {
        return await this.isVisible(this.packageOption);
    }

    async isFirstNameFieldDisplayed(): Promise<boolean> {
        return await this.isVisible(this.firstNameField);
    }
}
