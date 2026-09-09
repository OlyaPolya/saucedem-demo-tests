import { Locator, expect } from '@playwright/test';

export default class ProductDetails {
  private readonly title: Locator;
  private readonly description: Locator;
  private readonly price: Locator;
  private readonly addButton: Locator;
  private readonly removeButton: Locator;
  private readonly image: Locator;

  constructor(private readonly card: Locator) {
    this.title = card.getByTestId('inventory-item-name');
    this.description = card.getByTestId('inventory-item-desc');
    this.price = card.getByTestId('inventory-item-price');
    this.addButton = card.getByTestId('add-to-cart');
    this.removeButton = card.getByTestId('remove');
    this.image = card.locator('[data-test^="item-sauce-labs-"]');
  }

  async shouldHaveRequiredElements(): Promise<void> {
    await expect(this.title).toBeVisible();
    await expect(this.description).toBeVisible();
    await expect(this.price).toBeVisible();
    await expect(this.addButton).toBeVisible();
    await expect(this.image).toBeVisible();
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
  
  async getTitle(): Promise<string> {
    return (await this.title.textContent()) ?? '';
  }
}
