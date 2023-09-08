class TabNavigation {
  async switchToNewTab() {
    let openTabs = await browser.getWindowHandles();
    let newTab = await openTabs[openTabs.length - 1];
    await browser.switchToWindow(newTab);
  }

  async closeNewTabSwitchBack(timeout = 20000) {
    const firstTab = await browser.getWindowHandles()[0];
    await browser.closeWindow();
    await browser.waitUntil(
      async () => (await browser.getWindowHandles()).length === 1,
      timeout
    );
    await browser.switchToWindow(firstTab);
    await browser.waitUntil(
      async () => (await browser.getWindowHandle()) === firstTab,
      timeout
    );
  }
}
module.exports = TabNavigation;
