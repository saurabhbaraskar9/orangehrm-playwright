import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { UserCredentials } from '../types';

export class LoginPage extends BasePage {
  // ─── Locators ─────────────────────────────────────────────────
  private readonly usernameInput = this.page.locator('[name="username"]');
  private readonly passwordInput = this.page.locator('[name="password"]');
  private readonly loginButton = this.page.getByRole('button', { name: 'Login' });
  private readonly errorAlert = this.page.locator('.oxd-alert-content-text');
  private readonly orangeHrmLogo = this.page.locator('.orangehrm-login-logo');
  private readonly forgotPasswordLink = this.page.getByText('Forgot your password?');

  // Field-level validation errors (shown when field is empty)
  private readonly usernameRequiredError = this.page
    .locator('[name="username"]')
    .locator('xpath=../../..')
    .locator('.oxd-input-field-error-message');
  private readonly passwordRequiredError = this.page
    .locator('[name="password"]')
    .locator('xpath=../../..')
    .locator('.oxd-input-field-error-message');

  constructor(page: Page) {
    super(page);
  }

  // ─── Actions ──────────────────────────────────────────────────

  async goto(): Promise<void> {
    await this.navigate('/web/index.php/auth/login');
    await this.waitForVisible(this.orangeHrmLogo);
    this.logger.info('Login page loaded');
  }

  async login(username: string, password: string): Promise<void> {
    this.logger.info(`Attempting login as: ${username}`);
    await this.fillField(this.usernameInput, username);
    await this.fillField(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }

  async loginWithCredentials(credentials: UserCredentials): Promise<void> {
    await this.login(credentials.username, credentials.password);
  }

  async clickForgotPassword(): Promise<void> {
    await this.clickElement(this.forgotPasswordLink);
    await this.waitForPageLoad();
  }

  // ─── Getters ──────────────────────────────────────────────────

  async getErrorMessage(): Promise<string> {
    await this.waitForVisible(this.errorAlert);
    return this.getTextContent(this.errorAlert);
  }

  // ─── Assertions ───────────────────────────────────────────────

  async assertLoginPageVisible(): Promise<void> {
    await this.assertVisible(this.orangeHrmLogo);
    await this.assertVisible(this.loginButton);
  }

  async assertErrorMessageVisible(): Promise<void> {
    await this.assertVisible(this.errorAlert);
  }

  async assertUsernameRequiredError(): Promise<void> {
    await this.assertVisible(this.usernameRequiredError);
    await this.assertContainsText(this.usernameRequiredError, 'Required');
  }

  async assertPasswordRequiredError(): Promise<void> {
    await this.assertVisible(this.passwordRequiredError);
    await this.assertContainsText(this.passwordRequiredError, 'Required');
  }
}