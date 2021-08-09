import faker from 'faker'

export default class DynamicFactory {

    static criarUsuario(typeUser, admin = true){

        switch(typeUser){

            case 'valid':
                return {
                    "nome": `${faker.name.firstName()} ${faker.name.lastName()}`,
                    "email": faker.internet.email(),
                    "password": faker.internet.password(),
                    "administrador": admin.toString(),
                }

            case 'invalid':
                return {
                    "nome": "Fulano da Silva",
                    "email": "beltrano@qa.com.br",
                    "password": "teste",
                    "administrador": "true",
                }

                //case 'empty':
                //    return {
                //        "nome": "",
                //        "email": "",
                //        "password": "",
                //        "administrador": "",
                //    }

            default:
                return { notfound: "The user type was not found, please verify!" }

        }
    }
}



