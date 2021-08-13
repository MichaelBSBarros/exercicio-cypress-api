Feature: test 'usuarios' rout from ServeRest

    Scenario: GET "all_users"
        When request "all_users" from /usuarios
        Then must be responsed the schema "get-usuarios" with status 200
        And must return the property "quantidade" greater than 0

    Scenario Outline: GET "<userOptions>"
        When request "<userOptions>" from /usuarios
        Then must be responsed the schema "get-usuarios" with status <status>
        And must return the property "<property>" with message "<message>"
        Examples:
            | userOptions        | status | property      | message                |
            | user_by_valid_id   | 200    | administrador | true                   |
            | user_by_invalid_id | 400    | message       | Usuário não encontrado |

    Scenario Outline: POST users type "<type>"
        When post users of type "<type>" from /usuarios
        Then must be responsed the schema "post-usuarios" with status <status>
        And must return the property "<property>" with message "<message>"
        Examples:
            | type                | status | property      | message                                  |
            | valid               | 201    | message       | Cadastro realizado com sucesso           |
            | invalid             | 400    | message       | Este email já está sendo usado           |
            | empty_name          | 400    | nome          | nome não pode ficar em branco            |
            | empty_email         | 400    | email         | email não pode ficar em branco           |
            | empty_password      | 400    | password      | password não pode ficar em branco        |
            | empty_administrator | 400    | administrador | administrador deve ser 'true' ou 'false' |

    Scenario Outline: PUT users type "<type>"
        When edit users of type "<type>" from /usuarios
        Then must be responsed the schema "put-usuarios" with status <status>
        And must return the property "<property>" with message "<message>"
        Examples:
            | type                | status | property      | message                                  |
            | valid               | 200    | message       | Registro alterado com sucesso            |
            | nonexistent         | 201    | message       | Cadastro realizado com sucesso           |
            | invalid             | 400    | message       | Este email já está sendo usado           |
            | empty_name          | 400    | nome          | nome não pode ficar em branco            |
            | empty_email         | 400    | email         | email não pode ficar em branco           |
            | empty_password      | 400    | password      | password não pode ficar em branco        |
            | empty_administrator | 400    | administrador | administrador deve ser 'true' ou 'false' |

    Scenario Outline: DELETE users type "<type>"
        When delete users of type "<type>" from /usuarios
        Then must be responsed the schema "delete-usuarios" with status <status>
        And must return the property "<property>" with message "<message>"
        Examples:
            | type      | status | property | message                                                 |
            | valid     | 200    | message  | Registro excluído com sucesso                           |
            | invalid   | 200    | message  | Nenhum registro excluído                                |
            | with_cart | 400    | message  | Não é permitido excluir usuário com carrinho cadastrado |