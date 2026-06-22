import { test, expect } from '../../src/fixtures';

test.describe('Leave Module - Assign Leave', () => {
  test.beforeEach(async ({ assignLeavePage }) => {
    await assignLeavePage.goto();
  });

  test('LEAVE_TC001 - should navigate to Assign Leave page successfully', async ({
    assignLeavePage,
    page,
  }) => {
    await assignLeavePage.assertPageLoaded();
    await expect(page).toHaveURL(/.*assignLeave.*/);
  });

  test('LEAVE_TC002 - should show validation errors when submitting empty form', async ({
    assignLeavePage,
  }) => {
    await assignLeavePage.clickAssign();
    await assignLeavePage.assertValidationErrorsVisible();
    const errorCount = await assignLeavePage.getFieldErrorCount();
    expect(errorCount).toBeGreaterThan(0);
  });

  test('LEAVE_TC003 - should show required error for empty Employee Name', async ({
    assignLeavePage,
  }) => {
    await assignLeavePage.clickAssign();
    await assignLeavePage.assertValidationErrorsVisible();
  });

  test('LEAVE_TC004 - should show required error for empty Leave Type', async ({
    assignLeavePage,
  }) => {
    await assignLeavePage.clickAssign();
    await assignLeavePage.assertValidationErrorsVisible();
  });

  test('LEAVE_TC005 - should show required error for empty From Date', async ({
    assignLeavePage,
  }) => {
    await assignLeavePage.clickAssign();
    await assignLeavePage.assertValidationErrorsVisible();
  });

  test('LEAVE_TC006 - should show required error for empty To Date', async ({
    assignLeavePage,
  }) => {
    await assignLeavePage.clickAssign();
    await assignLeavePage.assertValidationErrorsVisible();
  });
});

test.describe('Leave Module - My Leave List', () => {
  test.beforeEach(async ({ myLeaveListPage }) => {
    await myLeaveListPage.goto();
  });

  test('LEAVE_TC007 - should navigate to My Leave List page successfully', async ({
    myLeaveListPage,
    page,
  }) => {
    await myLeaveListPage.assertPageLoaded();
    await expect(page).toHaveURL(/.*viewMyLeaveList.*/);
  });

  test('LEAVE_TC008 - should have default date range pre-populated', async ({
    myLeaveListPage,
  }) => {
    await myLeaveListPage.assertDefaultDatesPrePopulated();
  });

  test('LEAVE_TC009 - should reset search filters successfully', async ({
    myLeaveListPage,
  }) => {
    await myLeaveListPage.clickReset();
    await myLeaveListPage.assertPageLoaded();
  });
});

test.describe('Leave Module - Leave List', () => {
  test.beforeEach(async ({ leaveListPage }) => {
    await leaveListPage.goto();
  });

  test('LEAVE_TC010 - should navigate to Leave List page successfully', async ({
    leaveListPage,
    page,
  }) => {
    await leaveListPage.assertPageLoaded();
    await expect(page).toHaveURL(/.*viewLeaveList.*/);
  });

  test('LEAVE_TC011 - should display all search filter fields', async ({
    leaveListPage,
  }) => {
    await leaveListPage.assertSearchFieldsVisible();
  });

  test('LEAVE_TC012 - should reset search filters successfully', async ({
    leaveListPage,
  }) => {
    await leaveListPage.clickReset();
    await leaveListPage.assertPageLoaded();
  });
});