// features/step_definitions/terms_and_conditions_steps.js

import { When, Then } from "@cucumber/cucumber";

/**
 * Verify if the Terms and Conditions form is present.
 */
Then("verify Terms and Conditions form is present", async function () {
  await this.termsAndConditionsPage.verifyFormIsOpen();
});

/**
 * Accept the Terms and Conditions.
 */
When("I accept Terms and Conditions", async function () {
  await this.termsAndConditionsPage.acceptTerms();
});
