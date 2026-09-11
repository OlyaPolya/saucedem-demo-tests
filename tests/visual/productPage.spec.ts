import { test, expect } from '@playwright/test';
import MainPage from '../../pages/MainPage';

test('Страница товара соответствует эталонному вид', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.goToPage();
  const product = mainPage.getProductListItem();
  await product.goToProductPage();

  await expect(page).toHaveScreenshot('product-page.png', {
    fullPage: true,
    mask: [
      page.locator('img[data-test^="item-sauce-labs-"]'),
      page.getByTestId('inventory-item-desc'),
      page.getByTestId('inventory-item-price'),
      page.getByTestId('inventory-item-name'),
    ],
  });
});

