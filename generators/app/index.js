const Generator = require('yeoman-generator');
const { merge, isEmpty } = require('lodash');

const { NPM_CHOICE, YARN_CHOICE } = require('./resources/constants');

const { TESTING_LIBRARY } = require('../testing/resources/constants');

const scaffoldPkgJson = require('../scaffold/resources/packageJson');
const testingPkgJson = require('../testing/resources/packageJson');
const storybookPkgJson = require('../storybook/resources/packageJson');

module.exports = class extends Generator {
  async prompting() {
    await this._askFor();
  }

  configuring() {
    /* Will be available via props to others generators */
    this.props.generateDestPath = this._generateDestPath.bind(this);
  }

  default() {
    this.composeWith(require.resolve('../scaffold'), this.props);

    if (this.props.tester) {
      this.composeWith(require.resolve('../testing'), this.props);
    }

    if (this.props.storybook) {
      this.composeWith(require.resolve('../storybook'), this.props);
    }
  }

  writing() {
    const pkg = {
      name: this.props.name,
      description: this.props.description || `${this.props.name}'s library`,
    };

    let nextPkg = merge(pkg, scaffoldPkgJson);

    if (this.props.tester) {
      nextPkg = merge(nextPkg, testingPkgJson[this.props.tester]);
    }

    if (this.props.storybook) {
      nextPkg = merge(nextPkg, storybookPkgJson);
    }

    this.fs.extendJSON(this._generateDestPath('package.json'), nextPkg);
  }

  install() {
    const installer =
      this.props.pkgManager === YARN_CHOICE
        ? this.yarnInstall.bind(this)
        : this.npmInstall.bind(this);

    installer(undefined, undefined, {
      cwd: this._generateDestPath(),
    });
  }

  /* Internals */
  _askFor() {
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        validate(input) {
          return new Promise((resolve, reject) =>
            isEmpty(input) ? reject('Project name is required') : resolve(true),
          );
        },
      },
      {
        type: 'input',
        name: 'descriptions',
        message: 'Some project description',
      },
      {
        type: 'list',
        name: 'pkgManager',
        message: 'What package manager do you want to use?',
        choices: [YARN_CHOICE, NPM_CHOICE],
      },
      {
        type: 'list',
        name: 'tester',
        message: 'What library do you want to use to test?',
        default: 'none',
        choices: [
          {
            name: 'Jest + React Testing Library',
            value: TESTING_LIBRARY,
          },
          {
            name: 'None',
            value: '',
          },
        ],
      },
      {
        type: 'confirm',
        name: 'storybook',
        message: 'Do you want to add storybook?',
      },
    ];

    return this.prompt(prompts).then((props) => {
      this.props = merge(this.props, props);
    });
  }

  _generateDestPath(path = '') {
    return this.destinationPath(`${this.props.name}/${path}`);
  }
};
