import { Locator, expect, Page } from '@playwright/test';
import { UserFormField } from '../types/sort';

export default class UserForm {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postCodeInput: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postCodeInput = page.getByTestId('postalCode');
    this.errorMessage = page.getByTestId('error');
  }

  async shouldHaveRequiredElements(): Promise<void> {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postCodeInput).toBeVisible();
  }

  async fillFields(
    fields: {
      firstName?: string | null;
      lastName?: string | null;
      postCode?: string | null;
    } = {}
  ): Promise<void> {
    const {
      firstName = 'User',
      lastName = 'Arbuzer',
      postCode = '0000',
    } = fields;

    if (firstName !== null) {
      await this.firstNameInput.fill(firstName);
    }

    if (lastName !== null) {
      await this.lastNameInput.fill(lastName);
    }

    if (postCode !== null) {
      await this.postCodeInput.fill(postCode);
    }
  }

  async shouldShowValidationError(field: UserFormField): Promise<void> {
    const messages = {
      firstName: 'Error: First Name is required',
      lastName: 'Error: Last Name is required',
      postCode: 'Error: Postal Code is required',
    };

    await expect(this.errorMessage).toHaveText(messages[field]);
  }
}
