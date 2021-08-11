import Rest from './common/_rest.service'
import DynamicFactory from '../fixtures/factories/dynamic'
import Factory from '../fixtures/factories/factory'

const URL_USERS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHO = '/carrinhos'

function construirUrl(response, rota) {
    let userID = response.body._id
    let temp_url = `${rota}/${userID}`
    return temp_url
}

export class ServeRest extends Rest {

    static userEmtyProp(typeUser, verb) {
        let userID = DynamicFactory.geradorID()
        let body = DynamicFactory.editarUsuario(typeUser)
        let temp_url = `${URL_USERS}/${userID}`
        return super.httpRequestWithBody(verb, temp_url, body)        
    }

    static get_users(userOptions){
        
        var userID = ''
        switch(userOptions){
            case 'user_by_valid_id':
                let body = DynamicFactory.criarUsuario('valid')
                super.httpRequestWithBody('POST', URL_USERS, body).then( post_response =>{
                    cy.wrap(post_response).as('Response')
                })            
                return cy.get('@Response').then( res => {                
                    let temp_url = construirUrl(res, URL_USERS)
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

        var temp_url
        var userEmail
        let body

        switch (typeUser) {
            case 'valid':
                body = DynamicFactory.criarUsuario('valid')
                super.httpRequestWithBody('POST', URL_USERS, body).then( post_response =>{
                    cy.wrap(post_response).as('Response')
                })
                return cy.get('@Response').then( res => {
                    temp_url = construirUrl(res, URL_USERS)
                    body = DynamicFactory.editarUsuario(typeUser)
                    return super.httpRequestWithBody('PUT', temp_url, body)
                })
                break;

            case 'nonexistent':
                return ServeRest.userEmtyProp(typeUser, 'PUT')   
                break;

            case 'invalid':
                body = DynamicFactory.criarUsuario('valid')
                super.httpRequestWithBody('POST', URL_USERS, body)
                userEmail = body.email
                body = DynamicFactory.criarUsuario('valid')
                super.httpRequestWithBody('POST', URL_USERS, body).then( post_response =>{
                    cy.wrap(post_response).as('Response')
                })
                return cy.get('@Response').then( res => {
                    temp_url = construirUrl(res, URL_USERS)
                    body = DynamicFactory.editarUsuario(typeUser)
                    body.email = userEmail
                    return super.httpRequestWithBody('PUT', temp_url, body)
                })
                break;

            case 'empty_name':
                return ServeRest.userEmtyProp(typeUser, 'PUT')   
                break;
                  
            case 'empty_email':
                return ServeRest.userEmtyProp(typeUser, 'PUT')   
                break;   

            case 'empty_password':
                return ServeRest.userEmtyProp(typeUser, 'PUT')   
                break;

            case 'empty_administrator':
                return ServeRest.userEmtyProp(typeUser, 'PUT')   
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
                    let temp_url = construirUrl(res, URL_USERS)            
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

                    let body = Factory.standardUser('new_user_login', userEmail, userPassword)
                    super.httpRequestWithBody('POST', URL_LOGIN, body).then( post_login_res =>{
                       let userAuth = post_login_res.body.authorization

                       body = DynamicFactory.postProd()
                       super.httpRequestWithBody('POST', URL_PRODUTOS, body, { authorization: userAuth }).then(post_prod_response =>{
                        let prodID = post_prod_response.body._id

                        body = DynamicFactory.postCart(prodID)
                        super.httpRequestWithBody('POST', URL_CARRINHO, body, { authorization: userAuth })
                       })
                   })         
                })
                return cy.get('@Response').then( res => {                
                    temp_url = construirUrl(res, URL_USERS)                
                    super.httpRequestWithoutBody('DELETE', temp_url)                    
                })
        }
    }

    static post_login(typeUser){
        let body = Factory.standardUser(typeUser)
        return super.httpRequestWithBody('POST', URL_LOGIN, body)
    }        
}