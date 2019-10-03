/// <reference types="Cypress" />

context('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should add a task', () => {
    cy.get('[data-cy=task-input]')
      .type('My task{enter}');
    cy.get('[data-cy=task-list]')
      .contains('My task');
  });
});
