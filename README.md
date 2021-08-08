A ideia aqui é construirmos um exemplo de implementação de um teste de contrato 
automatizado utilizando a ferramenta Cypress, tendo a execução guiada pelo Cucumber e a 
validação de contrato com json-schema e o pluing ajv

# Dependências obrigatórias para o teste de contrato:
    * cypress 
    * cypress-cucumber-preprocessor 
    * ajv: validador de json-schema

# Outras dependências que irei utilizar:
    * fs-extra - leitura de json 
    * faker - gerador de massas de dados

1. Mostrar a instalação. 
2. Estrutura de pastas para organização dos schemas por 'http status 
3. Criar uma feature dentro do padrão que irá auxiliar o teste de contrato. 
4. Implementação dos steps e service pattern guiado pelos steps. 
5. Execução do teste

# passos seguidos até ultima atualização:
    * npm init -y
    * npm i cypress --save-dev
    * npx cypress open | obs: criar um arquivo chamado .gitignore e adicionar 'node_modules' para impedir push desse arquivo para o repositório
    * npm i cypress-cucumber-preprocessor --save-dev

        colar o código abaixo no package.json:

        "cypress-cucumber-preprocessor": {
          "nonGlobalStepDefinitions": false, 
          "step_definitions": "cypress/integration/step_definitions/",
          "cucumberJson": {
            "generate": false,
            "outputFolder": "reports/json"
          }
        }  

    * criar a pasta step_definitions em /integration
    * criar a pasta spec em /integration
    * npm i ajv --save-dev
    * npm i --save-dev fs-extra faker

    * configurar o arquivo cypress.js com o código abaixo:
        {
        "video": false,
        "viewportWidth": 1600,
        "viewportHeight": 900,
        "chromeWebSecurity": false,
        "numTestsKeptInMemory": 1,
        "ignoreTestFiles": "*.js",
        "testFiles": "**/*.feature",
        }
    
    * criar uma pasta de nome 'config' dentro da /cypress e criar os arquivos relacionados ao ambiente. Ex.: api.json; dev.json; prod.json e configurar o ambiente. Ex.: api.json com o código abaixo:
    
        {
            "baseUrl": "https://serverest.dev",
            "env":{
                "global_timeout": 30000,
                "enviroment": "API"
            }
        }
    
    * configurar o arquivo /plugins/index.js com o código abaixo:
        /// <reference types="cypress" />
    
        const cucumber = require('cypress-cucumber-preprocessor').default
        const fs = require('fs-extra')
        const path = require('path')

        function getConfigurationByFile(file) {
          const pathToConfigFile = path.resolve('.', 'cypress', 'config', `${file}.json`)
          return fs.readJson(pathToConfigFile)
        }

        module.exports = (on, config) => {
          on('file:preprocessor', cucumber())
          on('before:browser:launch', (browser = {}, launchOptions) => {
            if (browser.family === 'chromium' && browser.name !== 'electron') {
              launchOptions.args.push('--disable-dev-shm-usage')
            }
            return launchOptions
          })

          const file = config.env.configFile || 'api'
          return getConfigurationByFile(file)
        }

    * criar uma pasta chamada 'schema' dentro de /fixtures, amarzenando dentro dessa pasta outras pastas referentes aos verbos que serão testados. Ex.: get-user.

    * dentro de schema/get-user, serão criados arquivos json, que recebe o status http que a resposta representa. Ex.: para o post-user, pode existir o arquivo 201.json e 400.json.

    * dentro do arquivo 200.json, por exemplo, será colocado o schema referente à resposta que será testada. o schema pode ser gerado no site abaixo, seguindo as configurações:

        https://www.jsonschema.net/home
            settings:
                * keywords visibility
                    - type
                    - additionalProperties
                    - additionalItems
                    - required

                * Array Validation
                    - First(single schema)

                *identify type
                    - none

    * criar a feature que será testada em /spec
    * criar o step da feature em /step_definitions. Ex.: 'contrato.step.js'
    * importar o cucumber-preprocessor paro o step, usando a linha de código abaixo:
        import {Given, When, Then, And, Before, But} from 'cypress-cucumber-preprocessor/steps'
    
    * criar uma pasta 'services'
    * criar uma pasta 'common' dentro de /services
    * criar um arquivo '_rest.service.js' e adicionar as funções abaixo para organizar oq será enviado atravez da chamada dessa função:
        export default class Rest {
        
            static httpRequestWithBody(method, endpoint, body, failOnStatusCode = false, timeout = Cypress.env      ('global_timeout')){
                return cy.request({
                    method: method, 
                    url: endpoint, 
                    body: body, 
                    failOnStatusCode: failOnStatusCode, 
                    timeout: timeout
                })
            }

            static httpRequestWithoutBody(method, endpoint, failOnStatusCode = false, timeout = Cypress.env     ('global_timeout')){
                return cy.request({
                    method: method, 
                    url: endpoint, 
                    failOnStatusCode: failOnStatusCode, 
                    timeout: timeout
                })
            }

        }
        
    * criar um arquivo *.service.js dentro de /service. Ex.: serverest.service.js
    * criar uma classe para armazenar as chamadas da api. onde serão executadas as chamadas das funções criadas anteriormente.
    * iportar a classe para a chamada no step para o step referente.
    * ir em suport/commands para criar um comando
    





    

