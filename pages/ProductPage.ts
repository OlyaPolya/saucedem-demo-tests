import BasePage from './BasePage';
import { Page, expect, Locator } from '@playwright/test';
import { ROUTES }  from '../fixtures/routes';
import ProductDetails from '../components/ProductDetails';
import { SortOption } from '../types/sort';
import SideBarMenu from '../components/SideBarMenu';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductSortBtn from '../components/ProductSortBtn';

export default class ProductPage extends BasePage {
  path = ROUTES.productPattern.url;

  readonly sideBarMenu: SideBarMenu;
  readonly header: Header;
  readonly footer: Footer;
  readonly product: ProductDetails;
  private readonly backBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.sideBarMenu = new SideBarMenu(page);
    this.header = new Header(page);
    this.footer = new Footer(page);
    this.product = new ProductDetails(page.getByTestId('inventory-container'));
    this.backBtn = page.getByTestId('back-to-products');
  }

  async clickToBackBtn(): Promise<void> {
    await this.backBtn.click();
  }

  async shouldHaveBackBtn(expectedText: string): Promise<void> {
    await expect(this.backBtn).toBeVisible();
    await expect(this.backBtn).toHaveText(expectedText);
  }
}
