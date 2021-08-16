Feature: test 'produtos' rout from ServeRest

    Scenario Outline: GET "<cartOptions>"
        When request "<cartOptions>" from /carrinhos
        Then must be responsed the schema "get-carrinhos" with status 200
        And must return the property "<property>" greater than <comparativeValue>
        Examples:
            | cartOptions      | property        | comparativeValue |
            | all_carts        | quantidade      | 0                |
            | cart_by_valid_id | quantidadeTotal | -1               |

    Scenario: GET "cart_by_invalid_id"
        When request "cart_by_invalid_id" from /carrinhos
        Then must be responsed the schema "get-carrinhos" with status 400
        And must return the property "message" with message "Carrinho não encontrado"

    Scenario Outline: POST cart type "<cart_type>"
        Given that is logged as an "<user_authentication>" user and "with_permissions"
        When register a "<cart_type>" cart with a "<prod_type>" protucts from /carrinhos
        Then must be responsed the schema "post-carrinhos" with status <status>
        And must return the property "<property>" with message "<message>"
        Examples:
            | user_authentication | cart_type | prod_type       | status | property | message                                   |
            | authenticated       | valid     | valid           | 201    | message  | Cadastro realizado com sucesso            |
            | authenticated       | valid     | duplicated_prod | 400    | message  | Não é permitido possuir produto duplicado |

