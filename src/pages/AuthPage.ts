import { Locator, Page } from "@playwright/test";

export class AuthPage {
    // initialize all the pages

    readonly page: Page;
    readonly userIcon: Locator;

    constructor(page: Page) {
        this.page = page

        // Elements
        this.userIcon = page.locator("//a[@class='bg-//*[name()='svg']")
    }

    // Methods
    async goToURL() {
        await this.page.goto(`${process.env.BASE_URL}`);
    }

    async clickOnUserIcon() {
        await this.userIcon.click();
    }

}