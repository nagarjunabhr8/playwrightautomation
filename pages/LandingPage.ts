import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../environments/SIT.env') });

export class LandingPage extends BasePage {
  private readonly baseUrl: string;

  constructor(page: Page) {
    super(page);
    this.baseUrl = process.env.BASE_URL || '';
  }

  async launchApplication(): Promise<void> {
    await this.navigateTo(this.baseUrl);
    await this.waitForPageLoad();
  }
}
