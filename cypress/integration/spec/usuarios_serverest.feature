Feature: test 'usuarios' rout from ServeRest

    Scenario Outline: get-usuarios
        When request "<userOptions>" from /usuarios
        Then must be responsed the schema "<schema>" with status <status>
        And must return the message "<message>"
        Examples:
            | userOptions        | schema                 | status | message                |
            | all_users          | get-usuarios/all-users | 200    |                        |
            | user_by_valid_id   | get-usuarios/by-id     | 200    |                        |
            | user_by_invalid_id | get-usuarios/by-id     | 400    | Usuário não encontrado |

    Scenario Outline: post-usuarios
        When post users of type "<type>" from /usuarios
        Then must be responsed the schema "<schema>" with status <status>
        And must return the message "<message>"
        Examples:
            | type    | schema                     | status | message                        |
            | valid   | post-usuarios              | 201    | Cadastro realizado com sucesso |
            | invalid | post-usuarios              | 400    | Este email já está sendo usado |
            | empty   | post-usuarios/empty-values | 400    |                                |

    Scenario Outline: put-usuarios
        When edit users of type "<type>" from /usuarios
        Then must be responsed the schema "<schema>" with status <status>
        And must return the message "<message>"
        Examples:
            | type        | schema                    | status | message                        |
            | valid       | put-usuarios              | 200    | Registro alterado com sucesso  |
            | nonexistent | put-usuarios              | 201    | Cadastro realizado com sucesso |
            | invalid     | put-usuarios              | 400    | Este email já está sendo usado |
            | empty       | put-usuarios/empty-values | 400    |                                |

    Scenario Outline: delete-usuarios
        When delete users of type "<type>" from /usuarios
        Then must be responsed the schema "<schema>" with status <status>
        And must return the message "<message>"
        Examples:
            | type      | schema          | status | message                       |
            | valid     | delete-usuarios | 200    | Registro excluído com sucesso |
            | invalid   | delete-usuarios | 200    | Nenhum registro excluído      |
            | with_cart | delete-usuarios | 400    |                               |