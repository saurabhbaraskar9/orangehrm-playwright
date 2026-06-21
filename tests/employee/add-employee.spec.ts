import { test, expect } from '../../src/fixtures';
import { DataFactory } from '../../src/utils/data-factory';

test.describe('Employee Management - Add Employee', () => {
  test.beforeEach(async ({ employeeListPage }) => {
    await employeeListPage.goto();
    await employeeListPage.assertEmployeeListLoaded();
  });

  test('EMP_TC001 - should navigate to Add Employee page', async ({
    employeeListPage,
    addEmployeePage,
    page,
  }) => {
    await employeeListPage.clickAddEmployee();
    await addEmployeePage.assertAddEmployeePageLoaded();
    await expect(page).toHaveURL(/.*addEmployee.*/);
  });

  test('EMP_TC002 - should add a new employee with required fields', async ({
    employeeListPage,
    addEmployeePage,
  }) => {
    const employee = DataFactory.generateEmployee();

    await employeeListPage.clickAddEmployee();
    const empId = await addEmployeePage.addEmployee(employee);

    expect(empId).toBeTruthy();
    console.log(`✅ Employee created with ID: ${empId}`);
  });

  test('EMP_TC003 - should add employee with all name fields including middle name', async ({
    employeeListPage,
    addEmployeePage,
  }) => {
    const employee = DataFactory.generateEmployee();

    await employeeListPage.clickAddEmployee();
    await addEmployeePage.waitForAddEmployeePage();
    await addEmployeePage.fillEmployeeDetails(employee);
    await addEmployeePage.saveEmployee();
    await addEmployeePage.assertSaveSuccessful();
  });

  test('EMP_TC004 - should auto generate employee ID on page load', async ({
    employeeListPage,
    addEmployeePage,
  }) => {
    await employeeListPage.clickAddEmployee();
    await addEmployeePage.waitForAddEmployeePage();

    const empId = await addEmployeePage.getEmployeeId();
    expect(empId).toBeTruthy();
    expect(empId.length).toBeGreaterThan(0);
  });

  test('EMP_TC005 - should cancel adding employee and return to list', async ({
    employeeListPage,
    addEmployeePage,
    page,
  }) => {
    await employeeListPage.clickAddEmployee();
    await addEmployeePage.waitForAddEmployeePage();
    await addEmployeePage.clickCancel();
    await expect(page).toHaveURL(/.*viewEmployeeList.*/);
  });
});

test.describe('Employee Management - Search Employee', () => {
  test.beforeEach(async ({ employeeListPage }) => {
    await employeeListPage.goto();
  });

  test('EMP_TC006 - should search and find a newly created employee', async ({
    employeeListPage,
    addEmployeePage,
  }) => {
    // Arrange: create a known employee first (self-contained test data)
    const employee = DataFactory.generateEmployee();
    await employeeListPage.clickAddEmployee();
    await addEmployeePage.addEmployee(employee);

    // Act: search for that exact employee we just created
    await employeeListPage.goto();
    await employeeListPage.searchByEmployeeName(employee.firstName);

    // Assert: the created employee is found
    const count = await employeeListPage.getEmployeeRowCount();
    expect(count).toBeGreaterThan(0);
    await employeeListPage.assertEmployeeExists(employee.firstName);
  });

  // TODO: Revisit - "No Records Found" locator intermittently not found.
  // Possible causes: demo server lag under search, or scoping issue with
  // .oxd-table-body wrapper when table renders empty state differently.
  // Needs deeper DOM investigation via codegen. Tracked for next session.
  test.fixme(
    'EMP_TC007 - should show no records for non-existent employee',
    async ({ employeeListPage }) => {
      await employeeListPage.searchByEmployeeName('XYZNONEXISTENT123');
      await employeeListPage.assertNoRecordsFound();
    },
  );

  // TODO: Revisit - depends on EMP_TC007's "No Records Found" locator fix.
  // Same root cause as EMP_TC007. Tracked for next session.
  test.fixme(
    'EMP_TC008 - should reset search and show all employees',
    async ({ employeeListPage }) => {
      await employeeListPage.searchByEmployeeName('XYZNONEXISTENT123');
      await employeeListPage.assertNoRecordsFound();

      await employeeListPage.resetSearch();
      const count = await employeeListPage.getEmployeeRowCount();
      expect(count).toBeGreaterThan(0);
    },
  );
});
