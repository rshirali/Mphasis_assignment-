const { timeout } = require("../ui/constants");

module.exports = {
  getTable: (baseSelector) => {
    baseSelector.waitForDisplayed(timeout);
    const table = {};
    let headerCols = baseSelector.$$("//thead/tr/td");
    if (headerCols.length == 0) {
      headerCols = baseSelector.$$("//thead/tr/th");
    }
    table.headers = headerCols.map((th) => {
      th.waitForExist(1000);
      if (th.getText() !== undefined) return th.getText();
      return null;
    });

    table.rows = baseSelector.$$("tr").map((tr) => {
      const td = tr.$$("td").map((column) => {
        if (column.getText().includes("\n")) {
          const data = column.getText().split("\n");
          if (data.length > 2) {
            return {
              data,
              selector: column,
            };
          }

          return {
            label: data[0],
            value: data[1],
            selector: column,
          };
        }
        return {
          label: column.getText(),
          selector: column,
        };
      });

      return {
        selector: tr,
        rowData: td,
      };
    });

    return table;
  },

  retrieveHeaders: (baseSelector) => {
    var headers = baseSelector.$$("//thead/tr/th");
    const thArray = [];
    for (var i = 0; i < headers.length; i++) {
      var header = headers[i].getText();
      thArray.push(header);
    }
    return thArray;
  },

  retrieveTextFromTable: (rowNum, colNum) =>
    $("//table/tbody/tr[" + rowNum + "]/td[" + colNum + "]").getText(),

  getNthRowFromTable: (nth, tableObject) => tableObject.rows[nth].rowData,

  getNthColumnFromTable: (nth, tableObject) =>
    tableObject.rows.map((row) => row.rowData[nth]),
};
