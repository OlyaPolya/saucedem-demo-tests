import BasePage from './BasePage';
import { Page, expect } from '@playwright/test';
import { ROUTES } from '../fixtures/routes';
import ProductListItem from '../components/ProductListItem';
import { SortOption } from '../types/sort';
import SideBarMenu from '../components/SideBarMenu';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductSortBtn from '../components/ProductSortBtn';

export default class MainPage extends BasePage {
  path = ROUTES.main.url;

  private readonly itemCart = this.page.getByTestId('inventory-item');
  private readonly itemTitle = this.page.getByTestId('inventory-item-name');
  private readonly itemPrice = this.page.getByTestId('inventory-item-price');

  readonly sideBarMenu: SideBarMenu;
  readonly header: Header;
  readonly footer: Footer;
  readonly sortButton: ProductSortBtn;

  constructor(page: Page) {
    super(page);
    this.sideBarMenu = new SideBarMenu(page);
    this.header = new Header(page);
    this.footer = new Footer(page);
    this.sortButton = new ProductSortBtn(page);
  }

  async getProductsPrices(): Promise<number[]> {
    const priceElements = await this.itemPrice.allTextContents();

    const prices = priceElements.map((element) =>
      Number(element.replace(/[^0-9.]/g, ''))
    );

    return prices;
  }

  async getProductsTitles(): Promise<string[]> {
    const elementsTitles = await this.itemTitle.allTextContents();

    const titles = elementsTitles.map((element) => element.toLocaleLowerCase());

    return titles;
  }

  getProductListItem(cardIndex = 0): ProductListItem {
    return new ProductListItem(this.itemCart.nth(cardIndex));
  }
}
