// describe('Other language', () => {

//     beforeEach(() => {
//         cy.visit('/')
//         cy.url().should('include', '/auth')
//         cy.get('#email')
//         .type('agent-test@pe.fr')
//     })

//     it('SC_C_18: user translate french to english', () => {
//         cy.fixture('vocabulary.json').as('languagesData').then( languages => {
//                 cy.wrap(languages).each(l => {
//                     cy.get('.more').click()
//                     cy.get('.mat-input-element').type(l.countryNameRaw)
//                     cy.get('.mat-row').eq(0).click()
//                     cy.url().should('include', '/translation')
//                     cy.get('#msg-wrapper-advisor').type('Ecrire ou prononcer la phrase à traduire')
//                     cy.contains('ENVOYER').click().wait(1000)
//                     // cy.get("#msg-translate-0").should('have.text', l.translationH2)
//                     // cy.get('#msg-wrapper-guest').type(l.translationH2)
//                     // cy.contains(l.send).click().wait(1000)
//                     // cy.get("#msg-translate-1").should('have.text', 'Écrivez ou dites la phrase pour la traduire')
//                     cy.get('#back-to-choice').click()
//                 })
//             }
//         )
//     })

// })