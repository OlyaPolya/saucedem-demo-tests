import { Locator, expect, Page } from '@playwright/test';

export default class CheckoutSummary {
  private readonly paymentInfo: Locator;
  private readonly shippingInfo: Locator;
  private readonly itemsPrice: Locator;
  private readonly taxPrice: Locator;
  private readonly totalPrice: Locator;

  constructor(page: Page) {
    this.paymentInfo = page.getByTestId('payment-info-value');
    this.shippingInfo = page.getByTestId('shipping-info-value');
    this.itemsPrice = page.getByTestId('subtotal-label');
    this.taxPrice = page.getByTestId('tax-label');
    this.totalPrice = page.getByTestId('total-label');
  }

  async shouldHaveRequiredElements(): Promise<void> {
    await expect(this.paymentInfo).toBeVisible();
    await expect(this.shippingInfo).toBeVisible();
    await expect(this.itemsPrice).toBeVisible();
    await expect(this.taxPrice).toBeVisible();
    await expect(this.totalPrice).toBeVisible();
  }

  async getItemsPrice(): Promise<number> {
    const price = (await this.itemsPrice.textContent()) ?? '';
    return Number(price.replace(/[^0-9.]/g, ''));
  }

  async getTax(): Promise<number> {
    const price = (await this.taxPrice.textContent()) ?? '';
    return Number(price.replace(/[^0-9.]/g, ''));
  }

  async getTotalPrice(): Promise<number> {
    const price = (await this.totalPrice.textContent()) ?? '';
    return Number(price.replace(/[^0-9.]/g, ''));
  }
}
