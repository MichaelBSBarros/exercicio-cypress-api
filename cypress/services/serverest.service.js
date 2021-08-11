import Rest from './common/_rest.service'
import DynamicFactory from '../fixtures/factories/dynamic'
import Factory from '../fixtures/factories/factory'

const URL_USERS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHO = '/carrinhos'

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
    var prodID
    var userEmail
    var userPassword
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

                userEmail = body.email
                userPassword = body.password

                super.httpRequestWithBody('POST', URL_USERS, body).then( post_response =>{
                    cy.wrap(post_response).as('Response')
    
                    body = Factory.standardUser('new_user_login', userEmail, userPassword)
                    super.httpRequestWithBody('POST', URL_LOGIN, body).then( post_login_res =>{
                       let userAuth = post_login_res.body.authorization

                       body = DynamicFactory.postProd()
                       super.httpRequestWithBody('POST', URL_PRODUTOS, body, { authorization: userAuth }).then(post_prod_response =>{
                        prodID = post_prod_response.body._id

                        body = DynamicFactory.postCart(prodID)
                        super.httpRequestWithBody('POST', URL_CARRINHO, body, { authorization: userAuth })

                       })
                   })         
                })           

                return cy.get('@Response').then( res => {
                
                    userID = res.body._id
                    temp_url = `${URL_USERS}/${userID}`
                
                    super.httpRequestWithoutBody('DELETE', temp_url)
                    
                })
        }
    }

    static post_login(typeUser){
        let body = Factory.standardUser(typeUser)
        return super.httpRequestWithBody('POST', URL_LOGIN, body)
    }
        
}