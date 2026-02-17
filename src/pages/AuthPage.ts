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

}