import { BasePage } from './basePage';
import { expect } from '@playwright/test';
import colors from 'colors';

export class LoginPage extends BasePage {

  // Locator functions specific to loginPage
  emailInput = () => this.page.locator('#email');
  passwordInput = () => this.page.locator('#password');
  loginButton = () => this.page.locator('.btn-login');
  
  async enterEmail(email: string) {
    await this.enterText(this.emailInput, email);
  }

  async enterPassword(password: string) {
    await this.enterText(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.clickElement(this.loginButton);
  }

  // Performs the login action
  async login(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  // Verifies if the login page is loaded by checking the visibility of the login button
  async verifyIsPageLoaded(): Promise<boolean> {
    return this.loginButton().isVisible();
  }

  async verifyUserIsNotLoggedIn(): Promise<void> {
    const userLoggedOut = await this.verifyIsPageLoaded();
    const logMessage = `${colors.blue('Expected no active user session so login page should be visible ton true')}`;
    expect(userLoggedOut, logMessage).toBe(true);
  }
}
