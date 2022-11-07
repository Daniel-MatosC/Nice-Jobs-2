<h1 align="center">
  Nice Jobs - API
</h1>

<p align = "center">
Este é o back end da aplicação Nice Jobs - uma plataforma que torna possível cadastrar e contratar serviços informais.
</p>

<p align="center">
  <a href="#endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>

## **Endpoints**

A API tem um total de 15 endpoints, sendo em volta principalmente do usuário (dev) - podendo cadastrar seu perfil e serviços. <br/>

O url base da API é 

## Rotas que não precisam de autenticação

<h2 align ='center'> Criando usuário </h2>

Podemos criar usuários dessa forma:

`POST /users - FORMATO DA REQUISIÇÃO`

```json
{
    "name":"Hassan",
    "email":"hassan@kenzie.com",
    "isPremium": false,
    "isOffering": true,
    "password":"1234"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /users - FORMATO DA RESPOSTA - STATUS 201`

```json
{
    "id": "ecd98406-a0af-4ccc-9d43-9aa735f48b04",
    "createdAt": "2022-11-05T13:32:37.012Z",
    "updatedAt": "2022-11-05T13:32:37.012Z",
    "name": "Hassan",
    "email": "hassan@kenzie.com",
    "isPremium": false,
    "isOffering": true,
    "isActive": true
}
```

<h2 align ='center'> Logando </h2>

Nessa aplicação o usuário deve estar logado para poder estar vendo os outros usuários por ID, na API podemos logar dessa forma:

`POST /login - FORMATO DA REQUISIÇÃO`

```json
{
	"email": "matheus@kenzie.com",
	"password": "1234"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /login - FORMATO DA RESPOSTA - STATUS 200`

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdGhldXNAa2VuemllLmNvbSIsImlzQWN0aXZlIjp0cnVlLCJpc1ByZW1pdW0iOnRydWUsImlzT2ZmZXJpbmciOnRydWUsImlhdCI6MTY2NzgyNzcyNywiZXhwIjoxNjY3OTE0MTI3LCJzdWIiOiI3YzY2NDQ2NC0wMjI3LTRiM2MtOTI0OC0xYTllYTI3MDg1YmIifQ.pYSd-qBtMZ4Yhg_wzYLPWmCjqkfxoHqOC3S6PH8Y_VI"
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:

No exemplo a requisição foi feita faltando o campo "password".

`POST /login - `
` FORMATO DA RESPOSTA - STATUS 403`

```json
"Email and password are required"
```

A senha está incorreta:

`POST /login - `
` FORMATO DA RESPOSTA - STATUS 403`

```json
"Incorrect email/password combination"
```

O email está incorreto, ou o usuário não existe:

`POST /login - `
` FORMATO DA RESPOSTA - STATUS 403`

```json
"User not found"
```

Email já cadastrado:

`POST /users - `
` FORMATO DA RESPOSTA - STATUS 400`

```json
 "User already exists"
```

##

## Rotas que precisam de autenticação

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

<h2 align ='center'> Editar usuários </h2>

Por meio desse end-point pode ser editado um usuário específico, utilizando o id do usuário no lugar de "/:id", dessa forma:

`PATCH /users/:id - FORMATO DA REQUISIÇÃO`

```json
{
	"name": "Matheus Gomes",
	"email": "matheus@kenzie.com",
	"isPremium": true,
	"isOffering": false,
	"password": "12345"
}
```

`PATCH /users/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
	"id": "8d49c0ce-df4a-4be6-9f12-0acdeac31b3c",
	"createdAt": "2022-11-07T13:46:58.846Z",
	"updatedAt": "2022-11-07T13:46:58.846Z",
	"name": "Hassan 3",
	"email": "hassan@kenzie34.com",
	"isPremium": true,
	"isActive": true,
	"isOffering": true
}
```
<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:

No exemplo a requisição foi feita faltando passar o token.

`PATCH /users/:id - `
` FORMATO DA RESPOSTA - STATUS 401`

```json
"Invalid token"
```

O usuário não existe:

`PATCH /users/:id - `
` FORMATO DA RESPOSTA - STATUS 404`

```json
"User not found"
```

O usuario está inativo (isActive: false):

`PATCH /users/:id - `
` FORMATO DA RESPOSTA - STATUS 401`

```json
"You do not have permission to change one of this values"
```

Id incorreto:

`PATCH /users/:id - `
` FORMATO DA RESPOSTA - STATUS 401`

```json
 "You do not have permission to change one of this values"
```

##

<h2 align ='center'> Deletar usuários </h2>

Por meio desse end-point pode ser realizado um soft delete de um usuário específico, utilizando o id do usuário no lugar de "/:id", dessa forma:

`DELETE /users/:id - STATUS 204`

```
Não é necessário um corpo da requisição.
```
<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando o id, a resposta de erro será assim:

No exemplo a requisição foi feita faltando passar o token.

`PATCH /users/:id - `
` FORMATO DA RESPOSTA - STATUS 401`

```json
"Invalid token"
```

Id incorreto:

`PATCH /users/:id - `
` FORMATO DA RESPOSTA - STATUS 404`

```json
"User not found"
```

O usuario está inativo (isActive: false):

`PATCH /users/:id - `
` FORMATO DA RESPOSTA - STATUS 400`

```json
"Inactive user"
```

##

Após o usuário estar logado, ele deve conseguir buscar, cadastrar, editar e excluir serviços e categorias, além de conseguir criar e buscar uma solicitação/agendamento de um serviço.

<h2 align ='center'> Cadastrar categoria </h2>

Para cadastrar uma categoria devemos utilizar as informações contidas no formato da requisição.

`POST /categories- FORMATO DA REQUISIÇÃO`

```json
{
	"name":"Tecnologia"
}
```

`POST /categories - FORMATO DA RESPOSTA - STATUS 201`

```json
{
	"id": "d2ac7019-8949-49c8-a18c-812fe4515f87",
	"name": "Tecnologia"
}
```

<h2 align ='center'> Buscar categorias (mostrando apenas as categorias cadastradas) </h2>

Podemos utilizar esse end-point para pegar todas as categorias cadastradas pelos usuários.

`GET /categories - FORMATO DA RESPOSTA - STATUS 201`

```json
[
	{
		"id": "0543f11c-113d-41e6-9815-7c787fff6dd2",
		"name": "Bolos"
	},
	{
		"id": "a5abd6d8-b004-4957-bb56-372ff42ef3aa",
		"name": "Tortas"
	},
	{
		"id": "d2ac7019-8949-49c8-a18c-812fe4515f87",
		"name": "Tecnologia"
	}
]
```

```
Não é necessário um corpo da requisição.
```

<h2 align ='center'> Buscar serviços que pertencem a uma categoria </h2>

Por meio desse end-point pode ser realizado uma busca por serviços que pertencem a uma determinada categoria, utilizando o id da categoria no lugar de "/:id", dessa forma:

`GET /categories/:id/services - FORMATO DA RESPOSTA - STATUS 200`

```json
[
	{
		"id": "be9617f4-d2e7-4cd0-9ea6-e6a3a4971aea",
		"createdAt": "2022-11-07T14:08:22.401Z",
		"updatedAt": "2022-11-07T14:08:22.401Z",
		"serviceName": "Faço bolos",
		"serviceOwner": "Hassan2",
		"isActive": true,
		"description": {
			"id": "d04afd1a-0235-488c-a6aa-9f85a38d2751",
			"serviceDescription": "Faço bolos",
			"serviceValue": "50.00",
			"atuationArea": "Bolos"
		}
	}
]

```

```
Não é necessário um corpo da requisição.
```

<h2 align ='center'> Buscar serviços (mostrando o usuário dono) </h2>

Podemos utilizar o id para pegar os usuário que cadastrou o serviço junto com o serviço cadastrado, dessa forma:

`GET /services/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
[
	{
		"id": "74d366fe-6636-4eb6-b6df-a374c08c890c",
		"createdAt": "2022-11-07T14:18:04.258Z",
		"updatedAt": "2022-11-07T14:18:04.258Z",
		"serviceName": "Manutenção e conserto em computadores",
		"serviceOwner": "Hassan2",
		"isActive": true,
		"user": {
			"id": "8d49c0ce-df4a-4be6-9f12-0acdeac31b3c",
			"createdAt": "2022-11-07T13:46:58.846Z",
			"updatedAt": "2022-11-07T13:46:58.846Z",
			"name": "Hassan2",
			"email": "hassan@kenzie2.com",
			"password": "$2b$10$vI0s8plrbJw5I.907jJPguDicOhwnUpq8hYwjvruEh3n6i/UCfWUm",
			"isPremium": false,
			"isActive": true,
			"isOffering": true
		},
		"category": {
			"id": "0543f11c-113d-41e6-9815-7c787fff6dd2",
			"name": "Tecnologia"
		},
		"description": {
			"id": "60baa87f-ec57-4167-9773-2987d4d135a1",
			"serviceDescription": "Faço manutenção e conserto em computadores",
			"serviceValue": "50.00",
			"atuationArea": "Tecnologia"
		}
]
```

<h2 align ='center'> Buscar serviços (mostrando apenas os serviços cadastrados) </h2>

Podemos utilizar sem o id para pegar apenas os serviços cadastrados e o seu ofertante (serviceOwner), dessa forma:

`GET /services - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
		"id": "74d366fe-6636-4eb6-b6df-a374c08c890c",
		"createdAt": "2022-11-07T14:18:04.258Z",
		"updatedAt": "2022-11-07T14:18:04.258Z",
		"serviceName": "Manutenção e conserto em computadores",
		"serviceOwner": "Hassan2",
		"isActive": true,
		"description": {
			"id": "60baa87f-ec57-4167-9773-2987d4d135a1",
			"serviceDescription": "Faço manutenção e conserto em computadores",
			"serviceValue": "50.00",
			"atuationArea": "Tecnologia"
		},
		"category": {
			"id": "0543f11c-113d-41e6-9815-7c787fff6dd2",
			"name": "Tecnologia"
		}
]
```
<h2 align ='center'> Cadastrar serviços do seu perfil </h2>

Para cadastrar um serviço devemos utilizar as informações contidas no formato da requisição e informar sempre de qual usuário e categoria o serviço pertence, com o user e categoryId, dessa forma:

`POST /services - FORMATO DA REQUISIÇÃO`

```json
{
  "serviceName": "Manutenção e conserto em computadores",
  "isActive": true,
  "description":{  
	"serviceDescription":"Faço manutenção e conserto em computadores",
	"serviceValue": 50, 
	},
   "categoryId": "d2ac7019-8949-49c8-a18c-812fe4515f87",
   "user": "8d49c0ce-df4a-4be6-9f12-0acdeac31b3c"
}
```

Obs: Atente-se em inserir a descrição do serviço na area description.

`POST /services - FORMATO DA RESPOSTA - STATUS 201`

```json
{

	"id": "74d366fe-6636-4eb6-b6df-a374c08c890c",
	"createdAt": "2022-11-07T14:18:04.258Z",
	"updatedAt": "2022-11-07T14:18:04.258Z",
	"serviceName": "Manutenção e conserto em computadores",
	"serviceOwner": "Hassan2",
	"isActive": true,
	"category": {
		"id": "0543f11c-113d-41e6-9815-7c787fff6dd2",
		"name": "Tecnologia"
	},
	"user": {
		"id": "8d49c0ce-df4a-4be6-9f12-0acdeac31b3c",
		"createdAt": "2022-11-07T13:46:58.846Z",
		"updatedAt": "2022-11-07T13:46:58.846Z",
		"name": "Hassan2",
		"email": "hassan@kenzie2.com",
		"password": "$2b$10$vI0s8plrbJw5I.907jJPguDicOhwnUpq8hYwjvruEh3n6i/UCfWUm",
		"isPremium": false,
		"isActive": true,
		"isOffering": true
	},
	"description": {
		"id": "60baa87f-ec57-4167-9773-2987d4d135a1",
		"serviceDescription": "Faço manutenção e conserto em computadores",
		"serviceValue": 50,
		"atuationArea": "Tecnologia"
	}
}
```

<h2 align ='center'> Editar serviços do seu perfil </h2>

Você pode apenas dar update nas informações dos serviços que já está no seu perfil, colocando no lugar de "/:id" o id do serviço. Utilizando este endpoint:

`PATCH /services/:id - FORMATO DA REQUISIÇÃO`

```json
{
	"serviceName": "frete",
	"serviceOwner": "Hassan2"
}
```

`PATCH /services/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
	"message": "Service updated!",
	"service": {
		"id": "74d366fe-6636-4eb6-b6df-a374c08c890c",
		"createdAt": "2022-11-07T14:18:04.258Z",
		"updatedAt": "2022-11-07T16:33:27.366Z",
		"serviceName": "frete",
		"serviceOwner": "Hassan2",
		"isActive": true,
		"user": {
			"id": "8d49c0ce-df4a-4be6-9f12-0acdeac31b3c",
			"createdAt": "2022-11-07T13:46:58.846Z",
			"updatedAt": "2022-11-07T13:46:58.846Z",
			"name": "Hassan2",
			"email": "hassan@kenzie2.com",
			"password": "$2b$10$vI0s8plrbJw5I.907jJPguDicOhwnUpq8hYwjvruEh3n6i/UCfWUm",
			"isPremium": false,
			"isActive": true,
			"isOffering": true
		},
		"description": {
			"id": "60baa87f-ec57-4167-9773-2987d4d135a1",
			"serviceDescription": "Faço manutenção e conserto em computadores",
			"serviceValue": "50.00",
			"atuationArea": "Bolos"
		}
	}
}
```
<h2 align ='center'> Deletar Serviços do seu perfil </h2>

Por meio desse end-point pode ser removido (deletado) um serviço específico, utilizando o id do usuário no lugar de ":id", dessa forma:

`DELETE /services/:id - STATUS 200`

```json

{
	"message": "Service deleted!"
}

```

```
Não é necessário um corpo da requisição.
```

<h2 align ='center'> Cria uma solicitação de serviço </h2>

Para criar uma solicitação de serviço devemos utilizar as informações contidas no formato da requisição e informar sempre (... em construção)

`POST /schedules - FORMATO DA REQUISIÇÃO`

---

Feito by Daniel-MatosC (SM) :wave:
