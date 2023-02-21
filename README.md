# MsApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.6.

## Installation

- Install the latest version of [nvm](https://github.com/nvm-sh/nvm)
- Install the latest version of [Angular CLI](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04) with `npm install -g @angular/cli`
- Install everything with `make install`

## Manual installation of dependencies (if make `make install` fails)

- Install the version of Node.js defined in .nvmrc `nvm install` or `nvm install $(cat .nvmrc)`
- Used the version of Node.js defined in .nvmrc `nvm use` or `nvm use $(cat .nvmrc)`

## Development server

Run `make start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `make build` or `ng build --prod` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `make test` or `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
