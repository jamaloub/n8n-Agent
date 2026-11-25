import { test, expect } from '@playwright/test';

test.describe('Core Shopper Operations', () => {
  test('Sign in with a standard shopper account', async ({ page }) => {
    // 1. Open https://www.saucedemo.com/ in a fresh logged-out session.
    await page.goto('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeVisible();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    // 2. Enter standard_user in Username and secret_sauce in Password, then select Login.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toHaveCount(0);
  });
});
