// features/step_definitions/prices_steps.js
import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import softAssert from "soft-assert";
import { BASE_URL } from "../config.js";
import Utils from "../support/utils.mjs";

// This can be also done using CustomWorld like in the API tests project
let initialPrice;
let prices = [];

/**
 * Step definition for opening the Google Finance page for a given symbol.
 * @param {string} symbol - The symbol of the stock to open.
 */
Given("I open Google Finance {string} page", async function (symbol) {
  await this.driver.get(`${BASE_URL}/${symbol}`);
});

/**
 * Step definition for collecting prices at regular intervals.
 * Timeout is set to -1 to disable the default timeout of 5000ms.
 * @param {string} symbol - The symbol of the price to collect.
 * @param {number} pollInterval - The interval in seconds between price collection.
 * @param {number} collectDuration - The duration in minutes for price collection.
 */
When(
  "I collect prices every {int} seconds for {int} minutes",
  { timeout: -1 },
  async function (pollInterval, collectDuration) {
    expect(pollInterval).to.be.above(0);
    expect(collectDuration).to.be.above(0);

    const startTime = Date.now();
    const endTime = startTime + collectDuration * 60 * 1000;
    while (Date.now() < endTime) {
      const currentPrice = await this.financePage.getPrice();
      expect(currentPrice).to.not.be.NaN;

      // TODO: Should use a logging framework
      console.log(
        `[${new Date().toLocaleTimeString()}] Current price: ${currentPrice}`
      );

      if (!initialPrice) initialPrice = currentPrice;
      prices.push(currentPrice);

      await new Promise((resolve) => setTimeout(resolve, pollInterval * 1000));
    }
  }
);

/**
 * Step definition for validating the average price variation.
 * @param {number} threshold - The maximum allowed percentage variation of the average price.
 */
Then(
  "verify the average price should not differ by more than {int}%",
  function (threshold) {
    expect(threshold).to.be.within(
      0,
      100,
      "Threshold % must be a number between 0 and 100!"
    );

    const avgPrice =
      prices.reduce((a, b) => a + parseFloat(b), 0) / prices.length;

    expect(Utils.getPercentDiff(avgPrice, initialPrice)).to.be.below(
      threshold / 100,
      `Average price: ${avgPrice}, Initial price: ${initialPrice}`
    );
  }
);

/**
 * Step definition for validating individual price variations.
 * @param {number} threshold - The maximum allowed percentage variation of each price.
 */
Then("verify no price should differ by more than {int}%", function (threshold) {
  expect(threshold).to.be.within(
    0,
    100,
    "Threshold % must be a number between 0 and 100!"
  );

  for (const price of prices) {
    softAssert.softTrue(
      Utils.getPercentDiff(parseFloat(price), initialPrice) < threshold / 100,
      `Failed at - Price: ${price}, Initial price: ${initialPrice}`
    );
  }

  softAssert.softAssertAll();
});
