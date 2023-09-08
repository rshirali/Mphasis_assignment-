const { timeout, accountsTimeout } = require("../ui/constants");

/* Waits for web element to contain innerText.
     Returns true if it meets the condition and false otherwise */
const waitForText = (element, innerText) =>
  browser.waitUntil(
    () => element.getText().includes(innerText),
    timeout,
    "Wait for inner text to include the given parameter."
  );

/* Waits for the loading spinners to be removed from the page
  Then additionally waits for an optional pause before returning */
const waitForSpinners = (maxTime = accountsTimeout, additionalPause = 700) => {
  if (browser.$(".MaterialLoadingIconWrapper").isDisplayed()) {
    browser.waitUntil(
      () => $(".MaterialLoadingIconWrapper").isDisplayed() === false,
      maxTime,
      `expected loading spinner to be gone after ${maxTime} milliseconds`
    );
    browser.pause(additionalPause);
  }
};

const waitForPageToNavigate = (url, waitTime = accountsTimeout) => {
  waitForSpinners(waitTime);

  return browser.waitUntil(
    () => {
      const current = browser.getUrl();
      $("body").waitForExist(waitTime);
      return current.includes(url);
    },
    waitTime,
    `Page url: ${url} failed to load after ${waitTime}ms`
  );
};

const waitForUpdatedElement = (oldValue, element) => {
  browser.waitUntil(
    () => oldValue !== element.getText(),
    timeout,
    `expected element text to be updated after ${timeout} ms`
  );
  const firstUpdatedAfter = element.getText();
  expect(oldValue).not.toEqual(firstUpdatedAfter);
};

// Selector should be a double dollar sign ($$) webdriver selector
const waitForArrayLength = (selector, waitTime = timeout) => {
  if (!selector) return;
  const selectorName =
    selector.length && selector[0].selector ? selector[0].selector : "selector";
  browser.waitUntil(
    () => selector.length,
    waitTime,
    `Expected ${selectorName} to have length after ${waitTime}ms`
  );
};

// Waits for $$(selector) length to change after action callback
const waitForArrayLengthChange = (selector, action, waitTime = timeout) => {
  if (!selector) return;
  const selectorName =
    selector.length && selector[0].selector ? selector[0].selector : null;
  const initialLength = selector.length;
  action();
  browser.waitUntil(
    () => $$(selectorName).length !== initialLength,
    waitTime,
    `Expected ${selectorName} length not to equal initial length after ${waitTime}ms`
  );
};

module.exports = {
  waitForSpinners,
  waitForPageToNavigate,
  waitForText,
  waitForUpdatedElement,
  waitForArrayLength,
  waitForArrayLengthChange,
};
