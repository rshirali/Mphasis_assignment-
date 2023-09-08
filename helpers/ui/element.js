/* eslint-disable no-useless-constructor */
const isEqual = require('lodash/isEqual');
const { timeout } = require('./constants');
const Components = require('../components');

module.exports = class ElementHelper extends Components {
  constructor() {
    super();
  }

  get baseURL() {
    return process.env.BASEURL || browser.options.baseUrl;
  }

  get breadcrumbs() {
    return $$('.breadcrumb');
  }

  get breadcrumbLeaf() {
    return $('.breadcrumb_current-location');
  }

  get snackBarStatus() {
    return $('.nutrien-snackbar__label');
  }

  replaceCharacters(text, replace, replacedBy) {
    const newText = text.replace(replace, replacedBy);
    return newText;
  }

  currency(number) {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  validateHeaders(headers, array) {
    let found = 0;
    headers.array.forEach((header, i) => {
      if (header.getText().indexOf(array[i]) === 0) {
        console.log(`Column header: ${header.getText()}`);
        found += 1;
      }
    });
    return found;
  }

  isElemVisible(selector, maxTime = timeout, reverse = false) {
    try {
      $(selector).waitForDisplayed(maxTime, reverse);
      return true;
    } catch (error) {
      return false;
    }
  }

  /* Return true/false if the supplied text is visibe on the page.
  if a parentXpath is passed in, it ensures the text is a progeny of the parent
  */
  isTextVisible(text, parentXpath, maxTime = timeout) {
    let xpathSelector = `//*[text()="${text}"]`;
    if (parentXpath) xpathSelector = `//${parentXpath}${xpathSelector}`;
    return this.isElemVisible(xpathSelector, maxTime);
  }

  isElemClickable(selector, maxTime = timeout) {
    try {
      $(selector).waitForEnabled(maxTime);
      return true;
    } catch (error) {
      return false;
    }
  }

  getElemText(elems, selector, index) {
    let elem = elems;
    if (elems.length) {
      elem = elems[index];
    }
    return elem.getText(selector);
  }

  returnToLandingPage() {
    browser.url(this.baseURL);
    this.waitForPageToNavigate(this.baseURL);
  }

  /**
   * Checks if an array of headers are present in the currenlty displayed table.
   * @param  {Object[]} headers – List of headers to check for in order
   */
  areTableHeadersPresent(headers, maxTimeout = timeout) {
    this.waitForSpinners(maxTimeout, 500);
    const tableElem = $('table');
    const uiHeaders = this.getTable(tableElem).headers;
    return isEqual(uiHeaders.sort(), headers.sort());
  }

  scrollInContainer(scrollableEl, scrollAmt = null, scrollDir = 'down') {
    // Scroll to bottom by calc scroll amt from difference
    // between total container length and viewport
    if (!scrollAmt) {
      const scrollElemH = scrollableEl.getSize('height');
      const viewportH = browser.getViewportSize('height');
      scrollAmt = (scrollElemH - viewportH);
    }
    browser.executeScript((el, amt, dir) => {
      if (dir === 'down') el.value.scrollTop += amt;
      else el.value.scrollTop -= amt;
    }, scrollableEl, scrollAmt, scrollDir);
  }

  scrollElementIntoView(selector) {
    browser.executeScript((elSelector) => {
      document.querySelector(elSelector).scrollIntoView(true);
    }, selector);
  }
};


