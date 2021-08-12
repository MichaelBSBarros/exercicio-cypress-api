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
    
    static httpRequestWithoutBody(method, endpoint, failOnStatusCode = false, timeout = Cypress.env('global_timeout')){
        return cy.request({
            method: method, 
            url: endpoint, 
            failOnStatusCode: failOnStatusCode, 
            timeout: timeout
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

    static responseCriarProduto(temp_url, userAuth) {
        let body = DynamicFactory.postProd()
        return Rest.httpRequestWithBody('POST', temp_url, body, { authorization: userAuth })
    }

    static responseLoginAuth(userEmail, userPassword, temp_url) {
        let body = Factory.standardUser('new_user_login', userEmail, userPassword)
        return Rest.httpRequestWithBody('POST', temp_url, body)
    }
}