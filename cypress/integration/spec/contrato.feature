Feature: test usuarios json-schema


    Scenario: get-usuarios
        When request all users from /usuarios
        Then must be responsed the schema "get-usuarios" with status 200

    Scenario Outline: post-usuarios
        When post users of type "<type>" from /usuarios
        Then must be responsed the schema "<schema>" with status <status>
        Examples:
            | type    | schema                    | status |
            | valid   | post-usuarios             | 201    |
            | invalid | post-usuarios             | 400    |
            | empty   | post-usuarios/empty-values | 400    |