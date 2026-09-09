import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LogInPage';


test.describe('На странице авторизации', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToPage();
  });

  test('при вводе неправильных логина и пароля отображается ошибка', async () => {
    await loginPage.logIn('wrong_user', 'wrong_password');

    await loginPage.shouldShowError(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('при пустом логине отображается ошибка валидации', async () => {
    await loginPage.logIn('', 'secret_sauce');

    await loginPage.shouldShowError('Epic sadface: Username is required');
  });

  test('при пустом пароле отображается ошибка валидации', async () => {
    await loginPage.logIn('standard_user', '');

    await loginPage.shouldShowError('Epic sadface: Password is required');
  });
});

