# DEPRECATION NOTE

When I've created this project I was lacking good component library creators. If you need to create a component library in 2020 (and beyond) I would strongly suggest you take a look at [`TSDX`](https://github.com/formium/tsdx).

This project brings all you need to create npm packages (including react components package), like build, test, lint, github pipeline, storybook and much more all out of the box.



# React Component Library Generator

> All you need to create your shareable React Component Library

[![License](https://img.shields.io/npm/l/generator-react-component-library.svg)](./LICENSE)
[![npm](https://img.shields.io/npm/v/generator-react-component-library.svg)](https://www.npmjs.com/package/generator-react-component-library)
[![Build](https://travis-ci.org/raulfdm/generator-react-component-library.svg?branch=master)](https://travis-ci.org/raulfdm/generator-react-component-library)

## Table of Content

- [React Component Library Generator](#react-component-library-generator)
  - [Table of Content](#table-of-content)
  - [Why](#why)
  - [Usage](#usage)
  - [Dependencies](#dependencies)
  - [Folder Structure Explained](#folder-structure-explained)
  - [Options explained](#options-explained)
    - [Package Manager](#package-manager)
    - [Tester](#tester)
    - [Storybook](#storybook)
      - [Preset](#preset)
      - [Addons](#addons)
      - [Story Format](#story-format)
  - [SASS](#sass)
  - [What about styled-components/emotion?](#what-about-styled-componentsemotion)
  - [Publishing process](#publishing-process)
    - [Quick explanation](#quick-explanation)
    - [Publishing](#publishing)
  - [Run locally](#run-locally)
  - [Questions and Comments](#questions-and-comments)
  - [License](#license)

## Why

The idea to create this project came after try to easily create a React library using [`create-react-library`](https://github.com/DimiMikadze/create-react-library).

This one was built on top of `create-react-app` and grasps a lot from `react-scripts` and bring some templates files like `package.json`, `rollup.config.js`, babel and npm scripts already configured.

The big problem came when I've realized all their dependency is out-to-date, like using babel v6 and it didn't have an option to already have `storybook`.
Also when I tried to install it, a lot of conflicts between versions were there.

Also, it's been using `react-scripts` only to get tests set up, which limits what we can do.

Then I decide to create this generator and maintain everything up-to-date and also bring some options like `storybook`, `react-testing-library` and more.

## Usage

This is a generator built on top of Yeoman. Then you have to install both Yeoman and this package globally:

```bash
yarn global add yo generator-react-component-library
# Or for npm
npm install --global yo generator-react-component-library
```

Now, go to the root folder where you want to create your project and run:

```
yo react-component-library
```

A couple of questions will be asked in order to generate the perfect match for you.

## Dependencies

The scaffold is using:

| Dependency             | version   |
| ---------------------- | --------- |
| react                  | v^16.13.x |
| react-dom              | v^16.13.x |
| @babel                 | v^7.x     |
| rollup                 | v^2.6     |
| jest                   | v^25.2.1  |
| @testing-library/react | v^10.x    |
| @storybook/\*          | v^5.3.x   |

## Folder Structure Explained

So basically when you generate a project using this generator you're gonna have a folder structure like this:

```
.
├── .storybook // optional
│   ├── index.css
│   ├── main.js
│   └── preview.js
├── dist
│   ├── index.es.js
│   ├── index.es.js.map
│   ├── index.cjs.js
│   └── index.cjs.js.map
├── src
│   ├── Button
│   │   ├── Button.js
│   │   ├── Button.module.css
│   │   ├── Button.stories.js // optional
│   │   ├── Button.test.js // optional
│   │   └── index.js
│   └── index.js
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── babel.config.js
├── package.json
├── rollup.config.js
└── yarn.lock
```

Where:

| File/dir          | Details                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------- |
| .storybook        | Storybook setup                                                                          |
| dist              | Folder where your compiled files will live                                               |
| src               | Folder where your components will live                                                   |
| src/index.js      | Barrel which exports all components (entry point)                                        |
| .editorconfig     | Global editor config                                                                     |
| .eslintrc.js      | Basic rules for eslint.                                                                  |
| babel.config.js   | Babel setup files for both build and test environment. You can add some plugins in there |
| .rollup.config.js | Whole build configuration                                                                |

## Options explained

### Package Manager

This is really basic but allows you to start the project using either `npm` or `yarn`.

### Tester

For tests we have only three options: `jest + @testing-library/react` or `none`.

When you select one of the test options, it'll be copied all configs in order to make it work and also a very basic example (`src/Button/Button.test.js`) how to test the component using the chosen library.

Also, will add 2 commands inside the package.json: `test` and `test:watch`. The first one is only to run all tests **once** and the second one is to reloading and running the tests on every file change.

Both options were configured using `jest` but the principles and config. might be almost the same. If you use another test runner you can still pick up one of the options and adapt it.

### Storybook

Here we're using the latest version (v5.3) from Storybook. It's configured to read all `.stories` files inside `src`.

Also, it adds 2 npm scripts:

- `storybook`: Which will start it at port 6006
- `build:storybook`: Which will build your storybook inside `public/` folder.

#### Preset

Preset is a group of config (babel, webpack, addons) that support specific use cases.

TO avoid too much extra config/custom webpack, etc., I decided to use the [`@storybook/preset-create-react-app`](https://github.com/storybookjs/presets/tree/master/packages/preset-create-react-app) which (as the name already explains), uses all the config from Create React App under-the-hood.

Then it has 2 side effects:

1. `react-scripts` needs to be installed;
1. components css files, if used as `css modules`, needs to be suffixed with `<name>.module.css` ([Read more here](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/))

#### Addons

About addons, a couple of are been used here:

- [`storybook-readme`](https://www.npmjs.com/package/storybook-readme): To load markdown files (ie. `README.md` for the component) and then show as documentation;
- [`@storybook/addon-actions`](https://www.npmjs.com/package/@storybook/addon-actions): It's a kind of event handler and you can see in a panel what event was triggered, which component and what's the payload;
- [`@storybook/addon-links`](https://www.npmjs.com/package/@storybook/addon-links): Allow you to link one story to other completely different. This is a kind of "router". Otherwise, you'll refresh the page;
- [`@storybook/addon-viewport`](https://www.npmjs.com/package/@storybook/addon-viewport): Give to you a bunch of pre-defined screen sizes and resize your story based on your selection. It's really nice to teste responsiveness;
- [`@storybook/addon-a11y`](https://www.npmjs.com/package/@storybook/addon-a11y): This is a panel which checks your story and gives you some warnings based on a11y rules;
- [`@storybook/addon-storysource`](https://www.npmjs.com/package/@storybook/addon-storysource): A panel to check what's the source code from your story without open it in an editor.

#### Story Format

The example is written in Component Story Format (CSF).

> [Read more here](https://storybook.js.org/docs/formats/component-story-format/)

## SASS

> ⚠️ This functionality isn't present

To work with SASS, there are two things to keep in mind:

1. it needs to work with storybook.
   Since storybook uses `react-scripts`, it won't be a problem.
2. you need to add this configuration into postCSS configuration. [Check the necessary steps here](https://github.com/egoist/rollup-plugin-postcss#with-sassstylusless)

## What about styled-components/emotion?

Personally, I'd rather always use such libraries like these.

Since it's kinda trivial (they have pretty good documentation about this), I even didn't add here.

Always keep in mind that you need to provide extra information how to setup your library with SSR.

Also, if you need `symlink` your library to test locally, having libraries such `styled-component` will demand some extra steps ([read more here](https://styled-components.com/docs/faqs#how-can-i-fix-issues-when-using-npm-link-or-yarn-link)). My advise is, if you need to link your library:

1. link root level;
2. navigate into `node_modules/react` and also link it;
3. go inside your project and use both your library link and react.

The reason for that is because libraries such `React` are supposed to be a singleton and when linking, there will be 2 react versions in the same project.

## Publishing process

It's time to do the most important thing about shared components: publish them.

### Quick explanation

As I explained before, all your files will be compiled inside the `dist` folder.

`package.json` is configured to distribute your bundles in two ways:

- ES Modules. An `index.es.js` file will be created and it'll be available via `module` field into `package.json`.
- CommonJS. An `index.cjs.js` file will be created and it'll be available via `main` field into `package.json`.

Rollup provides some description of why `ES Module` is better than `CommonJS`:

> ES modules are an official standard and the clear path forward for JavaScript code structure, whereas CommonJS modules are an idiosyncratic legacy format that served as a stopgap solution before ES modules had been proposed. ES modules allow static analysis that helps with optimizations like tree-shaking, and provide advanced features like circular references and live bindings. ([Rollup description](https://rollupjs.org/guide/en/#faqs))

But to be safe, we generate both and allow the platform to choose which one it wants to use.

Finally, a field `files` will be added into the package.json which `["dist]` value. It means when you publish your package, only the following files will be published:

- package.json
- README
- CHANGES / CHANGELOG / HISTORY
- LICENSE / LICENCE
- NOTICE
- (and now) `dist` folder

> [Font: Npm](https://docs.npmjs.com/files/package.json#files)

### Publishing

If your not familiar with this process, I'd recommend you [this article](https://zellwk.com/blog/publish-to-npm/).

But in a nutshell, you have to run `yarn build`, bump your package version and then `yarn publish`.

My suggestion is using some tool to automate this process with you, like [`semantic-release`](https://github.com/semantic-release/semantic-release) and combine with some CI script to automate the publish when something is committed in `master` branch.

> You can copy the process I have for this library :)

## Run locally

If you want to contribute, is quite simple.

1. First, you have to clone the repository (this one);
1. Install the dependencies `yarn install`;
1. Install yeoman globally `yarn global add yo`;
1. Link the folder into your global packages (`yarn link` or `npm link`);
1. Now you can run `yo react-component-library`;

If you want to run the tests, just run `yarn tests`.

## Questions and Comments

Feel free to open a PR if you want to contribute somehow or either ask something by using issues.

## License

`generator-react-component-library` is licensed under the [MIT License](./LICENSE.md).
