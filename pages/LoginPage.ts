import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // --------------- Locators ---------------

  readonly signInButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInToPortalButton: Locator;
  readonly forgotPasswordButton: Locator;

  constructor(page: Page) {
    super(page);
    this.signInButton = page.getByRole('button', { name: 'Sign In', exact: true });
    this.emailInput = page.getByRole('textbox', { name: 'yourname@gmail.com' });
    this.passwordInput = page.getByRole('textbox', { name: '••••••••' });
    this.signInToPortalButton = page.getByRole('button', { name: 'Sign In to Portal' });
    this.forgotPasswordButton = page.getByRole('button', { name: 'Forgot password?' });
  }

  // --------------- Getter Methods ---------------

  getSignInButton(): Locator {
    return this.signInButton;
  }

  getEmailInput(): Locator {
    return this.emailInput;
  }

  getPasswordInput(): Locator {
    return this.passwordInput;
  }

  getSignInToPortalButton(): Locator {
    return this.signInToPortalButton;
  }

  getForgotPasswordButton(): Locator {
    return this.forgotPasswordButton;
  }

  // --------------- Action Methods ---------------

  async clickSignIn(): Promise<void> {
    await this.signInButton.click();
  }

  async enterEmail(email: string): Promise<void> {
    await this.emailInput.click();
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
  }

  async clickSignInToPortal(): Promise<void> {
    await this.signInToPortalButton.click();
  }

  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.clickSignIn();
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignInToPortal();
  }
}
