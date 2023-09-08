import Page from './page.js';
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */

    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open('insights-tools/retirement-calculator.html')
    }
}
export default new LoginPage()