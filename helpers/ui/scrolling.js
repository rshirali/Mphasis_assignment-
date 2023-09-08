class Scrolling {
    async scrollToTop() {
        await browser.execute(async () => {            
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
}  
  
  async scrollToElement(el) {
    await (await el).scrollIntoView();
    return await el;
  }
}

module.exports = new Scrolling();
