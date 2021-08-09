import Rest from './common/_rest.service'
import DynamicFactory from '../fixtures/factories/dynamic'
import Factory from '../fixtures/factories/factory'

const URL_USERS = '/usuarios'
const URL_LOGIN = '/login'

export class ServeRest extends Rest {

    static get_all_users(){
        return super.httpRequestWithoutBody('GET', URL_USERS)
    }  

    static post_users_by_type(typeUser){
        let body = DynamicFactory.criarUsuario(typeUser)
        return super.httpRequestWithBody('POST', URL_USERS, body)
    }

    static post_login(typeUser){
        let body = Factory.standardUser(typeUser)
        return super.httpRequestWithBody('POST', URL_LOGIN, body)
    }
        
}