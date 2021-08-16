import DynamicFactory from '../../fixtures/Factories/dynamic'
import Factory from '../../fixtures/factories/factory'

export default class Rest {

    static httpRequestWithBody(method, endpoint, body, headers = null, failOnStatusCode = false, timeout = Cypress.env('global_timeout')){
        return cy.request({
            method: method, 
            url: endpoint, 
            body: body, 
            failOnStatusCode: failOnStatusCode, 
            timeout: timeout,
            headers: headers  //  para gerar autenticação: headers = null; headers: headers
        })
    }
    
    static httpRequestWithoutBody(method, endpoint,  headers = null, failOnStatusCode = false, timeout = Cypress.env('global_timeout')){
        return cy.request({
            method: method, 
            url: endpoint, 
            failOnStatusCode: failOnStatusCode, 
            timeout: timeout,
            headers: headers
        })
    }

    static construirUrl(response, rota) {
        let userID = response.body._id
        let temp_url = `${rota}/${userID}`
        return temp_url
    }

    static userEmtyProperties(typeUser, rout, verb) {
        let userID = DynamicFactory.geradorID()
        let body = DynamicFactory.editarUsuario(typeUser)
        let temp_url = `${rout}/${userID}`
        return Rest.httpRequestWithBody(verb, temp_url, body)        
    }
    
    static requestCriarUsuario(typeUser, verb, temp_url,) {
        let body = DynamicFactory.criarUsuario(typeUser)
        Rest.httpRequestWithBody(verb, temp_url, body)
        return body
    }

    static responseCriarUsuario(typeUser, verb, temp_url,) {
        let body = DynamicFactory.criarUsuario(typeUser)
        return Rest.httpRequestWithBody(verb, temp_url, body)
    }

    static responsePostCarrinho(prodID, temp_url, userAuth) {
        let body = DynamicFactory.postCart(prodID)
        return Rest.httpRequestWithBody('POST', temp_url, body, { authorization: userAuth })
        
    }

    static responseCriarProduto(typeProd, temp_url, userAuth) {
        let body = DynamicFactory.postProd(typeProd)
        return Rest.httpRequestWithBody('POST', temp_url, body, { authorization: userAuth })
    }

    static responsePutProduto(typeProd, userAuth) {

        let body = DynamicFactory.postProd(typeProd)
        Rest.httpRequestWithBody('POST', '/produtos', body, { authorization: userAuth }).then( prod_resp =>{
            cy.wrap(prod_resp).as('Response')
        })
        return cy.get('@Response').then( res => {
            let prodID = res.body._id
            let temp_url = `${'/produtos'}/${prodID}`
            body = DynamicFactory.postProd(typeProd)
            return Rest.httpRequestWithBody('PUT', temp_url, body, { authorization: userAuth })
        })

    }

    static responseDeleteProduto(typeProd, userAuth) {

        Rest.responseCriarProduto(typeProd, '/produtos', userAuth).then( post_response => {
            cy.wrap(post_response).as('Response')
        })
        return cy.get('@Response').then(res => {                
            var prodID = res.body._id
            let temp_url = `${'/produtos'}/${prodID}`
            Rest.httpRequestWithoutBody('DELETE', temp_url, { authorization: userAuth })                                
        })

    }

    static responseLoginAuth(userEmail, userPassword, temp_url) {
        let body = Factory.standardUser('new_user_login', userEmail, userPassword)
        return Rest.httpRequestWithBody('POST', temp_url, body)
    }

    static criarProdutoComToken(typeProd){

        let body = DynamicFactory.criarUsuario('valid')
        let userEmail = body.email
        let userPassword = body.password

        Rest.httpRequestWithBody('POST', '/usuarios', body)
        Rest.responseLoginAuth(userEmail, userPassword, '/login').then( login_resp =>{
            let userAuth = login_resp.body.authorization
            Rest.responseCriarProduto(typeProd, '/produtos', userAuth).then( prod_resp =>{
                cy.wrap(prod_resp).as('Response')                
            })
        })        
        return cy.get('@Response')
    }

    static criarUsuarioEAutenticar(user_authentication, user_permissions){

        let body

        switch(user_permissions){
            case 'with_permissions':
                body = DynamicFactory.criarUsuario('valid')
                break;
            
            case 'no_permissions':
                body = DynamicFactory.criarUsuario('no_permissions')
                break;
        }        

        let userEmail = body.email
        let userPassword = body.password

        Rest.httpRequestWithBody('POST', '/usuarios', body)
        return Rest.responseLoginAuth(userEmail, userPassword, '/login').then( login_resp =>{
            if (user_authentication == 'non-authenticated'){
                login_resp.body.authorization = 'invalid'
            }
            cy.wrap(login_resp).as('Response')
        })            
    }

    static criarProdEAddCarrinho(userAuth){
        Rest.responseCriarProduto('valid', '/produtos', userAuth).then( prod_response => {
            var prodID = prod_response.body._id
            Rest.responsePostCarrinho(prodID, '/carrinhos', userAuth).then( cart_response => {
                cy.wrap(cart_response).as('cart_response')
                var cartID = cart_response.body._id
                cy.log(cartID)    
            })
        })
        return cy.get('@cart_response')
    }
    
}