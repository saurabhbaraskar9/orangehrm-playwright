import { Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class MyLeaveListPage extends BasePage {
  // ─── Locators ─────────────────────────────────────────────────
  private readonly pageHeader = this.page.getByRole('heading', {
    name: 'My Leave List',
  });

  private readonly fromDateInput = this.page
    .locator('.oxd-input-group')
    .filter({ has: this.page.locator('label', { hasText: 'From Date' }) })
    .locator('input');

  private readonly toDateInput = this.page
    .locator('.oxd-input-group')
    .filter({ has: this.page.locator('label', { hasText: 'To Date' }) })
    .locator('input');

  private readonly statusDropdown = this.page
    .locator('.oxd-input-group')
    .filter({
      has: this.page.locator('label', { hasText: 'Show Leave with Status' }),
    })
    .locator('.oxd-select-text');

  private readonly leaveTypeDropdown = this.page
    .locator('.oxd-input-group')
    .filter({ has: this.page.locator('label', { hasText: 'Leave Type' }) })
    .locator('.oxd-select-text');

  private readonly searchButton = this.page.getByRole('button', {
    name: 'Search',
  });

  private readonly resetButton = this.page.getByRole('button', {
    name: 'Reset',
  });

  private readonly noRecordsFound = this.page
    .locator('.oxd-table-body')
    .getByText('No Records Found');

  constructor(page: Page) {
    super(page);
  }

  // ─── Actions ──────────────────────────────────────────────────

  async goto(): Promise<void> {
    await this.navigate('/web/index.php/leave/viewMyLeaveList');
    await this.waitForVisible(this.pageHeader);
    this.logger.info('My Leave List page loaded');
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

  async getFromDateValue(): Promise<string> {
    return this.getInputValue(this.fromDateInput);
  }

  async getToDateValue(): Promise<string> {
    return this.getInputValue(this.toDateInput);
  }

  // ─── Assertions ───────────────────────────────────────────────

  async assertPageLoaded(): Promise<void> {
    await this.assertVisible(this.pageHeader);
    await this.assertVisible(this.searchButton);
  }

  async assertDefaultDatesPrePopulated(): Promise<void> {
    const fromDate = await this.getFromDateValue();
    const toDate = await this.getToDateValue();
    if (!fromDate || !toDate) {
      throw new Error('Default dates are not pre-populated');
    }
    this.logger.info(`Default dates: ${fromDate} to ${toDate}`);
  }

  async assertNoRecordsFound(): Promise<void> {
    await this.assertVisible(this.noRecordsFound);
  }
}