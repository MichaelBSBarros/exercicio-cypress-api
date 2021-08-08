import Rest from './common/_rest.service'
import DynamicFactory from '../fixtures/factories/dynamic'

const URL_USERS = '/usuarios'

export class ServeRest extends Rest {

    static get_all_users(){
        return super.httpRequestWithoutBody('GET', URL_USERS)
    }  

    static post_users_by_type(typeUser){
        let body = DynamicFactory.criarUsuario(typeUser)
        return super.httpRequestWithBody('POST', URL_USERS, body)
    }
}