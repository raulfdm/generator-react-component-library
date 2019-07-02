const Generator = require('yeoman-generator');
const packageJson = require('./resources/packageJson');

const {
  NPM_CHOICE,
  YARN_CHOICE,
  ROOT_FILES,
} = require('./resources/constants');

const jestData = require('./resources/jestData');

module.exports = class extends Generator {
  install() {
    const installer =
      this.answers.pkgManager === YARN_CHOICE
        ? this.yarnInstall.bind(this)
        : this.npmInstall.bind(this);

    installer(undefined, undefined, {
      cwd: this._destinationPathGenerator(),
    });
  }

  _destinationPathGenerator(path = '') {
    return this.destinationPath(`${this.answers.name}/${path}`);
  }

  writing() {
    function generateRootFiles(file) {
      this.fs.copy(
        this.templatePath(file),
        this._destinationPathGenerator(file),
      );
    }

    const pkgContent = {
      appName: this.answers.name,
      description: this.answers.description || `${this.answers.name}'s library`,
      scripts: {},
      dependencies: {},
      devDependencies: {},
    };

    ROOT_FILES.forEach(generateRootFiles.bind(this));

    this.fs.copy(
      this.templatePath('src/**/*'),
      this._destinationPathGenerator('./src/'),
    );

    if (this.answers.tester === 'enzyme') {
      this._copyJest();

      pkgContent.scripts = {
        ...pkgContent.scripts,
        ...jestData.scripts,
      };

      pkgContent.devDependencies = {
        ...pkgContent.devDependencies,
        ...jestData.devDependencies,
      };
    }

    this.fs.extendJSON(
      this._destinationPathGenerator('package.json'),
      packageJson(pkgContent),
    );
  }

  _copyJest() {
    this.fs.copy(
      this.templatePath('jest/babel.config.js'),
      this._destinationPathGenerator('./babel.config.js'),
    );
    this.fs.copy(
      this.templatePath('jest/Button.test.js'),
      this._destinationPathGenerator('./src/Button/Button.test.js'),
    );

    this.fs.copy(
      this.templatePath('jest/jest.config.js'),
      this._destinationPathGenerator('./jest.config.js'),
    );

    this.fs.copy(
      this.templatePath('jest/setupTest.js'),
      this._destinationPathGenerator('./config/setupTest.js'),
    );
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
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
            name: 'Jest + Enzyme',
            value: 'enzyme',
          },
          {
            name: 'None',
            value: 'none',
          },
        ],
      },
    ]);
  }
};
