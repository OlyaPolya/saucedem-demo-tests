import { test, expect } from '@playwright/test';
import MainPage from '../pages/MainPage';
import ProductPage from '../pages/ProductPage';
import ShoppingCartPage from '../pages/ShopingCartPage';
import ProductListItem from '../components/ProductListItem';
import CheckoutOverviewPage from '../pages/CheckoutOverviewPage';
import UserInfoPage from '../pages/UserInfoPage';
import CompleteOrderPage from '../pages/CompleteOrderPage';

test.describe('На страннице благодарности', () => {
  let completeOrderPage: CompleteOrderPage;

  test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goToPage();
    const productItem = mainPage.getProductListItem();
    await productItem.addToShoppingCart();
    await mainPage.header.goToShoppingCart();

    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.placeOrder();

    const userFormPage = new UserInfoPage(page);
    await userFormPage.form.fillFields();
    await userFormPage.goToOverviewPage();

    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await checkoutOverviewPage.finishShopping();

    completeOrderPage = new CompleteOrderPage(page);
  });

  test('есть футер, хэдер, текст благодарности, кнопки "Back Home" и "Generate PDF order" ', async () => {
    await completeOrderPage.header.shouldBeVisible();
    await completeOrderPage.footer.shouldBeVisible();
    await completeOrderPage.shouldHaveCompleteOrderForm();
  });

  test('есть кнопка "Generate PDF order" с текстом и возможностью скачать файл', async ({
    page,
  }) => {
    await completeOrderPage.shouldHaveGeneratePDFBtnText('Generate PDF order');

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      completeOrderPage.generatePDF(),
    ]);

    expect(download.suggestedFilename()).toMatch(/^swag-labs-order-.*\.pdf$/);
  });

  test('есть кнопка "Back Home" с текстом и возможностью перехода на Главную', async ({
    page,
  }) => {
    await completeOrderPage.shouldHaveBackBtnText('Back Home');
    await completeOrderPage.backToMain();

    await expect(page).toHaveURL('/inventory.html');
  });

  test('есть текст благодарности', async () => {
    await completeOrderPage.shouldHaveTitle('Thank you for your order!');
    await completeOrderPage.shouldHaveDescription(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    );


  });
});

