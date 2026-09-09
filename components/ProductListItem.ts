import { Locator, expect } from '@playwright/test';

export default class ProductListItem {
  private readonly title: Locator;
  private readonly description: Locator;
  private readonly price: Locator;
  private readonly addButton: Locator;
  private readonly removeButton: Locator;

  constructor(private readonly card: Locator) {
    this.title = card.getByTestId('inventory-item-name');
    this.description = card.getByTestId('inventory-item-desc');
    this.price = card.getByTestId('inventory-item-price');
    this.addButton = card.locator('[data-test^="add-to-cart-sauce-labs-"]');
    this.removeButton = card.locator('[data-test^="remove-sauce-labs-"]');
  }

  async shouldHaveRequiredElements(): Promise<void> {
    await expect(this.title).toBeVisible();
    await expect(this.description).toBeVisible();
    await expect(this.price).toBeVisible();
    await expect(this.addButton).toBeVisible();
  }

  async addToShoppingCart(): Promise<void> {
    await this.addButton.click();
  }

  async removeFromShoppingCart(): Promise<void> {
    await this.removeButton.click();
  }

  async shouldBeAddedToCart(): Promise<void> {
    await expect(this.removeButton).toBeVisible();
  }

  async shouldNotBeAddedToCart(): Promise<void> {
    await expect(this.addButton).toBeVisible();
  }

  async goToProductPage(): Promise<void> {
    await this.title.click();
  }

  async getTitle(): Promise<string> {
    return (await this.title.textContent()) ?? '';
  }
}
