import { test, expect } from '@playwright/test';

test.describe('Core Shopper Operations', () => {
  test('Review and place an order', async ({ page }) => {
    // 1. From a fresh logged-out session, sign in with standard_user / secret_sauce, add Sauce Labs Backpack, open the cart, and select Checkout.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');

    // 2. Enter Alex, Tester, and 10001 in the First Name, Last Name, and Zip/Postal Code fields, then select Continue.
    await page.locator('[data-test="firstName"]').fill('Alex');
    await page.locator('[data-test="lastName"]').fill('Tester');
    await page.locator('[data-test="postalCode"]').fill('10001');
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
    await expect(page.locator('[data-test="total-label"]')).toHaveText('Total: $32.39');
    await expect(page.locator('[data-test="finish"]')).toBeVisible();

    // 3. Select Finish.
    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    await expect(page.locator('[data-test="complete-text"]')).toHaveText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
    );
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();
  });
});
