/**
 * Selectors for menu items
 */
class FilterDialogBox {
    /**
     * define selectors using getter methods
     */

    async selectFilterColumn(columnName: string, filterTypeSelection: string, filterTo: string) {
        await browser.pause(2000);
        try {
            //Select the filter for a specific column
            const xpath = "//span[@role='presentation' and @class='ag-icon ag-icon-filter']"
            let elementsInRecord = await browser.$$(xpath)
            //For Status column which is the eight
            if (columnName === "ObjectID") {
                await elementsInRecord[14].click();
            }
            if (filterTypeSelection == "Contains") {
                const xpathContact = "//*[contains(text(), 'Contains')]"
                const default1 = await browser.$(xpathContact)
            }
            else {
                //await browser.pause(5000);
                //Select type of filter to apply
                const dropDownSelector = "//span[@class='ag-icon ag-icon-small-down']"
                let dropdown = await browser.$(dropDownSelector)
                if (await dropdown.isExisting()) {
                    await dropdown.click() //Mimic real world user interaction
                    const optionsXpath = "//div[@role='option' and @class='ag-list-item ag-select-list-item']"
                    const options = await dropdown.$$(optionsXpath)
                    const optionsLength = options.length
                    // Loop through the options to find the one with the matching text
                    for (let i = 0; i < optionsLength; i++) {
                        let text = await options[i].getText()
                        console.log("++++++++++++" + text)
                        if (await options[i].getText() === filterTypeSelection) {
                           //Select the filter type from the pull-down menu
                            await options[i].click()
                                break; // Exit the loop once we've found and selected the option
                        }
                    }
                }
            }
            //Set the value to filter to
            const filterSelector = "(//input[@class='ag-input-field-input ag-text-field-input' and @ref='eInput'])"
            let filter = await browser.$$(filterSelector)
            await browser.pause(3000)
            await filter[18].click()
            await filter[18].setValue(filterTo)
            await browser.pause(2000);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    async selectButton(buttonSelection: string) {
        let buttonXpath: string
        //let button: WebdriverIO.Element
        try {
            //Select button to click
            if (buttonSelection == "Apply"){
                buttonXpath = "//button[@type='submit']"
                console.log("+++++++++ " + buttonXpath)
            }
            const buttonElement = await browser.$(buttonXpath)
            await buttonElement.click()
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

}
export default new FilterDialogBox();
