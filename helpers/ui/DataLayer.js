const filter = require("lodash/filter");

class DataLayer {
  /**
   * Access and return *a copy of* the global dataLayer object.
   * A copy instead of original is returned
   *    to avoid accidental mutation of the window object.
   * This method is synchronous, despite looking like it invokes callbacks
   *
   * @returns {object[]} an array of events currently in the dataLayer
   */
  /*   get events() {
    const dl = browser.executeScript(() => window.dataLayer).value || [];
    return [...dl];
  } */

  /**
   * Resets the dataLayer by removing all existing events.
   * Note: mutates the existing array instead of replacing it with a new array
   *      to avoid potential complications with changing the variable reference.
   * This method is synchronous, despite looking like it invokes callbacks
   */
  /*   clear() {
    browser.executeScript(() => {
      if (!window.dataLayer) {
        window.dataLayer = [];
      } else {
        window.dataLayer.splice(0, window.dataLayer.length);
      }
    });
  } */

  /**
   * Filters down a dataLayer array based on the eventName and the optional filters
   *
   * @param {string} eventName - dataLayer event name to filter by
   * @param {object} filters - key:value object of event attributes to filter by
   * @returns {object[]} - a list of dataLayer events
   */
  filterEvents(eventName, filters = {}) {
    const filterParams = Object.assign({ event: eventName }, filters);
    return filter(this.events, filterParams);
  }

  /**
   * Use when you only want the latest event matching the criteria, regardless of the event history.
   * Will validate that there is at least one matching event.
   * Always returns one event, or, if not, raises an error.
   *
   * @param {string} eventName - dataLayer event name to filter by
   * @param {object} [filters] - key:value object of event attributes to filter by
   * @returns {object} - exactly one dataLayer event
   */
  getLatestEvent(eventName, filters = {}) {
    const results = this.expectAtLeastNEvents(1, eventName, filters);
    return results[results.length - 1];
  }

  /**
   * Use when you only want the first event matching the criteria, regardless of what happens after.
   * Will validate that there is at least one matching event.
   * Always returns one event, or, if not, raises an error.
   *
   * @param {string} eventName - dataLayer event name to filter by
   * @param {object} [filters] - key:value object of event attributes to filter by
   * @returns {object} - exactly one dataLayer event
   */
  getEarliestEvent(eventName, filters = {}) {
    const results = this.expectAtLeastNEvents(1, eventName, filters);
    return results[0];
  }

  /**
   * Use when you're expecting exactly one event that matching the criteria.
   * Always only returns one event, or, if not, raises an error.
   *
   * One shall be the number thou shall count, and the number of the counting shall be one.
   * Two shalt thou not count, neither count thou zero, excepting that thou then proceed to one.
   * Three is right out. Once the number one, being the first number, be reached,
   * then thou lobbest thou thy Holy Hand Grenade of Antioch towards thy foe,
   * who, being naughty in my sight, shall snuff it.
   *
   * @param {string} eventName - dataLayer event name to filter by
   * @param {object} [filters] - key:value object of event attributes to filter by
   * @returns {object} - exactly one dataLayer event
   */
  expectOneEvent(eventName, filters = {}) {
    return this.expectExactNEvents(1, eventName, filters)[0];
  }

  /**
   * Use when you want to ensure that no events matching a filter have been fired.
   * No return value, or raises an error if any matching events are found
   *
   * @param {string} eventName - dataLayer event name to filter by
   * @param {object} [filters] - key:value object of event attributes to filter by
   * @returns {void}
   */
  expectNoEvents(eventName, filters = {}) {
    this.expectExactNEvents(0, eventName, filters);
  }

  /**
   * Use when you know exactly how many events you're expecting.
   * Always returns exactly that number of events, or, if not, raises an error.
   *
   * @param {number} expectNResults - expected number of events matching the filters
   * @param {string} eventName - dataLayer event name to filter by
   * @param {object} [filters] - key:value object of event attributes to filter by
   * @returns {object[]} - an array of dataLayer events, exactly `expectNResults` long
   */
  expectExactNEvents(expectNResults, eventName, filters = {}) {
    const results = this.filterEvents(eventName, filters);
    expect(results.length).toBe(
      expectNResults,
      `Expected exactly "${expectNResults}" ` +
        `event(s) of type "${eventName}" ` +
        `and ${JSON.stringify(filters)}`
    );
    return results;
  }

  /**
   * Used when you expect there to be a minimum number of events.
   * Always returns at least that many events, or, if not, raises an error
   *
   * @param {number} atLeastNResults - minimum number of results to expect
   * @param {string} eventName - dataLayer event name to filter by
   * @param {object} [filters] - key:value object of event attributes to filter by
   * @returns {object[]} - an array of dataLayer events, at least `atLeastNResults` long
   */
  expectAtLeastNEvents(atLeastNResults, eventName, filters = {}) {
    const results = this.filterEvents(eventName, filters);
    expect(results.length).toBeGreaterThanOrEqual(
      atLeastNResults,
      `Expected at least "${atLeastNResults}"` +
        `event(s) of type "${atLeastNResults} ` +
        `and ${JSON.stringify(filters)}"`
    );
    return results;
  }
}

module.exports = new DataLayer();
