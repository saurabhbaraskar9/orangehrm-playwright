import { Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { EmployeeData } from '../../types';

export class AddEmployeePage extends BasePage {
  // ─── Locators ─────────────────────────────────────────────────
  private readonly firstNameInput = this.page.locator('[name="firstName"]');
  private readonly middleNameInput = this.page.locator('[name="middleName"]');
  private readonly lastNameInput = this.page.locator('[name="lastName"]');

  // FIXED: anchor to the "Employee Id" label instead of fragile class/index
  private readonly employeeIdInput = this.page
    .locator('.oxd-input-group')
    .filter({ has: this.page.locator('label', { hasText: 'Employee Id' }) })
    .locator('input');

  private readonly saveButton = this.page.getByRole('button', { name: 'Save' });
  private readonly cancelButton = this.page.getByRole('button', { name: 'Cancel' });
  private readonly successToast = this.page.locator('.oxd-toast--success');

  constructor(page: Page) {
    super(page);
  }
  
  // ─── Actions ──────────────────────────────────────────────────

  async waitForAddEmployeePage(): Promise<void> {
    await this.waitForVisible(this.firstNameInput);
    this.logger.info('Add Employee page loaded');
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.fillField(this.firstNameInput, firstName);
  }

  async fillMiddleName(middleName: string): Promise<void> {
    await this.fillField(this.middleNameInput, middleName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.fillField(this.lastNameInput, lastName);
  }

  async fillEmployeeDetails(data: EmployeeData): Promise<void> {
    this.logger.info(
      `Filling employee: ${data.firstName} ${data.middleName ?? ''} ${data.lastName}`,
    );
    await this.fillFirstName(data.firstName);
    if (data.middleName) {
      await this.fillMiddleName(data.middleName);
    }
    await this.fillLastName(data.lastName);
  }

  async clickSave(): Promise<void> {
    this.logger.info('Saving employee');
    await this.clickElement(this.saveButton);
  }

  async clickCancel(): Promise<void> {
    await this.clickElement(this.cancelButton);
    await this.waitForPageLoad();
  }

  async saveEmployee(): Promise<void> {
    await this.clickSave();
    await this.waitForVisible(this.successToast);
    this.logger.success('Employee saved successfully');
  }

  async addEmployee(data: EmployeeData): Promise<string> {
    await this.waitForAddEmployeePage();
    await this.fillEmployeeDetails(data);
    const empId = await this.getEmployeeId();
    await this.saveEmployee();
    return empId;
  }

  // ─── Getters ──────────────────────────────────────────────────

  async getEmployeeId(): Promise<string> {
    return this.getInputValue(this.employeeIdInput);
  }

  // ─── Assertions ───────────────────────────────────────────────

  async assertSaveSuccessful(): Promise<void> {
    await this.assertVisible(this.successToast);
  }

  async assertAddEmployeePageLoaded(): Promise<void> {
    await this.assertVisible(this.firstNameInput);
    await this.assertVisible(this.lastNameInput);
  }
}
