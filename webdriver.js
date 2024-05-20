// webdriver.js
import { Builder } from "selenium-webdriver";

async function createDriver() {
  return new Builder().forBrowser("chrome").build();
}

export default createDriver;
