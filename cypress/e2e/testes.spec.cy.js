 //estrutura basica
/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function() {

  //antes de cada teste executa o comando que esta nesta funcao
  beforeEach(function() {
     cy.visit('./src/index.html')
       })


  it('verifica o título da aplicação', function() {
      

      cy.title().should('be.equal','Central de Atendimento ao Cliente TAT') //busca o titulo da aplicação e verifica se esta correto!

  })

  //only so executa este bloco
  it('preenche os campos obrigatorios e envia os formulários',function(){
      const longText = 'Teste,teste,teste,teste,Teste,teste,teste,teste,Teste,teste,teste,teste,Teste,teste,teste,teste,Teste,teste,teste,teste,Teste,teste,teste,teste'

      cy.get('#firstName').type('nomeAleatorio')
      cy.get('#lastName').type('Filho')
      cy.get('#email').type('Rogerio@gmail.com')
      cy.get('#open-text-area').type(longText,{delay: 0}) //delay vai mais rapido

      cy.get('button[type="submit"]').click() //um botao, cujo o type'propriedade' e = ao valor " "

      cy.get('.success').should('be.visible')
  })
  
  it('erro ao enviar email com formatação errada',function(){
    
    cy.get('#firstName').type('nomeAleatorio')
    cy.get('#lastName').type('Filho')
    cy.get('#email').type('Rogerio,gmail.com')
    cy.get('#open-text-area').type('Texto') 

    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('campo de telefone continua vazio qnd preenchido com valor nao numerico',function(){

      //pega o id do telefone,digita um string no numero logo olha se o valor deu certo
      cy.get('#phone').type('acvsko').should('have.value','')//#id || .class
      
  })

  it('mensagem de erro quando o obrigatorio nao e preenchido',function(){
    //telefone passa a ser obrigatorio
    cy.get('#firstName').type('nomeAleatorio')
    cy.get('#lastName').type('Filho')
    cy.get('#email').type('Rogerio@gmail.com')
    cy.get('#phone-checkbox').check() //.click()
    cy.get('#open-text-area').type('Texto') 

    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')

  })

  it('clear limpa input ou campo de area',function(){
      //limpa os campos
      cy.get('#firstName').type('nomeAleatorio').should('have.value','nomeAleatorio').clear().should('have.value','') //verifica se tem esse valor
      cy.get('#lastName').type('Filho').should('have.value','Filho').clear().should('have.value','')
      cy.get('#email').type('Rogerio@gmail.com').should('have.value','Rogerio@gmail.com').clear().should('have.value','')
      cy.get('#phone').type('123456789').should('have.value','123456789').clear().should('have.value','')
  })

  it('acessa a aplicação e aperta o botao enviar sem preencher nada e aparece o |erro|',function(){
      cy.get('.button').click()
      cy.get('.error').should('be.visible')

  })


  //teste mais legivel preencher e enviar
  it('comando customizado',function(){
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible') //verifica se apareceu a mensagem de sucesso
  })

  //contains
  it('botao de enviar',function(){
      cy.contains('button','Enviar').click() //quer encontra um elemento que e um botao que tem um texto 'Enviar'
  })

  //select => pode seleciona pelo texto,valor,indice
//   it.only('botao de selecionar',function(){
//     cy.get('#product').select('Youtube').should('have.value','Youtube') //por texto
//     cy.get('#product').select('mentoria').should('have.value','mentoria') //value
//     cy.get('#product').select(1).should('have.value','blog') //indice

//   })


  //inputs do tipo radios
  it('valores do tipo radios/checkbox',function(){
    cy.Radios()
  })

  //.each => itera sobre uma lista (estrutura de array) cada um dos elementos
  //wrap => empacota alguma coisa para ultiliza mais para frente
  it('marca cada tipo de elemento',function() {
    cy.get('input[type="radio"]') //pega todos os radios
    .should('have.length',3) //comprimento
    .each(function($radio){  //pega cada um dos elementos radios.. each recebe uma funcao de callbeck que recebe como argumento cada um dos elementos que foi selecionado
        cy.wrap($radio).check()   //vai empacotar cada um desses radios e marca-los
        cy.wrap($radio).should('be.checked') //vai verifica se foi chequado(marcado)
    })

 })

 //marca e desmarca checkbox .check() do Cypress é usado para marcar uma caixa de seleção ou botão de opção 
      it('marca ambos checkbox e desmarca',function(){
        cy.get('input[type="checkbox"]').check().should('be.checked') //ve se ambos estao marcados
        .last() //marca o ultimo
        .uncheck() //desmarca
        .should('not.be.checked') //verifica se nao esta checado
      })


     //selecionando arquivos com cypress 
     it('selecionando arquivos da pasta',function(){

        cy.get('input[type="file"]#file-upload') //input do tipo file que tem o ID->file-upload
        .should('not.have.value') //nao tem nenhum valor
        .selectFile('./cypress/support/e2e.js') //seleciona o arquivo
        .should(function($input){
           expect($input[0].files[0].name).to.equal('e2e.js')

            //pego o input do tipo FILE,Verificou se tem algum valor,selecionou um arquivo com caminho,ve se o  1 input que retornou que o objeto files dele pega o 1 e verifica se o nome e igual ao arquivo
        })
     })


     it('seleciona um arquivo ex: drag and drop',function(){
        cy.get('input[type="file"]#file-upload') 
        .should('not.have.value') 
        .selectFile('./cypress/support/e2e.js',{action:'drag-drop'}) 
        .should(function($input){
            expect($input[0].files[0].name).to.equal('e2e.js')
        //continua tudo igual,oque muda é o drag-drop => simulação do tipo de arastar o arquivo no seletor
        })
        
     })


    //  it('seleciona um arquivo cuja a fixture foi dada',function(){
    //     cy.fixture('commands.js').as('ArquivoExemplo') //pega a fixture e põe como => arquivoExemplo || não precisa do caminho completo
    //     cy.get('input[type="file"]')
    //     .selectFile('@ArquivoExemplo')
    //     .should(function($input){
    //         expect($input[0].files[0].name).to.equal('@ArquivoExemplo')
    //     })
    //  })


     //Links
     it('abre em outra aba sem necessidade de click',function(){
        //pega a div e pega o elemento que contem o 'a'
        cy.get('#privacy a').should('have.attr','target','_blank') //ve se tem o atributo 'target' com valor '_blank'

     })

    it('entra no link',function(){
        //nao entra em outra pagina,a pagina abre na mesma..Da para fazer verificação
        cy.get('#privacy a')
        .invoke('removeAttr','target') //remove o atributo do tipo 'target'
        .click()
        cy.contains('Talking About Testing').should('be.visible') //verifica se o testo esta visivel
    })
 })
    
    


