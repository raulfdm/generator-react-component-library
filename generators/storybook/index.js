const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('./Button.stories.js'),
      this.options.generateDestPath('./src/Button/Button.stories.js'),
    );

    this.fs.copy(
      this.templatePath('./Button.README.md'),
      this.options.generateDestPath('./src/Button/README.md'),
    );

    this.fs.copy(
      this.templatePath('.storybook/**/*'),
      this.options.generateDestPath('./.storybook/'),
    );
  }
};
