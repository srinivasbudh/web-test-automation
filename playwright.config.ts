import { defineConfig, devices } from '@playwright/test';
import { OrtoniReportConfig } from "ortoni-report";

// Configuration for Ortoni report
let reportConfig: OrtoniReportConfig = {
  projectName: "web-automation-admin",
  testType: "Regression",
  authorName: "Srinivas Budha",
  preferredTheme: "dark"
};

// Default values for local run
const DEFAULT_WORKERS = 4;
const DEFAULT_RETRIES = 2;
const DEFAULT_BROWSER = 'chromium';

// Values from environment variables for CI, falling back to defaults if not set
const CI_WORKERS = process.env.CI_WORKERS ? parseInt(process.env.CI_WORKERS, 10) : DEFAULT_WORKERS;
const CI_RETRIES = process.env.CI_RETRIES ? parseInt(process.env.CI_RETRIES, 10) : DEFAULT_RETRIES;
const CI_BROWSER = process.env.CI_BROWSER || DEFAULT_BROWSER;

// Function to get the appropriate device configuration based on the browser
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
  reporter: [["ortoni-report", reportConfig], ["html"], ["github"]],
  use: {
    headless: true,
    trace: 'on-first-retry', // Collect trace when retrying the failed test
    screenshot: 'only-on-failure', // Take screenshot only on failure
    video: 'off' // Disable video recording
  },
  projects: [
    {
      name: CI_BROWSER,
      use: { ...getDeviceConfig(CI_BROWSER) },
    },
  ],
});
