/// <reference types="cypress" />

// Installation de Faker
// Taper dans le terminal : npm install --save-dev @faker-js/faker

//Var
const { faker } = require("@faker-js/faker"); //Déclaration bibliothèque Faker dans la constante faker

let username = faker.internet.userName();
let password = faker.internet.password();
let lastname = faker.person.lastName();
let country = faker.location.country();
let city = faker.location.city();
let creditCard = faker.finance.creditCardNumber("Visa");
let month = faker.number.int({ min: 1, max: 12 });
let year = faker.number.int({ min: 2023, max: 2026 });

//let email = faker.internet.email({ firstName: firstname, lastName: lastname });

// Prérequis
beforeEach("Accès au site", () => {
  //visiter le site
  cy.visit("https://www.demoblaze.com");
});

// Var
const art1 = "Samsung galaxy s7";
const art1Price = "$800";
const val1Price = 800;

describe("Demoblaze", () => {
  it("Sign up", () => {
    cy.signup(username, password); //Personnal command in commands.js // autocompletion in support/index.d.ts
  });
  it("e2e commands articles", () => {
    //Log in
    cy.login(username, password); //Personnal command in commands.js // autocompletion in support/index.d.ts
    cy.get("#nameofuser")
      .should("be.visible")
      .and("have.text", "Welcome" + " " + username); //Assertion Welcome user message

    //Art1
    //Select art1
    cy.get(":nth-child(4) > .card > .card-block > .card-title > .hrefch")
      .should("be.visible")
      .and("have.text", art1); //Intitulate
    cy.get(":nth-child(4) > .card > .card-block > h5")
      .should("be.visible")
      .and("have.text", art1Price); //Price
    cy.get(":nth-child(4) > .card > :nth-child(1) > .card-img-top")
      .should("be.visible")
      .click(); //Select by Image
    //Description of art1
    cy.url().should("include", "/prod.html?idp_=4"); //url for description
    cy.get(".name").should("be.visible").and("have.text", art1);
    cy.get(".price-container")
      .should("be.visible")
      .and("have.text", art1Price + " " + "*includes tax"); //Price
    cy.get(".col-sm-12 > .btn")
      .should("be.visible")
      .and("have.text", "Add to cart")
      .click(); //Click to Add to cart

    //Go to cart
    cy.get("#cartur").should("be.visible").and("have.text", "Cart").click(); //click to cart
    cy.url().should("include", "/cart.html"); //url for cart
    //Art1
    cy.get(".success > :nth-child(2)")
      .should("be.visible")
      .and("have.text", art1); //Intitulate art1
    cy.get(".success > :nth-child(3)")
      .should("be.visible")
      .and("have.text", val1Price); //Value price art1
    cy.get("#totalp").should("be.visible").and("have.text", val1Price); //Total Value price
    //Art2

    //Order from cart
    cy.get(".col-lg-1 > .btn")
      .should("be.visible")
      .and("have.text", "Place Order")
      .click(); //click to place order
    cy.wait(2000);
    //Place order Form
    cy.get("#totalm")
      .should("be.visible")
      .and("have.text", "Total:" + " " + val1Price); //Value price art1
    cy.get("#name").should("be.visible").type(lastname); //Form name
    cy.get("#country").should("be.visible").type(country); //Form country
    cy.get("#city").should("be.visible").type(city); //Form city
    cy.get("#card").should("be.visible").type(creditCard); //Form credit card number
    cy.get("#month").should("be.visible").type(month); //Form month
    cy.get("#year").should("be.visible").type(year); //Form year
    cy.get(
      "#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary"
    )
      .should("be.visible")
      .click(); //Click to purchasse
    cy.wait(2000);
  });
});
