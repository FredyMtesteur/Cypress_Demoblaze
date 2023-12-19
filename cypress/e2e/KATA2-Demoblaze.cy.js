/// <reference types="cypress" />

// Installation de Faker
// Taper dans le terminal : npm install --save-dev @faker-js/faker

//Var faker
const { faker } = require("@faker-js/faker"); //Déclaration bibliothèque Faker dans la constante faker
let username = faker.internet.userName();
let password = faker.internet.password();
let lastname = faker.person.lastName();
let country = faker.location.country();
let city = faker.location.city();
let creditCard = faker.finance.creditCardNumber("Visa");
let month = faker.number.int({ min: 1, max: 12 });
let year = faker.number.int({ min: 2023, max: 2026 });

// Var Article
let art; //Description
let artIndex; //Position index
let artUrl; //url index
let valPrice; //Price value
let textPrice; //Price text
let totalPrice; //Total price of cart

//Before
before("Site access", () => {
  cy.visit("https://www.demoblaze.com");
});

describe("Demoblaze.com", () => {
  it("Sign up", () => {
    cy.signup(username, password); //Personnal Sign up
  });

  it.skip("Log in", () => {
    //skip because Sign up = Log in // testIsolation: false -> One visit for all scenarios
    cy.login(username, password); //Personnal Log in
    cy.get("#nameofuser")
      .should("be.visible")
      .and("have.text", "Welcome" + " " + username); //Assertion Welcome user message
  });

  it("Select and add first article to cart", () => {
    //Var
    art = "Samsung galaxy s7";
    artIndex = 3;
    artUrl = artIndex + 1;
    valPrice = 800;
    totalPrice = valPrice;
    textPrice = "$" + valPrice;
    //Select
    cy.artSelect(art, artIndex, textPrice, artUrl); //Personnal Article select
    //Add to cart
    cy.addToCart(); //Personnal Add to cart
  });

  it("Verify First article in cart", () => {
    cy.goToCart(totalPrice, art, valPrice); //Personnal Go to cart
  });

  it("Return at Home page", () => {
    cy.get(".active > .nav-link").should("be.visible").click(); //Return to home page
    cy.wait(1000);
    cy.url().should("include", "/index.html"); //index url
  });

  it("Select and add second article to cart", () => {
    //Var
    art = "HTC One M9";
    artIndex = 6;
    artUrl = artIndex + 1;
    valPrice = 700;
    totalPrice += valPrice;
    textPrice = "$" + valPrice;
    //Select
    cy.artSelect(art, artIndex, textPrice, artUrl); //Personnal Article select
    //Add to cart
    cy.addToCart(); //Personnal Add to cart
  });

  it("Verify second article in cart", () => {
    cy.goToCart(totalPrice, art, valPrice); //Personnal Go to cart
  });

  it("Place order from cart", () => {
    cy.get(".col-lg-1 > .btn")
      .should("be.visible")
      .and("have.text", "Place Order")
      .click(); //click to place order
    cy.wait(1000);
    //Place order Form
    cy.get("#name").should("be.visible").type(lastname); //Form name
    cy.get("#country").should("be.visible").type(country); //Form country
    cy.get("#city").should("be.visible").type(city); //Form city
    cy.get("#card").should("be.visible").type(creditCard); //Form credit card number
    cy.get("#month").should("be.visible").type(month); //Form month
    cy.get("#year").should("be.visible").type(year); //Form year
  });

  it("Purchase", () => {
    cy.contains("Purchase").should("be.visible").click(); //Click to purchase
    cy.wait(1000);
    cy.get("#country").should("be.visible").and("have.value", country);
    cy.get(".sweet-alert > h2")
      .should("be.visible")
      .and("have.text", "Thank you for your purchase!");
    cy.get(".lead")
      .should("be.visible")
      .and("include.text", creditCard)
      .and("include.text", lastname);
    //Confirm Purchase
    cy.get(".confirm").should("be.visible").click();
    cy.wait(1000);
    cy.url().should("include", "/index.html"); //index url
  });

  //After
  after("Site access", () => {
    cy.visit("https://www.demoblaze.com");
  });
});
