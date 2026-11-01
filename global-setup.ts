import { chromium, FullConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Global Setup — runs ONCE before the entire test suite.
 *
 * It logs in with the credentials from .env, then saves the authenticated
 * browser session (cookies + localStorage) to `.auth/session.json`.
 *
 * Every test project then reuses that saved state via `storageState` in
 * playwright.config.ts, so no individual test ever needs to log in.
 */
async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const baseURL = process.env.BASE_URL!;
    const email   = process.env.USER_EMAIL!;
    const password = process.env.USER_PASSWORD!;

    console.log('\n🔐 [Global Setup] Logging in to save session...');
    console.log(`   URL  : ${baseURL}`);
    console.log(`   Email: ${email}`);

    // ── Navigate to the login page ────────────────────────────────────────────
    await page.goto(baseURL);

    // ── Fill credentials ──────────────────────────────────────────────────────
    await page.getByPlaceholder('Enter your email').fill(email);
    await page.getByPlaceholder('Enter your password').fill(password);
    await page.getByRole('button', { name: 'Sign in' }).click();

    // ── Wait for successful login ─────────────────────────────────────────────
    await page.waitForSelector('text=Login Successful', { timeout: 30 * 1000 });
    await page.waitForTimeout(4000); // let the dashboard fully load

    // ── Save the authenticated session ────────────────────────────────────────
    await context.storageState({ path: '.auth/session.json' });

    console.log('✅ [Global Setup] Session saved to .auth/session.json\n');

    await browser.close();
}

export default globalSetup;
