const { timeout } = require("../ui/constants");

module.exports = {
  getTable: (baseSelector) => {
    baseSelector.waitForDisplayed(timeout);
    const table = {};
    let headerCols = baseSelector.$$("//thead/tr/th");
    if (headerCols.length == 0) {
      headerCols = baseSelector.$$("//thead/tr/th");
    }
    table.headers = headerCols.map((th) => {
      th.waitForExist(1000);
      if (th.getText() !== undefined) return th.getText();
      return null;
    });

    table.rows = $$("tr").map((tr) => {
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

  getNthRowFromTable: (nth, tableObject) => tableObject.rows[nth].rowData,

  getNthColumnFromTable: (nth, tableObject) =>
    tableObject.rows.map((row) => row.rowData[nth]),
};
