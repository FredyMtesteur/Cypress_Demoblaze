// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//Personal command for authentification and login
Cypress.Commands.add("signup", (username, password) => {
  cy.get("#signin2").should("be.visible").click(); //Click Bt Sign up
  cy.wait(2000);
  cy.get("#sign-username").type(username).should("have.value", username); //username
  cy.get("#sign-password").type(password).should("have.value", password); //password
  cy.get(
    "#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary"
  )
    .should("have.text", "Sign up")
    .click({ force: true }); // Click Bt Sign up -> Valider
  cy.wait(2000);
});
Cypress.Commands.add("login", (username, password) => {
  cy.get("#login2").should("be.visible").click(); //Click Bt Log in
  cy.wait(2000);
  cy.get("#loginusername").type(username).should("have.value", username); //username
  cy.get("#loginpassword").type(password).should("have.value", password); //password
  cy.get(
    "#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary"
  )
    .should("have.text", "Log in")
    .click(); // Click Bt Log in -> Valider
  cy.wait(2000);
});
