# Projeto seleção labcode

## Pré-requisitos

Para executar o projetos disponíveis é necessário ter o **node** instalado na máquina.

## Projetos

Por requisitos informados seria necessário desenvolver o projeto utilizando as tecnologias Django/python e React.

A ideia geral seria desenvolver o FrontEnd utilizando React e o backEnd usando django/python.
O projeto do "project-todo-list" corresponde ao frontEnd. Já o projeto "backend-fake-api" simula o que seria o backEnd.

### project-todo-list

Projeto desenvolvimento em react com intuito de ser o frontEnd. Esse projeto foi criado utilizando o módulo "create-react-app" do node. 

De forma adicional, foram incluídos os seguintes módulos no projeto:

- bootstrap
- pubsub-js
- react-router-dom

Para executar o projeto é necessário, em terminal, navegar onde se encontra o projeto e executar o comando.
```
npm start
```

### backend-fake-api

Projeto que simular uma api que no caso deveria ser desenvolvida em Django/python. Esse projeto é utilizar o módulo json-server (no node) para ler e disponbilizar informações de um json.

Para executar o projeto é necessário, em terminal, navegar onde se encontra o projeto e executar o comando.
```
json-server --watch db.json --port 3001
```