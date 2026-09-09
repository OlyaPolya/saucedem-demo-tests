import { Locator, expect, Page } from '@playwright/test';

export default class Header {
  private readonly header: Locator;
  private readonly logo: Locator;
  private readonly shoppingCart: Locator;
  private readonly sideBarButton: Locator;
  private readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.header = page.getByTestId('primary-header');
    this.logo = page.locator('.app_logo');
    this.shoppingCart = page.getByTestId('shopping-cart-link');
    this.sideBarButton = page.locator('.bm-burger-button');
    this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
  }

  async shouldBeVisible(): Promise<void> {
    await expect(this.header).toBeVisible();
  }

  async shouldHaveRequiredElements(): Promise<void> {
    await expect(this.logo).toBeVisible();
    await expect(this.shoppingCart).toBeVisible();
    await expect(this.sideBarButton).toBeVisible();
  }

  async openSideBar(): Promise<void> {
    await this.sideBarButton.click();
  }

  async goToShoppingCart(): Promise<void> {
    await this.shoppingCart.click();
  }

  async productCountBadgeShouldBeVisible(): Promise<void> {
    await expect(this.shoppingCartBadge).toBeVisible();
  }

  async productCountBadgeShouldBeHidden(): Promise<void> {
    await expect(this.shoppingCartBadge).toBeHidden();
  }

  async getBadgeItemCount(): Promise<number> {
    return Number(await this.shoppingCartBadge.textContent());
  }
}
