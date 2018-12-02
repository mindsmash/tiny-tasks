import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('tiny-root h1')).getText();
  }

  getTaskInputText() {
    return element(by.css('.task-input')).getAttribute('value');
  }

  typeIntoTaskInput(text: string) {
    element(by.css('.task-input')).sendKeys(text);
  }

  clickTaskInputSubmitButton() {
    element(by.buttonText('Add')).click();
  }
}
