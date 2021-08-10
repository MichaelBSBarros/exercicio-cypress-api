import Rest from './common/_rest.service'
import DynamicFactory from '../fixtures/factories/dynamic'
import Factory from '../fixtures/factories/factory'

const URL_USERS = '/usuarios'
const URL_LOGIN = '/login'

export class ServeRest extends Rest {

    static get_users(userOptions){        
        
        var temp_url
        var userID

        switch(userOptions){
        
            case 'all_users':
                return super.httpRequestWithoutBody('GET', URL_USERS)         
            
            case 'user_by_valid_id':

                var body = DynamicFactory.criarUsuario('valid')
                super.httpRequestWithBody('POST', URL_USERS, body).then( post_response =>{
                    cy.wrap(post_response).as('Response')
                })
            
                return cy.get('@Response').then( res => {
                
                    userID = res.body._id
                    temp_url = `${URL_USERS}/${userID}`
                    
                    return super.httpRequestWithoutBody('GET', temp_url) 
                
                })
                 
            
            case 'user_by_invalid_id':

                userID = DynamicFactory.geradorID()
                temp_url = `${URL_USERS}/${userID}`
                return super.httpRequestWithoutBody('GET', temp_url)
                
        }        
    }  

    static post_users_by_type(typeUser){
        let body = DynamicFactory.criarUsuario(typeUser)
        return super.httpRequestWithBody('POST', URL_USERS, body)
    }

    static put_users_by_type(typeUser){

        var temp_url
        var userID
        var userEmail
        let body

        switch (typeUser) {

            case 'valid':
                body = DynamicFactory.criarUsuario('valid')
                super.httpRequestWithBody('POST', URL_USERS, body).then( post_response =>{
                    cy.wrap(post_response).as('Response')
                })

                return cy.get('@Response').then( res => {

                    userID = res.body._id
                    temp_url = `${URL_USERS}/${userID}`

                    body = DynamicFactory.editarUsuario(typeUser)
                    return super.httpRequestWithBody('PUT', temp_url, body)

                })
                break;

            case 'nonexistent':
                userID = DynamicFactory.geradorID()
                body = DynamicFactory.editarUsuario(typeUser)                                
                temp_url = `${URL_USERS}/${userID}`
                return super.httpRequestWithBody('PUT', temp_url, body)
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

                    userID = res.body._id
                    cy.log(userID)
                    temp_url = `${URL_USERS}/${userID}`

                    body = DynamicFactory.editarUsuario(typeUser)
                    body.email = userEmail
                    return super.httpRequestWithBody('PUT', temp_url, body)

                })
                break;

                case 'empty':
                    userID = DynamicFactory.geradorID()
                    body = DynamicFactory.editarUsuario(typeUser)
                    temp_url = `${URL_USERS}/${userID}`
                    return super.httpRequestWithBody('PUT', temp_url, body)   
                break;
    
            default: 'Missing the user type!'
                break;
        };

    }

    static delete_users(typeUser){
    
    var userID
    var temp_url
    let body

        switch (typeUser) {

            case 'valid':
                body = DynamicFactory.criarUsuario('valid')
                super.httpRequestWithBody('POST', URL_USERS, body).then( post_response =>{
                    cy.wrap(post_response).as('Response')
                })
            
                return cy.get('@Response').then( res => {
                
                userID = res.body._id
                temp_url = `${URL_USERS}/${userID}`
            
                return super.httpRequestWithBody('DELETE', temp_url, body)
                
                })
                break;

            case 'invalid':
                userID = DynamicFactory.geradorID()
                temp_url = `${URL_USERS}/${userID}`            
                return super.httpRequestWithBody('DELETE', temp_url, body)
                break;
            
            case 'with_cart':

                body = DynamicFactory.criarUsuario('valid')
                super.httpRequestWithBody('POST', URL_USERS, body).then( post_response =>{
                    cy.wrap(post_response).as('Response')
                })
            
                return cy.get('@Response').then( res => {
                
                userID = res.body._id
                temp_url = `${URL_USERS}/${userID}`
            
                return super.httpRequestWithBody('DELETE', temp_url, body)
                
                })
        }
    }

    static post_login(typeUser){
        let body = Factory.standardUser(typeUser)
        return super.httpRequestWithBody('POST', URL_LOGIN, body)
    }
        
}