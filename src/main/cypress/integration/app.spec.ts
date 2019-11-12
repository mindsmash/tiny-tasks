/// <reference types="Cypress" />

context('App', () => {
  const STORAGE_KEY = 'tiny.tasks';
  let tasksFromStorage = null;

  before(() => {
    cy.server();
    cy.route('GET', '/tasks', 'fixture:GET_tasks_blank');
    cy.visit('/');
    tasksFromStorage = window.localStorage.getItem(STORAGE_KEY);
    window.localStorage.removeItem(STORAGE_KEY)
  });

  after(() => {
    localStorage.setItem(STORAGE_KEY, tasksFromStorage)
  });


 it('should create a task', () => {
    cy.get('input[data-cy=task-input]').type('a new task');

    cy.route('POST', '/tasks', 'fixture:POST_tasks');
    cy.route('GET', '/tasks', 'fixture:GET_tasks_mock');
    cy.get('[data-cy=create-task-form]').submit();

    cy.get('[data-cy=open-task-list]').contains('a new task');
  });

  /*
  it('should set a task done', () => {

    cy.route('GET', '/tasks', 'fixture:GET_tasks_mock_done')

    cy.get('[data-cy=list-item]').within(() => {
      cy.get('[data-cy=toggle-task-done]').click();
    });

    cy.get('[data-cy=done-task-list]').contains('a new task');
  });
  */
});

