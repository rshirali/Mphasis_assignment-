const { timeout } = require("../ui/constants");

// Refactor properly map out this references
module.exports = class Pagination {
  get currentPaginationPage() {
    return $(".rc-pagination-item-active a");
  }

  get currentPaginationNumber() {
    this.currentPaginationPage.waitForDisplayed(timeout);
    return this.currentPaginationPage.getText();
  }

  navigatePagination(selector, option) {
    selector.waitForExist(timeout);
    const options = selector.$$("li");
    const optionsObj = {};

    options.forEach((index) => {
      const title = index.getAttribute("title");
      optionsObj[title] = index;

      if (option && title === option) {
        index.click();
      }
    });

    return optionsObj;
  }

  paginateNext(maxTime = timeout) {
    const nextElem = $('li[title="Next Page"]');
    nextElem.waitForDisplayed(maxTime);
    nextElem.click();
    return $(".rc-pagination-item-active a").getText();
  }

  paginatePrevious(maxTime = timeout) {
    const previousElm = $('li[title="Previous Page"]');
    previousElm.waitForDisplayed(maxTime);
    previousElm.click();
    return $(".rc-pagination-item-active a").getText();
  }

  waitForPagination(nextPage) {
    browser.waitUntil(
      () => this.currentPaginationNumber === nextPage,
      timeout,
      `Failed to paginate to page: ${nextPage}`
    );
  }
};
