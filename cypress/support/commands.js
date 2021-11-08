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
import firebase from "firebase";
import { auth } from "../../src/firebase"
import 'cypress-file-upload';

Cypress.Commands.add('login', (email, password) => {
    cy.log('login')
    cy.request({
        method:"POST",
        url:"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAEoBb1_fnHXoJEjA-ToUSR5aanufXVn3k",
        body : {
            email:email,
            password:password,
           //  returnSecreToken:true,
        }
        , 
   //  failOnStatus: false
    }).as("authLogin")
   
    cy.get('@authLogin').then(() => {

        cy.log("hello")
    })
    // .then(({body})=>{
    //     return cy.wrap(body.idToken)
    // })


    //cy.log({message:"hello"})
    // cy.setCookie("login",'command')
    //auth.signInWithEmailAndPassword(email, password)
    // .then(function(result){
    // return cy.wrap("m");
    // cy.setCookie('token', result.idToken)

    // });
    
    
})