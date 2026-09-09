import BasePage from './BasePage';
import { Page, expect, Locator } from '@playwright/test';
import { ROUTES }  from '../fixtures/routes';
import SideBarMenu from '../components/SideBarMenu';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';

export default class CompleteOrderPage extends BasePage {
  path = ROUTES.shoppingCart.url;

  readonly sideBarMenu: SideBarMenu;
  readonly header: Header;
  readonly footer: Footer;
  private readonly backBtn: Locator;
  private readonly generatePDFBtn: Locator;
  private readonly title: Locator;
  private readonly description: Locator;

  constructor(page: Page) {
    super(page);
    this.sideBarMenu = new SideBarMenu(page);
    this.header = new Header(page);
    this.footer = new Footer(page);
    this.backBtn = page.getByTestId('back-to-products');
    this.generatePDFBtn = page.getByTestId('generate-pdf-order');
    this.title = page.getByTestId('complete-header');
    this.description = page.getByTestId('complete-text');
  }

  async backToMain(): Promise<void> {
    await this.backBtn.click();
  }

  async shouldHaveCompleteOrderForm(): Promise<void> {
    await expect(this.title).toBeVisible();
    await expect(this.description).toBeVisible();
    await expect(this.backBtn).toBeVisible();
    await expect(this.generatePDFBtn).toBeVisible();
  }

  async generatePDF(): Promise<void> {
    await this.generatePDFBtn.click();
  }

  async shouldHaveTitle(expectedTitle: string): Promise<void> {
    await expect(this.title).toHaveText(expectedTitle);
  }

  async shouldHaveDescription(expectedDescription: string): Promise<void> {
    await expect(this.description).toHaveText(expectedDescription);
  }

  async shouldHaveBackBtnText(expectedText: string): Promise<void> {
    await expect(this.backBtn).toHaveText(expectedText);
  }

  async shouldHaveGeneratePDFBtnText(expectedText: string): Promise<void> {
    await expect(this.generatePDFBtn).toHaveText(expectedText);
  }
}
