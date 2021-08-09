Feature: test login json-schema

    Scenario Outline: post-login
        When sign in with users type "<type>"
        Then must be responsed the schema "post-login" with status <status>
        Examples:
            | type    | status |
            | valid   | 200    |
            | invalid | 400    |
           #| empty   | 400    |