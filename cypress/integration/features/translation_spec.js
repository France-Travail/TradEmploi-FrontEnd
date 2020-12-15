describe('Translation component on mono', () => {

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
    })

    it('SC_C_18: advisor translate french to english', () => {
        cy.get('#msg-wrapper-advisor').type('bonjour')
        cy.contains('ENVOYER').click()
        cy.contains('Hello')
    })

    it('SC_C_19: advisor delete his sentence', () => {
        cy.get('#msg-wrapper-advisor').type('bonjour')
        cy.get('.buttons > .delete').eq(0).click()
        cy.contains('bonjour').should('not.exist')
    })

    it('SC_C_20: advisor delete his sentence sended', () => {
        cy.get('#msg-wrapper-advisor').type('bonjour')
        cy.contains('ENVOYER').click()
        cy.contains('Hello')
        cy.get('.message-sended > .delete').eq(0).click()
        cy.get('#msg-wrapper-advisor').should('have.value', '')
        cy.contains('Hello').should('not.exist')
    })

    it('SC_C_21: advisor edit his sentence sended', () => {
        cy.get('#msg-wrapper-advisor').type('bonjour')
        cy.contains('ENVOYER').click()
        cy.contains('Hello')
        cy.get('.incoming-message').eq(0).click()
        cy.get('#msg-wrapper-advisor').should('have.value', 'bonjour')
        cy.contains('Hello').should('not.exist')
    })


    it('SC_C_22: guest translate english to french', () => {
        cy.get('#msg-wrapper-guest').type('hello')
        cy.contains('SEND').click()
        cy.contains('Bonjour')
    })

    it('SC_C_23: guest delete his sentence', () => {
        cy.get('#msg-wrapper-guest').type('hello')
        cy.get('.buttons > .delete').eq(1).click()
        cy.contains('hello').should('not.exist')
    })

    it('SC_C_24: guest delete his sentence sended', () => {
        cy.get('#msg-wrapper-guest').type('hello')
        cy.contains('SEND').click()
        cy.contains('Bonjour')
        cy.get('.message-sended > .delete').eq(0).click()
        cy.get('#msg-wrapper-guest').should('have.value', '')
        cy.contains('Bonjour').should('not.exist')
    })

    it('SC_C_25: guest edit his sentence sended', () => {
        cy.get('#msg-wrapper-guest').type('hello')
        cy.contains('SEND').click()
        cy.contains('Bonjour')
        cy.get('.incoming-message').eq(0).click()
        cy.get('#msg-wrapper-guest').should('have.value', 'hello')
        cy.contains('Bonjour').should('not.exist')
    })

    afterEach(() => {
        cy.get('#logout-header').click()
        cy.get('.logout-btn').click()
        cy.url().should('include', '/start');
    })

})

describe('Translate Component on Multi Devices', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('include', '/auth');
        cy.get('#email').type('admin-test@pe.fr');
        cy.get('#password').type('CC2h@7p80z7VM');
        cy.contains('SE CONNECTER').click(); 
        cy.url().should('include', '/choice');
        cy.contains('LANGUE ANGLAIS').click();
        cy.url().should('include', '/translation');
        cy.get('#share-header').click();
        cy.get('.share-btn').click();
    });

    it('SC_C_26: advisor translate french to english', () => {
        cy.get('#msg-wrapper-advisor').type('bonjour')
        cy.contains('ENVOYER').click()
        cy.contains('bonjour')
    });
});