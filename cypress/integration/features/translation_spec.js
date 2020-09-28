describe('Translation component', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.url().should('include', '/auth')
        cy.get('#email')
        .type('agent-test@pe.fr')
        cy.get('#password')
        .type('C2h@7p8z7VM')
        cy.contains('SE CONNECTER').click()
        cy.url().should('include', '/choice')
        cy.contains('LANGUE ANGLAIS').click()
        cy.url().should('include', '/translation')
        cy.contains('LANGUE ANGLAIS').click()
        cy.url().should('include', '/translation')
    })

    it('SC_C_18: user translate french to english', () => {
        cy.get('#msg-wrapper-advisor').type('bonjour')
        cy.contains('ENVOYER').click()
        cy.contains('Hello')
        cy.get('#msg-wrapper-guest').type('thank you')
        cy.contains('SEND').click()
        cy.contains('Merci')
    })

    it('SC_C_19: user delete his sentence', () => {
        cy.get('#msg-wrapper-guest').type('hello')
        cy.get('.buttons > .delete').eq(0).click()
        cy.get('#msg-wrapper-guest')
        .should('have.value', '')
        cy.contains('SEND').click()
        cy.contains('Bonjour').should('not.exist')

    })

    it('SC_C_20: user delete his sentence from chat', () => {
        cy.get('#msg-wrapper-guest').type('hello')
        cy.contains('SEND').click()
        cy.get('.delete > img').eq(0).click()
        cy.contains('Bonjour').should('not.exist')
    })

    afterEach(() => {
        cy.get('#logout-header').click()
        cy.get('.logout-btn').click().wait(3000)
    })

})