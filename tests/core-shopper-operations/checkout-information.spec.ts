import { test, expect } from '@playwright/test';

test.describe('Core Shopper Operations', () => {
  test('Enter checkout information and validate required fields', async ({ page }) => {
    // 1. From a fresh logged-out session, sign in with standard_user / secret_sauce, add Sauce Labs Backpack, open the cart, and select Checkout.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    await expect(page.locator('[data-test="lastName"]')).toBeVisible();
    await expect(page.locator('[data-test="postalCode"]')).toBeVisible();
    await expect(page.locator('[data-test="continue"]')).toBeVisible();
    await expect(page.locator('[data-test="cancel"]')).toBeVisible();

    // 2. Leave all checkout fields blank and select Continue.
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');

    // 3. Enter Alex as First Name, Tester as Last Name, and 10001 as Zip/Postal Code, then select Continue.
    await page.locator('[data-test="firstName"]').fill('Alex');
    await page.locator('[data-test="lastName"]').fill('Tester');
    await page.locator('[data-test="postalCode"]').fill('10001');
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
    await expect(page.locator('.cart_quantity')).toHaveText('1');
    await expect(page.locator('[data-test="subtotal-label"]')).toHaveText('Item total: $29.99');
    await expect(page.locator('[data-test="tax-label"]')).toHaveText('Tax: $2.40');
    await expect(page.locator('[data-test="total-label"]')).toHaveText('Total: $32.39');
    await expect(page.locator('[data-test="payment-info-value"]')).toHaveText('SauceCard #31337');
    await expect(page.locator('[data-test="shipping-info-value"]')).toHaveText('Free Pony Express Delivery!');
  });
});
