## Installation

- Install `postgres` docker using following command:

```
$ docker run -it --name postgres -d -e POSTGRES_PASSWORD="password" -p 5432:5432 -v /var/lib/docker-db/postgresql/data:/var/lib/postgresql/data postgres
```

- In the project directory run the following command:

```
$ yarn
```

- Run the following command to migrate database schema to the docker database

```
$ yarn db:migrate
```

- Run the following command to seed 3 three dummy users in the database.

```
$ yarn db:seed
```

- Run the following command to start the server in dev mode:

```
$ yarn dev
```

The server should be running on http://localhost:9000/

## Running the app

- Go to the `http://localhost:9000/swagger/` to test the API endpoints.
