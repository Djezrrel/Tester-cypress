//add novo comando
//coloca o nome do teste
Cypress._.times(4,function(){ // =>excecuta o bloco a baixo 3x
Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    cy.get('#firstName').type('nomeAleatorio')
    cy.get('#lastName').type('Filho')
    cy.get('#email').type('Rogerio@gmail.com')
    cy.get('#open-text-area').type('teste') 

    cy.get('button[type="submit"]').click()
}) 
})

Cypress.Commands.add('Radios',function(){
    //metodo para pegar radio mais facil..input que tem um radio que tem um value com a sua propriedade.
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback') //verifica se o valor foi corretamente selecionado
})