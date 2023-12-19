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
  cy.wait(1000);
  cy.get("#sign-username").type(username).should("have.value", username); //username
  cy.get("#sign-password").type(password).should("have.value", password); //password
  cy.get("#signInModal")
    .find(".btn-primary")
    .should("have.text", "Sign up")
    .click({ force: true }); // Click Bt Sign up -> Valider
  cy.wait(1000);
});
Cypress.Commands.add("login", (username, password) => {
  cy.get("#login2").should("be.visible").click(); //Click Bt Log in //
  cy.wait(1000);
  cy.get("#loginusername").type(username).should("have.value", username); //username
  cy.get("#loginpassword").type(password).should("have.value", password); //password
  cy.get("#logInModal")
    .find(".btn-primary")
    .should("have.text", "Log in")
    .click(); // Click Bt Log in -> Valider
  cy.wait(1000);
});

Cypress.Commands.add("artSelect", (art, artIndex, textPrice, artUrl) => {
  cy.log("*** Select " | art | " ***");
  // Assertions
  cy.get(".card-block")
    .eq(artIndex)
    .find(".card-title")
    .should("be.visible")
    .and("have.text", art); //Intitulate
  cy.get(".card-block")
    .eq(artIndex)
    .find("h5")
    .should("be.visible")
    .and("have.text", textPrice); //Price
  cy.get(".card")
    .eq(artIndex)
    .find(".card-img-top")
    .should("be.visible")
    .click(); //Select by Image
  //Description of art1
  cy.log("*** Describe " | art | " ***");
  cy.url().should("include", "/prod.html?idp_=" + artUrl); //url for description
  cy.get(".name").should("be.visible").and("have.text", art);
  cy.get(".price-container")
    .should("be.visible")
    .and("have.text", textPrice + " " + "*includes tax"); //Price
});

Cypress.Commands.add("addToCart", () => {
  cy.log("*** Add to Cart ***");
  cy.get(".col-sm-12 > .btn")
    .should("be.visible")
    .and("have.text", "Add to cart")
    .click(); //Click to Add to cart
  cy.wait(1000);
});

Cypress.Commands.add("goToCart", (totalPrice, art, valPrice) => {
  cy.log("*** Go to Cart ***");
  cy.get("#cartur").should("be.visible").and("have.text", "Cart").click(); //click to cart
  cy.url().should("include", "/cart.html"); //url for cart
  cy.get("#totalp").should("be.visible").and("have.text", totalPrice); //Total Value price
  cy.get("#page-wrapper > .row")
    .should("include.text", art)
    .and("include.text", valPrice);
});
