import { Locator, Page } from "@playwright/test";

export class AuthPage {
    // initialize all the pages

    readonly page: Page;
    readonly userIcon: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly createAccount: Locator;
    readonly termsCheckbox: Locator;
    readonly signupButton: Locator;

    readonly signUpEmailInput: Locator;
    readonly signUpPasswordInput: Locator;
    readonly signUpConfirmPasswordInput: Locator;
    readonly verifyOtpBtn: Locator;
    readonly logobutton: Locator;

    readonly onboardingOptions: Locator;
    readonly onboardingNotes: Locator;
    readonly onboardingContinueBtn: Locator;
    readonly onboardingFinishBtn: Locator;

    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly DOB: Locator;
    readonly fiscalCode: Locator;
    readonly country: Locator;
    readonly address: Locator
    readonly phoneNumber: Locator;
    readonly continueBtn: Locator;

    readonly businessName: Locator;
    readonly businessType: Locator;
    readonly businessAddress: Locator;
    readonly VatId: Locator;
    readonly businessEmail: Locator;
    readonly comments: Locator;
    readonly businessContinueBtn: Locator;

    readonly subscripitionBtn: Locator;

    constructor(page: Page) {
        this.page = page

        // Elements
        this.userIcon = page.locator("//a[@class='bg-//*[name()='svg']")
        this.emailInput = page.locator("//input[@id='email']")
        this.passwordInput = page.locator("//input[@id='password']")
        this.loginButton = page.locator("//button[normalize-space()='Sign In']")
        this.createAccount = page.locator("//a[normalize-space()='Create Now']")

        this.signUpEmailInput = page.locator("//input[@id='email']")
        this.signUpPasswordInput = page.locator("//input[@id='password']")
        this.signUpConfirmPasswordInput = page.locator("//input[@id='confirmPassword']")
        this.termsCheckbox = page.locator("//input[@id='terms']")
        this.signupButton = page.locator("//button[normalize-space()='Sign Up']")
        this.verifyOtpBtn = page.locator("//button[normalize-space()='Verify OTP']")
        this.logobutton = page.locator("//img[@alt='auth logo']")

        this.onboardingOptions = page.locator("//span[normalize-space()='option1']")
        this.onboardingNotes = page.locator("//textarea[@placeholder='Any extra context, doubts, or comments...']")
        this.onboardingContinueBtn = page.locator("//button[normalize-space()='Continue']")
        this.onboardingFinishBtn = page.locator("//button[normalize-space()='Finish & Submit']")

        this.firstName = page.locator("//input[@placeholder='Enter your first name']")
        this.lastName = page.locator("//input[@placeholder='Enter your last name']")
        this.DOB = page.locator("//input[@name='dob']")
        this.fiscalCode = page.locator("//input[@placeholder='Enter your fiscal code']")
        this.country = page.locator("//select[@name='country']")
        this.address = page.locator("//input[@placeholder='Enter your residence address']")
        this.phoneNumber = page.locator("//input[@placeholder='Enter your phone number']")
        this.continueBtn = page.locator("//button[normalize-space()='Continue to Business Information']")

        this.businessName = page.locator("//input[@placeholder='Your company or business name']")
        this.businessType = page.locator("//select[@name='activity']")
        this.businessAddress = page.locator("//input[@placeholder='Enter your business address']")
        this.VatId = page.locator("//input[@placeholder='IT12345678901']")
        this.businessEmail = page.locator("//input[@placeholder='yourcompany@pec.it']")
        this.comments = page.locator("//textarea[@placeholder='Please provide any additional information about your business, special requirements, or questions you have.']")
        this.businessContinueBtn = page.locator("//button[normalize-space()='Continue to Document Upload']")

        this.subscripitionBtn = page.locator("//button[normalize-space()='Choose the Plan That Fits Your Finances']")
    }

    // Methods

    async clickOnUserIcon() {
        await this.userIcon.click();
    }

    async userSignUp(email: string, password: string, confirmPassword: string) {
        await this.signUpEmailInput.fill(email);
        await this.signUpPasswordInput.fill(password);
        await this.signUpConfirmPasswordInput.fill(confirmPassword);
        await this.termsCheckbox.click();
        await this.signupButton.click();
    }

    async completeOnboarding(text: string, waitForSelector?: string) {
        for (let step = 1; step <= 10; step++) {
            // Handle option selection if present
            const option = this.page.locator("//span[normalize-space()='option1']");
            if (await option.isVisible().catch(() => false)) await option.click();

            // Handle notes if present
            if (await this.onboardingNotes.isVisible().catch(() => false)) await this.onboardingNotes.fill(text);

            // Check if last step
            if (await this.onboardingFinishBtn.isVisible().catch(() => false)) {
                await this.onboardingFinishBtn.click();
                if (waitForSelector) await this.page.waitForSelector(`text=${waitForSelector}`);
                break;
            }

            await this.onboardingContinueBtn.click();
            await this.page.waitForTimeout(2000);
        }
    }

    async personalInfo(firstName: string, lastName: string, DOB: string, fiscalCode: string, country: string, address: string, phoneNumber: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.DOB.fill('1999-01-01');
        await this.fiscalCode.fill(fiscalCode);
        await this.country.click();
        await this.country.selectOption(country);
        await this.address.fill(address);
        await this.phoneNumber.fill(phoneNumber);
        await this.continueBtn.click();
    }

    async businessInfo(businessName: string, businessType: string, businessAddress: string, VatId: string, businessEmail: string, comments: string) {
        await this.businessName.fill(businessName);
        await this.businessType.selectOption(businessType);
        await this.businessAddress.fill(businessAddress);
        await this.VatId.fill(VatId);
        await this.businessEmail.fill(businessEmail);
        await this.comments.fill(comments);
        await this.businessContinueBtn.click();
    }

    generateCode(): string {
        const randomNumber = Math.floor(10000000000 + Math.random() * 90000000000);
        return `IT${randomNumber}`;
    }


    generateEmail() {
        return `user_${Date.now()}@testmail.com`;
    }
}
