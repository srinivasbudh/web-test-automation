import { test } from '../helpers/fixtures';
import { expect } from '@playwright/test';
import * as userData from '../helpers/test-data/user.json';
import { LoginPage } from '../pages/loginPage';
import { UserPage } from '../pages/userPage';

test.describe('Logout Flow', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToHomePage();
  });

  test.describe('Logout using logout button', () => {
    userData.users.validUsers.forEach((user: { email: string; password: string; type: string }) => {
      test(`should logout as ${user.type} with email ${user.email}`, 
      { tag: ["@LogOut", "@Regression", "@Smoke"]},
      async ({ loginPage, userPage }) => {
        await verifyLoginUsingLocalStorage(userPage, user, loginPage);
        await userPage.logout();
        await loginPage.verifyUserIsNotLoggedIn();
      });
    });
  });

  test.describe('Logout using localStorage deletion', () => {
    userData.users.validUsers.forEach((user: { email: string; password: string; type: string }) => {
      test(`should logout as ${user.type} with email ${user.email}`, 
      { tag: ["@LogOut", "@Regression"]},
      async ({ loginPage, userPage }) => {
        await verifyLoginUsingLocalStorage(userPage, user, loginPage);
        
        await userPage.deleteLocalStorage();
        await loginPage.navigateToHomePage();
        
        await loginPage.verifyUserIsNotLoggedIn();
      });
    });
  });
});

async function verifyLoginUsingLocalStorage(
  userPage: UserPage,
  user: { email: string; password: string; type: string; },
  loginPage: LoginPage
) {
  await userPage.setLocalStorage(user.email);
  await loginPage.navigateToHomePage();
  
  await userPage.verifyElementHasText('Home', userPage.headerMenu);
  
  const contentVisible = await userPage.isHeaderMenuVisible();
  expect(contentVisible).toBe(true);
}
