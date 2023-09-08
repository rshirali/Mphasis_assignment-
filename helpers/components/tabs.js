const { timeout } = require("../ui/constants");

module.exports = (selectValue, baseSelector = null) => {
  const container = baseSelector || $('div[role="tablist"]');
  container.waitForExist(timeout);
  const list = container.$$('a[role="tab"]');

  const tabsObject = list.map((index) => ({
    name: index.getText(),
    selector: index,
  }));

  if (selectValue) {
    const select = tabsObject.find(
      (opt) => opt.name.toLowerCase() === selectValue.toLowerCase()
    );
    select.selector.click();
    tabsObject.selected = select;
  }

  return tabsObject;
};
