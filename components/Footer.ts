import { Locator, expect, Page } from '@playwright/test';
import { SocialNetwork } from '../types/socialNetwork';

export default class Footer {
  private readonly footer: Locator;
  private readonly twitter: Locator;
  private readonly facebook: Locator;
  private readonly linkedin: Locator;
  private readonly policy: Locator;

  constructor(page: Page) {
    this.footer = page.getByTestId('footer');
    this.twitter = page.getByTestId('social-x');
    this.facebook = page.getByTestId('social-facebook');
    this.linkedin = page.getByTestId('social-linkedin');
    this.policy = page.getByTestId('footer-copy');
  }

  async shouldBeVisible(): Promise<void> {
    await expect(this.footer).toBeVisible();
  }

  async shouldHaveRequiredElements(): Promise<void> {
    await expect(this.twitter).toBeVisible();
    await expect(this.facebook).toBeVisible();
    await expect(this.linkedin).toBeVisible();
    await expect(this.policy).toBeVisible();
  }

  async clickSocialLink(socialNetwork: SocialNetwork): Promise<void> {
    const links = {
      x: this.twitter,
      facebook: this.facebook,
      linkedin: this.linkedin,
    };

    await links[socialNetwork].click();
  }

  async shouldHaveLinkHref(
    socialNetwork: SocialNetwork,
    expectedUrl: string
  ): Promise<void> {
    const links = {
      x: this.twitter,
      facebook: this.facebook,
      linkedin: this.linkedin,
    };

    await expect(links[socialNetwork]).toHaveAttribute('href', expectedUrl);
  }

  async shouldHaveLinkTitle(
    socialNetwork: SocialNetwork,
    expectedTitle: string
  ): Promise<void> {
    const links = {
      x: this.twitter,
      facebook: this.facebook,
      linkedin: this.linkedin,
    };

    await expect(links[socialNetwork]).toHaveText(expectedTitle);
  }

  async shouldHavePolicyText(expectedText: string): Promise<void> {
    await expect(this.policy).toHaveText(expectedText);
  }
}
