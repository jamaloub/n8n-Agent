import { test, expect } from '@playwright/test';

test.describe('Core Shopper Operations', () => {
  test('Add and remove items in the cart', async ({ page }) => {
    // 1. From a fresh logged-out session, sign in with standard_user / secret_sauce.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();

    // 2. Add Sauce Labs Backpack and Sauce Labs Bike Light to the cart.
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cart, 2 items' })).toBeVisible();

    // 3. Open the cart.
    await page.locator('[data-test="shopping-cart-link"]').click();
    const backpackLink = page.locator('[data-test="item-4-title-link"]');
    const bikeLightLink = page.locator('[data-test="item-0-title-link"]');
    await expect(backpackLink).toBeVisible();
    await expect(bikeLightLink).toBeVisible();
    await expect(page.getByText('$29.99')).toBeVisible();
    await expect(page.getByText('$9.99')).toBeVisible();
    await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();

    // 4. Remove Sauce Labs Bike Light.
    await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
    await expect(bikeLightLink).toHaveCount(0);
    await expect(backpackLink).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();
  });
});
