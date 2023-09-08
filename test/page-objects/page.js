/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
    * Opens a sub-page of the page
    * @param path path of the sub-page (e.g. /path/to/page.html)
    */
    //LTRAIN - legacy
    // public open (path: string) {
    //     return browser.url(`https://the-internet.herokuapp.com/${path}`)
    //public open (path: string) {
    //      return browser.url(`https://ltrain-dev.llnl.gov/lms/${path}`)
    //}
    //For Learn-dev
    //public open (path: string) {
    //  return browser.url(`https://learn-dev.llnl.gov/${path}`)
    //}
    //For Learn-dev
    open(path) {
        return browser.url(`https://www.securian.com/${path}`);
    }
}
