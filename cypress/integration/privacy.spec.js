//Abre diretamente pagina privacy e valida se existe o texto

Cypress._.times(3, function() { //realiza o teste por 3 vezes
it('testa a página da política de privacidade de forma independente', function() {
    cy.visit('src/privacy.html')
    
    cy.contains('Talking About Testing').should('be.visible')      
   })

})