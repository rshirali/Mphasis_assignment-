const { timeout } = require("../ui/constants");
const { waitForSpinners } = require("./waits");

module.exports = {
  getSetDropDownList: (value, selector, button) => {
    const dropListButton = button || selector.$(".dropdown-button");
    dropListButton.waitForDisplayed(timeout);
    dropListButton.click();
    selector.waitForExist(timeout);

    const list = selector ? selector.$$("ul li") : $$("ul li");

    browser.waitUntil(
      () => list.length > 0,
      timeout,
      "Failed to retrieve user options"
    );

    const options = list.map((li) => ({
      value: li.getText(),
      selector: li,
    }));

    if (value !== undefined) {
      const select =
        typeof value === "string"
          ? options.find((option) => option.value.includes(value))
          : options[value];
      if (select !== undefined) {
        select.selector.click();
      } else console.error(`Option ${value} does not exist in this drop list`);
    }

    if (value === null) {
      dropListButton.click();
    }

    waitForSpinners(timeout);

    return {
      setValue: dropListButton.getText(),
      options,
    };
  },

  getSetCombobox: (baseSelector, option) => {
    baseSelector.waitForDisplayed(timeout);
    const base = baseSelector.selector.includes("select")
      ? baseSelector
      : baseSelector.$("select");
    base.click();

    const options = baseSelector.$$("option").map((index) => ({
      selector: index,
      value: index.getText(),
    }));

    if (option) {
      const select = options.find((opt) => opt.value === option);
      select.selector.click();
      options.selected = select;
    }

    return options;
  },

  selectDropdownOptionByIndex: (dropdown, option) => {
    dropdown.selectByIndex(option);
    console.log(`Selected option value: ${dropdown.getValue()}`);
    return dropdown.getValue();
  },
};
