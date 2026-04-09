import { Locator, Page } from "@playwright/test";

export class HomePage {
    // initialize all the pages

    readonly page: Page;
    readonly userIcon: Locator;

    constructor(page: Page) {
        this.page = page

        // Elements
        this.userIcon = page.locator("svg[xmlns='http://www.w3.org/2000/svg'][width='14']")
    }

    // Methods
    async goToURL() {
        await this.page.goto(`${process.env.BASE_URL}`);
    }

    async clickOnUserIcon() {
        await this.userIcon.click();
    }

    // this method is for click on any element
    async clickOnElement(locator: Locator) {
        await locator.click();
    }

}