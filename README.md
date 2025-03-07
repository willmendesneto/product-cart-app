# Product Cart App

> Product/Shopping Cart App

![main branch](https://github.com/willmendesneto/product-cart-app/actions/workflows/main.yml/badge.svg?branch=main)

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

- Using [Redux Toolkit](https://redux-toolkit.js.org/) as Redux solution: it avoids a lot of duplication and boilerplate apps using redux commonly enforces
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
│   ├── <a href="#srccomponents" title="src/components folder">components</a>
│   ├── <a href="#srclib" title="src/lib folder">lib</a>
│   ├── <a href="#srclocales" title="src/locales folder">locales</a>
│   ├── <a href="#srcpages" title="src/pages folder">pages</a>
│   ├── <a href="#srcqueries" title="src/queries folder">queries</a>
│   ├── <a href="#srctypes" title="src/components folder">types</a>
│   ├── <a href="#srcutils" title="src/utils folder">utils</a>
├── test
│   ├── <a href="#testfixtures" title="test/fixtures folder">fixtures</a>
├── <a href="#mock" title="mock folder">mock</a>
</pre>

#### `.nvmrc`

File with specifig NodeJS version to be used in this application.

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

#### `src/utils`

A folder to add some common utilities!

#### `test`

A subset of files with methods and functions used on the tests as helpers. Mocks for React queries, HTTP requests, renders adding specific providers, fixture generators and more.

#### `test/fixtures`

A list of useful fixtures to be used in our tests, supporting types/interfaces


#### `mock`

A folder with files used on json-server configuration for API mocking purposes. 

E.G: by adding `products.json` inside this folder, the endpoint `http://localhost:5173/api/products` will be available on the app.

> For more details on supported HTTP methods and such, please check https://github.com/alextim/vite-plugin-simple-json-server/tree/main/packages/vite-plugin-simple-json-server#readme 

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

## Architectural Decisions by tooling

By using ESlint and Prettier, this project is not only enforcing some code rules, but also some architectural decisions, such as:

### Importing components via app alias instead of relative imports

This will support developers during maintenance and refactor across the components since it enforces naming exports, which makes navigation through editors even more faster and enjoyable

### Not allowing `export default`

This is a common mistake across frontend codebases and there are tones of content around the web sharing the drawbacks of using `ex port default`. For more details, please check [Typescript Deep Dive: Avoid Export Default](https://basarat.gitbook.io/typescript/main-1/defaultisbad) link

### Now allowing usage of imports in certain libraries

Another common mistake is allowing several ways of using specific libraries and integrations. As an example, this codebase covers a scenario quite common of unit tests having some custom render method exported from `@testing-library/react`. There are some special reasons around that, such as:

- components using other libraries, such as `react-router` hooks, which requires a component provider as a wrapper.
- Specific app configuration to be passed through the components, such as page and template components

```js
// ❌ it throws an error when running `npm run lint`
// Also, it shows a message with the solution
//    `Please use 'import { renderWithQueryProvider } from "@test/testUtils"' instead`
import { render } from '@testing-library/react'
// ...
```

### Guiding developers through code structure

Commonly the application will evolve and the app might come up with some problems architectural decisions by accident, architectural erosion and such. Hopefully, there are ways to mitigate that via code.

As an example, this codebase covers scenarios where API requests should be added/created/updated and some library usage should be allowed in specific folders and files, respectively.

For more details, please look the rules `no-restricted-globals` and `no-restricted-imports` inside `.eslintrc.cjs` file

## Improvements

These are the list of the tech debt / improvements for this project

- [ ] Improve the Developer Experience - AKA DX - in this project by improving some ESLint/Prettier rules, Lint-Staged and Husky hooks, etc. The current setup is good, but there are always some room for improvement;
- [ ] Add different layers of test, such as performance and E2E tests;
- [ ] Error Boundary to catch all the application errors;
- [ ] Add StorybookJS/Vitepress scenarios, simulating how the components should work in different cases;
- [ ] Create specific components for forms cells (inputs, select, etc) and make them reusable. Unfortunately, I couldn't done that yet, but this is something quite easy to be applied;
- [ ] Service discovery integration with the API, such as `consul`, with fallback for `.env`. This will make the application decoupled with the code and configuration, avoiding unnecessary deployment in case of the configuration changes;

## Author

**Wilson Mendes (willmendesneto)**

- <http://github.com/willmendesneto>
