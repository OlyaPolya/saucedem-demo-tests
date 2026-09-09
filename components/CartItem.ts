import { Locator, expect } from '@playwright/test';

export default class CartItem {
  private readonly title: Locator;
  private readonly description: Locator;
  private readonly price: Locator;
  private readonly removeButton: Locator;

  constructor(private readonly card: Locator) {
    this.title = card.getByTestId('inventory-item-name');
    this.description = card.getByTestId('inventory-item-desc');
    this.price = card.getByTestId('inventory-item-price');
    this.removeButton = card.locator('[data-test^="remove-sauce-labs-"]');
  }

  async shouldHaveRequiredElements(): Promise<void> {
    await expect(this.title).toBeVisible();
    await expect(this.description).toBeVisible();
    await expect(this.price).toBeVisible();
    await expect(this.removeButton).toBeVisible();
  }

  async removeFromShoppingCart(): Promise<void> {
    await this.removeButton.click();
  }

  async shouldHaveTitle(expectedTitle: string): Promise<void> {
    await expect(this.title).toContainText(expectedTitle);
  }
}
