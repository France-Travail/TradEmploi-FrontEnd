describe('Navbar Component From Translate', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.url().should('include', '/auth')
        cy.get('#email')
        .type('admin-test@pe.fr')
        cy.get('#password')
        .type('CC2h@7p80z7VM')
        cy.contains('SE CONNECTER').click().wait(3000)
        cy.url().should('include', '/choice')
        cy.contains('LANGUE ANGLAIS').click()
        cy.url().should('include', '/translation')
    })

    it('SC_C_10: user click on choice', () => {
        cy.get('#choice-header').click()
        cy.url().should('include', '/choice')
    })

    it('SC_C_11: user click on share', () => {
        cy.get('#share-header').click()
        cy.get('.cancel-btn').click()
    })

    it('SC_C_15: user click on end', () => {
        cy.get('#end-btn')
        cy.get('body').click(0,0)
    })

    it('SC_C_15_A: user click on setting', () => {
        cy.get('#settings-header').click()
        cy.contains('retour').click()
    })

    afterEach(() => {
        cy.get('#logout-header').click()
        cy.get('.logout-btn').click()
    })

})

describe('Navbar Component From Choice', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.url().should('include', '/auth')
        cy.get('#email')
        .type('admin-test@pe.fr')
        cy.get('#password')
        .type('CC2h@7p80z7VM')
        cy.contains('SE CONNECTER').click().wait(3000)
        cy.url().should('include', '/choice')
    })

    it('SC_C_15_B: user click on setting', () => {
        cy.get('#settings-header').click()
        cy.contains('retour').click()
    })


    afterEach(() => {
        cy.get('#logout-header').click()
        cy.get('.logout-btn').click()
    })

})