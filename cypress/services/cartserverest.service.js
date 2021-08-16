import Rest from './common/_rest.service'
import DynamicFactory from '../fixtures/factories/dynamic'
import Factory from '../fixtures/factories/factory'

const URL_USERS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'

export class cartServeRest extends Rest {

    static get_carts(cartOptions){

        let cartID = ''

        switch(cartOptions){
            case 'cart_by_valid_id':
                super.criarUsuarioEAutenticar('authenticated', 'with_permissions').then( login_response => {
                    let userAuth = login_response.body.authorization
                    super.criarProdEAddCarrinho(userAuth).then( cart_response => {
                        cy.wrap(cart_response).as("cart_response")
                    })
                })
                return cy.get("@cart_response").then( cart_response => {
                    cartID = cart_response.body._id
                    let temp_url = `${URL_CARRINHOS}/${cartID}`
                    super.httpRequestWithoutBody('GET', temp_url)
                })      
            break;
            
            case 'cart_by_invalid_id':
                cartID = DynamicFactory.geradorID()
            break;
        }

        let temp_url = `${URL_CARRINHOS}/${cartID}` 
        return super.httpRequestWithoutBody('GET', temp_url)
    }

    static post_carts(cartType, typeProd, userAuth){
       
        let testConditions = `${cartType}+${typeProd}`

        switch(testConditions){

            case 'valid+valid':
                return super.responseCriarProduto(typeProd, URL_PRODUTOS, userAuth).then( prod_response => {
                    let prodID = prod_response.body._id
                    cy.log(prodID)
                })
            break;
        }
    }

}