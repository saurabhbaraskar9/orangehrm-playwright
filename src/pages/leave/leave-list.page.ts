import { Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class LeaveListPage extends BasePage {
  // ─── Locators ─────────────────────────────────────────────────
  private readonly pageHeader = this.page.getByRole('heading', {
    name: 'Leave List',
  });

  private readonly fromDateInput = this.page
    .locator('.oxd-input-group')
    .filter({ has: this.page.locator('label', { hasText: 'From Date' }) })
    .locator('input');

  private readonly toDateInput = this.page
    .locator('.oxd-input-group')
    .filter({ has: this.page.locator('label', { hasText: 'To Date' }) })
    .locator('input');

  private readonly searchButton = this.page.getByRole('button', {
    name: 'Search',
  });

  private readonly resetButton = this.page.getByRole('button', {
    name: 'Reset',
  });

  private readonly employeeNameInput = this.page
    .locator('.oxd-input-group')
    .filter({ has: this.page.locator('label', { hasText: 'Employee Name' }) })
    .locator('input');

  private readonly subUnitDropdown = this.page
    .locator('.oxd-input-group')
    .filter({ has: this.page.locator('label', { hasText: 'Sub Unit' }) })
    .locator('.oxd-select-text');

  private readonly tableRows = this.page.locator(
    '.oxd-table-body .oxd-table-row--clickable',
  );

  constructor(page: Page) {
    super(page);
  }

  // ─── Actions ──────────────────────────────────────────────────

  async goto(): Promise<void> {
    await this.navigate('/web/index.php/leave/viewLeaveList');
    await this.waitForVisible(this.pageHeader);
    this.logger.info('Leave List page loaded');
  }

  async clickSearch(): Promise<void> {
    await this.clickElement(this.searchButton);
    await this.waitForPageLoad();
  }

  async clickReset(): Promise<void> {
    await this.clickElement(this.resetButton);
    await this.waitForPageLoad();
  }

  // ─── Getters ──────────────────────────────────────────────────

  async getRowCount(): Promise<number> {
    return this.tableRows.count();
  }

  async getFromDateValue(): Promise<string> {
    return this.getInputValue(this.fromDateInput);
  }

  // ─── Assertions ───────────────────────────────────────────────

  async assertPageLoaded(): Promise<void> {
    await this.assertVisible(this.pageHeader);
    await this.assertVisible(this.searchButton);
  }

  async assertSearchFieldsVisible(): Promise<void> {
    await this.assertVisible(this.fromDateInput);
    await this.assertVisible(this.toDateInput);
    await this.assertVisible(this.employeeNameInput);
    await this.assertVisible(this.subUnitDropdown);
  }
}