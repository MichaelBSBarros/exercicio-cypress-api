Feature: test login json-schema

    Scenario Outline: post-login
        When sign in with users type "<type>"
        Then must be responsed the schema "<schema>" with status <status>
        Examples:
            | type    | schema                  | status |
            | valid   | post-login              | 200    |
            | invalid | post-login              | 401    |
            | empty   | post-login/empty-values | 400    |