import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { AuthPage } from '../../src/pages/AuthPage';


test.describe('Authentication Flow', () => {
    let authPage: AuthPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        homePage = new HomePage(page);
        const generateEmail = () => `user_${Date.now()}@testmail.com`;


        await homePage.goToURL();

        await homePage.userIcon.click();
    });

    test('Verify "Login section" is visible', async ({ page }) => {
        await expect(page.getByText('Welcome Back.')).toBeVisible();
    });

    test('Verify "User login" is Successful', async ({ page }) => {
        await authPage.emailInput.fill(process.env.EMAIL!);
        await authPage.passwordInput.fill(process.env.USER_PASSWORD!);
        await authPage.loginButton.click();
        await expect(page.getByText('Login Successful')).toBeVisible();
    });



});
