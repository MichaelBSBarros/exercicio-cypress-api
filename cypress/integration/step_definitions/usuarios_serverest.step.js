/// <reference types="cypress" />

import {Given, When, Then, And, Before, But} from 'cypress-cucumber-preprocessor/steps'
import {ServeRest} from '../../services/serverest.service'

When(`request {string} from /usuarios`, (userOptions) => {
	ServeRest.get_users(userOptions).then( get_response => {
		cy.wrap(get_response).as('Response')
	})
});

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


Then(`must be responsed the schema {string} with status {int}`, (schema, status) => {
	cy.get('@Response').then( res => {
		cy.contractValidation( res, schema, status ).then( valid => {
			expect(valid).to.be.true
			expect(res.status).to.equal(status)
			cy.log(res.body.message)
		})
	})
});

Then(`must return the message {string}`, (message) => {
	//cy.get('@Response').then( res => {
	//	expect(res.body.message).to.equal(message)
	//})
	cy.stepInDevelopment()
});
