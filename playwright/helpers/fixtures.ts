import { test as base } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { LoginPage } from '../pages/loginPage';
import { UserPage } from '../pages/userPage';

// creating a type Pages object, to manage all page objects at one place 
type Pages = {
  basePage: BasePage;
  loginPage: LoginPage;
  userPage: UserPage;
};

// Extend the base test to include the pages, injecting them into the test context and inialising at one place
export const test = base.extend<Pages>({
  
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
  
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  userPage: async ({ page }, use) => {
    await use(new UserPage(page));
  }
});
