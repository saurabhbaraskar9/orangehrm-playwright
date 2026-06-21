import { Page, Locator, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { Logger } from '../utils/logger';

export abstract class BasePage {
  protected readonly logger: Logger;

  constructor(protected readonly page: Page) {
    this.logger = new Logger(this.constructor.name);
  }

  // ─── Navigation ───────────────────────────────────────────────

  async navigate(path: string = ''): Promise<void> {
    await allure.step(`Navigate to: ${path}`, async () => {
      this.logger.info(`Navigating to: ${path}`);
      await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    });
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  // ─── Interactions ─────────────────────────────────────────────

  async fillField(locator: Locator, value: string): Promise<void> {
    await allure.step(`Fill field with: ${value}`, async () => {
      this.logger.debug(`Filling field with: ${value}`);
      await locator.clear();
      await locator.fill(value);
    });
  }

  async clickElement(locator: Locator): Promise<void> {
    await allure.step('Click element', async () => {
      this.logger.debug('Clicking element');
      await locator.click();
    });
  }

  async clickAndWait(locator: Locator): Promise<void> {
    await locator.click();
    await this.waitForPageLoad();
  }

  async selectDropdownOption(locator: Locator, value: string): Promise<void> {
    this.logger.debug(`Selecting dropdown option: ${value}`);
    await locator.click();
    await this.page.getByRole('option', { name: value }).click();
  }

  async hoverElement(locator: Locator): Promise<void> {
    await locator.hover();
  }

  // ─── Waits ────────────────────────────────────────────────────

  async waitForVisible(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }

  async waitForHidden(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'hidden' });
  }

  // ─── Assertions ───────────────────────────────────────────────

  async assertVisible(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeVisible();
  }

  async assertHidden(locator: Locator): Promise<void> {
    await expect(locator).toBeHidden();
  }

  async assertText(locator: Locator, text: string): Promise<void> {
    await expect(locator).toHaveText(text);
  }

  async assertContainsText(locator: Locator, text: string): Promise<void> {
    await expect(locator).toContainText(text);
  }

  async assertUrl(expectedUrl: string): Promise<void> {
    await expect(this.page).toHaveURL(expectedUrl);
  }

  async assertTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  // ─── Utilities ────────────────────────────────────────────────

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  async getTextContent(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? '';
  }

  async getInputValue(locator: Locator): Promise<string> {
    return locator.inputValue();
  }

  async takeScreenshot(name: string): Promise<void> {
    const screenshot = await this.page.screenshot({
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true,
    });
    await allure.attachment(name, screenshot, 'image/png');
  }
}