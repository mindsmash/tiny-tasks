import {AppPage} from './app.po';
import {by, element} from "protractor";

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to TinyTasks!');
  });

  it('should have add button', () => {
    page.navigateTo();
    expect(page.getButtonAdd().isElementPresent).toBeTruthy();
  });

  it('should have clear button', () => {
    page.navigateTo();
    expect(page.getButtonClear().isElementPresent).toBeTruthy();
  });

  it('should have input', () => {
    page.navigateTo();
    expect(page.getInput().isElementPresent).toBeTruthy();
  });

  it('should have one task', () => {
    page.navigateTo();

    page.getInput().click();
    // page.getInput().clear();
    page.getInput().sendKeys("ola");

    page.getButtonAdd().click();

    let list = element.all(by.css('.task-row'));
    expect(list.count()).toBe(1);
  });

});
