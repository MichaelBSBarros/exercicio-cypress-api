/// <reference types="cypress" />

import {Given, When, Then, And, Before, But} from 'cypress-cucumber-preprocessor/steps'
import {ServeRest} from '../../services/serverest.service'

When(`sign in with users type {string}`, (typeUser) => {
	ServeRest.post_login(typeUser).then( post_response => {
        console.log(post_response)
        cy.wrap(post_response).as('Response')
        
	})
});


