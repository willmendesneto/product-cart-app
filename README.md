# Navalia App

> Navalia App - Shopping Cart

![main branch](https://github.com/willmendesneto/navalia-app/actions/workflows/main.yml/badge.svg
?branch=main)

## Frameworks, Libraries and Tools

- Typescript: so we can add some batteries in our JS files;
- JSON Server as API mock solution;
- ESLint + Prettier for code linting, enforcing some rules and patterns across the codebase;
- Fetch as HTTP client;
- React Query as HTTP Request solution for reconnections, cache and more;
- ReactJS as JavaScript library for building user interfaces;
- NPM as dependency manager;
- SCSS + CSS Modules as a solution for style;
- Vite as Zero-Config solution of this project;
- Vitest as test framework;
- React Testing Library as test utilities;
- React i18Next as a i18n solution;
- Use Local Storage Stage package to store data locally;

## Why not Redux, though?

The code is following all the web standards in order of keeping components and pages stateless as much as possible. So every single step is quite reproducible.

Also, by having carts in a specific boudary, React Query as API manager applying some advanced concepts such as data caching, debouncing and such, typescript for API and props contract mapping... it seems way overkill.

### However, here's the architecture design for a Redux implementation

- Using Redux Toolkit as Redux solution: it avoids a lot of duplication and boilerplate apps using redux commonly enforces
- Pretty much moving the cart counter for a reducer + actions and state
  - store only the id and quantity insted of a whole product item for the sake of performance and Store best practices https://redux.js.org/style-guide/
- Store for products: not needed! By following the current architecture design, the products are coming from the API, stored and cached via React Query, having only a reference of `product.id`. So that, we can make sure the pages are stateless and requesting the product data by id when/id necessary. Depending of the case this request can be even cached for some specific time based on the product id - thanks to React Query :) 

## Setup and installation

Make sure that you are using the NodeJS version is the same as `.nvmrc` file version. If you don't have this version please use a version manager such as `nvm` or `n` to manage your local nodejs versions.

> Please make sure that you are using NodeJS version 20.9.0

Assuming that you are using `nvm`, please run the commands inside this folder:

```bash
$ nvm install $(cat .nvmrc); # install required nodejs version
$ nvm use $(cat .nvmrc); # use nodejs version
```

In Windows, please install NodeJS using one of these options:

Via `NVM Windows` package: Dowload via [this link](https://github.com/coreybutler/nvm-windows). After that, run the commands:

```bash
$ nvm install $(cat .nvmrc); # install required nodejs version
$ nvm use $(cat .nvmrc); # use nodejs version
```

Via Chocolatey:

```bash
$ choco install nodejs.install -version 16.14.0
```

## Code architecture

Here is a selection of the interesting parts:

<pre>
.
├── <a href="#nvmrc" title=".nvmrc file">.nvmrc</a>
├── src
│   ├── components
│   ├── lib
│   ├── locales
│   ├── pages
│   ├── queries
│   ├── types
│   ├── utils
├── test
│   ├── fixtures
</pre>

#### `src/components`

Folder where you can find reusable components, such as skeletons, lists, etc.

#### `src/lib`

That's the place you can find configuration for some of the packages and integrations, such as i18n and schema validations locales.

#### `src/locales`

I18n files based on the current language. At the moment, the application is covering only EN, but it can manage different languages, as soon as it follows the current structure:

- commmon: Reusable content and/or text that might be used a lot among the application
- products: Specific content that's used only on the products pages;
- cart: Specific content that's used only on the cart pages;

#### `src/pages`

These are components which are the main representation of application pages. Top-level components where you can find business logic, such as HTTP requests, error handlers, etc. Usually, it's used to get the information and pass through components.

#### `src/queries`

That's wonderland! In this folder you can find all the integrations with the other world - in our case, HTTP Requests. Requests, queries, mutations (even though mutation here is another concept, not related to immutability) and more.

#### `src/types`

Specific types used and shared across different files and components.

#### `src/utis`

A folder to add some common utilities!

#### `test`

A subset of files with methods and functions used on the tests as helpers. Mocks for React queries, HTTP requests, renders adding specific providers, fixture generators and more.

#### `test/fixtures`

A list of useful fixtures to be used in our tests, supporting types/interfaces


### Run the project

```bash
# run the project using json-server mocks
$ npm start
```

### Run the tests

> This command also checks code coverage, open promises and more.

```bash
$ npm test # run the tests
```

### Run the tests in watch mode

```bash
$ npm run test:watch # run the tests
```

### Run the Typescript Checks

```bash
$ npm run tsc:check
```

### Run the Lint Checks

```bash
$ npm run lint
```

### Run the build

```bash
$ npm build # run the tests
```

## Improvements

These are the list of the tech debt / improvements for this project

- [ ] Improve the Developer Experience - AKA DX - in this project by improving some ESLint/Prettier rules, Lint-Staged and Husky hooks, etc;
- [ ] Add different layers of test, such as performance and E2E tests;
- [ ] Error Boundary to catch all the application errors;
- [ ] Add StorybookJS scenarios, simulating how the components should work in different cases;
- [ ] Create specific components for forms cells (inputs, select, etc) and make them reusable. Unfortunately, I couldn't get it done due code challenge deadlines, but this is something quite easy to be applied;
- [ ] Service discovery integration with the API, such as `consul`, with fallback for `.env`. This will make the application decoupled with the code and configuration, avoiding unnecessary deployment in case of the configuration changes;

## Author

**Wilson Mendes (willmendesneto)**

- <http://github.com/willmendesneto>
