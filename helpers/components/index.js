const tabs = require("./tabs");
const getLabels = require("./labels");

const Pagination = require("./pagination");

const {
  navigatePagination,
  paginateNext,
  waitForPagination,
} = new Pagination();

const {
  getSetDropDownList,
  getSetCombobox,
  selectDropdownOptionByIndex,
} = require("./listDropdowns");

const { getErrorMessages, getWarningMessages } = require("./messages");

const {
  getTable,
  getNthRowFromTable,
  getNthColumnFromTable,
} = require("./table");

const {
  setInput,
  setValueInput,
  setRadioButton,
  setCheckBox,
} = require("./input");

const {
  waitForPageToNavigate,
  waitForText,
  waitForSpinners,
  waitForUpdatedElement,
  waitForArrayLength,
  waitForArrayLengthChange,
} = require("./waits");

const { timeout, accountsTimeout } = require("../ui/constants");

global.timeout = timeout;
global.accountsTimeout = accountsTimeout;

module.exports = class Components {
  constructor() {
    Object.assign(this, {
      setInput,
      setValueInput,
      setRadioButton,
      setCheckBox,
      getSetDropDownList,
      getSetCombobox,
      selectDropdownOptionByIndex,
      getTable,
      getNthRowFromTable,
      getNthColumnFromTable,
      tabs,
      waitForText,
      waitForSpinners,
      waitForPageToNavigate,
      waitForUpdatedElement,
      waitForArrayLength,
      waitForArrayLengthChange,
      getErrorMessages,
      getWarningMessages,
      getLabels,
      navigatePagination,
      paginateNext,
      waitForPagination,
    });
  }
};
