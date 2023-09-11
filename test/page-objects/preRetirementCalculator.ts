import Page from './page.js';
import ObjectValidation from '../../helpers/ui/AsyncObjValidation.js';

const validators = ObjectValidation;

/**
 * Specific selectors and methods for a specific page
 */
class PreRetirementCalculator extends Page {
    /**
     * define selectors using getter methods
     */
    get calculatorInputs() {
        return {
            currentAge: () => validators.waitForElement("//input[@id='current-age']"),
            retirementAge: () => validators.waitForElement("//input[@id='retirement-age']"),
            currentAnnualIncome: () => validators.waitForElement("//input[@id='current-income']"),
            spouseAnnualIncome: () => validators.waitForElement("//input[@id='spouse-income']"),
            currentRetirementSavingsBalance: () => validators.waitForElement("//input[@id='current-total-savings']"),
            currentlySavingEachYearForRetirement: () => validators.waitForElement("//input[@id='current-annual-savings']"),
            rateOfIncreaseYourSavingsEachYear: () => validators.waitForElement("//input[@id='savings-increase-rate']"),
            //for the purpose of scrolling the radio buttons in the view
            socialSecurityBenefitsSubTitle: () => validators.waitForElement("//h3[normalize-space()='Social Security income']"),
            socialSecurityBenefitsRadioButtonYes: () => validators.waitForElement("//label[@for='yes-social-benefits']"),
            socialSecurityBenefitsRadioButtonNo: () => validators.waitForElement("//label[@for='no-social-benefits']"),
            maritalStatusSingleRadioButton: () => validators.waitForElement("/label[@for=\'single\']"),
            maritalStatusMarriedRadioButton: () => validators.waitForElement("//label[@for='married']"),
            socialSecurityOverrideAmount: () => validators.waitForElement("//input[@id='social-security-override']"),
            calculateButton: () => validators.waitForElement("//button[normalize-space()='Calculate']"),
            clearFormButton: () => validators.waitForElement("//button[normalize-space()='Clear form']")

        };
    }

    //Page selectors for error messages and other banners
    get pageSelectors() {
        return {
            requiredFieldsErrorMessage: () => validators.waitForElement("//p[@id='calculator-input-alert-desc']"),
        };
    }

    /**
     *  User should be able to submit form with all required fields filled in
     *
     */
    async doCalculate_001(currentAge: string, retirementAge: string,
                          currentAnnualIncome: String, spouseAnnualIncome: string,
                          currentRetirementSavingsBalance: string,
                          currentlySavingEachYearForRetirement: string,
                          rateOfIncreaseYourSavingsEachYear: string,
                          //Optional parameters
                          socialSecurityBenefitsRadioButtonYes: string ="No",
                          maritalStatusMarriedRadioButton: string = "Single",
                          socialSecurityOverrideAmount: string = "0"
    ) {
        await (await this.calculatorInputs.currentAge()).setValue(currentAge)
        await (await this.calculatorInputs.retirementAge()).setValue(retirementAge)
        await (await this.calculatorInputs.currentAnnualIncome()).click()
        await (await this.calculatorInputs.currentAnnualIncome()).setValue(currentAnnualIncome)
        await (await this.calculatorInputs.spouseAnnualIncome()).click()
        await (await this.calculatorInputs.spouseAnnualIncome()).setValue(spouseAnnualIncome)
        await (await this.calculatorInputs.currentRetirementSavingsBalance()).click()
        await (await this.calculatorInputs.currentRetirementSavingsBalance()).setValue(currentRetirementSavingsBalance)
        await (await this.calculatorInputs.currentlySavingEachYearForRetirement()).click()
        await (await this.calculatorInputs.currentlySavingEachYearForRetirement()).setValue(currentlySavingEachYearForRetirement)
        await (await this.calculatorInputs.rateOfIncreaseYourSavingsEachYear()).click()
        await (await this.calculatorInputs.rateOfIncreaseYourSavingsEachYear()).setValue(rateOfIncreaseYourSavingsEachYear)
        //Not required as such. Just that it is easier to view the interaction in UI
        await (await this.calculatorInputs.socialSecurityBenefitsSubTitle()).scrollIntoView(
            {
                behavior: 'smooth', // or 'smooth' for smooth scrolling
                block: 'center',  // Vertically align the element to the center
                //inline: 'center', // Horizontally align the element to the center
            }
        )
        //For inclusion of Social Security Income option
        if (socialSecurityBenefitsRadioButtonYes != "No") {
            await (await this.calculatorInputs.socialSecurityBenefitsRadioButtonYes()).click()
            await browser.pause(2000) //Required for the second radio button
            if (maritalStatusMarriedRadioButton != "Single") {
                await (await this.calculatorInputs.maritalStatusMarriedRadioButton()).click()
                //Enter the Override amount
                await (await this.calculatorInputs.socialSecurityOverrideAmount()).click()
                await (await this.calculatorInputs.socialSecurityOverrideAmount()).setValue(socialSecurityOverrideAmount)
            }
        }
        await (await this.calculatorInputs.calculateButton()).click()
        await browser.pause(3000)
    }

    /**
     *  Ensure an error is thrown/displayed when a required field is not populated
     *
     */
    async requiredFields_001() {
        //Key-value pair initialization of parameters and their initial values
        const initialData = {
            currentAge: "35",
            retirementAge: "72",
            currentAnnualIncome: "20555",
            spouseAnnualIncome: "23000",
            currentRetirementSavingsBalance: "200000",
            currentlySavingEachYearForRetirementRate: '12',
            rateOfIncreaseYourSavingsEachYear: '6',
        };
        const fieldValueToEmpty: string = ""

        // Limiting the test case to four fields
        const allowedKeys = [
            "currentAge",
            "retirementAge",
            "currentAnnualIncome",
            "currentRetirementSavingsBalance",
        ];
        //Set a required field to "" while all other required field are populated
        //Verify error message
        for (const key in initialData) {
            if (initialData.hasOwnProperty(key) && allowedKeys.includes(key)) {
                switch (key) {
                    case "currentAge":
                        //Setting field to empty
                        await (await this.calculatorInputs.currentAge()).setValue(fieldValueToEmpty)
                        await (await this.calculatorInputs.retirementAge()).setValue(initialData.retirementAge)
                        await (await this.calculatorInputs.currentAnnualIncome()).click()
                        await (await this.calculatorInputs.currentAnnualIncome()).setValue(initialData.currentRetirementSavingsBalance)
                        await (await this.calculatorInputs.spouseAnnualIncome()).click()
                        await (await this.calculatorInputs.spouseAnnualIncome()).setValue(initialData.spouseAnnualIncome)
                        await (await this.calculatorInputs.currentRetirementSavingsBalance()).click()
                        await (await this.calculatorInputs.currentRetirementSavingsBalance()).setValue(initialData.currentRetirementSavingsBalance)
                        await (await this.calculatorInputs.currentlySavingEachYearForRetirement()).click()
                        await (await this.calculatorInputs.currentlySavingEachYearForRetirement()).setValue(initialData.currentlySavingEachYearForRetirementRate)
                        await (await this.calculatorInputs.rateOfIncreaseYourSavingsEachYear()).click()
                        await (await this.calculatorInputs.rateOfIncreaseYourSavingsEachYear()).setValue(initialData.rateOfIncreaseYourSavingsEachYear)
                        break
                    case "retirementAge":
                        await browser.refresh() //Before each case
                        await (await this.calculatorInputs.currentAge()).setValue(initialData.currentAge)
                        //Setting field to empty
                        await (await this.calculatorInputs.retirementAge()).setValue(fieldValueToEmpty)
                        await (await this.calculatorInputs.currentAnnualIncome()).click()
                        await (await this.calculatorInputs.currentAnnualIncome()).setValue(initialData.currentAnnualIncome)
                        await (await this.calculatorInputs.spouseAnnualIncome()).click()
                        await (await this.calculatorInputs.spouseAnnualIncome()).setValue(initialData.spouseAnnualIncome)
                        await (await this.calculatorInputs.currentRetirementSavingsBalance()).click()
                        await (await this.calculatorInputs.currentRetirementSavingsBalance()).setValue(initialData.currentRetirementSavingsBalance)
                        await (await this.calculatorInputs.currentlySavingEachYearForRetirement()).click()
                        await (await this.calculatorInputs.currentlySavingEachYearForRetirement()).setValue(initialData.currentlySavingEachYearForRetirementRate)
                        await (await this.calculatorInputs.rateOfIncreaseYourSavingsEachYear()).click()
                        await (await this.calculatorInputs.rateOfIncreaseYourSavingsEachYear()).setValue(initialData.rateOfIncreaseYourSavingsEachYear)
                        break
                    case "currentAnnualIncome":
                        await browser.refresh() //Before each case
                        await (await this.calculatorInputs.currentAge()).setValue(initialData.currentAge)
                        await (await this.calculatorInputs.retirementAge()).setValue(initialData.retirementAge)
                        //Setting field to empty
                        await (await this.calculatorInputs.currentAnnualIncome()).click()
                        await (await this.calculatorInputs.currentAnnualIncome()).setValue(fieldValueToEmpty)
                        await (await this.calculatorInputs.spouseAnnualIncome()).click()
                        await (await this.calculatorInputs.spouseAnnualIncome()).setValue(initialData.spouseAnnualIncome)
                        await (await this.calculatorInputs.currentRetirementSavingsBalance()).click()
                        await (await this.calculatorInputs.currentRetirementSavingsBalance()).setValue(initialData.currentRetirementSavingsBalance)
                        await (await this.calculatorInputs.currentlySavingEachYearForRetirement()).click()
                        await (await this.calculatorInputs.currentlySavingEachYearForRetirement()).setValue(initialData.currentlySavingEachYearForRetirementRate)
                        await (await this.calculatorInputs.rateOfIncreaseYourSavingsEachYear()).click()
                        await (await this.calculatorInputs.rateOfIncreaseYourSavingsEachYear()).setValue(initialData.rateOfIncreaseYourSavingsEachYear)
                        break
                    case "currentRetirementSavingsBalance":
                        await browser.refresh() //Before each case
                        await (await this.calculatorInputs.currentAge()).setValue(initialData.currentAge)
                        await (await this.calculatorInputs.retirementAge()).setValue(initialData.retirementAge)
                        await (await this.calculatorInputs.currentAnnualIncome()).click()
                        await (await this.calculatorInputs.currentAnnualIncome()).setValue(initialData.currentAnnualIncome)
                        await (await this.calculatorInputs.spouseAnnualIncome()).click()
                        await (await this.calculatorInputs.spouseAnnualIncome()).setValue(initialData.spouseAnnualIncome)
                        //Setting field to empty
                        await (await this.calculatorInputs.currentRetirementSavingsBalance()).click()
                        await (await this.calculatorInputs.currentRetirementSavingsBalance()).setValue(fieldValueToEmpty)
                        await (await this.calculatorInputs.currentlySavingEachYearForRetirement()).click()
                        await (await this.calculatorInputs.currentlySavingEachYearForRetirement()).setValue(initialData.currentlySavingEachYearForRetirementRate)
                        await (await this.calculatorInputs.rateOfIncreaseYourSavingsEachYear()).click()
                        await (await this.calculatorInputs.rateOfIncreaseYourSavingsEachYear()).setValue(initialData.rateOfIncreaseYourSavingsEachYear)
                        break
                    // Add cases for other keys as needed
                    default:
                        // Handle the default case (if any)
                        console.log(`Unknown Key: ${key}`);
                }
            }
            //Common to all cases
            await (await this.calculatorInputs.calculateButton()).click()
            //Not required as such. Just that it is easier to view the interaction in UI
            await (await this.pageSelectors.requiredFieldsErrorMessage()).scrollIntoView(
                {
                    behavior: 'smooth', // or 'smooth' for smooth scrolling
                    block: 'center',  // Vertically align the element to the center
                    //inline: 'center', // Horizontally align the element to the center
                }
            )
            //Verify for error message
            expect(await this.pageSelectors.requiredFieldsErrorMessage()).toBeDisplayed()
        }
    }

    get defaultValuesDialogBox() {
        return {
            //Using this element to move the box in the view
            defaultCalculatorValuesBox: () => validators.waitForElement("//label[contains(text(),'How much are you currently saving each year for re')]"),
            adjustDefaultValuesButton: () => validators.waitForElement("//a[normalize-space()='Adjust default values']"),
            otherIncomeDuringRetirement: () => validators.waitForElement("//input[@id='additional-income']"),
            yearsDependOnRetirementIncome: () => validators.waitForElement("//input[@id='retirement-duration']"),
            postRetirementIncomeAdjustToInflationRadioButtonYes: () => validators.waitForElement("//label[@for='include-inflation']"),
            postRetirementIncomeAdjustToInflationRadioButtonNo: () => validators.waitForElement("//label[@for='exclude-inflation']"),
            expectedInflationRate: () => validators.waitForElement("//input[@id='expected-inflation-rate']"),
            expectedAnnualIncomeInRetirement: () => validators.waitForElement("//input[@id='retirement-annual-income']"),
            //Using it to scroll the bottom half in to view
            investmentExpectationTitle: () => validators.waitForElement(" //h2[normalize-space()='Investment expectations']"),
            preRetirementInvestmentReturn: () => validators.waitForElement("//input[@id='pre-retirement-roi']"),
            postRetirementInvestmentReturn: () => validators.waitForElement("//input[@id='post-retirement-roi']"),
            savedChangesButton: () => validators.waitForElement("//button[normalize-space()='Save changes']"),
            cancelButton: () => validators.waitForElement("//button[normalize-space()='Cancel']"),
        };
    }


    async enterDefaultValues_001(otherIncomeDuringRetirement: string,
                                 yearsDependOnRetirementIncome: string,
                                 preRetirementInvestmentReturn: string,
                                 postRetirementInvestmentReturn: string,
                                 expectedAnnualIncomeInRetirement: string,
                                 //Optional parameters
                                 //Toggle to Yes or No
                                 postRetirementIncomeAdjustToInflationRadioButtonToggle: string ="No",
                                 //Set to Zero for default
                                 expectedInflationRate: string = "10"
    ) {
        await browser.pause(1000)
        await (await this.defaultValuesDialogBox.defaultCalculatorValuesBox()).scrollIntoView(
            {
                behavior: 'smooth', // or 'smooth' for smooth scrolling
                block: 'center',  // Vertically align the element to the center
                //inline: 'center', // Horizontally align the element to the center
            }
        )
        //await browser.pause(5000)
        await (await this.defaultValuesDialogBox.adjustDefaultValuesButton()).click()
        await (await this.defaultValuesDialogBox.otherIncomeDuringRetirement()).click()
        await (await this.defaultValuesDialogBox.otherIncomeDuringRetirement()).setValue(otherIncomeDuringRetirement)
        await (await this.defaultValuesDialogBox.yearsDependOnRetirementIncome()).click()
        await (await this.defaultValuesDialogBox.yearsDependOnRetirementIncome()).setValue(yearsDependOnRetirementIncome)
        //Does your post-retirement income increase with inflation?
        if (postRetirementIncomeAdjustToInflationRadioButtonToggle == "Yes") {
            await (await this.defaultValuesDialogBox.postRetirementIncomeAdjustToInflationRadioButtonYes()).click()
            await browser.pause(2000) //Required for a slight pause for the next element
                //Enter the Expected Inflation rate
                await (await this.defaultValuesDialogBox.expectedInflationRate()).click()
                await (await this.defaultValuesDialogBox.expectedInflationRate()).setValue(expectedInflationRate)
        }
        else {
            await (await this.defaultValuesDialogBox.postRetirementIncomeAdjustToInflationRadioButtonNo()).click()
        }
        await (await this.defaultValuesDialogBox.expectedAnnualIncomeInRetirement()).click()
        await (await this.defaultValuesDialogBox.expectedAnnualIncomeInRetirement()).setValue(expectedAnnualIncomeInRetirement)
        await (await this.defaultValuesDialogBox.preRetirementInvestmentReturn()).click()
        await (await this.defaultValuesDialogBox.preRetirementInvestmentReturn()).setValue(preRetirementInvestmentReturn)
        await (await this.defaultValuesDialogBox.postRetirementInvestmentReturn()).click()
        await (await this.defaultValuesDialogBox.postRetirementInvestmentReturn()).setValue(postRetirementInvestmentReturn)
        await (await this.defaultValuesDialogBox.savedChangesButton()).click()
        //await (await this.defaultValuesDialogBox.cancelButton()).click()
    }

}
export default new PreRetirementCalculator()