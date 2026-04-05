import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, 'environments/SIT.env') });

export default defineConfig({
  // --------------- Test Directory ---------------
  testDir: './tests',

  // --------------- Parallel Execution ---------------
  fullyParallel: true,
  workers: 4,

  // --------------- Retry & Timeout ---------------
  retries: 1,
  timeout: 60000,
  expect: {
    timeout: 10000,
  },

  // --------------- Wait / Action Timeout ---------------
  use: {
    actionTimeout: 15000,
    navigationTimeout: 30000,
    baseURL: process.env.BASE_URL || '',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
  },

  // --------------- Reporter ---------------
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
  ],
  outputDir: 'test-results',

  // --------------- Browser Projects ---------------
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
});
