import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { AuthPage } from '../../src/pages/AuthPage';


test.describe('Authentication Flow', () => {
    let authPage: AuthPage;
    let homePage: HomePage;
    let randomEmail: string;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        homePage = new HomePage(page);

        randomEmail = authPage.generateEmail();
        await homePage.goToURL();

        await homePage.userIcon.click();
    });



    test('Verify "Users are able to sign up and move to the OTP page Successfully', async ({ page }) => {
        await authPage.createAccount.click();
        await expect(page.getByText('Create Account')).toBeVisible();
        await authPage.userSignUp(randomEmail, process.env.USER_PASSWORD!, process.env.USER_PASSWORD!)
        await page.waitForTimeout(7000);
        await expect(authPage.verifyOtpBtn).toBeVisible();
    });

    test('Verify "Users are able to sign up Successfully and login', async ({ page }) => {
        await test.step('Verify "Users are able to sign up and move to the OTP page Successfully', async () => {
            await authPage.createAccount.click();
            await expect(page.getByText('Create Account')).toBeVisible();
            await authPage.userSignUp(randomEmail, process.env.USER_PASSWORD!, process.env.USER_PASSWORD!)
            await page.waitForTimeout(7000);
            await expect(authPage.verifyOtpBtn).toBeVisible();
            await authPage.logobutton.click();
        });

        await test.step('Verify logging in using the registered email and password', async () => {
            await homePage.userIcon.click();

            await expect(page.getByText('Welcome Back.')).toBeVisible();
            await authPage.emailInput.fill(randomEmail);
            await authPage.passwordInput.fill(process.env.USER_PASSWORD!);
            await authPage.loginButton.click();
            await expect(page.getByText('Step 1 of 10')).toBeVisible();
        });


        await test.step('Verify Onboarding screens are working as expected', async () => {
            // Complete all 10 onboarding steps
            await authPage.completeOnboarding(
                process.env.DESCRIPTION_DEMO!,
                'Personal Information' // Wait for this text after completion
            );
        });

        await test.step('Verify Personal Information screen is working as expected', async () => {
            await authPage.personalInfo('Md. Tajwar', 'Ali', '1999-01-01', '341234123', 'Bangladesh', '123 Main St', '1234567890')
            await expect(page.getByText('Business Information')).toBeVisible();
        });

    });

});