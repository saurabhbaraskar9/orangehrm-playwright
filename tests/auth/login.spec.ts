import { test, expect } from '../../src/fixtures';
import { ENV } from '../../config/environments';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login Module', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('AUTH_TC001 - should login successfully with valid credentials', async ({
    loginPage,
    dashboardPage,
  }) => {
    await loginPage.login(ENV.adminUsername, ENV.adminPassword);
    await dashboardPage.assertDashboardLoaded();
  });

  test('AUTH_TC002 - should show error for invalid username', async ({
    loginPage,
  }) => {
    await loginPage.login('invalidUser', ENV.adminPassword);
    await loginPage.assertErrorMessageVisible();
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Invalid credentials');
  });

  test('AUTH_TC003 - should show error for invalid password', async ({
    loginPage,
  }) => {
    await loginPage.login(ENV.adminUsername, 'wrongPassword');
    await loginPage.assertErrorMessageVisible();
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Invalid credentials');
  });

  test('AUTH_TC004 - should show error for both fields invalid', async ({
    loginPage,
  }) => {
    await loginPage.login('wrongUser', 'wrongPassword');
    await loginPage.assertErrorMessageVisible();
  });

  // Empty fields show FIELD-LEVEL validation, not the alert banner
  test('AUTH_TC005 - should show required error for empty username', async ({
    loginPage,
  }) => {
    await loginPage.login('', ENV.adminPassword);
    await loginPage.assertUsernameRequiredError();
  });

  test('AUTH_TC006 - should show required error for empty password', async ({
    loginPage,
  }) => {
    await loginPage.login(ENV.adminUsername, '');
    await loginPage.assertPasswordRequiredError();
  });

  test('AUTH_TC007 - should navigate to forgot password page', async ({
    loginPage,
    page,
  }) => {
    await loginPage.clickForgotPassword();
    await expect(page).toHaveURL(/.*requestPasswordResetCode.*/, {
      timeout: 15000,
    });
  });
});