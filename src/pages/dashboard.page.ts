import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  // ─── Locators ─────────────────────────────────────────────────
  private readonly dashboardHeader = this.page.getByRole('heading', { name: 'Dashboard' });
  private readonly userDropdownTrigger = this.page.locator('.oxd-userdropdown-tab');
  private readonly logoutMenuItem = this.page.getByRole('menuitem', { name: 'Logout' });
  private readonly userDisplayName = this.page.locator('.oxd-userdropdown-name');

  constructor(page: Page) {
    super(page);
  }

  // ─── Actions ──────────────────────────────────────────────────

  async waitForDashboard(): Promise<void> {
    await this.waitForVisible(this.dashboardHeader);
    this.logger.success('Dashboard loaded successfully');
  }

  async logout(): Promise<void> {
    this.logger.info('Logging out');
    await this.clickElement(this.userDropdownTrigger);
    await this.clickElement(this.logoutMenuItem);
    await this.waitForPageLoad();
  }

  async navigateToModule(moduleName: string): Promise<void> {
    this.logger.info(`Navigating to module: ${moduleName}`);
    await this.page.getByRole('link', { name: moduleName }).first().click();
    await this.waitForPageLoad();
  }

  // ─── Getters ──────────────────────────────────────────────────

  async getLoggedInUsername(): Promise<string> {
    return this.getTextContent(this.userDisplayName);
  }

  // ─── Assertions ───────────────────────────────────────────────

  async assertDashboardLoaded(): Promise<void> {
    await this.assertVisible(this.dashboardHeader);
  }

  async assertLoggedInAs(username: string): Promise<void> {
    await this.assertContainsText(this.userDisplayName, username);
  }
}