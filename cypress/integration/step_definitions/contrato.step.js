/// <reference types="cypress" />

import {Given, When, Then, And, Before, But} from 'cypress-cucumber-preprocessor/steps'
import {ServeRest} from '../../services/serverest.service'

When(`request all users from /usuarios`, () => {
	ServeRest.get_all_users().then( get_response => {
		cy.wrap(get_response).as('Response')
	})
});

When(`post users of type {string} from /usuarios`, (typeUser) => {
	ServeRest.post_users_by_type(typeUser).then( post_response => {
		cy.wrap(post_response).as('Response')
	})
});

Then(`must be responsed the schema {string} with status {int}`, (schema, status) => {
	cy.get('@Response').then( res => {
		cy.contractValidation( res, schema, status ).then( valid => {
			expect(valid).to.be.true
		})
	})
});

