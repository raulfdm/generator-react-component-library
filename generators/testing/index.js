const Generator = require('yeoman-generator');

const { TESTING_LIBRARY } = require('./resources/constants');

module.exports = class extends Generator {
  writing() {
    switch (this.options.tester) {
      case TESTING_LIBRARY:
        return this._copyTestingLibrary();
      default:
        throw new Error('Unknown Tester option');
    }
  }

  /* Internals */

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
