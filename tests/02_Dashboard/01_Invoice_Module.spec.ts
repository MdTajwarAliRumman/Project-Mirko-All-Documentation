import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { AuthPage } from '../../src/pages/AuthPage';
import { InvoicePage } from '../../src/pages/InvoicePage';


test.describe.serial('Authentication Flow', () => {
    let authPage: AuthPage;
    let homePage: HomePage;
    let invoicePage: InvoicePage;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        homePage = new HomePage(page);
        invoicePage = new InvoicePage(page);


        await homePage.goToURL();

        // await homePage.userIcon.click();
    });

    test('Verify Creating new Invoice', async ({ page }) => {
        await test.step('TC-1 Login into the Dashboard using valid credentials', async () => {
            // await page.waitForTimeout(10000);
            await expect(page.getByText('Dashboard')).toBeVisible();
        })

        await test.step('TC-2 Verfiy moving to Invoice module and Viewing Proforma Invoices list', async () => {
            await page.getByText('Invoices').first().click();
            // await page.waitForTimeout(6000);
            await expect(page.getByText('Add invoice')).toBeVisible();
        })

        await test.step('TC-3 Validate Creating Proforma Invoice', async () => {
            await page.getByText('Add invoice').click();
            await page.getByText('Proforma Invoice').click();
            await expect(page.getByText('Basic Information')).toBeVisible();
            await page.waitForTimeout(3000);
        })

        await test.step('TC-4 Validate Entering inputs into the date fields', async () => {
            await invoicePage.issueDate.fill('2026-11-01');
            await invoicePage.validUntil.fill('2026-11-30');
            await invoicePage.dueDate.fill('2026-12-01');
            await page.waitForTimeout(3000);

        })

        await test.step('TC-5 Validate Entering Inputs into the Basic Information Fields', async () => {

            await invoicePage.currency.selectOption({ label: 'USD — US Dollar' });
            await invoicePage.language.selectOption({ label: 'Italian' });

            await expect(invoicePage.currency).toHaveValue('USD');
            await expect(invoicePage.language).toHaveValue('it');

            await page.getByPlaceholder("General notes...").fill('Notes added for testing');
            await page.getByPlaceholder("Notes that will appear on the PDF...").fill(process.env.DESCRIPTION_DEMO!);
            await invoicePage.pdfDisclaimer.fill('Disclaimer text for testing');
            // await page.waitForTimeout(3000);
        })

        await test.step('TC-6 Validate Entering Inputs into the Issuer Details  Fields', async () => {

            await page.getByText('Issuer Details').scrollIntoViewIfNeeded();
            await invoicePage.city.click();
            await invoicePage.city.fill('Dhaka');
            await invoicePage.postalCode.fill('1200');
            await invoicePage.province.fill('BD');
            await page.waitForTimeout(3000);
        })

        await test.step('TC-7 Verify Recipient Details Fields are properly working or not', async () => {

            await invoicePage.rubricaSelection.click();
            const recipientRow = page.getByRole('row').filter({ // Filter option helps to identify items from table row
                hasText: 'Techno Spark'
            });
            await recipientRow.getByText('Seleziona').click();
            await page.waitForTimeout(3000);
        });

        await test.step('TC-8 Verify Item Table fields are working properly or not', async () => {

            await page.getByPlaceholder("Describe the service or product...").fill(process.env.DESCRIPTION_DEMO);
            await invoicePage.tableQuantity.fill("40");
            await invoicePage.tableUnit.fill('1000');
            await invoicePage.unitdropdown.selectOption({ label: 'SC — Scatola (Box)' })
            await invoicePage.tableDiscountAmount.fill('15')
            await invoicePage.taxRate.fill('10');
            await page.waitForTimeout(3000);

        });
    });
});