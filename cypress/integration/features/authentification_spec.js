describe('Auth component', () => {

    it('SC_C_01: user connection OK', () => {
      cy.visit('/')
      cy.url().should('include', '/auth')
      cy.get('#mat-input-0')
      .type('agent-test@pe.fr')
      cy.get('#mat-input-1')
      .type('C2h@7p8z7VM')
      cy.contains('SE CONNECTER').click().wait(3000)
      cy.url().should('include', '/choice')
      cy.get('#logout').click()
      cy.get('.logout-btn').click()
  
    })

    it('SC_C_02: user connection KO', () => {
      cy.visit('/')
      cy.url().should('include', '/auth')
      cy.get('#mat-input-0')
      .type('agent-test@pe.fr')
      cy.get('#mat-input-1')
      .type('password error')
      cy.contains('SE CONNECTER').click().wait(3000)
      cy.url().should('include', '/auth')
      cy.contains('The password is invalid or the user does not have a password.')
  
    })

    it('SC_C_03: user try to connect with nothing values', () => {
      cy.visit('/')
      cy.url().should('include', '/auth')
      cy.contains('SE CONNECTER').should('be.disabled')
    })
    
})