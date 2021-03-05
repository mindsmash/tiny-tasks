/// <reference types="Cypress" />

context('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Search task', () => {
    it('should create 3 tasks and filter them by a needle term', () => {
      cy.get('[data-cy=task-input').type('Task 1');
      cy.get('[data-cy=send').click();
  
      cy.get('[data-cy=task-input').type('Task 2');
      cy.get('[data-cy=send').click();
  
      cy.get('[data-cy=task-input').type('Task 3');
      cy.get('[data-cy=send').click();
  
      cy.get('[data-cy=task-list').find('.mat-list-item').should('have.length', 3);
  
      cy.get('[data-cy=search-input').type('Task 3');
      cy.get('[aria-label=Clear]').should('be.visible');
      cy.get('[data-cy=task-list').find('.mat-list-item').should('have.length', 1);
  
      cy.get('[aria-label=Clear]').click();
      cy.get('[data-cy=task-list').find('.mat-list-item').should('have.length', 3);
  
      cy.get('[data-cy=search-input').type('Test');
      cy.get('[data-cy=task-list').find('.mat-list-item').should('have.length', 0);

      cy.get('[aria-label=Clear]').click();
      cy.get('[data-cy=task-list').find('.mat-list-item').should('have.length', 3);
    })
  })
});
