# Blood Donor - Server
The main REST API backend responsible for serving stateful data for the Blood Donor mobile apps.

## Installation
This package uses [Node.js](https://nodejs.org/en/) together with [Docker](https://www.docker.com/), make sure you've got them installed.
```bash
# get dependencies
$ npm install
```

## Running the app
To run the app:
```bash
# build the containers
$ docker-compose up
```
Or, if you made changes to `package.json`:
```bash
# force npm install
$ docker-compose up --build
```

Access to the DB available via [pgAdmin](http://localhost:8080).

## Contributing
Please lint your changes before committing changes:
```bash
# eslint
$ npm run lint
```

## Testing
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
