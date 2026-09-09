import { test, expect } from '@playwright/test';
import MainPage from '../pages/MainPage';
import ShoppingCartPage from '../pages/ShopingCartPage';
import UserInfoPage from '../pages/UserInfoPage';
import ProductListItem from '../components/ProductListItem';


test.describe('Страница заполнения пользоватлеьских данных', () => {
  let mainPage: MainPage;
  let shoppingCartPage: ShoppingCartPage;
  let userFormPage: UserInfoPage;
  let productTitle: string;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.goToPage();
    const productItem = mainPage.getProductListItem();
    productTitle = await productItem.getTitle();
    await productItem.addToShoppingCart();
    await mainPage.header.goToShoppingCart();

    shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.placeOrder();

    userFormPage = new UserInfoPage(page);
  });

  test('содержит хэддер, футер, форму для заполнения, кнопки "Cancel" и  "Continue"', async () => {
    await userFormPage.header.shouldBeVisible();
    await userFormPage.footer.shouldBeVisible();
    await userFormPage.form.shouldHaveRequiredElements();
    await userFormPage.shouldHaveBackBtn('Cancel');
    await userFormPage.shouldHaveOverviewBtn('Continue');

  });

  test('при клике на кнопку "Cancel" происходит переход в Корзину с сохраненным товаром', async ({
    page,
  }) => {
    await userFormPage.goBackToCart();

    await expect(page).toHaveURL('/cart.html');
    await shoppingCartPage.shouldContainProduct(productTitle);
  });

  test('при клике на кнопку "Continue"с корректными данными происходит переход на страницу просмотра заказа', async ({page}) => {
    await userFormPage.form.fillFields();
    await userFormPage.goToOverviewPage();
    await expect(page).toHaveURL(
      '/checkout-step-two.html'
    );
    await shoppingCartPage.shouldContainProduct(productTitle);
  });


  test('при пустом поле "First Name" отображается ошибка валидации', async () => {
    await userFormPage.form.fillFields({
      firstName: null,
    });

    await userFormPage.goToOverviewPage();

    await userFormPage.form.shouldShowValidationError('firstName');
  });

  test('при пустом поле "Last Name" отображается ошибка валидации', async () => {
    await userFormPage.form.fillFields({
      lastName: null,
    });

    await userFormPage.goToOverviewPage();

    await userFormPage.form.shouldShowValidationError('lastName');
  });

  test('при пустом поле "Zip/Postal Code" отображается ошибка валидации', async () => {
    await userFormPage.form.fillFields({
      postCode: null,
    });

    await userFormPage.goToOverviewPage();

    await userFormPage.form.shouldShowValidationError('postCode');
  });

  test('при исправлении ошибки валидации формы происходит переходна форму просмотра заказа', async ({page}) => {
    await userFormPage.form.fillFields({
      firstName: null,
    });

    await userFormPage.goToOverviewPage();

    await userFormPage.form.shouldShowValidationError('firstName');

    await userFormPage.form.fillFields({
      firstName: 'User',
    });

    await userFormPage.goToOverviewPage();

    await expect(page).toHaveURL('checkout-step-two.html');
  });
});

// нет проверок валидных, невалидных значений полей, полей с пробелом, т.к. валидным считается все, кроме пустого поля. Хотя в реальных кейсах они нужны



