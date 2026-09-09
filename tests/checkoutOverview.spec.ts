import { test, expect } from '@playwright/test';
import MainPage from '../pages/MainPage';
import ShoppingCartPage from '../pages/ShopingCartPage';
import UserInfoPage from '../pages/UserInfoPage';
import ProductListItem from '../components/ProductListItem';
import CheckoutOverviewPage from '../pages/CheckoutOverviewPage';


test.describe('Страница проверки заказа', () => {
  let mainPage: MainPage;
  let productItem: ProductListItem;
  let checkoutOverviewPage: CheckoutOverviewPage;
  let shoppingCartPage: ShoppingCartPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.goToPage();
    productItem = mainPage.getProductListItem();
    await productItem.addToShoppingCart();
    await mainPage.header.goToShoppingCart();

    shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.placeOrder();

    const userFormPage = new UserInfoPage(page);
    await userFormPage.form.fillFields();
    await userFormPage.goToOverviewPage();

    checkoutOverviewPage = new CheckoutOverviewPage(page);
  });

  test('содержит хэддер, футер, товары, информацию о цене и доставке, кнопки "Cancel" и  "Finish"', async () => {

    await checkoutOverviewPage.header.shouldBeVisible();
    await checkoutOverviewPage.footer.shouldBeVisible();
    await checkoutOverviewPage.checkoutSummary.shouldHaveRequiredElements();
    await checkoutOverviewPage.shouldHaveFinishShoppingBtn('Finish');
    await checkoutOverviewPage.shouldHaveCancelBtn('Cancel');
  });

  test('при клике на кнопку "Cancel" происходит переход на Главную страницу с сохраненным товаром', async ({
    page,
  }) => {
    const productTitle = await productItem.getTitle();

    await checkoutOverviewPage.cancelOrder();

    await expect(page).toHaveURL('/inventory.html');

    await mainPage.header.goToShoppingCart();
    await shoppingCartPage.shouldContainProduct(productTitle);
  });

  test('при клике на кнопку "Finish" происходит переход на страницу благодарности', async ({
    page,
  }) => {
    await checkoutOverviewPage.finishShopping();
    await expect(page).toHaveURL('/checkout-complete.html');
    await expect(page.getByTestId('complete-header')).toContainText(
      'Thank you for your order!'
    );
  });
});

test('Цена товаров считается корректно', async ({
  page,
}) => {
  const mainPage = new MainPage(page);
  await mainPage.goToPage();
  const productItemFirst = mainPage.getProductListItem();
  const productItemSecond = mainPage.getProductListItem(1);
  await productItemFirst.addToShoppingCart();
  await productItemSecond.addToShoppingCart();
  await mainPage.header.goToShoppingCart();

  const shoppingCartPage = new ShoppingCartPage(page);
  await shoppingCartPage.placeOrder();

  const userFormPage = new UserInfoPage(page);
  await userFormPage.form.fillFields();
  await userFormPage.goToOverviewPage();

  const checkoutOverviewPage = new CheckoutOverviewPage(page);

  const productPriceFromItems = await checkoutOverviewPage.getTotalProductsPrices();
  const productsPriceFromPaymentForm = await checkoutOverviewPage.checkoutSummary.getItemsPrice();
  const productsTaxFromPaymentForm =  await checkoutOverviewPage.checkoutSummary.getTax();
  const productsTotalPriceFromPaymentForm = await checkoutOverviewPage.checkoutSummary.getTotalPrice();

  expect(productPriceFromItems).toEqual(productsPriceFromPaymentForm);
  expect(productsTotalPriceFromPaymentForm).toEqual(
    productsTaxFromPaymentForm + productsPriceFromPaymentForm
  );
});




