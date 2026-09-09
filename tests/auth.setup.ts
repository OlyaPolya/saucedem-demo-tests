import { test as setup, expect } from '@playwright/test';
import LoginPage from '../pages/LogInPage';

const authFile = 'playwright/.auth/user.json';

setup('Аутентификация юзера', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToPage();
  await loginPage.logIn();

  await expect(page).toHaveURL('/inventory.html');

  await page.context().storageState({ path: authFile });
})
