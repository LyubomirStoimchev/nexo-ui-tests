// features/page_objects/financePage.js
import { By, until } from 'selenium-webdriver';
import { TIMEOUTS } from "../config.js";

/**
 * Represents the Finance Page object.
 */
class FinancePage {
  /**
   * Creates an instance of FinancePage.
   * @param {WebDriver} driver - The WebDriver instance.
   */
  constructor(driver) {
    this.driver = driver;
    this.priceSelector = '.YMlKec.fxKbKc';
  }

  /**
   * Gets the price from the Finance Page.
   * @returns {Promise<number>} The price value.
   */
  async getPrice() {
    await this.driver.wait(until.elementLocated(By.css(this.priceSelector)), TIMEOUTS.ELEMENT_LOAD);
    let priceElement = await this.driver.findElement(By.css(this.priceSelector));
    let priceText = await priceElement.getText();
    return parseFloat(priceText.replace('$', '').replace(',', ''));
  }
}

export default FinancePage;
