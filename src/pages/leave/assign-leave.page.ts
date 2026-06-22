import { Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class AssignLeavePage extends BasePage {
  // ─── Locators ─────────────────────────────────────────────────
  private readonly pageHeader = this.page.getByRole('heading', {
    name: 'Assign Leave',
  });

  private readonly employeeNameInput = this.page
    .locator('.oxd-input-group')
    .filter({ has: this.page.locator('label', { hasText: 'Employee Name' }) })
    .locator('input');

  private readonly leaveTypeDropdown = this.page
    .locator('.oxd-input-group')
    .filter({ has: this.page.locator('label', { hasText: 'Leave Type' }) })
    .locator('.oxd-select-text');

  private readonly leaveBalance = this.page
    .locator('.oxd-input-group')
    .filter({ has: this.page.locator('label', { hasText: 'Leave Balance' }) })
    .locator('.oxd-text');

  private readonly fromDateInput = this.page
    .locator('.oxd-input-group')
    .filter({ has: this.page.locator('label', { hasText: 'From Date' }) })
    .locator('input');

  private readonly toDateInput = this.page
    .locator('.oxd-input-group')
    .filter({ has: this.page.locator('label', { hasText: 'To Date' }) })
    .locator('input');

  private readonly commentsInput = this.page
    .locator('.oxd-input-group')
    .filter({ has: this.page.locator('label', { hasText: 'Comments' }) })
    .locator('textarea');

  private readonly assignButton = this.page.getByRole('button', {
    name: 'Assign',
  });

  private readonly fieldErrorMessages = this.page.locator(
    '.oxd-input-field-error-message',
  );

  private readonly successToast = this.page.locator('.oxd-toast--success');

  constructor(page: Page) {
    super(page);
  }

  // ─── Actions ──────────────────────────────────────────────────

  async goto(): Promise<void> {
    await this.navigate('/web/index.php/leave/assignLeave');
    await this.waitForVisible(this.pageHeader);
    this.logger.info('Assign Leave page loaded');
  }

  async fillEmployeeName(name: string): Promise<void> {
    this.logger.info(`Filling employee name: ${name}`);
    await this.fillField(this.employeeNameInput, name);
    await this.page.waitForTimeout(500);
    const firstOption = this.page.getByRole('option').first();
    if (await firstOption.isVisible()) {
      await firstOption.click();
    }
  }

  async selectLeaveType(leaveType: string): Promise<void> {
    this.logger.info(`Selecting leave type: ${leaveType}`);
    await this.clickElement(this.leaveTypeDropdown);
    await this.page
      .getByRole('option', { name: leaveType })
      .first()
      .click();
  }

  async fillFromDate(date: string): Promise<void> {
    await this.fillField(this.fromDateInput, date);
    await this.page.keyboard.press('Escape');
  }

  async fillToDate(date: string): Promise<void> {
    await this.fillField(this.toDateInput, date);
    await this.page.keyboard.press('Escape');
  }

  async fillComments(comments: string): Promise<void> {
    await this.fillField(this.commentsInput, comments);
  }

  async clickAssign(): Promise<void> {
    await this.clickElement(this.assignButton);
  }

  // ─── Getters ──────────────────────────────────────────────────

  async getFieldErrorCount(): Promise<number> {
    return this.fieldErrorMessages.count();
  }

  async getLeaveBalance(): Promise<string> {
    return this.getTextContent(this.leaveBalance);
  }

  // ─── Assertions ───────────────────────────────────────────────

  async assertPageLoaded(): Promise<void> {
    await this.assertVisible(this.pageHeader);
    await this.assertVisible(this.assignButton);
  }

  async assertValidationErrorsVisible(): Promise<void> {
    await this.assertVisible(this.fieldErrorMessages.first());
  }

  async assertFieldErrorCount(expectedCount: number): Promise<void> {
    const count = await this.getFieldErrorCount();
    if (count !== expectedCount) {
      throw new Error(
        `Expected ${expectedCount} field errors but got ${count}`,
      );
    }
  }

  async assertSuccessToastVisible(): Promise<void> {
    await this.waitForVisible(this.successToast);
    this.logger.success('Leave assigned successfully');
  }
}