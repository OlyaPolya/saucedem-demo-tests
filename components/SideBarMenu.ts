import { Locator, expect, Page } from '@playwright/test';

export default class SideBarMenu {
  private readonly menuItemAll: Locator;
  private readonly menuItemAbout: Locator;
  private readonly menuItemLogout: Locator;
  private readonly menuItemReset: Locator;
  private readonly closeBtn: Locator;
  private readonly menu: Locator;

  constructor(page: Page) {
    this.menuItemAll = page.getByTestId('inventory-sidebar-link');
    this.menuItemAbout = page.getByTestId('about-sidebar-link');
    this.menuItemLogout = page.getByTestId('logout-sidebar-link');
    this.menuItemReset = page.getByTestId('reset-sidebar-link');
    this.closeBtn = page.locator('#react-burger-cross-btn');
    this.menu = page.locator('.bm-menu-wrap');
  }

  async shouldBeVisible(): Promise<void> {
    await expect(this.menu).toBeVisible();
  }

  async shouldBeHidden(): Promise<void> {
    await expect(this.menu).toBeHidden();
  }

  async shouldHaveRequiredElements(): Promise<void> {
    await expect(this.menuItemAll).toBeVisible();
    await expect(this.menuItemAbout).toBeVisible();
    await expect(this.menuItemLogout).toBeVisible();
    await expect(this.menuItemReset).toBeVisible();
    await expect(this.closeBtn).toBeVisible();
  }

  async clickAllItems(): Promise<void> {
    await this.menuItemAll.click();
  }

  async clickAbout(): Promise<void> {
    await this.menuItemAbout.click();
  }

  async clickLogout(): Promise<void> {
    await this.menuItemLogout.click();
  }

  async clickReset(): Promise<void> {
    await this.menuItemReset.click();
  }

  async closeMenu(): Promise<void> {
    await this.closeBtn.click();
  }
}
