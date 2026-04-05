import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CreateEventPage extends BasePage {
  // --------------- Locators ---------------

  readonly eventTitleInput: Locator;
  readonly dateTimeInput: Locator;
  readonly locationInput: Locator;
  readonly descriptionInput: Locator;
  readonly organiserInput: Locator;
  readonly festivalReferenceLinkInput: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.eventTitleInput = page.getByLabel('Event Title');
    this.dateTimeInput = page.getByLabel('Date & Time');
    this.locationInput = page.getByLabel('Location');
    this.descriptionInput = page.getByLabel('Description');
    this.organiserInput = page.getByLabel('Organiser / Who is initiating');
    this.festivalReferenceLinkInput = page.getByLabel('Festival Reference Link');
    this.closeButton = page.locator('button:has-text("×"), button:has-text("✕"), [aria-label="Close"]');
  }

  // --------------- Getter Methods ---------------

  getEventTitleInput(): Locator {
    return this.eventTitleInput;
  }

  getDateTimeInput(): Locator {
    return this.dateTimeInput;
  }

  getLocationInput(): Locator {
    return this.locationInput;
  }

  getDescriptionInput(): Locator {
    return this.descriptionInput;
  }

  getOrganiserInput(): Locator {
    return this.organiserInput;
  }

  getFestivalReferenceLinkInput(): Locator {
    return this.festivalReferenceLinkInput;
  }

  // --------------- Action Methods ---------------

  async enterEventTitle(title: string): Promise<void> {
    await this.eventTitleInput.click();
    for (const char of title) {
      await this.eventTitleInput.pressSequentially(char);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(100);
    }
  }

  async enterDateTime(dateTime: string): Promise<void> {
    await this.dateTimeInput.click();
    await this.dateTimeInput.fill(dateTime);
  }

  async enterLocation(location: string): Promise<void> {
    await this.locationInput.click();
    await this.locationInput.fill(location);
  }

  async enterDescription(description: string): Promise<void> {
    await this.descriptionInput.click();
    await this.descriptionInput.fill(description);
  }

  async enterOrganiser(organiser: string): Promise<void> {
    await this.organiserInput.click();
    await this.organiserInput.fill(organiser);
  }

  async enterFestivalReferenceLink(link: string): Promise<void> {
    await this.festivalReferenceLinkInput.click();
    await this.festivalReferenceLinkInput.fill(link);
  }

  async closeDialog(): Promise<void> {
    await this.closeButton.click();
  }

  async createEvent(
    title: string,
    dateTime: string,
    location: string,
    description: string,
    organiser: string,
    festivalLink?: string,
  ): Promise<void> {
    await this.enterEventTitle(title);
    await this.enterDateTime(dateTime);
    await this.enterLocation(location);
    await this.enterDescription(description);
    await this.enterOrganiser(organiser);
    if (festivalLink) {
      await this.enterFestivalReferenceLink(festivalLink);
    }
  }
}
