describe('Rate Component', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.url().should('include', '/auth')
        cy.get('#mat-input-0')
        .type('agent-test@pe.fr')
        cy.get('#mat-input-1')
        .type('C2h@7p8z7VM')
        cy.contains('SE CONNECTER').click()
        cy.url().should('include', '/choice')
        cy.contains('LANGUE ANGLAIS').click()
        cy.url().should('include', '/translation')
        cy.get('#end-btn').click()
    })

    it('SC_C_17: user dont put value', () => {
        cy.get('#confirm-btn').click()
        cy.contains('ENVOYER')
        cy.get('body').click(0,0)
        cy.get('#logout').click()
        cy.get('.logout-btn').click()
    })

    it('SC_C_16: user put value', () => {
        cy.get('.star').eq(1).click()
        cy.get('.star').eq(6).click()
        cy.get('.question > textarea').type("test")
        cy.get('#confirm-btn').click()
        cy.url().should('include', '/thanks')
        cy.url().should('include', '/start')
        cy.url().should('include', '/auth')
    })

})