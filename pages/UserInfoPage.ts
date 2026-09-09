import BasePage from './BasePage';
import { Page, expect, Locator } from '@playwright/test';
import { ROUTES }  from '../fixtures/routes';
import ProductDetails from '../components/ProductDetails';
import { SortOption } from '../types/sort';
import SideBarMenu from '../components/SideBarMenu';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserForm from '../components/UserForm';

export default class UserInfoPage extends BasePage {
  path = ROUTES.productPattern.url;

  readonly sideBarMenu: SideBarMenu;
  readonly header: Header;
  readonly footer: Footer;
  readonly form: UserForm;
  private readonly backToCartBtn: Locator;
  private readonly overviewBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.sideBarMenu = new SideBarMenu(page);
    this.header = new Header(page);
    this.footer = new Footer(page);
    this.form = new UserForm(page);
    this.backToCartBtn = page.getByTestId('cancel');
    this.overviewBtn = page.getByTestId('continue');
  }

  async goBackToCart(): Promise<void> {
    await this.backToCartBtn.click();
  }

  async goToOverviewPage(): Promise<void> {
    await this.overviewBtn.click();
  }

  async shouldHaveBackBtn(expectedText: string): Promise<void> {
    await expect(this.backToCartBtn).toBeVisible();
    await expect(this.backToCartBtn).toHaveText(expectedText);
  }

  async shouldHaveOverviewBtn(expectedText: string): Promise<void> {
    await expect(this.overviewBtn).toBeVisible();
    await expect(this.overviewBtn).toHaveText(expectedText);
  }
}
