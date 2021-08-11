import faker from 'faker'

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
                    "nome": "Fulano da Silva",
                    "email": "beltrano@qa.com.br",
                    "password": "teste",
                    "administrador": "true",
                }

                case 'empty':
                    return {
                        "nome": "",
                        "email": "",
                        "password": "",
                        "administrador": "",
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

                case 'empty':
                    return {
                        "nome": "",
                        "email": "",
                        "password": "",
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
            "quantidade": faker.datatype.number({'min': 1000, 'max': 9999}),
          }
    }

    static postCart(prodID){
        return {
            "produtos": [
              {
                "idProduto": prodID,
                "quantidade": faker.datatype.number({'min': 1, 'max': 10}),
              }
            ]
          }
    }
}



