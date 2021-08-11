import faker from 'faker'
faker.locale = 'pt_BR'

export default class DynamicFactory {

    static geradorID(){
        const userID = faker.random.alphaNumeric(15)
        return userID
    }

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
                    "nome": `${faker.name.firstName()} ${faker.name.lastName()}`,
                    "email": faker.internet.email(),
                    "password": faker.internet.password(),
                    "administrador": admin.toString(),
                }

                case 'empty_name':
                    return {
                        "nome": "",
                        "email": faker.internet.email(),
                        "password": faker.internet.password(),
                        "administrador": admin.toString(),
                    }
                case 'empty_email':
                    return {
                        "nome": `${faker.name.firstName()} ${faker.name.lastName()}`,
                        "email": "",
                        "password": faker.internet.password(),
                        "administrador": admin.toString(),
                    }

                case 'empty_password':
                    return {
                        "nome": `${faker.name.firstName()} ${faker.name.lastName()}`,
                        "email": faker.internet.email(),
                        "password": "",
                        "administrador": admin.toString(),
                    }
                
                case 'empty_administrator':
                    return {
                        "nome": `${faker.name.firstName()} ${faker.name.lastName()}`,
                        "email": faker.internet.email(),
                        "password": faker.internet.password(),
                        "administrador": ""
                    }

            default:
                return { notfound: "The user type was not found, please verify!" }

        }
    }

    static editarUsuario(typeUser, admin = true){

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
                    "nome": `${faker.name.firstName()} ${faker.name.lastName()}`,
                    "email": faker.internet.email(),
                    "password": faker.internet.password(),
                    "administrador": admin.toString(),
                }

                case 'nonexistent':
                    return {
                        "nome": `${faker.name.firstName()} ${faker.name.lastName()}`,
                        "email": faker.internet.email(),
                        "password": faker.internet.password(),
                        "administrador": admin.toString(),
                    }

                case 'empty_name':
                    return {
                        "nome": "",
                        "email": faker.internet.email(),
                        "password": faker.internet.password(),
                        "administrador": admin.toString(),
                    }

                case 'empty_email':
                    return {
                        "nome": `${faker.name.firstName()} ${faker.name.lastName()}`,
                        "email": "",
                        "password": faker.internet.password(),
                        "administrador": admin.toString(),
                    }

                case 'empty_password':
                    return {
                        "nome": `${faker.name.firstName()} ${faker.name.lastName()}`,
                        "email": faker.internet.email(),
                        "password": "",
                        "administrador": admin.toString(),
                    }
                
                case 'empty_administrator':
                    return {
                        "nome": `${faker.name.firstName()} ${faker.name.lastName()}`,
                        "email": faker.internet.email(),
                        "password": faker.internet.password(),
                        "administrador": "",
                    }

            default:
                return { notfound: "The user type was not found, please verify!" }

        }
    }

    static postProd(){
        return {
            "nome": faker.commerce.productName(),
            "preco": faker.datatype.number({'min': 10, 'max': 999}),
            "descricao": faker.commerce.productDescription(),
            "quantidade": faker.datatype.number({'min': 1, 'max': 1}),
          }
    }

    static postCart(prodID){
        return {
            "produtos": [
              {
                "idProduto": prodID,
                "quantidade": faker.datatype.number({'min': 1, 'max': 1}),
              }
            ]
          }
    }
}



