const fs = require("fs");
const path = require("path");
const { timeout } = require("../helpers/ui/constants");

class FileDownloads {
  get fileDownloads() {
    return path.resolve("fileDownloads");
  }

  rmDir(dirPath, removeSelf) {
    let files;
    if (removeSelf === undefined) {
      removeSelf = true;
    }
    try {
      files = fs.readdirSync(dirPath);
    } catch (e) {
      return;
    }
    if (files.length > 0) {
      for (let i = 0; i < files.length; i += 1) {
        const filePath = `${dirPath}/${files[i]}`;
        if (fs.statSync(filePath).isFile()) {
          fs.unlinkSync(filePath);
        } else {
          this.rmDir(filePath);
        }
      }
    }
    if (removeSelf) {
      fs.rmdirSync(dirPath);
    }
  }

  downloadFile(selector, fileName) {
    const filePath = `${this.fileDownloads}/${fileName}`;
    if (selector) {
      selector.waitForExist(timeout);
      selector.click();
    }

    let exists;
    browser.waitUntil(
      () => {
        exists = fs.existsSync(filePath);
        return exists;
      },
      timeout,
      "File failed to download or link failed to click"
    );

    // Cleaning up file download
    this.rmDir(this.fileDownloads, true);
    return exists;
  }
}
module.exports = new FileDownloads();
