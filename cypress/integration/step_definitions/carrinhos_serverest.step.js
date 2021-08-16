/// <reference types="cypress" />

import {Given, When, Then, And, Before, But} from 'cypress-cucumber-preprocessor/steps'
import {cartServeRest} from '../../services/cartserverest.service'


When(`register a {string} cart with a {string} protucts from /carrinhos`, (cartType, typeProd) => {
    cy.get('@Response').then( res => {
        let userAuth = res.body.authorization        
	    cartServeRest.post_carts(cartType, typeProd, userAuth).then( post_response => {
	    	console.log(post_response)
	    	cy.wrap(post_response).as('Response')
        })
    })
});
