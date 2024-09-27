/// <reference types="Cypress" />

//Define abrir a página index em todos os testes
describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000

    beforeEach(function() {
        cy.visit('src/index.html')
    })    

//Valida com o .should o titutlo da pagina
    it('verifica o titulo da aplicacao', function() { //
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

//Preenche todos os campos obrigatorios da pagina e envia o formulario
    
    it('preenche os campos obrigatorios e envia o formulario', function() {        
        const textArea = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut magna id augue sodales hendrerit. Morbi laoreet euismod euismod. Nam congue, diam non tempor condimentum'
        
        cy.clock()

        cy.get('#firstName').type('Andre')
        cy.get('#lastName').type('Bonatto')
        cy.get('#email').type('teste@teste.com',)
        cy.get('#open-text-area').type(textArea, {delay: 0})
        cy.contains('button','Enviar').click()        

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    })

//Preenche o campo de e-mail com formato invalido e valida se foi exibida mensagem de erro
    it('exibe mensagem de erro ao submeter o formularo com um email com formatacao invalida', function() {
        const textArea = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut magna id augue sodales hendrerit. Morbi laoreet euismod euismod. Nam congue, diam non tempor condimentum'
        
        cy.clock()
        
        cy.get('#firstName').type('Andre')
        cy.get('#lastName').type('Bonatto')
        cy.get('#email').type('teste@teste,com')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        
        cy.get('.success').should('not.be.visible')
    })

//Preenche o campo telefone com letras e valida se o campo permaneceu vazio
    it('campo telefone continua vazio quando preenchido com numero', function() {
        cy.get('#phone')
            .type('@bCdÉ')

            .should('have.value', '')
    })

//Quando marcado checkbox do campo telefone valida se o campo foi preenchido
    it('exibe mensagem de erro quando o telefone se torna obrigatorio mas não e preenchido antes do envio do formulario', function() {
        const textArea = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut magna id augue sodales hendrerit. Morbi laoreet euismod euismod. Nam congue, diam non tempor condimentum'

        cy.clock()

        cy.get('#firstName').type('Andre')
        cy.get('#lastName').type('Bonatto')
        cy.get('#email').type('teste@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type(textArea, {delay: 0})
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    })

//Preenche todos os campos obrigatorios, limpa e valida se estao vazios
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        const textArea = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut magna id augue sodales hendrerit. Morbi laoreet euismod euismod. Nam congue, diam non tempor condimentum'
        cy.get('#firstName')
            .type('Andre')
            .should('have.value', 'Andre')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Bonatto')
            .should('have.value', 'Bonatto')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('teste@teste.com')
            .should('have.value', 'teste@teste.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('51999999999')
            .should('have.value', '51999999999')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .type(textArea, {delay: 0})
            .should('have.value', textArea)
            .clear()
            .should('have.value', '')
    })

//Valida nao enviar formulario com campos vazios
    it('exibe mensagem de erro ao submeter o formulario sem preencher os campos obrigatorios', function() {
        
        cy.clock()
        
        cy.contains('button','Enviar').click()
        
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')


    })

//Envia formulario preenchendo campos obrigatorios utilizando comando criado em commands.js 
    it('envia o formulario com sucesso usando um comando customizado', function() {

        cy.clock()

        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    })

//Seleciona e valida se foi selecionado protudo YouTube atraves de texto
    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

//Seleciona e valida se foi selecionado protudo Mentoria atravez do valor
    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
            .select('mentoria')            
            .should('have.value', 'mentoria')        
    })

//Seleciona e valida se foi selecionado protudo Blog atraves do numero do indice
    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
            .select(1)            
            .should('have.value', 'blog')
    })

//Marca e valida radiobutton de Feedback
    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback')
            .check()            
            .should('have.value', 'feedback')
    })

//Cria um array marcando e validando cada radiobutton sequencialmente
    it('marca cada tipo de atendimento', function() {
    cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    
//Marca todos checkbox e valida depois desmarca o ultimo e valida se esta desmarcado
    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

//Valida se não foi anexado, anexa e valida se esta anexado
    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

//Valida se não foi anexado através de drag-drop, anexa e valida se esta anexado
    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

//Faz um alias do arquivo, upload e valida
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
        })      
    })

//Valida link para outra pagina sem clicar no link
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank' )
    })

//Abre outra aba na mesma janela clicando no link e valida se foi aberta
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target' )
            .click()

            cy.contains('Talking About Testing').should('be.visible')
    })

//Faz exibir as mensagens de sucesso, valida, esconde e valida novamente
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

//Simula uso de ctrl+v e valida o valor dentro do campo de texto
    it('preenche a area de texto usando o comando invoke', function() {
        const textArea =  Cypress._.repeat('Lorem ipsum dolor sit amet. ', 3)

        cy.get('#open-text-area')
            .invoke('val', textArea)
            .should('have.value', textArea)
    })

//Faz uma requisicao de rede e valida status, statusText e body
    it('faz uma requisição HTTP', function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response) {
                const { status, statusText, body } = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.contain('CAC TAT')

            })
    })

    it('encontra o gato escondido', function() {
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
        cy.get('#title')
            .invoke('text', 'ALERA O H1')

    })
})