import { NightwatchBrowser } from 'nightwatch'


module.exports = {
  before: function (browser: NightwatchBrowser, done: VoidFunction) {
    done()
  },
  'open app': function (browser: NightwatchBrowser) {
    browser
      //.waitForElementVisible('*[data-id="select_ide"]')
      .click('[data-id="select_ide"]')
      // select option
      .waitForElementVisible('*[data-id="select_ide"] option[value="http://localhost:8080"]')
      .click('*[data-id="select_ide"] option[value="http://localhost:8080"]')
      .pause(1000)
      .waitForElementVisible('*[data-id="startBtn"]')
      .click('*[data-id="startBtn"]')
      .pause()
      .end()
  }
}