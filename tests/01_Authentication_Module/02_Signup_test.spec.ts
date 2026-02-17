import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { AuthPage } from '../../src/pages/AuthPage';


test.describe('Authentication Flow', () => {
    let authPage: AuthPage;
    let homePage: HomePage;
    const generateEmail = () => `user_${Date.now()}@testmail.com`;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        homePage = new HomePage(page);


        await homePage.goToURL();

        await homePage.userIcon.click();
    });



    test('Verify "Users are able to sign up and move to the OTP page Successfully', async ({ page }) => {
        await authPage.createAccount.click();
        await expect(page.getByText('Create Account')).toBeVisible();
        await authPage.userSignUp(generateEmail(), process.env.USER_PASSWORD!, process.env.USER_PASSWORD!)
        await page.waitForTimeout(7000);
        await expect(authPage.verifyOtpBtn).toBeVisible();
    });

    test('Verify "Users are able to sign up Successfully and login', async ({ page }) => {
        await test.step('Verify "Users are able to sign up and move to the OTP page Successfully', async () => {
            await authPage.createAccount.click();
            await expect(page.getByText('Create Account')).toBeVisible();
            await authPage.userSignUp("tajwar@gmail.com", process.env.USER_PASSWORD!, process.env.USER_PASSWORD!)
            await page.waitForTimeout(7000);
            await expect(authPage.verifyOtpBtn).toBeVisible();
            await authPage.logobutton.click();
        });

        await test.step('Verify logging in using the registered email and password', async () => {
            await homePage.userIcon.click();

            await expect(page.getByText('Welcome Back.')).toBeVisible();
            await authPage.emailInput.fill("tajwar@gmail.com");
            await authPage.passwordInput.fill(process.env.USER_PASSWORD!);
            await authPage.loginButton.click();
            await expect(page.getByText('Step 1 of 10')).toBeVisible();
        });

    });

});
