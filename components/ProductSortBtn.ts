import { Locator, expect, Page } from '@playwright/test';
import { SortOption } from '../types/sort';

export default class ProductSortBtn {
  private readonly sortBtn: Locator;

  constructor(private readonly page: Page) {
    this.sortBtn = page.getByTestId('product-sort-container');
  }

  async shouldBeVisible(): Promise<void> {
    await expect(this.sortBtn).toBeVisible();
  }

  async shouldHaveRequiredOptions(): Promise<void> {
    const options: SortOption[] = ['az', 'za', 'lohi', 'hilo'];

    await expect(this.sortBtn.locator('option')).toHaveCount(4);
    await expect(this.sortBtn.locator('option')).toHaveValues(options);
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortBtn.selectOption(option);
  }
}
