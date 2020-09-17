describe('One device', () => {

  it('translate french to english', () => {
    cy.visit('/')
    cy.url().should('include', '/auth')

    cy.get('#mat-input-0')
    .type('agent-test@pe.fr')

    cy.get('#mat-input-1')
    .type('C2h@7p8z7VM')

    cy.get('button').click().wait(3000);

    cy.url().should('include', '/choice')

    cy.contains('LANGUE ANGLAIS').click()
    cy.url().should('include', '/translation')

    cy.get('#msg-wrapper-advisor')
    .type('bonjour')
    .should('have.value', 'bonjour')

    cy.contains('ENVOYER').click()
    cy.contains('Hello')

    cy.get('#msg-wrapper-guest')
    .type('thank you')
    .should('have.value', 'thank you')
    cy.contains('SEND').click()
    cy.contains('Merci')

  })
})