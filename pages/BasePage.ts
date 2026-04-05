import { Page, Locator, expect, FrameLocator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // --------------- Navigation ---------------

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async reloadPage(): Promise<void> {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }

  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  async goForward(): Promise<void> {
    await this.page.goForward();
  }

  getCurrentUrl(): string {
    return this.page.url();
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  // --------------- Click Actions ---------------

  async click(locator: string): Promise<void> {
    await this.page.locator(locator).click();
  }

  async doubleClick(locator: string): Promise<void> {
    await this.page.locator(locator).dblclick();
  }

  async rightClick(locator: string): Promise<void> {
    await this.page.locator(locator).click({ button: 'right' });
  }

  async forceClick(locator: string): Promise<void> {
    await this.page.locator(locator).click({ force: true });
  }

  async clickAndWaitForNavigation(locator: string): Promise<void> {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      this.page.locator(locator).click(),
    ]);
  }

  async clickByText(text: string): Promise<void> {
    await this.page.getByText(text, { exact: true }).click();
  }

  async clickByRole(role: Parameters<Page['getByRole']>[0], options?: Parameters<Page['getByRole']>[1]): Promise<void> {
    await this.page.getByRole(role, options).click();
  }

  // --------------- Input / Type ---------------

  async fill(locator: string, text: string): Promise<void> {
    await this.page.locator(locator).fill(text);
  }

  async clearAndFill(locator: string, text: string): Promise<void> {
    await this.page.locator(locator).clear();
    await this.page.locator(locator).fill(text);
  }

  async type(locator: string, text: string, delay = 50): Promise<void> {
    await this.page.locator(locator).pressSequentially(text, { delay });
  }

  async clearInput(locator: string): Promise<void> {
    await this.page.locator(locator).clear();
  }

  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  async pressKeyOnElement(locator: string, key: string): Promise<void> {
    await this.page.locator(locator).press(key);
  }

  // --------------- Mouse Actions ---------------

  async hover(locator: string): Promise<void> {
    await this.page.locator(locator).hover();
  }

  async mouseOver(locator: string): Promise<void> {
    await this.page.locator(locator).hover();
  }

  async dragAndDrop(source: string, target: string): Promise<void> {
    await this.page.locator(source).dragTo(this.page.locator(target));
  }

  async scrollToElement(locator: string): Promise<void> {
    await this.page.locator(locator).scrollIntoViewIfNeeded();
  }

  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  // --------------- Dropdown / Select ---------------

  async selectByValue(locator: string, value: string): Promise<void> {
    await this.page.locator(locator).selectOption({ value });
  }

  async selectByLabel(locator: string, label: string): Promise<void> {
    await this.page.locator(locator).selectOption({ label });
  }

  async selectByIndex(locator: string, index: number): Promise<void> {
    await this.page.locator(locator).selectOption({ index });
  }

  async selectMultipleValues(locator: string, values: string[]): Promise<void> {
    await this.page.locator(locator).selectOption(values);
  }

  // --------------- Checkbox / Radio ---------------

  async check(locator: string): Promise<void> {
    await this.page.locator(locator).check();
  }

  async uncheck(locator: string): Promise<void> {
    await this.page.locator(locator).uncheck();
  }

  async setChecked(locator: string, checked: boolean): Promise<void> {
    await this.page.locator(locator).setChecked(checked);
  }

  async isChecked(locator: string): Promise<boolean> {
    return await this.page.locator(locator).isChecked();
  }

  // --------------- Get Element State ---------------

  async isVisible(locator: string): Promise<boolean> {
    return await this.page.locator(locator).isVisible();
  }

  async isEnabled(locator: string): Promise<boolean> {
    return await this.page.locator(locator).isEnabled();
  }

  async isDisabled(locator: string): Promise<boolean> {
    return await this.page.locator(locator).isDisabled();
  }

  async isHidden(locator: string): Promise<boolean> {
    return await this.page.locator(locator).isHidden();
  }

  async isEditable(locator: string): Promise<boolean> {
    return await this.page.locator(locator).isEditable();
  }

  // --------------- Get Element Data ---------------

  async getText(locator: string): Promise<string> {
    return (await this.page.locator(locator).textContent()) ?? '';
  }

  async getInnerText(locator: string): Promise<string> {
    return await this.page.locator(locator).innerText();
  }

  async getInputValue(locator: string): Promise<string> {
    return await this.page.locator(locator).inputValue();
  }

  async getAttribute(locator: string, attribute: string): Promise<string | null> {
    return await this.page.locator(locator).getAttribute(attribute);
  }

  async getCssValue(locator: string, property: string): Promise<string> {
    return await this.page.locator(locator).evaluate(
      (el, prop) => getComputedStyle(el).getPropertyValue(prop),
      property,
    );
  }

  async getElementCount(locator: string): Promise<number> {
    return await this.page.locator(locator).count();
  }

  async getAllTexts(locator: string): Promise<string[]> {
    return await this.page.locator(locator).allTextContents();
  }

  // --------------- Wait Actions ---------------

  async waitForElement(locator: string, state: 'visible' | 'hidden' | 'attached' | 'detached' = 'visible', timeout = 30000): Promise<void> {
    await this.page.locator(locator).waitFor({ state, timeout });
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
  }

  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForTimeout(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  async waitForUrl(url: string | RegExp): Promise<void> {
    await this.page.waitForURL(url);
  }

  async waitForResponse(urlPattern: string | RegExp): Promise<void> {
    await this.page.waitForResponse(urlPattern);
  }

  // --------------- Verification / Assertions ---------------

  async verifyElementVisible(locator: string): Promise<void> {
    await expect(this.page.locator(locator)).toBeVisible();
  }

  async verifyElementHidden(locator: string): Promise<void> {
    await expect(this.page.locator(locator)).toBeHidden();
  }

  async verifyElementEnabled(locator: string): Promise<void> {
    await expect(this.page.locator(locator)).toBeEnabled();
  }

  async verifyElementDisabled(locator: string): Promise<void> {
    await expect(this.page.locator(locator)).toBeDisabled();
  }

  async verifyText(locator: string, expectedText: string): Promise<void> {
    await expect(this.page.locator(locator)).toHaveText(expectedText);
  }

  async verifyContainsText(locator: string, text: string): Promise<void> {
    await expect(this.page.locator(locator)).toContainText(text);
  }

  async verifyInputValue(locator: string, value: string): Promise<void> {
    await expect(this.page.locator(locator)).toHaveValue(value);
  }

  async verifyAttribute(locator: string, attribute: string, value: string | RegExp): Promise<void> {
    await expect(this.page.locator(locator)).toHaveAttribute(attribute, value);
  }

  async verifyChecked(locator: string): Promise<void> {
    await expect(this.page.locator(locator)).toBeChecked();
  }

  async verifyNotChecked(locator: string): Promise<void> {
    await expect(this.page.locator(locator)).not.toBeChecked();
  }

  async verifyElementCount(locator: string, count: number): Promise<void> {
    await expect(this.page.locator(locator)).toHaveCount(count);
  }

  async verifyPageTitle(title: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }

  async verifyPageUrl(url: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(url);
  }

  async verifyCssProperty(locator: string, property: string, value: string): Promise<void> {
    await expect(this.page.locator(locator)).toHaveCSS(property, value);
  }

  // --------------- Frames ---------------

  getFrame(frameLocator: string): FrameLocator {
    return this.page.frameLocator(frameLocator);
  }

  async clickInFrame(frameLocator: string, elementLocator: string): Promise<void> {
    await this.page.frameLocator(frameLocator).locator(elementLocator).click();
  }

  async fillInFrame(frameLocator: string, elementLocator: string, text: string): Promise<void> {
    await this.page.frameLocator(frameLocator).locator(elementLocator).fill(text);
  }

  // --------------- Alerts / Dialogs ---------------

  async acceptDialog(handler?: (message: string) => void): Promise<void> {
    this.page.on('dialog', async (dialog) => {
      handler?.(dialog.message());
      await dialog.accept();
    });
  }

  async dismissDialog(): Promise<void> {
    this.page.on('dialog', async (dialog) => {
      await dialog.dismiss();
    });
  }

  async acceptDialogWithInput(inputText: string): Promise<void> {
    this.page.on('dialog', async (dialog) => {
      await dialog.accept(inputText);
    });
  }

  // --------------- File Upload ---------------

  async uploadFile(locator: string, filePath: string): Promise<void> {
    await this.page.locator(locator).setInputFiles(filePath);
  }

  async uploadMultipleFiles(locator: string, filePaths: string[]): Promise<void> {
    await this.page.locator(locator).setInputFiles(filePaths);
  }

  async clearFileInput(locator: string): Promise<void> {
    await this.page.locator(locator).setInputFiles([]);
  }

  // --------------- Tabs / Windows ---------------

  async openNewTab(url: string): Promise<Page> {
    const newPage = await this.page.context().newPage();
    await newPage.goto(url);
    return newPage;
  }

  async switchToNewTab(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  async closeCurrentPage(): Promise<void> {
    await this.page.close();
  }

  async getPageCount(): Promise<number> {
    return this.page.context().pages().length;
  }

  // --------------- Screenshots ---------------

  async takeScreenshot(path: string): Promise<void> {
    await this.page.screenshot({ path, fullPage: true });
  }

  async takeElementScreenshot(locator: string, path: string): Promise<void> {
    await this.page.locator(locator).screenshot({ path });
  }

  // --------------- JavaScript Execution ---------------

  async executeScript<T>(script: string, arg?: unknown): Promise<T> {
    return await this.page.evaluate<T>(script, arg);
  }

  // --------------- Cookies & Storage ---------------

  async getCookies(): Promise<ReturnType<Page['context']> extends { cookies: () => infer R } ? Awaited<R> : never> {
    return await this.page.context().cookies() as any;
  }

  async clearCookies(): Promise<void> {
    await this.page.context().clearCookies();
  }

  async getLocalStorageItem(key: string): Promise<string | null> {
    return await this.page.evaluate((k) => localStorage.getItem(k), key);
  }

  async setLocalStorageItem(key: string, value: string): Promise<void> {
    await this.page.evaluate(({ k, v }) => localStorage.setItem(k, v), { k: key, v: value });
  }

  async clearLocalStorage(): Promise<void> {
    await this.page.evaluate(() => localStorage.clear());
  }

  // --------------- Focus & Blur ---------------

  async focus(locator: string): Promise<void> {
    await this.page.locator(locator).focus();
  }

  async blur(locator: string): Promise<void> {
    await this.page.locator(locator).blur();
  }

  // --------------- Locator Helpers ---------------

  getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  getByText(text: string, options?: { exact?: boolean }): Locator {
    return this.page.getByText(text, options);
  }

  getByRole(role: Parameters<Page['getByRole']>[0], options?: Parameters<Page['getByRole']>[1]): Locator {
    return this.page.getByRole(role, options);
  }

  getByLabel(label: string, options?: { exact?: boolean }): Locator {
    return this.page.getByLabel(label, options);
  }

  getByPlaceholder(placeholder: string, options?: { exact?: boolean }): Locator {
    return this.page.getByPlaceholder(placeholder, options);
  }

  getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }
}
