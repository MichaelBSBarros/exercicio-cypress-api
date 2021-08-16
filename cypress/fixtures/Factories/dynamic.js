import faker from 'faker'
faker.locale = 'pt_BR'

export default class DynamicFactory {

    static geradorID(){
        const userID = faker.random.alphaNumeric(16)
        return userID
    }

    static criarUsuario(typeUser, admin = true){

        switch(typeUser){

            case 'valid':
            case 'invalid':
                return {
                    "nome": `${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.lastName()}`,
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
                    "nome": `${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.lastName()}`,
                    "email": "",
                    "password": faker.internet.password(),
                    "administrador": admin.toString(),
                }
            case 'empty_password':
                return {
                    "nome": `${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.lastName()}`,
                    "email": faker.internet.email(),
                    "password": "",
                    "administrador": admin.toString(),
                }
            
            case 'empty_administrator':
                return {
                    "nome": `${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.lastName()}`,
                    "email": faker.internet.email(),
                    "password": faker.internet.password(),
                    "administrador": ""
                }
            case 'no_permissions':
                return {
                    "nome": `${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.lastName()}`,
                    "email": faker.internet.email(),
                    "password": faker.internet.password(),
                    "administrador": "false"
                }

            default:
                return { notfound: "The user type was not found, please verify!" }

        }
    }

    static editarUsuario(typeUser, admin = true){

        switch(typeUser){

            case 'valid':
            case 'invalid':
            case 'nonexistent':
                return {
                    "nome": `${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.lastName()}`,
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
                    "nome": `${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.lastName()}`,
                    "email": "",
                    "password": faker.internet.password(),
                    "administrador": admin.toString(),
                }
            case 'empty_password':
                return {
                    "nome": `${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.lastName()}`,
                    "email": faker.internet.email(),
                    "password": "",
                    "administrador": admin.toString(),
                }
            
            case 'empty_administrator':
                return {
                    "nome": `${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.lastName()}`,
                    "email": faker.internet.email(),
                    "password": faker.internet.password(),
                    "administrador": "",
                }

            default:
                return { notfound: "The user type was not found, please verify!" }

        }
    }

    //static postProd(){
    //    return {
    //        "nome": faker.commerce.productName(),
    //        "preco": faker.datatype.number({'min': 10, 'max': 999}),
    //        "descricao": faker.commerce.productDescription(),
    //        "quantidade": faker.datatype.number({'min': 1, 'max': 1}),
    //      }
    //}

    static postProd(typeProd){

        let nomeProduto = `${faker.commerce.product()} ${faker.commerce.color()} da ${faker.finance.currencyCode()} ${faker.name.jobArea()}`

        switch(typeProd){
            case 'valid':
                return {
                    "nome": nomeProduto,
                    "preco": faker.datatype.number({'min': 10, 'max': 999}),
                    "descricao": faker.commerce.productDescription(),
                    "quantidade": faker.datatype.number({'min': 2, 'max': 8}),
                }
            case 'invalid':
                return {
                    "nome": 'Produto de nome repetido',
                    "preco": faker.datatype.number({'min': 10, 'max': 999}),
                    "descricao": faker.commerce.productDescription(),
                    "quantidade": faker.datatype.number({'min': 2, 'max': 8}),
                }
            case 'empty_name':
                return {
                    "nome": '',
                    "preco": faker.datatype.number({'min': 10, 'max': 999}),
                    "descricao": faker.commerce.productDescription(),
                    "quantidade": faker.datatype.number({'min': 2, 'max': 8}),
                }
            
            case 'price_value_less_than_one':
                return {
                    "nome": nomeProduto,
                    "preco": faker.datatype.number({'min': -1, 'max': 0}),
                    "descricao": faker.commerce.productDescription(),
                    "quantidade": faker.datatype.number({'min': 2, 'max': 8}),
                }
            case 'price_value_with_string':
                return {
                    "nome": nomeProduto,
                    "preco": "",
                    "descricao": faker.commerce.productDescription(),
                    "quantidade": faker.datatype.number({'min': 2, 'max': 8}),
                }     
            case 'no_description':
                return {
                    "nome": nomeProduto,
                    "preco": faker.datatype.number({'min': 10, 'max': 999}),
                    "descricao": "",
                    "quantidade": faker.datatype.number({'min': 2, 'max': 8}),
                }
            case 'no_description':
                return {
                    "nome": nomeProduto,
                    "preco": faker.datatype.number({'min': 10, 'max': 999}),
                    "descricao": "",
                    "quantidade": faker.datatype.number({'min': 2, 'max': 8}),
                }
            case 'quantity_less_than_zero':
                return {
                    "nome": nomeProduto,
                    "preco": faker.datatype.number({'min': 10, 'max': 999}),
                    "descricao": faker.commerce.productDescription(),
                    "quantidade": faker.datatype.number({'max': -1}),
                }                  
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



