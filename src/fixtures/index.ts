import { test as base, Page, APIRequestContext } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { EmployeeListPage } from '../pages/employee/employee-list.page';
import { AddEmployeePage } from '../pages/employee/add-employee.page';
import { AssignLeavePage } from '../pages/leave/assign-leave.page';
import { MyLeaveListPage } from '../pages/leave/my-leave-list.page';
import { LeaveListPage } from '../pages/leave/leave-list.page';
import { ApiHelper } from '../utils/api-helper';

type PageFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  employeeListPage: EmployeeListPage;
  addEmployeePage: AddEmployeePage;
  assignLeavePage: AssignLeavePage;
  myLeaveListPage: MyLeaveListPage;
  leaveListPage: LeaveListPage;
  apiHelper: ApiHelper;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }: { page: Page }, use: (r: LoginPage) => Promise<void>) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }: { page: Page }, use: (r: DashboardPage) => Promise<void>) => {
    await use(new DashboardPage(page));
  },
  employeeListPage: async ({ page }: { page: Page }, use: (r: EmployeeListPage) => Promise<void>) => {
    await use(new EmployeeListPage(page));
  },
  addEmployeePage: async ({ page }: { page: Page }, use: (r: AddEmployeePage) => Promise<void>) => {
    await use(new AddEmployeePage(page));
  },
  assignLeavePage: async ({ page }: { page: Page }, use: (r: AssignLeavePage) => Promise<void>) => {
    await use(new AssignLeavePage(page));
  },
  myLeaveListPage: async ({ page }: { page: Page }, use: (r: MyLeaveListPage) => Promise<void>) => {
    await use(new MyLeaveListPage(page));
  },
  leaveListPage: async ({ page }: { page: Page }, use: (r: LeaveListPage) => Promise<void>) => {
    await use(new LeaveListPage(page));
  },
  apiHelper: async (
    { request }: { request: APIRequestContext },
    use: (r: ApiHelper) => Promise<void>,
  ) => {
    await use(new ApiHelper(request));
  },
});

export { expect } from '@playwright/test';