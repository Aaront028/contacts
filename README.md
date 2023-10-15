Environment Variables Setup
To manage environment variables in your Angular application, follow these steps:

1. Create an Environments Folder
Create a folder named environments under the src/app/ directory.

2. Create environment.local.ts
Inside the environments folder, create a file named environment.local.ts and define your environment variables:

<pre>
// src/app/environments/environment.local.ts

export const environment = {
  production: true,  // Set to 'false' for development
  apiUrl: 'ENTER-YOUR-GRAPHQ-URLl',  // Your GraphQL API endpoint
  hasuraAdminSecret: 'ENTER-YOUR-SECRET-CODE',  // Your Hasura Admin Secret
};
</pre>
Update the values according to your project's requirements.

3. Usage
In your Angular components, services, or other parts of your application, you can import the environment variables:

<pre>
// Import environment variables
import { environment } from '../environments/environment.local';

// Access variables
console.log(environment.production); 
console.log(environment.apiUrl);       
console.log(environment.hasuraAdminSecret);  
</pre>

# Contacts

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
# contacts


