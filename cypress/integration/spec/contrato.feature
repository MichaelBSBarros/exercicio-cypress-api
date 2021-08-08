Feature: test usuarios json-schema


    Scenario: get-usuarios
        When request all users from /usuarios
        Then must be responsed the schema "get-usuarios" with status 200

    Scenario Outline: post-usuarios
        When post users of type "<type>" from /usuarios
        Then must be responsed the schema "post-usuarios" with status <status>
        Examples:
            | type    | status |
            | valid   | 201    |
            | invalid | 400    |
           #| empty   | 400    |