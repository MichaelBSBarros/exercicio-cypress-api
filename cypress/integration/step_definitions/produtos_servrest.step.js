/// <reference types="cypress" />

import {Given, When, Then, And, Before, But} from 'cypress-cucumber-preprocessor/steps'
import {productServeRest} from '../../services/productserverest.service'

When(`post products of type {string} from /produtos`, (typeProd) => {
    cy.get('@Response').then( res => {
        let userAuth = res.body.authorization        
	    productServeRest.post_products(typeProd, userAuth).then( post_response => {
	    	console.log(post_response)
	    	cy.wrap(post_response).as('Response')
        })
    })
});

When(`edit products of type {string} from /produtos`, (typeProd) => {
    cy.get('@Response').then( res => {
        let userAuth = res.body.authorization       
	    productServeRest.put_products(typeProd, userAuth).then( post_response => {
	    	console.log(post_response)
	    	cy.wrap(post_response).as('Response')
        })
    })
});

When(`delete products of type {string} from /produtos`, (typeProd) => {
    cy.get('@Response').then( res => {
        let userAuth = res.body.authorization     
	    productServeRest.delete_products(typeProd, userAuth).then( post_response => {
	    	console.log(post_response)
	    	cy.wrap(post_response).as('Response')
        })
    })
});

