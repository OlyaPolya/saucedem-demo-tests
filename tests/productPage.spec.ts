import { test, expect } from '@playwright/test';
import MainPage from '../pages/MainPage';
import ProductPage from '../pages/ProductPage';
import ShoppingCartPage from '../pages/ShopingCartPage';

test.describe('Странница товара содержит', () => {
  let mainPage: MainPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.goToPage();
    const product = mainPage.getProductListItem();
    await product.goToProductPage();
    productPage = new ProductPage(page);
  });

  test('карточку товара с обязательными элементами: название, описание, цена, фото, кнопка "Add to cart"', async () => {
    await productPage.product.shouldHaveRequiredElements();
  });

  test('шапку с элементами: бургер-меню, логотип, корзина', async () => {
    await productPage.header.shouldBeVisible();
    await productPage.header.shouldHaveRequiredElements();
  });

  test('футер с элементами: соц.сети, политика конфиденциальности', async () => {
    await productPage.footer.shouldBeVisible();
    await productPage.footer.shouldHaveRequiredElements();
  });

  test('кнопку "Back to products" c корректным названием', async () => {
    await productPage.shouldHaveBackBtn('Back to products');
  });
});

test('При клике на кнопку "Back to products" на странице товара происходит переход на Главную страницу', async ({
  page,
}) => {
  const mainPage = new MainPage(page);
  await mainPage.goToPage();
  const product = mainPage.getProductListItem();
  await product.goToProductPage();
  const productPage = new ProductPage(page);
  productPage.clickToBackBtn();

  await expect(page).toHaveURL('/inventory.html');
});

test('При клике по кнопке "Add to cart" на странице товара происходит добавление товара в корзину', async ({
  page,
}) => {
  const mainPage = new MainPage(page);
  await mainPage.goToPage();
  const product = mainPage.getProductListItem();
  await product.goToProductPage();

  const productPage = new ProductPage(page);
  await productPage.product.addToShoppingCart();
  await productPage.header.productCountBadgeShouldBeVisible();
  await productPage.product.shouldBeAddedToCart();
  const productTitle = await productPage.product.getTitle();

  await productPage.header.goToShoppingCart();

  const shoppingCartPage = new ShoppingCartPage(page);

  await expect(page).toHaveURL('/cart.html');

  const cartItem = shoppingCartPage.getCartItem();
  await cartItem.shouldHaveTitle(productTitle);
});


test('При клике по кнопке "Remove" на странице товара происходит удаление товара из корзины', async ({
  page,
}) => {
  const mainPage = new MainPage(page);
  await mainPage.goToPage();
  const product = mainPage.getProductListItem();
  const productTitle = await product.getTitle()
  await product.goToProductPage();

  const productPage = new ProductPage(page);
  await productPage.product.addToShoppingCart();
  await productPage.header.goToShoppingCart();

  const shoppingCartPage = new ShoppingCartPage(page);

  const cartItem = shoppingCartPage.getCartItem();
  await cartItem.removeFromShoppingCart();

  await shoppingCartPage.shouldNotContainProduct(productTitle);
  await shoppingCartPage.header.productCountBadgeShouldBeHidden();
});
