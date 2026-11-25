# Sauce Demo Core Shopper Operations Test Plan

## Application Overview

Explore and validate the five core end-user operations in the Sauce Demo e-commerce application: sign in, browse products, manage a cart, provide checkout information, and place an order. Use a fresh logged-out session and an empty cart for each scenario. The login page advertises standard_user and the shared password secret_sauce; the standard account was observed to reach the inventory page. The application is a demo and displays simulated payment and shipping information.

## Test Scenarios

### 1. Core Shopper Operations

**Seed:** `tests/seed.spec.ts`

#### 1.1. Sign in with a standard shopper account

**File:** `tests/core-shopper-operations/sign-in.spec.ts`

**Steps:**
  1. Open https://www.saucedemo.com/ in a fresh logged-out session.
    - expect: The Swag Labs login page is displayed with Username, Password, and Login controls.
  2. Enter standard_user in Username and secret_sauce in Password, then select Login.
    - expect: The user is taken to /inventory.html.
    - expect: The Products heading and product catalog are displayed.
    - expect: No login error is shown.

#### 1.2. Browse, sort, and inspect products

**File:** `tests/core-shopper-operations/browse-products.spec.ts`

**Steps:**
  1. From a fresh logged-out session, sign in with standard_user / secret_sauce.
    - expect: The inventory page displays six products and the Sort products control.
  2. Select Price (low to high) from Sort products.
    - expect: Products are ordered from lowest to highest price; the first items are Sauce Labs Onesie ($7.99) and Sauce Labs Bike Light ($9.99).
  3. Open the Sauce Labs Backpack product details.
    - expect: The product detail view shows the Backpack name, description, price ($29.99), and an Add to cart action.
  4. Return to the inventory/catalog view.
    - expect: The product catalog is displayed and remains usable.

#### 1.3. Add and remove items in the cart

**File:** `tests/core-shopper-operations/manage-cart.spec.ts`

**Steps:**
  1. From a fresh logged-out session, sign in with standard_user / secret_sauce.
    - expect: The inventory page is displayed and the cart badge is empty.
  2. Add Sauce Labs Backpack and Sauce Labs Bike Light to the cart.
    - expect: Each selected product's action changes to Remove.
    - expect: The cart badge shows 2 items.
  3. Open the cart.
    - expect: The cart lists Backpack and Bike Light, each with quantity 1 and the expected prices.
    - expect: Continue Shopping and Checkout actions are available.
  4. Remove Sauce Labs Bike Light.
    - expect: Bike Light is removed from the cart and the cart badge shows 1 item.
    - expect: Sauce Labs Backpack remains in the cart.

#### 1.4. Enter checkout information and validate required fields

**File:** `tests/core-shopper-operations/checkout-information.spec.ts`

**Steps:**
  1. From a fresh logged-out session, sign in with standard_user / secret_sauce, add Sauce Labs Backpack, open the cart, and select Checkout.
    - expect: The Checkout: Your Information page displays First Name, Last Name, and Zip/Postal Code fields, plus Continue and Cancel actions.
  2. Leave all checkout fields blank and select Continue.
    - expect: Checkout remains on the information page and shows the validation error 'Error: First Name is required'.
  3. Enter Alex as First Name, Tester as Last Name, and 10001 as Zip/Postal Code, then select Continue.
    - expect: The Checkout: Overview page is displayed with Sauce Labs Backpack and quantity 1.
    - expect: The order summary shows item total $29.99, tax $2.40, and total $32.39.
    - expect: Payment and shipping information are displayed.

#### 1.5. Review and place an order

**File:** `tests/core-shopper-operations/place-order.spec.ts`

**Steps:**
  1. From a fresh logged-out session, sign in with standard_user / secret_sauce, add Sauce Labs Backpack, open the cart, and select Checkout.
    - expect: The Checkout: Your Information page is displayed.
  2. Enter Alex, Tester, and 10001 in the First Name, Last Name, and Zip/Postal Code fields, then select Continue.
    - expect: The Checkout: Overview page lists the selected item and a correctly calculated total.
  3. Select Finish.
    - expect: The Checkout: Complete! page is displayed with the heading 'Thank you for your order!'.
    - expect: The order dispatch confirmation text is visible.
    - expect: The cart badge is empty.
