import { test as setup, expect } from '@playwright/test';
import { ENV } from '../../config/environments';
import path from 'path';

// This file runs ONCE before all tests
// It logs in and saves the browser session to .auth/user.json
// All other tests reuse this session — no repeated logins

export const authFile = path.join(__dirname, '../../.auth/user.json');

setup('authenticate as admin', async ({ page }) => {
  console.log('Setting up authentication...');

  // Go to login page
  await page.goto(`${ENV.baseUrl}/web/index.php/auth/login`);

  // Wait for login form
  await page.locator('.orangehrm-login-logo').waitFor({ state: 'visible' });

  // Fill credentials
  await page.locator('[name="username"]').fill(ENV.adminUsername);
  await page.locator('[name="password"]').fill(ENV.adminPassword);

  // Click login
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for dashboard to confirm login success
  await expect(
    page.getByRole('heading', { name: 'Dashboard' }),
  ).toBeVisible({ timeout: 15000 });

  console.log('Authentication is successful. Saving session....');

  // Save session state to .auth/user.json
  await page.context().storageState({ path: authFile });
});