import { test, expect } from '../fixtures/BasePageFixtures';
import testData from '../testdata/pageProperties.json';

const valid = testData.registration.validUser;
const data = testData.registration;

test.beforeEach(async ({ landingPage, registrationPage }) => {
  await landingPage.launchApplication();
  await registrationPage.clickRegister();
});

// ===================== Valid Registration Tests =====================

test.describe('Registration - Valid Scenarios', () => {

  test('should register a new user with valid details', async ({ registrationPage }) => {
    await registrationPage.enterName(valid.name);
    await registrationPage.enterApartment(valid.apartment);
    await registrationPage.enterEmail(valid.email);
    await registrationPage.enterPhone(valid.phone);
    await registrationPage.selectRole(valid.role);
    await registrationPage.enterPassword(valid.password);
    await registrationPage.enterConfirmPassword(valid.password);
    await registrationPage.clickCreateAccount();
  });

  test('should register using registerUser helper method', async ({ registrationPage }) => {
    await registrationPage.registerUser(
      valid.name,
      valid.apartment,
      valid.email,
      valid.phone,
      valid.role,
      valid.password,
    );
  });

  test('should toggle password visibility', async ({ registrationPage }) => {
    await registrationPage.enterPassword(valid.password);
    await registrationPage.togglePasswordVisibility();
    await expect(registrationPage.getPasswordInput()).toBeVisible();
  });

  test('should toggle confirm password visibility', async ({ registrationPage }) => {
    await registrationPage.enterConfirmPassword(valid.password);
    await registrationPage.toggleConfirmPasswordVisibility();
    await expect(registrationPage.getConfirmPasswordInput()).toBeVisible();
  });

  test('should allow selecting different roles', async ({ registrationPage }) => {
    await registrationPage.selectRole(valid.role);
    await expect(registrationPage.getRoleDropdown()).toHaveValue(valid.role);
  });

  test('should accept valid email format', async ({ registrationPage }) => {
    await registrationPage.enterEmail(valid.email);
    await expect(registrationPage.getEmailInput()).toHaveValue(valid.email);
  });

  test('should accept valid 10-digit phone number', async ({ registrationPage }) => {
    await registrationPage.enterPhone(valid.phone);
    await expect(registrationPage.getPhoneInput()).toHaveValue(valid.phone);
  });

});

// ===================== Invalid Registration Tests =====================

test.describe('Registration - Invalid Scenarios', () => {

  test('should not register with all fields empty', async ({ registrationPage }) => {
    await registrationPage.clickCreateAccount();
    await expect(registrationPage.getCreateAccountButton()).toBeVisible();
  });

  test('should not register with empty name', async ({ registrationPage }) => {
    await registrationPage.enterApartment(data.emptyName.apartment);
    await registrationPage.enterEmail(data.emptyName.email);
    await registrationPage.enterPhone(data.emptyName.phone);
    await registrationPage.selectRole(data.emptyName.role);
    await registrationPage.enterPassword(data.emptyName.password);
    await registrationPage.enterConfirmPassword(data.emptyName.password);
    await registrationPage.clickCreateAccount();
    await expect(registrationPage.getCreateAccountButton()).toBeVisible();
  });

  test('should not register with empty email', async ({ registrationPage }) => {
    await registrationPage.enterName(data.emptyEmail.name);
    await registrationPage.enterApartment(data.emptyEmail.apartment);
    await registrationPage.enterPhone(data.emptyEmail.phone);
    await registrationPage.selectRole(data.emptyEmail.role);
    await registrationPage.enterPassword(data.emptyEmail.password);
    await registrationPage.enterConfirmPassword(data.emptyEmail.password);
    await registrationPage.clickCreateAccount();
    await expect(registrationPage.getCreateAccountButton()).toBeVisible();
  });

  test('should not register with invalid email format', async ({ registrationPage }) => {
    await registrationPage.enterName(data.invalidEmail.name);
    await registrationPage.enterApartment(data.invalidEmail.apartment);
    await registrationPage.enterEmail(data.invalidEmail.email);
    await registrationPage.enterPhone(data.invalidEmail.phone);
    await registrationPage.selectRole(data.invalidEmail.role);
    await registrationPage.enterPassword(data.invalidEmail.password);
    await registrationPage.enterConfirmPassword(data.invalidEmail.password);
    await registrationPage.clickCreateAccount();
    await expect(registrationPage.getCreateAccountButton()).toBeVisible();
  });

  test('should not register with empty phone number', async ({ registrationPage }) => {
    await registrationPage.enterName(data.emptyPhone.name);
    await registrationPage.enterApartment(data.emptyPhone.apartment);
    await registrationPage.enterEmail(data.emptyPhone.email);
    await registrationPage.selectRole(data.emptyPhone.role);
    await registrationPage.enterPassword(data.emptyPhone.password);
    await registrationPage.enterConfirmPassword(data.emptyPhone.password);
    await registrationPage.clickCreateAccount();
    await expect(registrationPage.getCreateAccountButton()).toBeVisible();
  });

  test('should not register with short phone number', async ({ registrationPage }) => {
    await registrationPage.enterName(data.shortPhone.name);
    await registrationPage.enterApartment(data.shortPhone.apartment);
    await registrationPage.enterEmail(data.shortPhone.email);
    await registrationPage.enterPhone(data.shortPhone.phone);
    await registrationPage.selectRole(data.shortPhone.role);
    await registrationPage.enterPassword(data.shortPhone.password);
    await registrationPage.enterConfirmPassword(data.shortPhone.password);
    await registrationPage.clickCreateAccount();
    await expect(registrationPage.getCreateAccountButton()).toBeVisible();
  });

  test('should not register with empty password', async ({ registrationPage }) => {
    await registrationPage.enterName(data.emptyPassword.name);
    await registrationPage.enterApartment(data.emptyPassword.apartment);
    await registrationPage.enterEmail(data.emptyPassword.email);
    await registrationPage.enterPhone(data.emptyPassword.phone);
    await registrationPage.selectRole(data.emptyPassword.role);
    await registrationPage.clickCreateAccount();
    await expect(registrationPage.getCreateAccountButton()).toBeVisible();
  });

  test('should not register with mismatched passwords', async ({ registrationPage }) => {
    await registrationPage.enterName(data.mismatchedPassword.name);
    await registrationPage.enterApartment(data.mismatchedPassword.apartment);
    await registrationPage.enterEmail(data.mismatchedPassword.email);
    await registrationPage.enterPhone(data.mismatchedPassword.phone);
    await registrationPage.selectRole(data.mismatchedPassword.role);
    await registrationPage.enterPassword(data.mismatchedPassword.password);
    await registrationPage.enterConfirmPassword(data.mismatchedPassword.confirmPassword);
    await registrationPage.clickCreateAccount();
    await expect(registrationPage.getCreateAccountButton()).toBeVisible();
  });

  test('should not register with empty apartment number', async ({ registrationPage }) => {
    await registrationPage.enterName(data.emptyApartment.name);
    await registrationPage.enterEmail(data.emptyApartment.email);
    await registrationPage.enterPhone(data.emptyApartment.phone);
    await registrationPage.selectRole(data.emptyApartment.role);
    await registrationPage.enterPassword(data.emptyApartment.password);
    await registrationPage.enterConfirmPassword(data.emptyApartment.password);
    await registrationPage.clickCreateAccount();
    await expect(registrationPage.getCreateAccountButton()).toBeVisible();
  });

  test('should not register with weak password', async ({ registrationPage }) => {
    await registrationPage.enterName(data.weakPassword.name);
    await registrationPage.enterApartment(data.weakPassword.apartment);
    await registrationPage.enterEmail(data.weakPassword.email);
    await registrationPage.enterPhone(data.weakPassword.phone);
    await registrationPage.selectRole(data.weakPassword.role);
    await registrationPage.enterPassword(data.weakPassword.password);
    await registrationPage.enterConfirmPassword(data.weakPassword.password);
    await registrationPage.clickCreateAccount();
    await expect(registrationPage.getCreateAccountButton()).toBeVisible();
  });

});
