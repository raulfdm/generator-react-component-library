const Generator = require('yeoman-generator');

const { JEST_ENZYME, TESTING_LIBRARY } = require('./resources/constants');

module.exports = class extends Generator {
  writing() {
    switch (this.options.tester) {
      case JEST_ENZYME:
        return this._copyJestFiles();
      case TESTING_LIBRARY:
        return this._copyTestingLibrary();
      default:
        throw new Error('Unknown Tester option');
    }
  }

  /* Internals */
  _copyJestFiles() {
    this.fs.copy(
      this.templatePath('./enzyme/babel.config.js'),
      this.options.generateDestPath('./babel.config.js'),
    );
    this.fs.copy(
      this.templatePath('./enzyme/Button.test.js'),
      this.options.generateDestPath('./src/Button/Button.test.js'),
    );
    this.fs.copy(
      this.templatePath('./enzyme/jest.config.js'),
      this.options.generateDestPath('./jest.config.js'),
    );
    this.fs.copy(
      this.templatePath('./enzyme/setupTest.js'),
      this.options.generateDestPath('./config/setupTest.js'),
    );
  }

  _copyTestingLibrary() {
    this.fs.copy(
      this.templatePath('./testing-library/babel.config.js'),
      this.options.generateDestPath('./babel.config.js'),
    );
    this.fs.copy(
      this.templatePath('./testing-library/Button.test.js'),
      this.options.generateDestPath('./src/Button/Button.test.js'),
    );
    this.fs.copy(
      this.templatePath('./testing-library/jest.config.js'),
      this.options.generateDestPath('./jest.config.js'),
    );
  }
};
