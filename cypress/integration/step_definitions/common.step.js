/// <reference types="cypress" />

import {Given, When, Then, And, Before, But} from 'cypress-cucumber-preprocessor/steps'
import {ServeRest} from '../../services/serverest.service'

When(`request {string} from /usuarios`, (userOptions) => {
	ServeRest.get_users(userOptions).then( get_response => {
		cy.wrap(get_response).as('Response')
	})
});

Then(`must be responsed the schema {string} with status {int}`, (schema, status) => {
	cy.get('@Response').then( res => {
		cy.contractValidation( res, schema, status ).then( valid => {
			expect(valid).to.be.true
			expect(res.status).to.equal(status)
		})
	})
});

Then(`must return the property {string} with message {string}`, (property, message) => {
    cy.get('@Response').then( res => {
	    expect(res.body[property]).to.equal(message)
	})
})