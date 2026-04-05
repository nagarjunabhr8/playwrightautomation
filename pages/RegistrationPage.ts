import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegistrationPage extends BasePage {
  // --------------- Locators ---------------

  readonly registerButton: Locator;
  readonly nameInput: Locator;
  readonly apartmentInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly roleDropdown: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly togglePasswordVisibilityButton: Locator;
  readonly toggleConfirmPasswordButton: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    super(page);
    this.registerButton = page.getByRole('button', { name: 'Register', exact: true });
    this.nameInput = page.getByRole('textbox', { name: 'Ravi Kumar' });
    this.apartmentInput = page.getByRole('textbox', { name: 'A-' });
    this.emailInput = page.getByRole('textbox', { name: 'yourname@gmail.com' });
    this.phoneInput = page.getByRole('textbox', { name: '+91 98765' });
    this.roleDropdown = page.getByRole('combobox');
    this.passwordInput = page.getByRole('textbox', { name: '••••••••' }).first();
    this.confirmPasswordInput = page.getByRole('textbox', { name: '••••••••' }).nth(1);
    this.togglePasswordVisibilityButton = page.getByRole('button', { name: 'Toggle password visibility' });
    this.toggleConfirmPasswordButton = page.getByRole('button', { name: 'Toggle confirm password' });
    this.createAccountButton = page.getByRole('button', { name: 'Create My Account' });
  }

  // --------------- Getter Methods ---------------

  getRegisterButton(): Locator {
    return this.registerButton;
  }

  getNameInput(): Locator {
    return this.nameInput;
  }

  getApartmentInput(): Locator {
    return this.apartmentInput;
  }

  getEmailInput(): Locator {
    return this.emailInput;
  }

  getPhoneInput(): Locator {
    return this.phoneInput;
  }

  getRoleDropdown(): Locator {
    return this.roleDropdown;
  }

  getPasswordInput(): Locator {
    return this.passwordInput;
  }

  getConfirmPasswordInput(): Locator {
    return this.confirmPasswordInput;
  }

  getTogglePasswordVisibilityButton(): Locator {
    return this.togglePasswordVisibilityButton;
  }

  getToggleConfirmPasswordButton(): Locator {
    return this.toggleConfirmPasswordButton;
  }

  getCreateAccountButton(): Locator {
    return this.createAccountButton;
  }

  // --------------- Action Methods ---------------

  async clickRegister(): Promise<void> {
    await this.registerButton.click();
  }

  async enterName(name: string): Promise<void> {
    await this.nameInput.click();
    await this.nameInput.fill(name);
  }

  async enterApartment(apartment: string): Promise<void> {
    await this.apartmentInput.click();
    await this.apartmentInput.fill(apartment);
  }

  async enterEmail(email: string): Promise<void> {
    await this.emailInput.click();
    await this.emailInput.fill(email);
  }

  async enterPhone(phone: string): Promise<void> {
    await this.phoneInput.click();
    await this.phoneInput.fill(phone);
  }

  async selectRole(role: string): Promise<void> {
    await this.roleDropdown.selectOption(role);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
  }

  async enterConfirmPassword(password: string): Promise<void> {
    await this.confirmPasswordInput.click();
    await this.confirmPasswordInput.fill(password);
  }

  async togglePasswordVisibility(): Promise<void> {
    await this.togglePasswordVisibilityButton.click();
  }

  async toggleConfirmPasswordVisibility(): Promise<void> {
    await this.toggleConfirmPasswordButton.click();
  }

  async clickCreateAccount(): Promise<void> {
    await this.createAccountButton.click();
  }

  async registerUser(
    name: string,
    apartment: string,
    email: string,
    phone: string,
    role: string,
    password: string,
  ): Promise<void> {
    await this.clickRegister();
    await this.enterName(name);
    await this.enterApartment(apartment);
    await this.enterEmail(email);
    await this.enterPhone(phone);
    await this.selectRole(role);
    await this.enterPassword(password);
    await this.enterConfirmPassword(password);
    await this.clickCreateAccount();
  }
}
