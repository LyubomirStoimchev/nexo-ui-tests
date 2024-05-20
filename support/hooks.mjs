// features/support/hooks.js

/**
 * This file contains the hooks used in the Cucumber feature files.
 */

import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";

// Set the default timeout to 160 seconds
setDefaultTimeout(160 * 1000);

/**
 * Runs before each scenario.
 * Initializes the test environment.
 */
Before(async function () {
  await this.init();
  await this.driver.manage().window().maximize();
});

/**
 * Runs after each scenario.
 * Closes the driver
 * Captures a screenshot on failure.
 */
After(async function () {
  // Uncommnet for attaching screenshot after report framework is added
  // if (scenario.result.status === 'failed') {
  //   await this.captureScreenshot();
  // }

  await this.cleanUp();
});
