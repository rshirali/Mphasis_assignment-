exports.envConfig = (environment) => {
  const env = environment || process.env.ENV;
  switch (env) {
    case "LOCAL":
    case "local":
      this.url = "http://localhost:8080";
      this.apiKey = process.env.CXH_API_KEY_DEV;
      break;
    case "DEV":
    case "dev":
      this.url = "https://cxh-api.dev.cps-core.com";
      this.apiKey = process.env.CXH_API_KEY_DEV;
      this.agronomyUrl = "https://agronomy.dev.cps-core.com";
      this.agronomyApiKey = process.env.AGRONOMY_KEY_DEV;
      this.cropPlanningUrl = "https://crop-planning.dev.cps-core.com";
      this.cropPlanningApiKey = process.env.CROP_PLANNING_KEY_DEV;
      this.coreServicesUrl = "https://core-services.dev.cps-core.com";
      this.coreServicesApiKey = process.env.CORE_SERVICE_API_KEY_DEV;
      this.exhUrl = "https://exh-api.dev.cps-core.com";
      this.exhApiKey = process.env.EXH_API_KEY_DEV;
      break;
    case "SIT":
    case "sit":
      this.url = "https://cxh-api.sit.cps-core.com";
      this.apiKey = process.env.CXH_API_KEY_SIT;
      this.agronomyUrl = "https://agronomy.sit.cps-core.com";
      this.agronomyApiKey = process.env.AGRONOMY_KEY_SIT;
      this.cropPlanningUrl = "https://crop-planning.sit.cps-core.com";
      this.cropPlanningApiKey = process.env.CROP_PLANNING_KEY_SIT;
      this.coreServicesUrl = "https://core-services.sit.cps-core.com";
      this.coreServicesApiKey = process.env.CORE_SERVICE_API_KEY_SIT;
      this.exhUrl = "https://exh-api.sit.cps-core.com";
      this.exhApiKey = process.env.EXH_API_KEY_SIT;
      break;
    case "pre":
    case "PRE":
    case "preproduction":
      this.url = "https://cxh-api.pre.cps-core.com";
      this.apiKey = process.env.CXH_API_KEY_PRE;
      this.agronomyUrl = "https://agronomy.pre.cps-core.com";
      this.agronomyApiKey = process.env.AGRONOMY_KEY_PRE;
      this.cropPlanningUrl = "https://crop-planning.pre.cps-core.com";
      this.cropPlanningApiKey = process.env.CROP_PLANNING_KEY_PRE;
      this.coreServicesUrl = "https://core-services.pre.cps-core.com";
      this.coreServicesApiKey = process.env.CORE_SERVICE_API_KEY_PRE;
      this.exhUrl = "https://exh-api.pre.cps-core.com";
      this.exhApiKey = process.env.EXH_API_KEY_PRE;
      break;
    default:
      console.log("Invalid env specified.");
      break;
  }

  return {
    url: this.url,
    apiKey: this.apiKey,
    agronomyUrl: this.agronomyUrl,
    agronomyApiKey: this.agronomyApiKey,
    cropPlanningUrl: this.cropPlanningUrl,
    cropPlanningApiKey: this.cropPlanningApiKey,
    coreServicesUrl: this.coreServicesUrl,
    coreServicesApiKey: this.coreServicesApiKey,
    exhApiKey: this.exhApiKey,
  };
};
