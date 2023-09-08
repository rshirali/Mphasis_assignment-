const Components = require("../components");

module.exports = class DateHelper extends Components {
  constructor() {
    super();
  }
  //function for returning current date
  getTodayDate() {
    let todayDate = new Date();
    let dd = String(todayDate.getDate()).padStart(2, "0");
    let mm = String(todayDate.getMonth() + 1).padStart(2, "0");
    let yyyy = todayDate.getFullYear();
    todayDate = mm + "/" + dd + "/" + yyyy;
    return todayDate;
  }
  //function for returning date 30 days from current day
  getFutureDate() {
    var futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    var dd = String(futureDate.getDate()).padStart(2, "0");
    var mm = String(futureDate.getMonth() + 1).padStart(2, "0");
    var yyyy = futureDate.getFullYear();
    var futureDateString = mm + "/" + dd + "/" + yyyy;
    return futureDateString;
  }
  //function for converting date from format "Month-dd-yyyy" to "mm/dd/yyyy"
  getMonthFromString(mon) {
    var d = Date.parse(mon);
    var dd = String(new Date(d).getDate()).padStart(2, "0");
    var mm = String(new Date(d).getMonth() + 1).padStart(2, "0");
    var yyyy = String(new Date(d).getFullYear());
    var convertedDateString = mm + "/" + dd + "/" + yyyy;
    if (!isNaN(d)) {
      return convertedDateString;
    }
    return -1;
  }
};
