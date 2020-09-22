describe('Navbar Component', () => {

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
    })

    it('SC_C_10: user click on choice', () => {
        cy.get('.navbar > #choice')
        cy.url().should('include', '/choice')
    })

    it('SC_C_11: user click on share', () => {
        cy.get('#share').click()
        cy.get('.share-btn')
        cy.get('.cancel-btn').click()
    })

    it('SC_C_15: user click on end', () => {
        cy.get('#end-btn').click()
        cy.get('body').click(0,0)
    })

    afterEach(() => {
        cy.get('#logout').click()
        cy.get('.logout-btn').click()
    })

})