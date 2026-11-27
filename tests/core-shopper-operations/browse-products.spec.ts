import { test, expect } from '@playwright/test';

test.describe('Core Shopper Operations', () => {
  test('Browse, sort, and inspect products', async ({ page }) => {
    // 1. From a fresh logged-out session, sign in with standard_user / secret_sauce.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();

    // 2. Select Price (low to high) from Sort products.
    await page.locator('[data-test="product-sort-container"]').selectOption('Price (low to high)');
    const productNames = page.locator('[data-test="inventory-item-name"]');
    const productPrices = page.locator('[data-test="inventory-item-price"]');
    await expect(productNames.nth(0)).toHaveText('Sauce Labs Onesie');
    await expect(productPrices.nth(0)).toHaveText('$7.99');
    await expect(productNames.nth(1)).toHaveText('Sauce Labs Bike Light');
    await expect(productPrices.nth(1)).toHaveText('$9.99');

    // 3. Open the Sauce Labs Backpack product details.
   
// 3. Open the Sauce Labs Backpack product details.

    // 3. Open the Sauce Labs Backpack product details.
    await page.locator('[data-test="item-4-title-link"]').click();

    // Verify that the product details page is opened.
    await expect(page).toHaveURL(/inventory-item\.html/);

    // Verify product details.
    await expect(
      page.locator('.inventory_details_name')
    ).toHaveText('Sauce Labs Backpack');

    await expect(
      page.locator('.inventory_details_desc')
    ).toHaveText(
      'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.'
    );

    await expect(
      page.locator('.inventory_details_price')
    ).toHaveText('$29.99');

    await expect(
      page.locator('[data-test="add-to-cart"]')
    ).toBeVisible();

    // 4. Return to the inventory/catalog view.
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(
      page.locator('[data-test="product-sort-container"]')
    ).toBeVisible();

  });
});
