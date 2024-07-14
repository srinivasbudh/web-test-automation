import { defineConfig, devices } from '@playwright/test';
import { OrtoniReportConfig } from "ortoni-report";

let reportConfig: OrtoniReportConfig = {
  projectName: "web-automation-admin",
  testType: "Regression",
  authorName: "Srinivas Budha",
  preferredTheme: "dark"
};

export default defineConfig({
  testDir: './playwright/tests/',
  fullyParallel: true,
  retries: 2,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["ortoni-report", reportConfig], ["html"]],
  use: {
    headless: true,
    // baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
  ]
});
