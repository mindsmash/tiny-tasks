import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('tiny-root h1')).getText();
  }

  getButtonAdd() {
    return element(by.css('.add'));
  }

  getButtonClear() {
    return element(by.css('.clear'));
  }

  getInput() {
    return element(by.css('.inputText'));
  }

  getAllTaskRows() {
    return element.all(by.css('.task-row'));
  }
}
