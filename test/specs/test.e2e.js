/**
 * test with page objects
 */
import LoginPage from '../page-objects/login.page.js';
//import SecurePage from '../page-objects/secure.page.js'
import * as dotenv from 'dotenv';
dotenv.config();
/*   describe('001_Login to LTRAIN application:', () => {
   it('With valid credentials and RSA token.', async () => {
       const rsaPin: string = process.env.RSA_PIN
       const loginID: string = process.env.LOGIN_ID
       const loginADPassword: string = process.env.AD_PASSWORD
       await LoginPage.open()
       await LoginPage.loginLearn(loginID, loginADPassword)
   })*/
describe('001_Login to Learn application:', () => {
    it('With valid credentials and AD Password.', async () => {
        //const loginID: string = process.env.LOGIN_ID
        //const loginADPassword: string = process.env.AD_PASSWORD
        await LoginPage.open();
        //await LoginPage.loginLearn(loginID, loginADPassword)
    });
});
