describe('Choice component', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('include', '/auth');
    cy.get('#email').type('agent-test@pe.fr');
    cy.get('#password').type('C2h@7p8z7VM');
    cy.contains('SE CONNECTER').click();
    cy.url().should('include', '/choice');
  });

  it('SC_C_04: user click on english', () => {
    cy.contains('LANGUE ANGLAIS').click();
    cy.url().should('include', '/translation');
  });

  it('SC_C_05: user listen and click english', () => {
    cy.get('.speaker').eq(1).click();
    cy.contains('LANGUE ANGLAIS').click();
    cy.url().should('include', '/translation');
  });

  it('SC_C_06_07_08: logout', () => {
    cy.get('#logout-header').click();
    cy.get('.cancel-btn').click();
    cy.url().should('include', '/choice');
  });

  it('SC_C_09: user click other language', () => {
    cy.get('.more').click();
    cy.get('.mat-input-element').type('Argentina');
    cy.get('.mat-row').click();
    cy.url().should('include', '/translation');
  });

  afterEach(() => {
    cy.get('#logout-header').click();
    cy.get('.logout-btn').click();
    cy.url().should('include', '/start');
  });
});
