const { argv } = require("yargs");
const path = require("path");

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
      console.log("*** No environment was specified, defaulting to dev ***");
      this.setClientEnvironment("dev");
    }
  }

  setClientEnvironment(env) {
    let baseUrl;
    let apiUrl;
    let exhApiUrl;
    let agronomyEmailId;
    let agronomyPassword;
    let agronomyOwner;
    let agronomyAccount;

    switch (env.toLowerCase()) {
      case "local":
        baseUrl = this.environments.local.baseUrl;
        apiUrl = this.environments.local.apiUrl;
        exhApiUrl = this.environments.local.exhApiUrl;
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
        agronomyEmailId = this.environments.dev.agronomy_emailId;
        agronomyPassword = this.environments.dev.agronomy_password;
        agronomyOwner = this.environments.dev.agronomy_owner;
        agronomyAccount = this.environments.dev.agronomy_account;
        break;

      case "sit":
        baseUrl = this.environments.sit.baseUrl;
        apiUrl = this.environments.sit.apiUrl;
        exhApiUrl = this.environments.sit.exhApiUrl;
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
        agronomyEmailId = this.environments.prod.agronomy_emailId;
        agronomyPassword = this.environments.prod.agronomy_password;
        agronomyOwner = this.environments.prod.agronomy_owner;
        agronomyAccount = this.environments.prod.agronomy_account;
        break;

      default:
        console.log(
          `${env} is not a valid environment. Please use one of the following (local, dev, stg, pre, prod)!`
        );
        break;
    }

    process.env.ENV = env;
    process.env.BASEURL = baseUrl;
    process.env.API = apiUrl;
    process.env.EXHAPI = exhApiUrl;
    process.env.AGRONOMY_EMAIL = agronomyEmailId;
    process.env.AGRONOMY_PASSWORD = agronomyPassword;
    process.env.AGRONOMY_OWNER = agronomyOwner;
    process.env.AGRONOMY_ACCOUNT = agronomyAccount;

    return {
      baseUrl,
      apiUrl,
      agronomyEmailId,
      agronomyPassword,
      agronomyOwner,
      agronomyAccount,
    };
  }

  setBrowser(arg) {
    const browsers = [
      "chrome",
      "firefox",
      "safari",
      "internet explorer",
      "iexplore",
      "android",
      "iPhone",
      "iPad",
      "headless",
    ];

    if (browsers.includes(arg.toLowerCase())) {
      this.setBrowserCapabilities(arg);
      process.env.BROWSER = arg;
    } else {
      console.log(`${arg} is not a valid browser.`);
    }
  }

  setBrowserCapabilities(arg) {
    const capabilities = {
      maxInstances: 1,
      browserName: arg,
      // the following args are no longer valid
      // applicationCacheEnabled: true,
      // loggingPrefs: {
      //   performance: 'ALL',
      //   browser: 'ALL',
      //   driver: 'ALL',
      // },
    };

    const pathToDownloads = path.resolve("fileDownloads");

    let binaryPath;
    if (arg === "chrome" || arg === "headless") {
      switch (process.platform) {
        case "darwin":
          binaryPath =
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
          break;
        case "linux":
          binaryPath = "/usr/bin/google-chrome";
          break;
        case "win32":
          binaryPath = "C:Program Files (x86)GoogleChromeApplicationchrome.exe";
          break;
        default:
          break;
      }
    }

    switch (arg.toLowerCase()) {
      case "headless":
        capabilities.browserName = "chrome";
        capabilities["goog:chromeOptions"] = {
          args: [
            "headless",
            "disable-gpu",
            "window-size=1920,1080",
            "no-sandbox",
            "disable-dev-shm-usage",
            "remote-debugging-port=9222",
            "proxy-server='direct://'",
            "proxy-bypass-list=*",
          ],
          binary: binaryPath,
          prefs: {
            "download.default_directory": pathToDownloads,
          },
        };
        // chromeOptions is no longer a valid arg, replaced with the above code
        // capabilities.chromeOptions = {
        //   args: [
        //     'headless',
        //     'disable-gpu',
        //     'window-size=1920,1080',
        //     'no-sandbox',
        //     'disable-dev-shm-usage',
        //     'remote-debugging-port=9222',
        //     "proxy-server='direct://'",
        //     'proxy-bypass-list=*',
        //   ],
        //   binary: binaryPath,
        //   perfLoggingPrefs: {
        //     enableNetwork: true,
        //     enablePage: true,
        //     traceCategories: 'toplevel',
        //   },
        //   prefs: {
        //     'download.default_directory': pathToDownloads,
        //   },
        // };
        break;
      case "chrome":
        capabilities["goog:chromeOptions"] = {
          args: ["disable-gpu", "no-sandbox", "disable-dev-shm-usage"],
          perfLoggingPrefs: {
            enableNetwork: true,
            enablePage: true,
            traceCategories: "toplevel",
          },
          prefs: {
            "download.default_directory": pathToDownloads,
          },
        };
        break;
      case "firefox":
        capabilities.marionette = true;
        capabilities["moz:firefoxOptions"] = { args: ["-headless"] };
        break;
      case "safari":
        capabilities.safariOptions = {};
        break;
      default:
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
      console.log(`${device} is not a valid device.`);
    }
  }

  generateReport(key, arg) {
    if (key) process.env.REPORT = true;
    if (arg === "open") process.env.OPENREPORT = true;
  }
}

module.exports = CustomArgs;
