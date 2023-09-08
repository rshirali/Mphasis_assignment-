const timeout = require("./constants").accountsTimeout;

class ObjectValidation {
  waitForElement(path, maxWait = 20000) {
    let element = null;

    try {
      browser.waitUntil(() => {
        element = $(path);
        return element && element.isExisting();
      }, maxWait);
    } catch (e) {
      console.log(`Error: ${e}`);
    }

    return element;
  }

  waitForArray(path, arrayIndex = null, maxWait = 10000) {
    if (arrayIndex == null) {
      let arr = null;

      try {
        browser.waitUntil(() => {
          arr = $$(path);
          return arr.length > 0;
        }, maxWait);
      } catch (e) {
        console.log(`Error: ${e}`);
      }

      return arr;
    } else {
      let arr = null;
      browser.waitUntil(() => {
        arr = $$(path);
        return (
          arr.length > arrayIndex &&
          arr[arrayIndex] &&
          arr[arrayIndex].isExisting()
        );
      }, maxWait);

      return arr[arrayIndex];
    }
  }

  async waitForSpinner(maxTime = 10000, additionalPause = 700) {
    let spinner = await $(".MuiCircularProgress-svg");
    if (await spinner.isDisplayed()) {
      await browser.waitUntil(
        async () => (await spinner.isDisplayed()) === false,
        maxTime,
        `expected loading spinner to be gone after ${maxTime} milliseconds`
      );
      await browser.pause(additionalPause);
    }
  }

  async waitForObject(myObject) {
    if (myObject.waitForExist(timeout) === true) {
      await myObject.waitForDisplayed(timeout);
    }
    return $(myObject.selector);
  }

  waitForObjectToExist(myObject) {
    myObject.waitForExist(timeout);
    return $(myObject.selector);
  }

  waitForDisplayed(myObject) {
    myObject.waitForDisplayed(timeout);
    return $(myObject.selector);
  }

  // Selector should be a double dollar sign ($$) webdriver selector
  waitForArrayLength(selector) {
    if (!selector) return;
    const selectorName =
      selector.length && selector[0].selector
        ? selector[0].selector
        : "selector";
    browser.waitUntil(
      () => selector.length,
      timeout,
      `Expected ${selectorName} to have length after ${timeout}ms`
    );
  }

  waitForEnabled(myObject) {
    myObject.waitForEnabled(timeout);
    return $(myObject.selector);
  }

  isObjectSelected(myObject) {
    const isSelected = myObject.isSelected();
    return isSelected;
  }

  isObjectEnabled(myObject) {
    const isEnabled = myObject.isEnabled();
    return isEnabled;
  }

  // This method looks immediately for an object.  Ensure
  // the page is fully displayed before calling this method.
  // The selector must be of type $(<something>).
  // doesObjectExist(selector) {
  //   let retValue = true;
  //   if (!selector.length) {
  //     retValue = false;
  //   }
  //   return retValue;
  // }

  // The selector must be of type $(<something>).
  doesObjectExist(selector, maxTime = timeout, reverse = false) {
    let retValue = true;
    try {
      selector.waitForExist(maxTime, reverse);
    } catch (error) {
      retValue = false;
    }
    return retValue;
  }

  fmsFiltersNumber(myObject) {
    const buttonText = myObject;
    const openParen = buttonText.indexOf("(");
    const closeParen = buttonText.indexOf(")");
    let retValue = 0;
    if (openParen !== -1 && closeParen !== -1 && closeParen > openParen + 1) {
      const strLength = closeParen - openParen - 1;
      retValue = buttonText.substr(openParen + 1, strLength);
    }
    return parseInt(retValue, 10);
  }
}

module.exports = ObjectValidation;
