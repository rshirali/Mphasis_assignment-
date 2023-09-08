const { timeout } = require("../ui/constants");

module.exports = {
  getErrorMessages: (baseSelector = ".error-messages", elemTag = "p") => {
    if ($(baseSelector).isExisting()) {
      const errors = $$(`${baseSelector} ${elemTag}`);
      return errors.map((error) => error.getText());
    }
    return false;
  },

  getWarningMessages: (baseSelector = $(".warning-messages")) => {
    const warn = baseSelector;
    warn.waitForExist(timeout);
    if (warn.isExisting()) {
      const warnings = warn.$$("p");
      return warnings.map((error) => error.getText());
    }
    return false;
  },
};
