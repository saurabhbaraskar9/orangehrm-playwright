import { Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class EmployeeListPage extends BasePage {
  // ─── Locators ─────────────────────────────────────────────────
  private readonly addEmployeeButton = this.page.getByRole('button', { name: 'Add' });
  private readonly searchButton = this.page.getByRole('button', { name: 'Search' });
  private readonly resetButton = this.page.getByRole('button', { name: 'Reset' });

  // FIXED: anchor to "Employee Name" label instead of fragile shared placeholder
  private readonly employeeNameInput = this.page
    .locator('.oxd-input-group')
    .filter({ has: this.page.locator('label', { hasText: 'Employee Name' }) })
    .locator('input');

  private readonly tableRows = this.page.locator(
    '.oxd-table-body .oxd-table-row--clickable',
  );

  // FIXED: scope to table body only, avoid matching toast messages
  private readonly noRecordsFound = this.page
    .locator('.oxd-table-body')
    .getByText('No Records Found');

  private readonly recordsCount = this.page
    .locator('.oxd-text--span')
    .filter({ hasText: 'Record' });

  constructor(page: Page) {
    super(page);
  }

  // ─── Actions ──────────────────────────────────────────────────

  async goto(): Promise<void> {
    await this.navigate('/web/index.php/pim/viewEmployeeList');
    await this.waitForVisible(this.addEmployeeButton);
    this.logger.info('Employee List page loaded');
  }

  async clickAddEmployee(): Promise<void> {
    this.logger.info('Clicking Add Employee button');
    await this.clickElement(this.addEmployeeButton);
    await this.waitForPageLoad();
  }

  async searchByEmployeeName(name: string): Promise<void> {
    this.logger.info(`Searching for employee: ${name}`);
    await this.fillField(this.employeeNameInput, name);
    // Wait for autocomplete dropdown to settle, then click search
    await this.page.waitForTimeout(500);
    await this.clickElement(this.searchButton);
    await this.waitForPageLoad();
  }

  async resetSearch(): Promise<void> {
    await this.clickElement(this.resetButton);
    await this.waitForPageLoad();
  }

  async clickEmployeeByName(name: string): Promise<void> {
    await this.page
      .locator(`.oxd-table-row--clickable:has-text("${name}")`)
      .click();
    await this.waitForPageLoad();
  }

  // ─── Getters ──────────────────────────────────────────────────

  async getEmployeeRowCount(): Promise<number> {
    return this.tableRows.count();
  }

  async getRecordsFoundText(): Promise<string> {
    return this.getTextContent(this.recordsCount);
  }

  // ─── Assertions ───────────────────────────────────────────────

  async assertEmployeeListLoaded(): Promise<void> {
    await this.assertVisible(this.addEmployeeButton);
  }

  async assertNoRecordsFound(): Promise<void> {
    await this.assertVisible(this.noRecordsFound);
  }

  async assertEmployeeExists(name: string): Promise<void> {
    await this.assertVisible(
      this.page.locator(`.oxd-table-row--clickable:has-text("${name}")`),
    );
  }
}