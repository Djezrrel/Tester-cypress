//add novo comando
//coloca o nome do teste
Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    cy.get('#firstName').type('nomeAleatorio')
    cy.get('#lastName').type('Filho')
    cy.get('#email').type('Rogerio@gmail.com')
    cy.get('#open-text-area').type('teste') //delay vai mais rapido

    cy.get('button[type="submit"]').click()
}) 