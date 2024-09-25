Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Andre')
    cy.get('#lastName').type('Bonatto')
    cy.get('#email').type('teste@teste.com')
    cy.get('#phone').type('51999999999')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button','Enviar').click()
})