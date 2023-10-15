
## Environment variables setup

# Angular Environment Setup

In Angular, switching branches can cause environment files to disappear, leading to setup hassles and potential accidental commits. To address this, a script has been crafted for your convenience. It automatically relocates your environment folders to match the active branch, ensuring safety from unintentional commits, thanks to entries in the gitignore file.

# Set Up the Automatic Switching
1. **Copy the Hook Script:** Copy the post-checkout hook script into your project. The script is located at .githooks/post-checkout in the root of your project.
<pre>
cp .githooks/post-checkout .git/hooks/post-checkout
</pre>

2. **Make the Script Executable:** Ensure that the script is executable by running the following command:
<pre>
chmod +x .git/hooks/post-checkout
</pre>

3. **Set Up Environment Files:** Make sure you have environment files for each branch (e.g., environment.prod.ts, environment.staging.ts, environment.dev.ts). The hook script will automatically switch the environment.ts file when changing branches.

# Usage
- When you switch to the main branch, it will use environment.prod.ts.
- When you switch to the staging branch, it will use environment.staging.ts.
- For other branches, it will use environment.dev.ts.

Now, whenever you switch branches, the environment file will be automatically updated.

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


