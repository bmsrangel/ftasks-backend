# :ballot_box_with_check: F-Tasks Backend

## Descrição
Este projeto contém o código do Backend da aplicação "F-Tasks". O foco deste projeto é muito voltado para a parte de autenticação e autorização.

Resumidamente, para usar a ferramenta, o usuário precisa criar um login fornecendo dados como nome, email e senha, e ao entrar com suas credenciais, a aplicação retorna seu nome e um token de acesso. Para acessar recursos protegidos, como a lista de suas tarefas, criação de novas tarefas e atualização do status das mesmas, o usuário precisa fornecer seu token junto à requisição.

Além disso, é preciso cuidar da data de expiração do token. Caso esteja expirado, é necessário fazer o processo de refresh do token, onde o backend fornece um novo token válido e o usuário pode utilizá-lo para fazer novamente suas requisições.

## Tecnologias utilizadas na aplicação

[Nest](https://github.com/nestjs/nest) - Framework para o desenvolvimento da aplicação.
[TypeORM](https://typeorm.io/) - Ferramenta ORM com suporte à praticamente todos os ambientes que utilizam Javascript/Typescript
[SQLite](https://www.sqlite.org/index.html) - Banco de dados utilizado nesta aplicação
[Passport](http://www.passportjs.org/) - Middleware para autenticação com suporte à centenas de estrategias

## Instalação

```bash
$ npm install
```

## Executando a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
