import Rest from './common/_rest.service'
import DynamicFactory from '../fixtures/factories/dynamic'
import Factory from '../fixtures/factories/factory'

const URL_USERS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'

export class productServeRest extends Rest {

    static get_products(productOptions){

        var prodID = ''
        switch(productOptions){
            case 'product_by_valid_id':            
                super.criarProdutoComToken('valid').then( prod_response => {                             
                    cy.wrap(prod_response).as("prod_response")
                })
            return cy.get("@prod_response").then( prod_response => {
                prodID = prod_response.body._id   
                let temp_url = `${URL_PRODUTOS}/${prodID}`
                super.httpRequestWithoutBody('GET', temp_url)
            })    
            break;
            case 'product_by_invalid_id':
                prodID = DynamicFactory.geradorID()
            break;
        }
        let temp_url = `${URL_PRODUTOS}/${prodID}` 
        return super.httpRequestWithoutBody('GET', temp_url)
    }

    static post_products(typeProd, userAuth){

        switch(typeProd) {

            case 'valid':                
                return Rest.responseCriarProduto(typeProd, URL_PRODUTOS, userAuth)
                break;

            case 'invalid':
                Rest.responseCriarProduto(typeProd, URL_PRODUTOS, userAuth)
                return Rest.responseCriarProduto(typeProd, URL_PRODUTOS, userAuth)
                break;

            case 'empty_name':
                return Rest.responseCriarProduto(typeProd, URL_PRODUTOS, userAuth)
                break;

            case 'price_value_less_than_one':
                return Rest.responseCriarProduto(typeProd, URL_PRODUTOS, userAuth)
                break;
            
            case 'price_value_with_string':
                return Rest.responseCriarProduto(typeProd, URL_PRODUTOS, userAuth)
                break;

            case 'no_description':
                return Rest.responseCriarProduto(typeProd, URL_PRODUTOS, userAuth)
                break;

            case 'quantity_less_than_zero':
                return Rest.responseCriarProduto(typeProd, URL_PRODUTOS, userAuth)
                break;

        }
    }

    static put_products(typeProd, userAuth){
        
        switch(typeProd) {

            case 'valid':
                return Rest.responsePutProduto(typeProd, userAuth)
                break; 
            
            case 'invalid':
                return Rest.responsePutProduto(typeProd, userAuth)
                break;
            
            case 'nonexistent':
                let prodID = DynamicFactory.geradorID()
                let temp_url = `${'/produtos'}/${prodID}`
                let body = DynamicFactory.postProd('valid')
                return Rest.httpRequestWithBody('PUT', temp_url, body, { authorization: userAuth })
                break;
            
            case 'empty_name':
                return Rest.responsePutProduto(typeProd, userAuth)
                break;
            break;

            case 'price_value_less_than_one':
                return Rest.responsePutProduto(typeProd, userAuth)
                break;
            break;

            case 'price_value_with_string':
                return Rest.responsePutProduto(typeProd, userAuth)
                break;
            break;

            case 'no_description':
                return Rest.responsePutProduto(typeProd, userAuth)
                break;
            break;

            case 'quantity_less_than_zero':
                return Rest.responsePutProduto(typeProd, userAuth)
                break;
            break;

            case '':
                return Rest.responsePutProduto(typeProd, userAuth)
                break;
            break;

            case '':
                return Rest.responsePutProduto(typeProd, userAuth)
                break;
            break;
            
        }

    }

    static delete_products(typeProd, userAuth){
        
        switch(typeProd) {

            case 'nonexistent':
                let prodID = DynamicFactory.geradorID()
                let temp_url = `${'/produtos'}/${prodID}`
                return Rest.httpRequestWithoutBody('DELETE', temp_url, { authorization: userAuth })
                break;

            case 'valid':
                return Rest.responseDeleteProduto(typeProd, userAuth)
                break;

            case 'invalid':
                Rest.responseCriarProduto('valid', URL_PRODUTOS, userAuth).then( post_response => {
                    cy.wrap(post_response).as('Response')
                })
                return cy.get('@Response').then( res => {
                    prodID = res.body._id
                    Rest.responsePostCarrinho(prodID, '/carrinhos', userAuth)
                    let temp_url = `${'/produtos'}/${prodID}`
                    return Rest.httpRequestWithoutBody('DELETE', temp_url, { authorization: userAuth })
                })
                break;
            //
            //case 'invalid':
            //    return Rest.responsePutProduto(typeProd, userAuth)
            //    break;
            //
            //case 'empty_name':
            //    return Rest.responsePutProduto(typeProd, userAuth)
            //    break;
            //break;
//
            //case 'price_value_less_than_one':
            //    return Rest.responsePutProduto(typeProd, userAuth)
            //    break;
            //break;
//
            //case 'price_value_with_string':
            //    return Rest.responsePutProduto(typeProd, userAuth)
            //    break;
            //break;
//
            //case 'no_description':
            //    return Rest.responsePutProduto(typeProd, userAuth)
            //    break;
            //break;
//
            //case 'quantity_less_than_zero':
            //    return Rest.responsePutProduto(typeProd, userAuth)
            //    break;
            //break;
//
            //case '':
            //    return Rest.responsePutProduto(typeProd, userAuth)
            //    break;
            //break;
//
            //case '':
            //    return Rest.responsePutProduto(typeProd, userAuth)
            //    break;
            //break;
            
        }

    }
}