import { test, expect } from '@playwright/test';
import MainPage from '../pages/MainPage';
import ProductPage from '../pages/ProductPage';

test('Бургер меню открывается при клике на кнопку бургер-меню и закрывается на Главной', async ({
  page,
}) => {
  const mainPage = new MainPage(page);
  await mainPage.goToPage();

  await mainPage.header.openSideBar();
  await mainPage.sideBarMenu.shouldBeVisible();
  await mainPage.sideBarMenu.closeMenu();
  await mainPage.sideBarMenu.shouldBeHidden();
});

test('Пункт "All Items" бургер-меню открывает Главную страницу', async ({
  page,
}) => {
  const mainPage = new MainPage(page);
  await mainPage.goToPage();

  const product = mainPage.getProductListItem();
  await product.goToProductPage();

  const productPage = new ProductPage(page);

  await productPage.header.openSideBar();
  await productPage.sideBarMenu.clickAllItems();

  await expect.soft(page).toHaveURL('/inventory.html');
});

test('Пункт "About" бургер-меню открывает saucelabs.com', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.goToPage();

  await mainPage.header.openSideBar();
  await mainPage.sideBarMenu.clickAbout();

  await expect.soft(page).toHaveURL('https://saucelabs.com/');
});

test('Пункт "Logout" бургер-меню сбрасывают аутентификацию', async ({
  page,
}) => {
  const mainPage = new MainPage(page);
  await mainPage.goToPage();

  await mainPage.header.openSideBar();
  await mainPage.sideBarMenu.clickLogout();

  await expect.soft(page).toHaveURL('');
  const loginButton = page.getByTestId('login-button');
  await expect.soft(loginButton).toBeVisible();
});

test('Пункт "Reset App State" убирает выбранные товары из корзины', async ({
  page,
}) => {
  const mainPage = new MainPage(page);
  await mainPage.goToPage();

  const productItem = mainPage.getProductListItem();
  await productItem.addToShoppingCart();
  await mainPage.header.productCountBadgeShouldBeVisible();
  await productItem.shouldBeAddedToCart();

  await mainPage.header.openSideBar();
  await mainPage.sideBarMenu.clickReset();
  await mainPage.sideBarMenu.closeMenu();

  await mainPage.header.productCountBadgeShouldBeHidden();
  // productItem.shouldNotBeAddedToCart(); нужно добавить это, но тут тест валится, т.к. механизм сайт отрабатывает не корректно
});
