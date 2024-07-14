import { test } from '../helpers/fixtures';
import { expect } from '@playwright/test';
import * as userDetails from '../helpers/test-data/user.json';

test.describe('Login Flow', () => {

  test.beforeEach(async ({ loginPage, basePage }) => {
    await loginPage.navigateToHomePage();
  });

  test.describe('Valid Users', () => {
    userDetails.users.validUsers.forEach((user: { email: string; password: string; type: string }) => {
      test(`should log in as ${user.type} with email ${user.email}`, 
      { tag: ["@Login", "@Regression", "@Smoke"]},
      async ({ loginPage, userPage }) => {
        await loginPage.login(user.email, user.password);
        await userPage.verifyUserIsLoggedIn(user.email);

        const contentVisible = await userPage.isHeaderMenuVisible();
        await userPage.verifyElementHasText('Home', userPage.headerMenu);
        expect(contentVisible).toBe(true);
      });
    });
  });

  test.describe('Invalid Users', () => {
    userDetails.users.invalidUsers.forEach((user: { email: string; password: string; type: string }) => {
      test(`should fail to log in with ${user.type}`, 
      { tag: ["@Login", "@Regression"]},
      async ({ loginPage, userPage }) => {
        await loginPage.login(user.email, user.password);
        await loginPage.verifyUserIsNotLoggedIn();
      });
    });
  });

});
