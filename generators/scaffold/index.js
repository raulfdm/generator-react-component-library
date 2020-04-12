const Generator = require('yeoman-generator');

const { ROOT_FILES } = require('../shared/constants');

module.exports = class extends Generator {
  writing() {
    ROOT_FILES.forEach(this._rootFilesWriter.bind(this));

    this.fs.copy(
      this.templatePath('src/**/*'),
      this.options.generateDestPath('./src/'),
    );
  }

  /* Internals */
  _rootFilesWriter(file) {
    this.fs.copy(this.templatePath(file), this.options.generateDestPath(file));
  }
};
