# kiliba-test

A simple API ready to deploy for a technical test.

API URL: http://15.188.238.218:4100/

The database is not accessible from outside.

## Get started

```
npm start
```

This deploys 2 containers: one for the API (port 4100) and one for the DB (port 4200).

## Routes

- GET /users returns a list of users
  - query parameters: email (optional)
- POST /users create a list of users

## How it works

NestJS is an API framework. It is easy to use, very well documented and supported and has a big community behind it.

Its main components are the following:

- Controllers expose routes to the outside and handles them.
- Services communicate with internal services, such as database or cache systems. Typically, controllers call services.
- Repositories are interfaces between the API and the database. They provide tools for accessing the database.
- Entity represent database data. NestJS uses an ORM (TypeORM in our case) to map these entities to the database.
- DTOs are... [DTOs](https://en.wikipedia.org/wiki/Data_transfer_object). They are patterns for data transfers.
- Modules are a way of registrating all these components in order for the API to know that they work together.

For example, `UserController` exposes `GET /users` to the outside. Whenever it is called, it calls `UserService`'s `getUsers`. This function uses `Repository<UserEntity>` (the `Repository` corresponding to the `UserEntity`) in order to fetch users in the database. `UserEntity` defines what the data should look like. Also, it is possible to pass the query parameter `email` to `GET /users`. The query should correspond to `GetUsersRequestQueryDTO` (in order for it to become a requirement, implement [validation](https://docs.nestjs.com/techniques/validation)). The `UserModule` registrates `UserController`, `UserService` and `UserEntity` as its components so they API know they work together.

## Deployment

When done working, merge your changes on master. This will trigger a Travis build and the application will be redeployed.

Note that the private key used to access the server and the environment variables for production are accessible in an encrypted archive. Travis decrypts this archive and uses them to deploy the application. They cannot be decrypted out of Travis. If you need to use another private key or change the environment variables, you must recreate the encrypted archive with `npm run build:enc`. Please check in `devops/prod/scripts/build_enc.sh` that the path towards the new private key is valid.
