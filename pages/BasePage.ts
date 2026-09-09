import { Page, expect } from '@playwright/test';

export default abstract class BasePage {
  protected page: Page
  protected abstract readonly path: string

  constructor(page: Page) {
    this.page = page
  }

  async goToPage() {
    await this.page.goto(this.path)
  }

  async shouldHaveTitle(expectValue: string) {
    await expect(this.page).toHaveTitle(expectValue)
  }

  async shouldHaveURL(expectValue: string | RegExp) {
    await expect(this.page).toHaveURL(expectValue)
  }
}
