const Generator = require("yeoman-generator");
const packageJson = require("./resources/packageJson");

const { NPM_CHOICE, YARN_CHOICE } = require("./constants");

module.exports = class extends Generator {
  install() {
    if (this.answers.pkgManager === YARN_CHOICE) {
      this.yarnInstall(undefined, undefined, {
        cwd: this._destinationPathGenerator()
      });
    } else {
      this.npmInstall(undefined, undefined, {
        cwd: this._destinationPathGenerator()
      });
    }
  }

  _destinationPathGenerator(path = "") {
    return this.destinationPath(`${this.answers.name}/${path}`);
  }

  writing() {
    const rootFiles = [
      ".editorconfig",
      ".eslintrc.js",
      ".gitignore",
      "rollup.config.js",
      "babel.config.js"
    ];

    function generateRootFiles(file) {
      this.fs.copy(
        this.templatePath(file),
        this._destinationPathGenerator(file)
      );
    }

    rootFiles.forEach(generateRootFiles.bind(this));

    this.fs.copy(
      this.templatePath("src/"),
      this._destinationPathGenerator("./src/")
    );

    const pkgContent = packageJson({
      appName: this.answers.name,
      description: this.answers.description || `${this.answers.name}'s library`
    });

    this.fs.extendJSON(
      this._destinationPathGenerator("package.json"),
      pkgContent
    );
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name"
      },
      {
        type: "list",
        name: "pkgManager",
        message: "What package manager do you want to use?",
        choices: [YARN_CHOICE, NPM_CHOICE]
      }
    ]);
  }
};
