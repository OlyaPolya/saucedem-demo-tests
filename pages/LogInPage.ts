import BasePage from './BasePage';
import { Page, expect } from '@playwright/test';
import { ROUTES }  from '../fixtures/routes';
import { LoginFormField } from '../types/sort';

export default class LoginPage extends BasePage {
  path = ROUTES.login.url;
  private readonly userNameInput = this.page.getByTestId('username');
  private readonly passwordInput = this.page.getByTestId('password');
  private readonly loginButton = this.page.getByTestId('login-button');
  private readonly errorMessage = this.page.getByTestId('error');

  constructor(page: Page) {
    super(page);
  }

  async logIn(
    userName = 'standard_user',
    password = 'secret_sauce'
  ): Promise<void> {
    await this.userNameInput.fill(userName);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async goToPage() {
    await this.page.goto(this.path);
  }

  async shouldShowError(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }
}
