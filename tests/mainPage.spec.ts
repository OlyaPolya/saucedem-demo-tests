import { test, expect } from '@playwright/test';
import MainPage from '../pages/MainPage';
import { SortOption } from '../types/sort';
import { SocialNetwork } from '../types/socialNetwork';
import ShoppingCartPage from '../pages/ShopingCartPage';

test.describe('Главная страница содержит', () => {
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.goToPage();
  });

  test('карточку товара с обязательными элементами: название, описание, цена, кнопка "Add to cart"', async () => {
    const ProductListItem = mainPage.getProductListItem();
    await ProductListItem.shouldHaveRequiredElements();
  });

  test('шапку с элементами: бургер-меню, логотип, корзина', async () => {
    await mainPage.header.shouldBeVisible();
    await mainPage.header.shouldHaveRequiredElements();
  });

  test('футер с элементами: соц.сети, политика конфиденциальности', async () => {
    await mainPage.footer.shouldBeVisible();
    await mainPage.footer.shouldHaveRequiredElements();
  });

  test('кнопку сортировки', async () => {
    await mainPage.sortButton.shouldBeVisible();
  });
});

test.describe('Сортировка товаров на Главной странице', () => {
  let mainPage: MainPage;
  const sortOptions: { option: SortOption; name: string }[] = [
    { option: 'lohi', name: 'по возрастанию цены' },
    { option: 'hilo', name: 'по убыванию цены' },
    { option: 'az', name: 'по алфавиту от А до Я' },
    { option: 'za', name: 'по алфавиту от Я до А' },
  ];

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.goToPage();
  });

  sortOptions.forEach((sortType) =>
    test(`${sortType.name}`, async () => {
      await mainPage.sortButton.sortBy(sortType.option);

      if (sortType.option === 'lohi') {
        const prices = await mainPage.getProductsPrices();
        expect(prices).toEqual([...prices].sort((a, b) => a - b));
      }

      if (sortType.option === 'hilo') {
        const prices = await mainPage.getProductsPrices();
        expect(prices).toEqual([...prices].sort((a, b) => b - a));
      }

      if (sortType.option === 'az') {
        const titles = await mainPage.getProductsTitles();
        expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b)));
      }

      if (sortType.option === 'za') {
        const titles = await mainPage.getProductsTitles();
        expect(titles).toEqual([...titles].sort((a, b) => b.localeCompare(a)));
      }
    })
  );
});

test('При клике по кнопке "Add to cart" на Главной странице происходит добавление товара в корзину', async ({
  page,
}) => {
  const mainPage = new MainPage(page);
  await mainPage.goToPage();
  const product = mainPage.getProductListItem();
  await product.addToShoppingCart();

  await mainPage.header.productCountBadgeShouldBeVisible();
  await product.shouldBeAddedToCart();
  const productTitle = await product.getTitle();

  await mainPage.header.goToShoppingCart();

  const shoppingCartPage = new ShoppingCartPage(page);

  await expect(page).toHaveURL('/cart.html');

  const cartItem = shoppingCartPage.getCartItem();
  await cartItem.shouldHaveTitle(productTitle);
});

test('При добавлении двух товаров с Главной в корзине отображаются оба товара, счетчик показывает их количество', async ({
  page,
}) => {
  const mainPage = new MainPage(page);
  await mainPage.goToPage();
  const firstProduct = mainPage.getProductListItem();
  const secondProduct = mainPage.getProductListItem(1);
  const firstProductTitle = await firstProduct.getTitle();
  const secondProductTitle = await secondProduct.getTitle();

  await firstProduct.addToShoppingCart();
  await secondProduct.addToShoppingCart();

  const itemCount = await mainPage.header.getBadgeItemCount();
  expect(itemCount).toBe(2);

  await firstProduct.shouldBeAddedToCart();
  await secondProduct.shouldBeAddedToCart();

  await mainPage.header.goToShoppingCart();

  const shoppingCartPage = new ShoppingCartPage(page);

  await shoppingCartPage.shouldContainProduct(firstProductTitle);
  await shoppingCartPage.shouldContainProduct(secondProductTitle);
});
