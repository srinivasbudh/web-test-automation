import { BasePage } from './basePage';
import { expect } from '@playwright/test';
import colors from 'colors';

export class UserPage extends BasePage {
  
  // Locator functions for user page 
  userMenu = () => this.page.locator('.user');
  logoutButton = () => this.page.locator('#logout');
  headerMenu = () => this.page.locator('.menu');

  async isHeaderMenuVisible(): Promise<boolean> {
    return this.headerMenu().isVisible();
  }

  async isUserPageVisible(): Promise<boolean> {
    return this.userMenu().isVisible();
  }

  // Retrieves the logged-in user from local storage
  async getLoggedInUser(): Promise<string | null> {
    const logged = await this.page.evaluate(() => {
      return localStorage.getItem('logged');
    });

    if (logged) {
      console.log(`User is logged as: ${colors.blue(logged)}`);
    }
    
    return logged;
  }


  // Sets the logged-in user in local storage
  async setLocalStorage(email: string): Promise<void> {
    await this.page.evaluate((email) => {
      localStorage.setItem('logged', email);
    }, email);
  }

  // Deletes the logged-in user from local storage
  async deleteLocalStorage(): Promise<void> {
    await this.page.evaluate(() => {
      localStorage.removeItem('logged');
    });
  }

  // Logs out the user by clicking the user menu and logout button
  async logout(): Promise<void> {
    await this.clickElement(this.userMenu);
    await this.clickElement(this.logoutButton);
  }

  //verify logged-in user name matches in local storage
  async verifyUserIsLoggedIn(email: string): Promise<void> {
    const loggedInUser = await this.getLoggedInUser();
    const logMessage = `${colors.blue('Logged in user is expected to be ')}${colors.green(email)}${colors.blue(' but the user logged-in is')}${loggedInUser}`;
    expect(loggedInUser, logMessage).toBe(email);
  }
}
