import BasePage from './BasePage';
import { Page, expect, Locator } from '@playwright/test';
import { ROUTES }  from '../fixtures/routes';
import SideBarMenu from '../components/SideBarMenu';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';
import CheckoutSummary from '../components/checkoutSummary';

export default class CheckoutOverviewPage extends BasePage {
  path = ROUTES.checkoutOverview.url;

  readonly sideBarMenu: SideBarMenu;
  readonly header: Header;
  readonly footer: Footer;
  readonly checkoutSummary: CheckoutSummary;

  private readonly cartItems: Locator;
  private readonly finishShoppingBtn: Locator;
  private readonly cancelBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.sideBarMenu = new SideBarMenu(page);
    this.header = new Header(page);
    this.footer = new Footer(page);
    this.checkoutSummary = new CheckoutSummary(page);
    this.cartItems = page.getByTestId('inventory-item');
    this.finishShoppingBtn = page.getByTestId('finish');
    this.cancelBtn = page.getByTestId('cancel');
  }

  async finishShopping(): Promise<void> {
    await this.finishShoppingBtn.click();
  }

  async cancelOrder(): Promise<void> {
    await this.cancelBtn.click();
  }

  async getTotalProductsPrices(): Promise<number> {
    const priceElements = await this.cartItems
      .locator('[data-test="inventory-item-price"]')
      .allTextContents();

    return priceElements.reduce(
      (sum, price) => sum + Number(price.replace(/[^0-9.]/g, '')),
      0
    );
  }

  getCartItem(index = 0): CartItem {
    return new CartItem(this.cartItems.nth(index));
  }

  async shouldContainProduct(title: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: title });
    await expect(item).toBeVisible();
  }

  async shouldHaveFinishShoppingBtn(expectedText: string): Promise<void> {
    await expect(this.finishShoppingBtn).toBeVisible();
    await expect(this.finishShoppingBtn).toHaveText(expectedText);
  }
  async shouldHaveCancelBtn(expectedText: string): Promise<void> {
    await expect(this.cancelBtn).toBeVisible();
    await expect(this.cancelBtn).toHaveText(expectedText);
  }
}
