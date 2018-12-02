import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display welcome message', () => {
    expect(page.getParagraphText()).toEqual('Welcome to TinyTasks!');
  });

  it('should reset task input on submit', () => {
    page.typeIntoTaskInput('test task');

    page.clickTaskInputSubmitButton();

    expect(page.getTaskInputText()).toEqual('');
  });
});
