// features/page_objects/terms_and_conditionsPage.js
import { By, until } from "selenium-webdriver";
import { TIMEOUTS } from "../config.js";

/**
 * Represents the Terms and Conditions page object.
 */
class TermsAndConditionsPage {
  /**
   * Constructs a new TermsAndConditionsPage object.
   * @param {WebDriver} driver - The WebDriver instance.
   */
  constructor(driver) {
    this.driver = driver;
    this.formSelector = By.css(".NIoIEf .G4njw");
    this.acceptButtonSelector = By.css('button[aria-label="Accept all"]');
  }

  /**
   * Verifies if the form is open.
   * @returns {Promise<void>} - A promise that resolves when the form is open.
   */
  async verifyFormIsOpen() {
    const formElement = await this.driver.wait(
      until.elementLocated(this.formSelector),
      TIMEOUTS.ELEMENT_LOAD,
      "Form not located"
    );

    await this.driver.wait(
      until.elementIsVisible(formElement),
      TIMEOUTS.ELEMENT_LOAD,
      "Form not visible"
    );
  }

  /**
   * Accepts the terms and conditions.
   * @returns {Promise<void>} - A promise that resolves when the terms are accepted.
   */
  async acceptTerms() {
    const acceptButton = await this.driver.wait(
      until.elementLocated(this.acceptButtonSelector),
      TIMEOUTS.ELEMENT_LOAD,
      "Accept button not located"
    );

    await this.driver.wait(
      until.elementIsVisible(acceptButton),
      TIMEOUTS.ELEMENT_LOAD,
      "Accept button not visible"
    );

    await acceptButton.click();
  }
}

export default TermsAndConditionsPage;
