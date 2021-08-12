import Rest from './common/_rest.service'
import DynamicFactory from '../fixtures/factories/dynamic'
import Factory from '../fixtures/factories/factory'

const URL_USERS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'

export class ServeRest extends Rest {

    static get_users(userOptions){
        
        var userID = ''
        switch(userOptions){
            case 'user_by_valid_id':
                super.responseCriarUsuario('valid', 'POST', URL_USERS).then( post_response =>{
                    cy.wrap(post_response).as('Response')
                })            
                return cy.get('@Response').then( res => {                
                    let temp_url = super.construirUrl(res, URL_USERS)
                    return super.httpRequestWithoutBody('GET', temp_url)               
                })        
            
            case 'user_by_invalid_id':
                var userID = DynamicFactory.geradorID()
        }
        let temp_url = `${URL_USERS}/${userID}` 
        return super.httpRequestWithoutBody('GET', temp_url)
    }  

    static post_users_by_type(typeUser){ 

        let body = DynamicFactory.criarUsuario(typeUser)
        if(typeUser == 'invalid'){    
            var userEmail = body.email        
            super.httpRequestWithBody('POST', URL_USERS, body)
            body = DynamicFactory.criarUsuario(typeUser)
            body.email = userEmail
        }
        return super.httpRequestWithBody('POST', URL_USERS, body)
    }

    static put_users_by_type(typeUser){

        switch (typeUser) {
            case 'valid':
                super.responseCriarUsuario('valid', 'POST', URL_USERS).then( post_response =>{
                    cy.wrap(post_response).as('Response')
                })
                return cy.get('@Response').then( res => {
                    var temp_url = super.construirUrl(res, URL_USERS)
                    body = DynamicFactory.editarUsuario(typeUser)
                    return super.httpRequestWithBody('PUT', temp_url, body)
                })
                break;

            case 'nonexistent':
                return super.userEmtyProperties(typeUser, URL_USERS, 'PUT')   
                break;

            case 'invalid':
                let body = super.requestCriarUsuario('valid', 'POST', URL_USERS)
                var userEmail = body.email
                super.responseCriarUsuario('valid', 'POST', URL_USERS).then( post_response =>{
                    cy.wrap(post_response).as('Response')
                })
                return cy.get('@Response').then( res => {
                    var temp_url = super.construirUrl(res, URL_USERS)
                    body = DynamicFactory.editarUsuario(typeUser)
                    body.email = userEmail
                    return super.httpRequestWithBody('PUT', temp_url, body)
                })
                break;

            case 'empty_name':
                return super.userEmtyProperties(typeUser, URL_USERS, 'PUT')   
                break;
                  
            case 'empty_email':
                return super.userEmtyProperties(typeUser, URL_USERS, 'PUT')   
                break;   

            case 'empty_password':
                return super.userEmtyProperties(typeUser, URL_USERS, 'PUT')   
                break;

            case 'empty_administrator':
                return super.userEmtyProperties(typeUser, URL_USERS, 'PUT')   
                break;
    
            default: 'Missing the user type!'
                break;
        };
    }

    static delete_users(typeUser){

        switch (typeUser) {
            case 'valid':
                let body = DynamicFactory.criarUsuario('valid')
                super.httpRequestWithBody('POST', URL_USERS, body).then( post_response =>{
                    cy.wrap(post_response).as('Response')
                })            
                return cy.get('@Response').then( res => {                
                    let temp_url = super.construirUrl(res, URL_USERS)            
                    return super.httpRequestWithBody('DELETE', temp_url, body)                
                })
                break;

            case 'invalid':
                let userID = DynamicFactory.geradorID()
                let temp_url = `${URL_USERS}/${userID}`            
                return super.httpRequestWithBody('DELETE', temp_url, body)
                break;
            
            case 'with_cart':
                body = DynamicFactory.criarUsuario('valid')
                let userEmail = body.email
                let userPassword = body.password

                super.httpRequestWithBody('POST', URL_USERS, body).then( post_response =>{
                    cy.wrap(post_response).as('Response')
                    super.responseLoginAuth(userEmail, userPassword, URL_LOGIN).then( login_resp =>{
                        let userAuth = login_resp.body.authorization
                        super.responseCriarProduto(URL_PRODUTOS, userAuth).then( prod_resp =>{
                            let prodID = prod_resp.body._id
                            super.responsePostCarrinho(prodID, URL_CARRINHOS, userAuth)
                        })
                    })         
                })
                return cy.get('@Response').then( res => {                
                    temp_url = super.construirUrl(res, URL_USERS)                
                    super.httpRequestWithoutBody('DELETE', temp_url)                    
                })
        }
    }

    static post_login(typeUser){
        let body = Factory.standardUser(typeUser)
        return super.httpRequestWithBody('POST', URL_LOGIN, body)
    }        
}