/// <reference types="cypress" />

//index.d.ts = Autocomplétion pour commandes perso (.d = declaration .ts = time script)

declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * Personnal command for authentification and login
         * @example cy.authentification(username, password)
         * @param username
         * @param password
         * assword
         */
        signup(username: string, password: string): Chainable<any>;
    }
}