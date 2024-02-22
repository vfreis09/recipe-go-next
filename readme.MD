# Recipe Sharing App

An backend service for a recipe sharing application that allows users to upload and share recipes, search for recipes based on different criteria, and save their favorite recipes. 
## Tech

Resources that I'm using in this app:

| Resource | Links |
| ------ | ------ |
| Typescript | https://www.typescriptlang.org/ |
| React | https://react.dev/ |
| Next.js | https://nextjs.org/ |
| Golang | https://go.dev/ |
| Echo | https://echo.labstack.com/ |
| PostgreSQL | https://www.postgresql.org/ |

## Installation
This application requires [Node.js](https://nodejs.org/), [Pnpm](https://pnpm.io/installation), [Golang](https://go.dev/) and [PostgreSQL](https://www.postgresql.org/) to run. Make sure to create an .env file to store your environment variables, create your database in PostgreSQL and to check the database/PostgreSQL code in the backend.

## How to run


For the environment variables (in the server folder) in your .env file:

```sh
DB_STRING="your db string, example: postgres://MyName:MyPassword@localhost/MyDbName?sslmode=disable"
```

Start the server:

```sh
cd into project root
cd server
go run cmd/server/main.go
```
Now the backend is running at http://localhost:4000/api/recipes

For the client part:

Install node dependencies:
```sh
cd into project root
cd client
pnpm i
```
To run the client side:
```sh
pnpm run dev
```

The client is now running at http://localhost:3000/
