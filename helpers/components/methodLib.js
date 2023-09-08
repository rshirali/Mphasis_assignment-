const { timeout } = require("../ui/constants");

module.exports = {
  verifyURL: (url) => {
    var currentURL = browser.getUrl();
    expect(url).toEqual(currentURL);
  },

  // checks if element contains specific class attribute
  hasClass: (element, className) => {
    var classes = element.getAttribute("class");
    for (var c of classes.split(" ")) {
      if (c == className) {
        return true;
      }
    }
    // this will fail the test
    expect(false).to.be.true;
  },

  //resizes the browser to test for mobile web view
  mobileWeb: (width, height) => {
    browser.setWindowSize(width, height);
  },

  retrieveElementByPartialAttrName: (htmlElem, cssSelector, partialName) => {
    return $(`${htmlElem}[${cssSelector}*="${partialName}"]`);
  },

  isButtonDisabled: (selector) => {
    try {
      $(`button${selector}:disabled`).waitForDisplayed(timeout);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  getRandomName: () => {
    let randomNumber = Math.floor(Math.random() * 100 + 1);
    return `name${new Date().getTime().toString()}${randomNumber}`;
  },

  getRandomPhoneNumber: () => {
    return Math.random().toString().slice(2, 11);
  },

  getRandomEmail: () => {
    return `${Math.random().toString()}${"@email.com"}`;
  },
};
