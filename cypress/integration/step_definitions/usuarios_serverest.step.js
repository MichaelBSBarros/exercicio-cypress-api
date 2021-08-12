/// <reference types="cypress" />

import {Given, When, Then, And, Before, But} from 'cypress-cucumber-preprocessor/steps'
import {ServeRest} from '../../services/serverest.service'

When(`post users of type {string} from /usuarios`, (typeUser) => {
	ServeRest.post_users_by_type(typeUser).then( post_response => {
		console.log(post_response)
		cy.wrap(post_response).as('Response')
	})
});


When(`edit users of type {string} from /usuarios`, (typeUser) => {
	ServeRest.put_users_by_type(typeUser).then( put_response => {
		console.log(put_response)
		cy.wrap(put_response).as('Response')
	})
});


When(`delete users of type {string} from /usuarios`, (typeUser) => {
	ServeRest.delete_users(typeUser).then( delete_response => {
		console.log(delete_response)
		cy.wrap(delete_response).as('Response')
	})
});


Then(`must return the property {string} greater than {int}`, (property, comparativeValue) => {
    cy.get('@Response').then( res => {
	    expect(res.body[property]).to.greaterThan(comparativeValue)
	})
})


