const helpers = require('yeoman-test');
const path = require('path');
const assert = require('yeoman-assert');
const rimraf = require('rimraf');
const { promisify } = require('util');
const fs = require('fs-extra');
const glob = require('glob');

const promiseGlob = promisify(glob);

const { ROOT_FILES } = require('../scaffold/resources/constants');

const clearTmpDir = () => {
  rimraf.sync(TMP_PATH);
};

const TMP_PATH = path.join(__dirname, '../../tmp');

const generateDistPath = (file) => path.join(TMP_PATH, file);

/* @TODO: Break this tests into each generator */
describe('React Component Library Generator', () => {
  describe('Simple setup', () => {
    beforeEach(() => {
      return helpers
        .run(path.join(__dirname, '../app'))
        .inDir(TMP_PATH)
        .withPrompts({ name: 'tmp' });
    });

    afterAll(clearTmpDir);

    it('copy all root files file', () => {
      const files = ROOT_FILES.map(generateDistPath);

      assert.file(files);
    });

    it('copy all files from "src" folder', async () => {
      const templatesFile = path.join(__dirname, './templates/src/**/*');

      const files = await promiseGlob(templatesFile);
      const rootFilesInTmp = files
        .filter((file) => fs.lstatSync(file).isFile())
        .map((file) => {
          /* TODO: This is too hacky 🤦🏽‍, refactor pls */
          const splittedFilePath = file.split('/');
          const srcIndex = splittedFilePath.findIndex(
            (pathPart) => pathPart === 'src',
          );

          const filePath = splittedFilePath
            .slice(srcIndex, splittedFilePath.length)
            .join('/');

          return filePath;
        })
        .map((fileName) => path.join(TMP_PATH, fileName));

      assert.file(rootFilesInTmp);
    });
  });
});
