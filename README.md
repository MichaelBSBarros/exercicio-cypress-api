A ideia aqui é construirmos um exemplo de implementação de um teste de contrato 
automatizado utilizando a ferramenta Cypress, tendo a execução guiada pelo Cucumber e a 
validação de contrato com json-schema e o pluing ajv

# Dependências obrigatórias para o teste de contrato:
    * Cypress 
    * Cypress-Cucumber-preprocessor 
    * ajv: validador de json-schema

# Outras dependências que irei utilizar:
    * fs-extra - leitura de json 
    * faker - gerador de massas de dados

1. Mostrar a instalação. 
2. Estrutura de pastas para organização dos schemas por 'http status 
3. Criar uma feature dentro do padrão que irá auxiliar o teste de contrato. 
4. Implementação dos steps e service pattern guiado pelos steps. 
5. Execução do teste