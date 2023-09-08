/* eslint-disable no-dupe-keys */
const { argv } = require("yargs");

class CustomArgs {
  constructor(environments) {
    this.environments = environments || null;
  }

  get argKeys() {
    return Object.keys(argv).slice(2);
  }

  processArgs() {
    this.argKeys.forEach((key) => {
      const arg = argv[key];

      switch (key.toLowerCase()) {
        case "environment":
        case "env":
          this.setClientEnvironment(arg);
          break;

        case "br":
        case "browser":
          this.setBrowser(arg);
          break;

        case "username":
        case "user":
          this.setUsername(arg);
          break;

        case "password":
        case "pass":
          this.setPassword(arg);
          break;

        case "device":
          this.setMobileDevice(arg);
          break;

        case "report":
        case "allure":
          this.generateReport(key, arg);
          break;

        case "employee_username":
        case "e_username":
          this.setEmployeeUsername(arg);
          break;

        case "employee_password":
        case "e_password":
          this.setEmployeePassword(arg);
          break;

        case "support_username":
        case "s_username":
          this.setSupportUsername(arg);
          break;

        case "support_password":
        case "s_password":
          this.setSupportPassword(arg);
          break;

        case "email":
          this.setEmailUsername(arg);
          break;

        case "email_password":
          this.setEmailPassword(arg);
          break;

        case "debug":
          process.env.DEBUG = true;
          break;

        default:
          break;
      }
    });
    if (!process.env.ENV) {
      // eslint-disable-next-line no-undef
      console.log("*** No environment was specified, defaulting to sit ***");
      this.setClientEnvironment("sit");
    }
  }

  setClientEnvironment(env) {
    let baseUrl;
    let apiUrl;
    let exhApiUrl;
    let graphqlUrl;
    let agronomyEmailId;
    let agronomyPassword;
    let agronomyOwner;
    let agronomyAccount;

    switch (env.toLowerCase()) {
      case "local":
        baseUrl = this.environments.local.baseUrl;
        apiUrl = this.environments.local.apiUrl;
        exhApiUrl = this.environments.local.exhApiUrl;
        graphqlUrl = this.environments.local.graphqlUrl;
        agronomyEmailId = this.environments.local.agronomy_emailId;
        agronomyPassword = this.environments.local.agronomy_password;
        agronomyOwner = this.environments.local.agronomy_owner;
        agronomyAccount = this.environments.local.agronomy_account;

        break;

      case "development":
      case "dev":
        baseUrl = this.environments.dev.baseUrl;
        apiUrl = this.environments.dev.apiUrl;
        exhApiUrl = this.environments.dev.exhApiUrl;
        graphqlUrl = this.environments.dev.graphqlUrl;
        agronomyEmailId = this.environments.dev.agronomy_emailId;
        agronomyPassword = this.environments.dev.agronomy_password;
        agronomyOwner = this.environments.dev.agronomy_owner;
        agronomyAccount = this.environments.dev.agronomy_account;
        break;

      case "sit":
        baseUrl = this.environments.sit.baseUrl;
        apiUrl = this.environments.sit.apiUrl;
        exhApiUrl = this.environments.sit.exhApiUrl;
        graphqlUrl = this.environments.sit.graphqlUrl;
        agronomyEmailId = this.environments.sit.agronomy_emailId;
        agronomyPassword = this.environments.sit.agronomy_password;
        agronomyOwner = this.environments.sit.agronomy_owner;
        agronomyAccount = this.environments.sit.agronomy_account;
        break;

      case "pre":
      case "preprod":
        baseUrl = this.environments.pre.baseUrl;
        apiUrl = this.environments.pre.apiUrl;
        exhApiUrl = this.environments.pre.exhApiUrl;
        graphqlUrl = this.environments.pre.graphqlUrl;
        agronomyEmailId = this.environments.pre.agronomy_emailId;
        agronomyPassword = this.environments.pre.agronomy_password;
        agronomyOwner = this.environments.pre.agronomy_owner;
        agronomyAccount = this.environments.pre.agronomy_account;
        break;

      case "production":
      case "prod":
        baseUrl = this.environments.prod.baseUrl;
        apiUrl = this.environments.prod.apiUrl;
        exhApiUrl = this.environments.prod.exhApiUrl;
        graphqlUrl = this.environments.prod.graphqlUrl;
        agronomyEmailId = this.environments.prod.agronomy_emailId;
        agronomyPassword = this.environments.prod.agronomy_password;
        agronomyOwner = this.environments.prod.agronomy_owner;
        agronomyAccount = this.environments.prod.agronomy_account;
        break;

      default:
        // eslint-disable-next-line no-undef
        console.log(
          `${env} is not a valid environment. Please use one of the following (local, dev, stg, pre, prod)!`
        );
        break;
    }

    process.env.ENV = env;
    process.env.BASEURL = baseUrl;
    process.env.API = apiUrl;
    process.env.EXHAPI = exhApiUrl;
    process.env.GRAPHQLAPI = graphqlUrl;
    process.env.AGRONOMY_EMAIL = agronomyEmailId;
    process.env.AGRONOMY_PASSWORD = agronomyPassword;
    process.env.AGRONOMY_OWNER = agronomyOwner;
    process.env.AGRONOMY_ACCOUNT = agronomyAccount;

    return {
      baseUrl,
      apiUrl,
      graphqlUrl,
      agronomyEmailId,
      agronomyPassword,
      agronomyOwner,
      agronomyAccount,
    };
  }

  setBrowser(arg) {
    const browsers = [
      "chrome",
      "chrome-headless",
      "firefox",
      "firefox-headless",
      "android",
      "ios",
      "safari",
      "internet explorer",
      "iexplore",
    ];

    if (browsers.includes(arg.toLowerCase())) {
      this.setBrowserCapabilities(arg);
      process.env.BROWSER = arg;
    } else {
      // eslint-disable-next-line no-undef
      console.log(`${arg} is not a valid browser.`);
    }
  }

  setBrowserCapabilities(arg) {
    let capabilities = {
      acceptInsecureCerts: true,
      browserName: arg,
    };

    switch (arg.toLowerCase()) {
      case "chrome":
        capabilities.browserName = "chrome";
        break;
      case "chrome-headless":
        capabilities.browserName = "chrome";
        capabilities["goog:chromeOptions"] = {
          args: ["--headless", "--disable-gpu", "--window-size=1280,800"],
        };
        break;
      case "firefox":
        capabilities.browserName = "firefox";
        break;
      case "firefox-headless":
        capabilities.browserName = "firefox";
        capabilities["moz:firefoxOptions"] = {
          args: ["-headless"],
        };
        break;
      case "safari":
        capabilities.safariOptions = {};
        break;
      case "android":
        capabilities = {
          maxInstances: 1,
          app: process.env.ANDROIDAPKFILE,
          appiumVersion: "6.12.1",
          appWaitForLaunch: true,
          autoGrantPermissions: true,
          autoAcceptAlerts: true,
          automationName: "UiAutomator2",
          deviceName: "Android Emulator",
          platformVersion: "11.0",
          pkg: "host.exp.exponent",
          intentAction: "android.intent.action.VIEW",
          activity: "host.exp.exponent.experience.HomeActivity",
          platformName: "Android",
          deviceName: "Android Emulator",
          disableWindowAnimation: true,
        };
        break;
      case "ios":
        capabilities = {
          maxInstances: 1,
          app: process.env.IOSAPPFILE,
          appiumVersion: "1.18.2",
          deviceName: "iPhone 11 Pro Max",
          platformVersion: "13.6",
          platformName: "iOS",
          automationName: "XCUITest",
          autoAcceptAlerts: "true",
        };
        break;
      default:
        // eslint-disable-next-line no-undef
        console.log(`${arg} is not a valid browser capability option!`);
        break;
    }

    process.env.CAPS = JSON.stringify(capabilities);
    return capabilities;
  }

  setUsername(username) {
    process.env.USER = username;
  }

  setPassword(password) {
    process.env.PASS = password;
  }

  setEmployeeUsername(username) {
    process.env.EMPLOYEE_USERNAME = username;
  }

  setEmployeePassword(password) {
    process.env.EMPLOYEE_PASSWORD = password;
  }

  setSupportUsername(username) {
    process.env.SUPPORT_USERNAME = username;
  }

  setSupportPassword(password) {
    process.env.SUPPORT_PASSWORD = password;
  }

  setEmailUsername(username) {
    process.env.EMAIL = username;
  }

  setEmailPassword(password) {
    process.env.EMAIL_PASSWORD = password;
  }

  setMobileDevice(device) {
    const devices = [
      "iPhone X",
      "iPhone 8",
      "iPhone 7",
      "Pixel 2",
      "Pixel 2 XL",
    ];

    if (devices.includes(device)) {
      process.env.DEVICE = device;
    } else {
      // eslint-disable-next-line no-undef
      console.log(`${device} is not a valid device.`);
    }
  }

  generateReport(key, arg) {
    if (key) process.env.REPORT = true;
    if (arg === "open") process.env.OPENREPORT = true;
  }
}

module.exports = CustomArgs;
