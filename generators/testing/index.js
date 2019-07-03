const Generator = require('yeoman-generator');

const { JEST_ENZYME } = require('./resources/constants');

module.exports = class extends Generator {
  writing() {
    if (this.options.tester === JEST_ENZYME) {
      this._copyJestFiles();
    }
  }

  /* Internals */
  _copyJestFiles() {
    this.fs.copy(
      this.templatePath('./babel.config.js'),
      this.options.generateDestPath('./babel.config.js'),
    );
    this.fs.copy(
      this.templatePath('./Button.test.js'),
      this.options.generateDestPath('./src/Button/Button.test.js'),
    );
    this.fs.copy(
      this.templatePath('./jest.config.js'),
      this.options.generateDestPath('./jest.config.js'),
    );
    this.fs.copy(
      this.templatePath('./setupTest.js'),
      this.options.generateDestPath('./config/setupTest.js'),
    );
  }
};
