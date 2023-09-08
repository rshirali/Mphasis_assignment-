import Page from './page.js';
import ObjectValidation from '../../helpers/ui/AsyncObjValidation.js';
//import Scrolling from ("../../../helpers/ui/scrolling");
const validators = ObjectValidation;
/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get buttonRSA() {
        return $("//button[@value='RSA']");
    }
    get inputUsername() {
        return $('#username');
    }
    get inputPassword() {
        return $('#password');
    }
    get btnSignon() {
        return $('//a[@title = "Sign On"]');
    }
    get userid() {
        return $('input[type="text"][name="userid"]');
    }
    get submit() {
        return $('//input[@name ="Submit"]');
    }
    get logInWithRSA() {
        return {
            buttonRSA: () => validators.waitForElement('//button[@value = "RSA"]'),
            inputUsername: () => validators.waitForElement('#username'),
            inputPassword: () => validators.waitForElement('#password'),
            btnSignon: () => validators.waitForElement('//a[@title = "Sign On"]'),
            userid: () => validators.waitForElement('input[type="text"][name="userid"]'),
            submit: () => validators.waitForElement('//input[@name ="Submit"]')
        };
    }
    get logInWithAD() {
        return {
            inputUsername: () => validators.waitForElement('#username'),
            inputPassword: () => validators.waitForElement('#password'),
            btnSignOn: () => validators.waitForElement('//a[@title = "Sign On"]')
        };
    }
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    //------------------------Below-------
    async login(username, password) {
        //expect("dddddd").toMatch("iiiiii")
        //expect("dddddd").toEqual("iiiiii")
        // Handle the error or take any necessary actions
        await expect(this.logInWithRSA.buttonRSA()).toBeExisting();
        await (await this.logInWithRSA.buttonRSA()).click();
        await (await this.logInWithRSA.inputUsername()).setValue(username);
        await (await this.logInWithRSA.btnSignon()).scrollIntoView();
        await (await this.logInWithRSA.inputPassword()).setValue(password);
        await browser.pause(15000);
        await (await this.logInWithRSA.btnSignon()).click();
        await (await this.logInWithRSA.userid()).setValue("saunders13");
        await expect(this.logInWithRSA.submit()).toBeDisplayed();
        await (await this.logInWithRSA.submit()).click();
    }
    async loginLearn(username, password) {
        // Handle the error or take any necessary actions
        await (await this.logInWithAD.inputUsername()).setValue(username);
        await (await this.logInWithAD.btnSignOn()).scrollIntoView();
        await (await this.logInWithAD.inputPassword()).setValue(password);
        await browser.pause(2000);
        await (await this.logInWithAD.btnSignOn()).click();
    }
    /**
     * overwrite specific options to adapt it to page object
     */
    //LTRAIN - legacy
    //open() {
    //  return super.open('faces/main.jspx')
    //}
    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open('insights-tools/retirement-calculator.html');
    }
}
export default new LoginPage();
