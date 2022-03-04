## EasyUI

A design system powered by React & Typescript, supported by Storybook & React-testing-library.

## Design Thinking Process

-   `SCSS` is chosen as the styling solution for this UI library
-   `normalize.css` is used to make browsers render all elements more consistently
-   SCSS variables are defined for granular style control and reusability
-   Typescript is used to provide strong typing to the UI library
-   Unit tests are written with the help of `React Testing Library`
-   Create a `tsconfig.build.json` to compile `.tsx` files for build
-   `node-sass` is used to compile SCSS to CSS for build
-   `npm link` is used to link the UI library to a project for better local development
-   `npm link` is also used to address [`Invalid Hook Call Warning`](https://reactjs.org/warnings/invalid-hook-call-warning.html)
-   Move React and React-dom packages to `peerDependencies` so user would not install duplicate React package

## Available Scripts

In the project directory, you can run:

### `yarn install`

Install project dependencies.

Note: If you run into error during `yarn install`, please make sure you downgrade your `node` version to `v14` as `node-sass` in this project does not support the latest version of `node`.

### `yarn build`

Build the app for production in `dist` folder.

### `yarn build-css`

Convert SASS to CSS for production in `dist` folder.

### `yarn build-ts`

Convert Typescript to Javascript for production in `dist` folder.

### `yarn build-storybook`

Build storybook stories to webpages

### `yarn clean`

Clear up previous build output.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn test:ci`

Launches the test runner in CI mode.

### `yarn storybook`

Launches Storybook at [http://localhost:9009](http://localhost:9009).

### `yarn lint`

Lint the codebase using ESLint.

### `yarn format`

Format the codebase using Prettier.
