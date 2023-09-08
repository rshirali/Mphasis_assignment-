/**
 * test with page objects
 */
import preRetirementCalculator from "../page-objects/preRetirementCalculator.js";

describe('001_Verify Pre-retirement calculator', () => {
    it('Verify saving amount based on goals and plans for retirement years.' +
        'WITHOUT including Social Security income', async () => {
        await preRetirementCalculator.doCalculate_001(
            "35",
            "67",
            "50000", "20000",
            "200000", "15",
            "100"
    )
    })

    it('Verify saving amount based on your goals and plans for retirement years. ' +
        'Include Social Security income in the calculation', async () => {
        await browser.refresh()
        await preRetirementCalculator.doCalculate_001("35", "67",
            "50000", "20000",
            "200000", "15",
            "100",
            "Yes",
            "Married",
            "20000"
        )
    })

    it('Verify data entry in the Default calculator values dialog box ', async () => {
        await browser.refresh()
        await preRetirementCalculator.enterDefaultValues_001("3500", "25",
            "50", "10",
            "90", "Yes","6"
        )
    })
    //Continue from the test above to calculate
    it('Verify saving amount calculated based on data entered ' +
        'in the Default calculator values dialog box. ' +
        'Include Social Security income in the calculation', async () => {
        await preRetirementCalculator.doCalculate_001("39", "67",
            "70000", "40000",
            "200000", "15",
            "10",
            "Yes",
            "Married",
            "20000"
        )
    })
})