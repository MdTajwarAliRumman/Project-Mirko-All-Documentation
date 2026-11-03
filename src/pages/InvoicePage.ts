import { Page, Locator } from '@playwright/test';

export class InvoicePage {
    readonly page: Page;
    readonly issueDate: Locator;
    readonly validUntil: Locator;
    readonly dueDate: Locator;
    readonly currency: Locator;
    readonly language: Locator;
    readonly pdfDisclaimer: Locator;
    readonly city: Locator;
    readonly postalCode: Locator;
    readonly province: Locator;
    readonly rubricaSelection: Locator;
    readonly tableQuantity: Locator;
    readonly tableUnit: Locator;
    readonly unitdropdown: Locator;
    readonly discount: Locator;
    readonly tableDiscountAmount: Locator;
    readonly taxRate: Locator;

    constructor(page: Page) {
        this.page = page;
        this.issueDate = page.locator("//input[@name='issue_date']");
        this.validUntil = page.locator("//input[@name='valid_until']");
        this.dueDate = page.locator("//input[@name='due_date']");
        this.currency = page.locator("//select[@name='currency']");
        this.language = page.locator("//select[@name='language']");
        this.pdfDisclaimer = page.locator("//textarea[@name='pdf_disclaimer']");
        this.city = page.locator("//input[@placeholder='Milan']");
        this.postalCode = page.locator("//input[@placeholder='20100']");
        this.province = page.locator("//input[@placeholder='MI']");
        this.rubricaSelection = page.locator("//button[normalize-space()='RUBRICA']");
        this.tableQuantity = page.locator("//input[@name='items.0.quantity']");
        this.unitdropdown = page.locator("//select[@name='items.0.unit']");
        this.tableUnit = page.locator("//input[@name='items.0.unit_price']");
        this.tableDiscountAmount = page.locator("//input[@name='items.0.discount_percent']");
        this.taxRate = page.locator("//input[@name='items.0.tax_percent']");

    }

}
