/* DO NOT MODIFY THIS CODE UNLESS INSTRUCTED TO DO SO.
Modifying this code will break our Browserstack/Zephyr integration.
This function creates the session name for Browerstack based on the
session tags. If the session has a test case ID as a tag then the 
Browserstack session name updates to the test case ID, otherwise, the
session name is set to the scenario name.
*/

require("dotenv").config();

function createSessionName(scenario) {
  const firstScenarioTag = scenario.tags[1].name;
  const scenarioName = firstScenarioTag.includes("DIGQA")
    ? firstScenarioTag.slice(9)
    : scenario.name;
  return scenarioName;
}

module.exports = { createSessionName };
