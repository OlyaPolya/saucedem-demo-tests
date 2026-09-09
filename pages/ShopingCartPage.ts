import BasePage from './BasePage';
import { Page, expect, Locator } from '@playwright/test';
import { ROUTES }  from '../fixtures/routes';
import SideBarMenu from '../components/SideBarMenu';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';

export default class ShoppingCartPage extends BasePage {
  path = ROUTES.shoppingCart.url;

  readonly sideBarMenu: SideBarMenu;
  readonly header: Header;
  readonly footer: Footer;
  private readonly cartItems: Locator;
  private readonly continueShoppingBtn: Locator;
  private readonly checkoutBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.sideBarMenu = new SideBarMenu(page);
    this.header = new Header(page);
    this.footer = new Footer(page);
    this.cartItems = page.getByTestId('inventory-item');
    this.continueShoppingBtn = page.getByTestId('continue-shopping');
    this.checkoutBtn = page.getByTestId('checkout');
  }

  async clickToContinueShopping(): Promise<void> {
    await this.continueShoppingBtn.click();
  }

  async placeOrder(): Promise<void> {
    await this.checkoutBtn.click();
  }

  getCartItemByTitle(title: string): CartItem {
    const item = this.cartItems.filter({
      hasText: title,
    });

    return new CartItem(item);
  }

  getCartItem(index = 0): CartItem {
    return new CartItem(this.cartItems.nth(index));
  }

  async shouldContainProduct(title: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: title });
    await expect(item).toBeVisible();
  }

  async shouldNotContainProduct(title: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: title });

    await expect(item).not.toBeVisible();
  }
}
