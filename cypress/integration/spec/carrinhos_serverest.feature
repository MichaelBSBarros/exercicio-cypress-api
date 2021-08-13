Feature: test 'produtos' rout from ServeRest

    Scenario Outline: GET "<cartOptions>"
        When request "<cartOptions>" from /carrinhos
        Then must be responsed the schema "get-carrinhos" with status 200
        And must return the property "<property>" greater than <comparativeValue>
        Examples:
            | productOptions      | property   | comparativeValue |
            | all_carts           | quantidade | 1                |
            #| product_by_valid_id | quantidade | -1               |