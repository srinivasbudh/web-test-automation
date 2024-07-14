import { Page } from 'playwright';
import { Locator, expect } from '@playwright/test';
import * as path from 'path';
import colors from 'colors';

// BasePage class encapsulates common page interactions for Playwright
export class BasePage {
  protected page: Page;

  // Constructor to initialize the page instance
  constructor(page: Page) {
    this.page = page;
  }

  // Navigates to the home page by opening the local index.html file
  async navigateToHomePage() {
    const filePath = path.resolve(__dirname, '../../index.html');
    await this.page.goto(`file://${filePath}`, { waitUntil: 'networkidle' });
  }

  // Clicks on an element when its visible using locator function
  async clickElement(locatorFunction: () => Locator) {
    const element = locatorFunction();
    await element.waitFor({ state: 'visible' });
    await element.click();
  }

  // Enters text into an element when its visible using locator function
  async enterText(locatorFunction: () => Locator, text: string) {
    const element = locatorFunction();
    await element.waitFor({ state: 'visible' });
    await element.fill(text);
  }

  // Gets the inner text of an element using locator function
  private getLocatorText = async (locatorFunction: () => Locator): Promise<string> => {
    const element = locatorFunction();
    return await element.innerText();
  };

  // Checks if an element using locator function contains the expected text
  private doesLocatorContainText = async (locatorFunction: () => Locator, expectedValue: string): Promise<boolean> => {
    const element = locatorFunction();
    const texts = await element.allInnerTexts();
    return texts.some(text => text.includes(expectedValue));
  };

  // Verifies that an element located by a locator function has the expected text
  async verifyElementHasText(expectedValue: string, locatorFunction: () => Locator): Promise<void> {
    const locator = locatorFunction();
    const elements = await locator.elementHandles();
    const logMessage = `${colors.blue('Get text from locator ')}${colors.green(locator.toString())}${colors.blue(' does not have the value ')}${colors.green(expectedValue)}`;

    if (elements.length === 1) {
      const actualText = await this.getLocatorText(locatorFunction);
      expect(actualText, logMessage).toMatch(expectedValue);
    } else {
      const containsText = await this.doesLocatorContainText(locatorFunction, expectedValue);
      expect(containsText, logMessage).toBe(true);
    }
  }
}
