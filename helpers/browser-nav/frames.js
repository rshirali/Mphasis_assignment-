class FrameNavigation {
  async switchToFrame(frameEl) {
    await (await frameEl).waitForEnabled({ timeout: 20000 });
    await browser.switchToFrame(await frameEl);
  }

  async waitForFrameElementInteractable(element) {
    await (await element).waitForClickable({ timeout: 20000 });
    return await element;
  }
}
module.exports = FrameNavigation;
