class Session {
  getAllStorage() {
    return browser.getLocalStorage();
  }

  deleteAllStorage() {
    return browser.clearLocalStorage();
  }

  deleteByKey(key) {
    const searchKey = key.toLowerCase();
    return browser.clearLocalStorage(searchKey);
  }

  getItemByKey(key) {
    const searchKey = key.toLowerCase();
    return browser.getLocalStorage(searchKey);
  }

  storeData(keyName, data) {
    const postObject = {
      key: keyName,
      value: data,
    };

    return browser.setLocalStorage(postObject);
  }
}

module.exports = new Session();
