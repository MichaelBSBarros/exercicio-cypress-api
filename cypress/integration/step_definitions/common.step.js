/// <reference types="cypress" />

import {Given, When, Then, And, Before, But} from 'cypress-cucumber-preprocessor/steps'
import {ServeRest} from '../../services/serverest.service'
import {productServeRest} from '../../services/productserverest.service'
import {cartServeRest} from '../../services/cartserverest.service'
import Rest from '../../services/common/_rest.service';


Given(`that is logged as an {string} user and {string}`, (user_authentication, user_permissions) => {
    Rest.criarUsuarioEAutenticar(user_authentication, user_permissions).then( get_response => {
		cy.wrap(get_response).as('Response')
	})
});

When(`request {string} from /carrinhos`, (userOptions) => {
	cartServeRest.get_carts(userOptions).then( get_response => {
		cy.wrap(get_response).as('Response')
	})
});

When(`request {string} from /produtos`, (productsOptions) => {
	productServeRest.get_products(productsOptions).then( get_response => {
		cy.wrap(get_response).as('Response')
	})
});

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

Then(`must return the property {string} greater than {int}`, (property, comparativeValue) => {
    cy.get('@Response').then( res => {
	    expect(res.body[property]).to.greaterThan(comparativeValue)
	})
})