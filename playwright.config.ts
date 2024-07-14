import { defineConfig, devices } from '@playwright/test';
import { OrtoniReportConfig } from "ortoni-report";

let reportConfig: OrtoniReportConfig = {
  projectName: "web-automation-admin",
  testType: "Regression",
  authorName: "Srinivas Budha",
  preferredTheme: "dark"
};

const DEFAULT_WORKERS = 4;
const DEFAULT_RETRIES = 0;
const DEFAULT_BROWSER = 'chromium'; 

const CI_WORKERS = process.env.CI_WORKERS ? parseInt(process.env.CI_WORKERS, 10) : DEFAULT_WORKERS;
const CI_RETRIES = process.env.CI_RETRIES ? parseInt(process.env.CI_RETRIES, 10) : DEFAULT_RETRIES;
const CI_BROWSER = process.env.CI_BROWSER || DEFAULT_BROWSER;

function getDeviceConfig(browser: string) {
  switch (browser) {
    case 'chromium':
      return devices['Desktop Chrome'];
    case 'firefox':
      return devices['Desktop Firefox'];
    case 'webkit':
      return devices['Desktop Safari'];
    default:
      throw new Error(`Unsupported browser: ${browser}`);
  }
}

export default defineConfig({
  testDir: './playwright/tests/',
  fullyParallel: true,
  retries: CI_RETRIES,
  workers: CI_WORKERS,
  reporter: [["ortoni-report", reportConfig], ["html"],["github"]],
  use: {
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off'
  },
  projects: [
    {
      name: CI_BROWSER,
      use: { ...getDeviceConfig(CI_BROWSER) },
    },
  ],
});
