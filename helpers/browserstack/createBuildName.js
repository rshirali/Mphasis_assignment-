/* DO NOT MODIFY THIS CODE UNLESS INSTRUCTED TO DO SO.
Modifying this code will break our Browserstack/Zephyr integration.
This function creates the build name for Browerstack. 
If this is a CI build, the build name will start with Browserstack-CI. 
If the build is not for the CI then it will be formatted to specify 
the QA's name, and device info. I.E. Kristi-Macbook-Web
*/

require("dotenv").config();

function createBuildName() {
  if (process.env.BUILD === `Browserstack-CI`) {
      return `${process.env.BUILD} ${new Date().toISOString()}`;
  } else {
      return `${process.env.DEV_USER}-${process.env.TEST_METADATA}-${process.env.DEVICE}`;
  }
}

module.exports = { createBuildName };
