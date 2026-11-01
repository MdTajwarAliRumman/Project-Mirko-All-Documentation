import { Page, Locator } from '@playwright/test';

export class InvoicePage {
    readonly page: Page;
    readonly issueDate: Locator;
    readonly validUntil: Locator;
    readonly dueDate: Locator;
    readonly currency: Locator;
    readonly language: Locator;

    constructor(page: Page) {
        this.page = page;
        this.issueDate = page.locator("//input[@name='issue_date']");
        this.validUntil = page.locator("//input[@name='valid_until']");
        this.dueDate = page.locator("//input[@name='due_date']");
        this.currency = page.locator("//select[@name='currency']");
        this.language = page.locator("//select[@name='language']");


    }

}
