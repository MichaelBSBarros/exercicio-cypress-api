Feature: test 'produtos' rout from ServeRest

    Scenario Outline: GET "<productOptions>"
        When request "<productOptions>" from /produtos
        Then must be responsed the schema "get-produtos" with status 200
        And must return the property "<property>" greater than <comparativeValue>
        Examples:
            | productOptions      | property   | comparativeValue |
            | all_products        | quantidade | 1                |
            | product_by_valid_id | quantidade | -1               |

    Scenario: GET "product_by_invalid_id"
        When request "product_by_invalid_id" from /produtos
        Then must be responsed the schema "get-produtos" with status 400
        And must return the property "message" with message "Produto não encontrado"
    
    Scenario Outline: POST products type "<type>"
        Given that is logged as an "<user_authentication>" user and "<user_permissions>"
        When post products of type "<type>" from /produtos
        Then must be responsed the schema "post-produtos" with status <status>
        And must return the property "<property>" with message "<message>"
        Examples:
            | type                      | user_authentication | user_permissions | status | property   | message                                                                         |
            | valid                     | authenticated       | with_permissions | 201    | message    | Cadastro realizado com sucesso                                                  |
            | invalid                   | authenticated       | with_permissions | 400    | message    | Já existe produto com esse nome                                                 |
            | valid                     | non-authenticated   | with_permissions | 401    | message    | Token de acesso ausente, inválido, expirado ou usuário do token não existe mais |
            | valid                     | authenticated       | no_permissions   | 403    | message    | Rota exclusiva para administradores                                             |
            | empty_name                | authenticated       | with_permissions | 400    | nome       | nome não pode ficar em branco                                                   |
            | price_value_less_than_one | authenticated       | with_permissions | 400    | preco      | preco deve ser um número positivo                                               |
            | price_value_with_string   | authenticated       | with_permissions | 400    | preco      | preco deve ser um número                                                        |
            | no_description            | authenticated       | with_permissions | 400    | descricao  | descricao não pode ficar em branco                                              |
            | quantity_less_than_zero   | authenticated       | with_permissions | 400    | quantidade | quantidade deve ser maior ou igual a 0                                          |

    Scenario Outline: PUT products type "<type>"
        Given that is logged as an "<user_authentication>" user and "<user_permissions>"
        When edit products of type "<type>" from /produtos
        Then must be responsed the schema "put-produtos" with status <status>
        And must return the property "<property>" with message "<message>"
        Examples:
            | type                      | user_authentication | user_permissions | status | property   | message                                                                         |
            | valid                     | authenticated       | with_permissions | 200    | message    | Registro alterado com sucesso                                                   |
            | invalid                   | authenticated       | with_permissions | 400    | message    | Já existe produto com esse nome                                                 |
            | nonexistent               | authenticated       | with_permissions | 201    | message    | Cadastro realizado com sucesso                                                  |
            | valid                     | non-authenticated   | with_permissions | 401    | message    | Token de acesso ausente, inválido, expirado ou usuário do token não existe mais |
            | valid                     | authenticated       | no_permissions   | 403    | message    | Rota exclusiva para administradores                                             |
            | empty_name                | authenticated       | with_permissions | 400    | nome       | nome não pode ficar em branco                                                   |
            | price_value_less_than_one | authenticated       | with_permissions | 400    | preco      | preco deve ser um número positivo                                               |
            | price_value_with_string   | authenticated       | with_permissions | 400    | preco      | preco deve ser um número                                                        |
            | no_description            | authenticated       | with_permissions | 400    | descricao  | descricao não pode ficar em branco                                              |
            | quantity_less_than_zero   | authenticated       | with_permissions | 400    | quantidade | quantidade deve ser maior ou igual a 0                                          |

    Scenario Outline: DELETE products type "<type>"
        Given that is logged as an "<user_authentication>" user and "<user_permissions>"
        When delete products of type "<type>" from /produtos
        Then must be responsed the schema "delete-produtos" with status <status>
        And must return the property "<property>" with message "<message>"
        Examples:
            | type        | user_authentication | user_permissions | status | property | message                                                                         |
            | nonexistent | authenticated       | with_permissions | 200    | message  | Nenhum registro excluído                                                        |
            | valid       | authenticated       | with_permissions | 200    | message  | Registro excluído com sucesso                                                   |
            | valid       | non-authenticated   | with_permissions | 401    | message  | Token de acesso ausente, inválido, expirado ou usuário do token não existe mais |
            | valid       | authenticated       | no_permissions   | 403    | message  | Rota exclusiva para administradores                                             |
            | invalid     | authenticated       | with_permissions | 400    | message  | Não é permitido excluir produto que faz parte de carrinho                       |
