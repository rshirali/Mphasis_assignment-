const { timeout } = require("../ui/constants");

module.exports = {
  setInput: (_input, selector, noTab) => {
    let input = _input;
    if (typeof _input === "number") input = _input.toString();
    selector.waitForDisplayed(timeout);
    // TODO: Scroll to selected element. Implement method that works
    selector.click();

    // Clearing input
    browser.execute((element) => {
      element.value = "";
    }, selector);

    selector.keys(input);
    if (!noTab) browser.keys("Tab");

    return selector.getAttribute("value");
  },

  setValueInput: (_input, selector, noTab) => {
    let input = _input;
    if (typeof _input === "number") input = _input.toString();
    selector.waitForDisplayed(timeout);
    selector.setValue(input);
    if (!noTab) browser.keys("Tab");

    return selector.getAttribute("value");
  },

  setRadioButton: (selector) => {
    selector.waitForDisplayed(timeout);

    if (selector.isSelected()) return selector.isSelected();

    selector.click();
    return selector.isSelected();
  },

  setCheckBox: (selector) => {
    selector.waitForExist(timeout);

    selector.click();
    browser.pause(1000);
    return selector.isSelected();
  },
};
