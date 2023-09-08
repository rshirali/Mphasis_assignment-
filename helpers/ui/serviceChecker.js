const request = require("request-promise");
const xmlParser = require("xml2js").parseString;
const apiEnv = require("./env.config");

const Authentication = require("../helpers/api/cxhAuth");
const constants = require("../helpers/ui/constants");

function buildErrorStr(serviceName) {
  return `\n*** ${serviceName} is down, exiting ***\n`;
}

function resolveStatusCheck(resp, errorLog) {
  if (resp) {
    console.log(
      "\x1b[32m",
      `...Status: ${resp.statusMessage}`,
      "\x1b[0m",
      `...Elapsed time: ${resp.elapsedTime} ms`
    );
    return true;
  }
  console.error("\x1b[31m", errorLog, "\x1b[0m");
  process.exit(1);
  return false;
}

const Backends = Object.freeze({
  CXH: "cxh",
  EXH: "exh",
  AGRONOMY: "agronomy",
  CROPPLANNING: "cropPlanning",
});

const GetEndpoints = Object.freeze({
  // cxh endpoints
  ACCOUNTS: `/v1/accounts/${constants.dataLayer.account}`,
  CUSTOMERS: "/v1/employee/customers",
  HEALTH: "/healthCheck",
  INVOICES: `/v1/accounts/${constants.dataLayer.account}/invoices/`,
  NOTIFICATIONS: "/v1/notifications",
  USER: "/v1/user/find",
  DOWNLOAD_CSV: `/v1/accounts/${constants.dataLayer.account}/invoicesData?type=csv`,
  PRODUCTS: `/v1/accounts/${constants.dataLayer.account}/products`,
  // crop planning endpoints
  CROP_PLAN_FARMS: `/v3/crop-plan-farms?accountId=${constants.dataLayer.account}`,
  CROP_PLAN_PHASES: "/v1/crop-plan-phases",
  STATES: "/v3/geography/USA/states",
  CROPS: "/v1/growers",
  // exh endpoints
  EXH_LOGIN: "/login",
});

const ServiceChecker = {
  healthChecked: false,
  headers: null,

  async checkVantiv() {
    const xmlString = `<litleOnlineRequest version="11.2" xmlns="http://www.litle.com/schema" merchantId="7598494">
      <authentication>
        <user>CROPPROD</user>
        <password>%f7*ad3b%27b</password>
      </authentication>
      <registerTokenRequest id="99999" reportGroup="RG1" customerId='0156066'>
        <orderId>61</orderId>
        <echeckForToken>
        <accNum>1099999005</accNum>
        <routingNum>02100002</routingNum>
        </echeckForToken>
      </registerTokenRequest>
    </litleOnlineRequest>`;

    const options = {
      method: "POST",
      headers: "Content-Type:application/xml",
      url: "https://transact.vantivpostlive.com/vap/communicator/online",
      body: xmlString,
      simple: true,
      resolveWithFullResponse: true,
    };

    try {
      let parsedBody;
      const unparsedResp = await request(options);
      xmlParser(unparsedResp.body, (err, result) => {
        parsedBody = result;
      });
      if (parsedBody.litleOnlineResponse.$.message === "Valid Format") {
        return resolveStatusCheck(unparsedResp);
      }
    } catch (error) {
      // Just log and let the default return outside the catch exit the process
      console.error(`Vantiv error – ${error}`);
    }
    return resolveStatusCheck(undefined, buildErrorStr("Vantiv"));
  },

  async checkHealth(headers) {
    this.healthChecked = true;
    const options = {
      method: "GET",
      headers,
      url: `${process.env.API}${GetEndpoints.HEALTH}`,
      json: true,
      resolveWithFullResponse: true,
      time: true,
    };
    try {
      console.log(`\n...Doing a HealthCheck on ${process.env.API}`);
      const resp = await request(options);
      if (resp.body.message === "UP") {
        return resolveStatusCheck(resp);
      }
    } catch (error) {
      // Do Nothing in case we didn't encounter an error but didn't hit the conditional check above.
    }
    return resolveStatusCheck(undefined, buildErrorStr("CXH"));
  },

  async checkLogin(
    username = constants.emailId,
    password = constants.password,
    isEmployee = false
  ) {
    const cxhAuth = new Authentication();
    if (!this.healthChecked) await this.checkHealth(cxhAuth.getHeaders());

    try {
      console.log(
        `\n...Checking status of ${isEmployee ? "Employee " : ""}login`
      );
      const resp = await cxhAuth.signIn(username, password, isEmployee);
      if (!isEmployee) this.headers = cxhAuth.getHeaders(true);
      return resolveStatusCheck(resp);
    } catch (error) {
      console.error(`User: ${username} – ${error}`);
      return resolveStatusCheck(
        undefined,
        buildErrorStr(`${isEmployee ? "Employee Login" : "CXH Login"}`)
      );
    }
  },

  /**
   * Make a GET call to an endpoint. Endpoint is built from the base backend, and the slug provided.
   * Has branching logic for employee vs customer calls, and branching logic for each different
   * backend listed in Backends enum.
   * @param {String} slug : Ending of url for endpoint
   * @param {String} [backend] : Base domain for the backend we want to exercise.
   * Defaults to CXH API.
   * @param {String} [username] : Username to sign in to Authentication service
   * @param {String} [password] : Password to sign in to Authentication service
   * @param {Boolean} [isEmployee] : Whether call should be made as an employee or a customer.
   * Defaults to customer.
   */
  async checkGetEndpoint(
    slug,
    backend = Backends.CXH,
    username = constants.emailId,
    password = constants.password,
    isEmployee = false
  ) {
    const cxhAuth = new Authentication();
    if (!this.healthChecked) await this.checkHealth(cxhAuth.getHeaders());
    if (!this.headers || isEmployee)
      await cxhAuth.signIn(username, password, isEmployee);

    const options = {
      method: "GET",
      headers: isEmployee ? cxhAuth.getHeaders(true) : this.headers,
      url: null,
      json: true,
      resolveWithFullResponse: true,
      time: true,
    };

    if (backend === Backends.AGRONOMY) {
      options.url = `${process.env.API}${slug}`;
      options.headers["x-api-key"] = apiEnv.agronomyApiKey;
    } else if (backend === Backends.CROPPLANNING) {
      options.url = `${apiEnv.cropPlanningUrl}${slug}`;
      options.headers["x-api-key"] = apiEnv.cropPlanningApiKey;
    } else if (backend === Backends.EXH) {
      options.url = `${apiEnv.exhUrl}${slug}`;
      options.headers["x-api-key"] = apiEnv.exhApiKey;
    } else {
      // Default to CXH
      options.url = `${process.env.API}${slug}`;
      options.headers = isEmployee ? cxhAuth.getHeaders(true) : this.headers;
    }

    try {
      console.log(`\n...Checking status of ${slug}`);
      const resp = await request(options);
      return resolveStatusCheck(resp);
    } catch (error) {
      return resolveStatusCheck(
        undefined,
        `\n*** GET call to ${slug} failed, exiting ***`
      );
    }
  },
};

module.exports = { Backends, ServiceChecker, GetEndpoints };
