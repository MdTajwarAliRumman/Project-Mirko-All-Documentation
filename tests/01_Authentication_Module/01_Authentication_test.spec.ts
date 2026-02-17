import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { AuthPage } from '../../src/pages/AuthPage';


test.describe('Signup Flow', () => {
    let authPage: AuthPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        homePage = new HomePage(page);

        await homePage.goToURL();

        await homePage.userIcon.click();
    });

    // this test is for homepage later on 
    // test('Verify that home page is visible successfully', async ({ page }) => {
    //     await expect(page).toHaveTitle('Automation Exercise');
    // })

    test('Verify "Login section" is visible', async ({ page }) => {
        await expect(page.getByText('Welcome Back.')).toBeVisible();
    });


});
