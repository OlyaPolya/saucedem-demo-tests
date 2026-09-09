import { test, expect } from '@playwright/test';
import MainPage from '../pages/MainPage';
import { SocialNetworkData } from '../types/socialNetwork';

const socialNetworks: SocialNetworkData[] = [
  {
    network: 'twitter',
    title: 'Twitter',
    href: 'https://twitter.com/saucelabs',
  },
  {
    network: 'facebook',
    title: 'Facebook',
    href: 'https://www.facebook.com/saucelabs',
  },
  {
    network: 'linkedin',
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/company/sauce-labs/',
  },
];

test.describe('Проверка в футере атрибутов ссылки', () => {
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.goToPage();
  });

  socialNetworks.forEach((social) =>
    test(`${social.network}`, async () => {
      await mainPage.footer.shouldHaveLinkHref(social.network, social.href);
      await mainPage.footer.shouldHaveLinkTitle(social.network, social.title);
    })
  );
});

test('Проверка в футере наличие текста политики конфиденциальности', async ({page}) => {
  let mainPage = new MainPage(page);

  await mainPage.goToPage();
  await mainPage.footer.shouldHavePolicyText(
    '© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy'
  );

});

