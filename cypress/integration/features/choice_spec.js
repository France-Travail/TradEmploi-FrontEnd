describe('Choice', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.url().should('include', '/auth')
        cy.get('#mat-input-0')
        .type('agent-test@pe.fr')
        cy.get('#mat-input-1')
        .type('C2h@7p8z7VM')
        cy.contains('SE CONNECTER').click().wait(3000)
        cy.url().should('include', '/choice')
    })

    it('SC_C_04: choice english', () => {
        cy.contains('LANGUE ANGLAIS').click()
        cy.url().should('include', '/translation')
        cy.get('#logout').click()
        cy.get('.logout-btn').click()
    })

    it('SC_C_05: choice english and listen', () => {
        cy.get('.speaker').eq(1).click().wait(3000)
        cy.contains('LANGUE ANGLAIS').click()
        cy.url().should('include', '/translation')
        cy.get('#logout').click()
        cy.get('.logout-btn').click()
    })

    it('SC_C_06_07_08: logout', () => {
        cy.get('#logout').click()
        cy.get('.cancel-btn').click()
        cy.url().should('include', '/choice')
        cy.get('#logout').click()
        cy.get('.logout-btn').click()
    })
    
})